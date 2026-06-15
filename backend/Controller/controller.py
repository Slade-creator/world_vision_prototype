from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from pydantic import BaseModel
from typing import Optional
from datetime import date
import uuid

from Config.database import get_session
from Model.Model import User, ExpenseCategory, TransactionStatus, ReviewDecision
from Middleware.auth_middleware import get_current_user, require_permission
from Respositories.repositories import (
    UserRepository, TransactionRepository, BudgetRepository,
    ExchangeRateRepository, ReviewRepository, AuditLogRepository
)
from Service.services import AuthService, TransactionService, ReviewService, BudgetService


# ─── Request Schemas (Pydantic) ───────────────────────────────────────────────

class LoginRequest(BaseModel):
    email: str
    password: str


class TransactionCreateRequest(BaseModel):
    local_id: str = None  # device-generated UUID; auto-generated if not provided
    budget_id: str
    date: date
    amount_zmw: float
    category: ExpenseCategory
    transaction_status: TransactionStatus
    description: str
    document_url: Optional[str] = None

    def model_post_init(self, __context):
        if not self.local_id:
            self.local_id = str(uuid.uuid4())


class ReviewRequest(BaseModel):
    decision: ReviewDecision
    comment: Optional[str] = None


# ─── Auth Controller ──────────────────────────────────────────────────────────

auth_router = APIRouter(prefix="/api/v1/auth", tags=["Authentication"])


@auth_router.post("/login")
def login(request: LoginRequest, session: Session = Depends(get_session)):
    user_repo = UserRepository(session)
    audit_repo = AuditLogRepository(session)
    service = AuthService(user_repo, audit_repo)

    user = service.authenticate(request.email, request.password)
    return service.create_token(user)


@auth_router.post("/logout")
def logout(current_user: User = Depends(get_current_user), session: Session = Depends(get_session)):
    audit_repo = AuditLogRepository(session)
    audit_repo.log(current_user, "USER_LOGOUT", "users", current_user.id)
    return {"message": "Logged out successfully"}


# ─── Transaction Controller ───────────────────────────────────────────────────

transaction_router = APIRouter(prefix="/api/v1/transactions", tags=["Transactions"])


@transaction_router.post("", status_code=201)
def submit_transaction(
    body: TransactionCreateRequest,
    current_user: User = Depends(require_permission("submit_transaction")),
    session: Session = Depends(get_session),
):
    service = TransactionService(
        TransactionRepository(session),
        BudgetRepository(session),
        ExchangeRateRepository(session),
        AuditLogRepository(session),
    )
    txn = service.submit_expense(current_user, body.model_dump())
    return {
        "id": txn.id,
        "local_id": txn.local_id,
        "amount_zmw": txn.amount_zmw,
        "amount_usd": txn.amount_usd,
        "route_type": txn.route_type,
        "review_status": txn.review_status,
        "created_at": txn.created_at,
        "message": f"Expense submitted successfully. Routed to: {txn.route_type.value}",
    }


@transaction_router.get("/my")
def get_my_transactions(
    current_user: User = Depends(require_permission("view_own_transactions")),
    session: Session = Depends(get_session),
):
    service = TransactionService(
        TransactionRepository(session),
        BudgetRepository(session),
        ExchangeRateRepository(session),
        AuditLogRepository(session),
    )
    transactions = service.get_my_transactions(current_user)
    return {
        "total": len(transactions),
        "data": [
            {
                "id": t.id,
                "date": t.date,
                "amount_zmw": t.amount_zmw,
                "amount_usd": t.amount_usd,
                "category": t.category,
                "route_type": t.route_type,
                "review_status": t.review_status,
                "transaction_status": t.transaction_status,
                "description": t.description,
                "submitted_at": t.submitted_at,
            }
            for t in transactions
        ],
    }


@transaction_router.get("")
def get_all_transactions(
    current_user: User = Depends(require_permission("view_all_transactions")),
    session: Session = Depends(get_session),
):
    service = TransactionService(
        TransactionRepository(session),
        BudgetRepository(session),
        ExchangeRateRepository(session),
        AuditLogRepository(session),
    )
    transactions = service.get_all()
    return {
        "total": len(transactions),
        "data": [
            {
                "id": t.id,
                "df_user_id": t.df_user_id,
                "date": t.date,
                "amount_zmw": t.amount_zmw,
                "amount_usd": t.amount_usd,
                "category": t.category,
                "route_type": t.route_type,
                "review_status": t.review_status,
                "description": t.description,
            }
            for t in transactions
        ],
    }


# ─── Review Controller ────────────────────────────────────────────────────────

review_router = APIRouter(prefix="/api/v1/reviews", tags=["Reviews"])


@review_router.get("/pending")
def get_pending_reviews(
    current_user: User = Depends(require_permission("review_transaction")),
    session: Session = Depends(get_session),
):
    service = TransactionService(
        TransactionRepository(session),
        BudgetRepository(session),
        ExchangeRateRepository(session),
        AuditLogRepository(session),
    )
    pending = service.get_pending_for_review()
    return {
        "total": len(pending),
        "data": [
            {
                "id": t.id,
                "date": t.date,
                "amount_zmw": t.amount_zmw,
                "amount_usd": t.amount_usd,
                "category": t.category,
                "route_type": t.route_type,
                "review_status": t.review_status,
                "description": t.description,
                "submitted_at": t.submitted_at,
            }
            for t in pending
        ],
    }

@review_router.get("")
def get_all_review_transactions(
    current_user: User = Depends(require_permission("review_transaction")),
    session: Session = Depends(get_session),
):
    service = TransactionService(
        TransactionRepository(session),
        BudgetRepository(session),
        ExchangeRateRepository(session),
        AuditLogRepository(session),
    )
    transactions = service.get_all()
    return {
        "total": len(transactions),
        "data": [
            {
                "id": t.id,
                "date": t.date,
                "amount_zmw": t.amount_zmw,
                "amount_usd": t.amount_usd,
                "category": t.category,
                "route_type": t.route_type,
                "review_status": t.review_status,
                "description": t.description,
                "submitted_at": t.submitted_at,
            }
            for t in transactions
        ],
    }


@review_router.post("/{transaction_id}")
def submit_review(
    transaction_id: str,
    body: ReviewRequest,
    current_user: User = Depends(require_permission("review_transaction")),
    session: Session = Depends(get_session),
):
    service = ReviewService(
        TransactionRepository(session),
        ReviewRepository(session),
        BudgetRepository(session),
        AuditLogRepository(session),
    )
    return service.submit_review(current_user, transaction_id, body.model_dump())


# ─── Budget Controller ────────────────────────────────────────────────────────

budget_router = APIRouter(prefix="/api/v1/budgets", tags=["Budgets"])


@budget_router.get("/my")
def get_my_budgets(
    current_user: User = Depends(require_permission("view_own_budget")),
    session: Session = Depends(get_session),
):
    service = BudgetService(BudgetRepository(session), ExchangeRateRepository(session))
    return service.get_df_budgets()


@budget_router.get("")
def get_all_budgets(
    current_user: User = Depends(require_permission("view_all_budgets")),
    session: Session = Depends(get_session),
):
    service = BudgetService(BudgetRepository(session), ExchangeRateRepository(session))
    return service.get_df_budgets()


# ─── Exchange Rate Controller ─────────────────────────────────────────────────

rate_router = APIRouter(prefix="/api/v1/exchange-rates", tags=["Exchange Rates"])


@rate_router.get("/current")
def get_current_rate(
    current_user: User = Depends(get_current_user),
    session: Session = Depends(get_session),
):
    repo = ExchangeRateRepository(session)
    rate = repo.get_current()
    if not rate:
        raise HTTPException(status_code=404, detail="No exchange rate set for current month")
    return {
        "month": rate.month,
        "year": rate.year,
        "zmw_to_usd": rate.zmw_to_usd,
        "source": rate.source,
        "fetched_at": rate.fetched_at,
    }