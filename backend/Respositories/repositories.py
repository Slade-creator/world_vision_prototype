from sqlmodel import Session, select
from typing import Optional, List
from Model.Model import User, Transaction, Budget, ExchangeRate, Review, AuditLog, ReviewStatus, UserRole
from datetime import datetime


# ─── User Repository ──────────────────────────────────────────────────────────

class UserRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_by_email(self, email: str) -> Optional[User]:
        return self.session.exec(select(User).where(User.email == email)).first()

    def get_by_id(self, user_id: str) -> Optional[User]:
        return self.session.get(User, user_id)

    def update_last_login(self, user: User):
        user.last_login_at = datetime.utcnow()
        self.session.add(user)
        self.session.commit()


# ─── Transaction Repository ───────────────────────────────────────────────────

class TransactionRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, transaction: Transaction) -> Transaction:
        self.session.add(transaction)
        self.session.commit()
        self.session.refresh(transaction)
        return transaction

    def get_by_id(self, txn_id: str) -> Optional[Transaction]:
        return self.session.get(Transaction, txn_id)

    def get_by_local_id(self, local_id: str) -> Optional[Transaction]:
        return self.session.exec(
            select(Transaction).where(Transaction.local_id == local_id)
        ).first()

    def get_by_df_user(self, df_user_id: str) -> List[Transaction]:
        return self.session.exec(
            select(Transaction)
            .where(Transaction.df_user_id == df_user_id)
            .order_by(Transaction.submitted_at.desc())
        ).all()

    def get_pending_for_finance(self) -> List[Transaction]:
        """All transactions pending Finance review."""
        return self.session.exec(
            select(Transaction)
            .where(Transaction.review_status == ReviewStatus.PENDING)
            .order_by(Transaction.submitted_at.asc())
        ).all()

    def get_all(self) -> List[Transaction]:
        return self.session.exec(
            select(Transaction).order_by(Transaction.submitted_at.desc())
        ).all()

    def update_review_status(self, txn: Transaction, new_status: ReviewStatus) -> Transaction:
        txn.review_status = new_status
        self.session.add(txn)
        self.session.commit()
        self.session.refresh(txn)
        return txn


# ─── Budget Repository ────────────────────────────────────────────────────────

class BudgetRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_current_budgets(self) -> List[Budget]:
        return self.session.exec(
            select(Budget).where(Budget.is_current == True)
        ).all()

    def get_by_id(self, budget_id: str) -> Optional[Budget]:
        return self.session.get(Budget, budget_id)

    def update_spent(self, budget: Budget, amount_zmw: float, amount_usd: float) -> Budget:
        budget.spent_zmw += amount_zmw
        budget.spent_usd += amount_usd
        self.session.add(budget)
        self.session.commit()
        self.session.refresh(budget)
        return budget


# ─── Exchange Rate Repository ─────────────────────────────────────────────────

class ExchangeRateRepository:
    def __init__(self, session: Session):
        self.session = session

    def get_current(self) -> Optional[ExchangeRate]:
        now = datetime.utcnow()
        return self.session.exec(
            select(ExchangeRate)
            .where(ExchangeRate.month == now.month)
            .where(ExchangeRate.year == now.year)
        ).first()

    def get_all(self) -> List[ExchangeRate]:
        return self.session.exec(select(ExchangeRate)).all()


# ─── Review Repository ────────────────────────────────────────────────────────

class ReviewRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, review: Review) -> Review:
        self.session.add(review)
        self.session.commit()
        self.session.refresh(review)
        return review

    def get_by_transaction(self, transaction_id: str) -> List[Review]:
        return self.session.exec(
            select(Review).where(Review.transaction_id == transaction_id)
        ).all()


# ─── Audit Log Repository ─────────────────────────────────────────────────────

class AuditLogRepository:
    def __init__(self, session: Session):
        self.session = session

    def log(
        self,
        user: User,
        action: str,
        table_name: str,
        record_id: str,
        old_value: Optional[str] = None,
        new_value: Optional[str] = None,
        ip_address: Optional[str] = None,
    ):
        entry = AuditLog(
            user_id=user.id,
            user_role=user.role.value,
            action=action,
            table_name=table_name,
            record_id=record_id,
            old_value=old_value,
            new_value=new_value,
            ip_address=ip_address,
        )
        self.session.add(entry)
        self.session.commit()