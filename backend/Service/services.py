from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from fastapi import HTTPException, status
import uuid

from Config.settings import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES, verify_password
from Model.Model import (
    User, Transaction, Review, Budget,
    ExpenseCategory, RouteType, ReviewStatus, ReviewDecision, ReviewType
)
from Respositories.repositories import (
    UserRepository, TransactionRepository, BudgetRepository,
    ExchangeRateRepository, ReviewRepository, AuditLogRepository
)


# ─── Auth Service ─────────────────────────────────────────────────────────────

class AuthService:
    def __init__(self, user_repo: UserRepository, audit_repo: AuditLogRepository):
        self.user_repo = user_repo
        self.audit_repo = audit_repo

    def authenticate(self, email: str, password: str) -> User:
        user = self.user_repo.get_by_email(email)
        if not user or not verify_password(password, user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is deactivated",
            )
        self.user_repo.update_last_login(user)
        self.audit_repo.log(user, "USER_LOGIN", "users", user.id)
        return user

    def create_token(self, user: User) -> dict:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        payload = {
            "sub": user.id,
            "role": user.role.value,
            "email": user.email,
            "exp": expire,
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return {
            "access_token": token,
            "token_type": "bearer",
            "expires_in": ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "role": user.role.value,
                "email": user.email,
            },
        }


# ─── Transaction Service ──────────────────────────────────────────────────────

class TransactionService:
    def __init__(
        self,
        txn_repo: TransactionRepository,
        budget_repo: BudgetRepository,
        rate_repo: ExchangeRateRepository,
        audit_repo: AuditLogRepository,
    ):
        self.txn_repo = txn_repo
        self.budget_repo = budget_repo
        self.rate_repo = rate_repo
        self.audit_repo = audit_repo

    def _determine_route(self, category: ExpenseCategory) -> RouteType:
        """Smart routing logic: Admin → Finance only. Activity → Finance + DME."""
        if category == ExpenseCategory.ADMIN:
            return RouteType.FINANCE_ONLY
        return RouteType.FINANCE_AND_DME

    def submit_expense(self, df_user: User, data: dict) -> Transaction:
        # Validate budget exists
        budget = self.budget_repo.get_by_id(data["budget_id"])
        if not budget:
            raise HTTPException(status_code=404, detail="Budget line not found")

        # Get current exchange rate
        rate = self.rate_repo.get_current()
        if not rate:
            raise HTTPException(status_code=400, detail="No exchange rate set for current month")

        # Check for duplicate local_id (offline deduplication)
        existing = self.txn_repo.get_by_local_id(data["local_id"])
        if existing:
            raise HTTPException(status_code=409, detail="Duplicate entry — already synced")

        # Calculate USD equivalent
        amount_zmw = data["amount_zmw"]
        amount_usd = round(amount_zmw / rate.zmw_to_usd, 2)

        # Check for overspend
        remaining_zmw = budget.allocated_zmw - budget.spent_zmw
        if amount_zmw > remaining_zmw:
            raise HTTPException(
                status_code=400,
                detail=f"Overspend warning: Only ZMW {remaining_zmw:.2f} remaining in this budget line",
            )

        # Determine routing
        route_type = self._determine_route(data["category"])

        transaction = Transaction(
            local_id=data["local_id"],
            df_user_id=df_user.id,
            budget_id=budget.id,
            exchange_rate_id=rate.id,
            date=data["date"],
            amount_zmw=amount_zmw,
            amount_usd=amount_usd,
            category=data["category"],
            route_type=route_type,
            transaction_status=data["transaction_status"],
            description=data["description"],
            document_url=data.get("document_url"),
        )

        saved = self.txn_repo.create(transaction)
        self.audit_repo.log(df_user, "TRANSACTION_SUBMITTED", "transactions", saved.id, new_value=str(amount_zmw))
        return saved

    def get_my_transactions(self, df_user: User) -> list:
        return self.txn_repo.get_by_df_user(df_user.id)

    def get_pending_for_review(self) -> list:
        return self.txn_repo.get_pending_for_finance()

    def get_all(self) -> list:
        return self.txn_repo.get_all()


# ─── Review Service ───────────────────────────────────────────────────────────

class ReviewService:
    def __init__(
        self,
        txn_repo: TransactionRepository,
        review_repo: ReviewRepository,
        budget_repo: BudgetRepository,
        audit_repo: AuditLogRepository,
    ):
        self.txn_repo = txn_repo
        self.review_repo = review_repo
        self.budget_repo = budget_repo
        self.audit_repo = audit_repo

    def submit_review(self, reviewer: User, transaction_id: str, data: dict) -> dict:
        txn = self.txn_repo.get_by_id(transaction_id)
        if not txn:
            raise HTTPException(status_code=404, detail="Transaction not found")

        if txn.review_status not in [ReviewStatus.PENDING, ReviewStatus.FINANCE_APPROVED]:
            raise HTTPException(
                status_code=409,
                detail=f"Transaction is not in a reviewable state: {txn.review_status}",
            )

        decision = data["decision"]
        comment = data.get("comment")

        # Comment required for non-approval decisions
        if decision != ReviewDecision.APPROVED and not comment:
            raise HTTPException(
                status_code=400,
                detail="A comment is required when decision is not APPROVED",
            )

        review = Review(
            transaction_id=txn.id,
            reviewer_id=reviewer.id,
            review_type=ReviewType.FINANCE,
            decision=decision,
            comment=comment,
        )
        self.review_repo.create(review)

        # Update transaction review status based on decision
        old_status = txn.review_status

        if decision == ReviewDecision.APPROVED:
            if txn.route_type == RouteType.FINANCE_ONLY:
                new_status = ReviewStatus.FULLY_APPROVED
                # Deduct from budget on full approval
                budget = self.budget_repo.get_by_id(txn.budget_id)
                if budget:
                    self.budget_repo.update_spent(budget, txn.amount_zmw, txn.amount_usd)
            else:
                new_status = ReviewStatus.FINANCE_APPROVED
        elif decision == ReviewDecision.REJECTED:
            new_status = ReviewStatus.REJECTED
        else:
            new_status = ReviewStatus.NEEDS_CORRECTION

        self.txn_repo.update_review_status(txn, new_status)
        self.audit_repo.log(
            reviewer,
            f"ENTRY_{decision.value}",
            "transactions",
            txn.id,
            old_value=old_status.value,
            new_value=new_status.value,
        )

        return {
            "review_id": review.id,
            "transaction_id": txn.id,
            "decision": decision,
            "review_type": ReviewType.FINANCE,
            "transaction_review_status": new_status,
            "reviewed_at": review.reviewed_at,
        }


# ─── Budget Service ───────────────────────────────────────────────────────────

class BudgetService:
    def __init__(self, budget_repo: BudgetRepository, rate_repo: ExchangeRateRepository):
        self.budget_repo = budget_repo
        self.rate_repo = rate_repo

    def get_df_budgets(self) -> dict:
        rate = self.rate_repo.get_current()
        budgets = self.budget_repo.get_current_budgets()

        budget_lines = []
        for b in budgets:
            remaining_zmw = b.allocated_zmw - b.spent_zmw
            remaining_usd = b.allocated_usd - b.spent_usd
            utilisation = round((b.spent_usd / b.allocated_usd) * 100, 1) if b.allocated_usd else 0

            if utilisation >= 95:
                budget_status = "RED"
            elif utilisation >= 80:
                budget_status = "ORANGE"
            else:
                budget_status = "GREEN"

            budget_lines.append({
                "id": b.id,
                "project_code": b.project_code,
                "line_item_name": b.line_item_name,
                "tcode": b.tcode,
                "allocated_zmw": b.allocated_zmw,
                "allocated_usd": b.allocated_usd,
                "spent_zmw": b.spent_zmw,
                "spent_usd": b.spent_usd,
                "remaining_zmw": remaining_zmw,
                "remaining_usd": remaining_usd,
                "utilisation_percent": utilisation,
                "status": budget_status,
            })

        return {
            "exchange_rate": {
                "zmw_to_usd": rate.zmw_to_usd if rate else None,
                "month": rate.month if rate else None,
                "year": rate.year if rate else None,
            },
            "budget_lines": budget_lines,
        }