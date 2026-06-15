from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime, date
from enum import Enum
import uuid


# ─── Enums ───────────────────────────────────────────────────────────────────

class UserRole(str, Enum):
    DF = "DF"
    FINANCE = "FINANCE"
    DME = "DME"
    SUPERVISOR = "SUPERVISOR"
    SUPER_USER = "SUPER_USER"


class ExpenseCategory(str, Enum):
    ADMIN = "ADMIN"
    ACTIVITY = "ACTIVITY"


class RouteType(str, Enum):
    FINANCE_ONLY = "FINANCE_ONLY"
    FINANCE_AND_DME = "FINANCE_AND_DME"


class TransactionStatus(str, Enum):
    REQUEST_RAISED = "REQUEST_RAISED"
    PAYMENT_PENDING = "PAYMENT_PENDING"
    PAID = "PAID"


class ReviewStatus(str, Enum):
    PENDING = "PENDING"
    FINANCE_APPROVED = "FINANCE_APPROVED"
    DME_APPROVED = "DME_APPROVED"
    FULLY_APPROVED = "FULLY_APPROVED"
    REJECTED = "REJECTED"
    NEEDS_CORRECTION = "NEEDS_CORRECTION"


class ReviewDecision(str, Enum):
    APPROVED = "APPROVED"
    REJECTED = "REJECTED"
    NEEDS_CORRECTION = "NEEDS_CORRECTION"
    FEEDBACK_REQUIRED = "FEEDBACK_REQUIRED"


class ReviewType(str, Enum):
    FINANCE = "FINANCE"
    DME = "DME"


# ─── User ────────────────────────────────────────────────────────────────────

class User(SQLModel, table=True):
    __tablename__ = "users"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    full_name: str = Field(max_length=150)
    email: str = Field(max_length=255, unique=True, index=True)
    password_hash: str = Field(max_length=255)
    role: UserRole
    is_active: bool = Field(default=True)
    last_login_at: Optional[datetime] = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    transactions: List["Transaction"] = Relationship(back_populates="df_user")
    reviews: List["Review"] = Relationship(back_populates="reviewer")
    audit_logs: List["AuditLog"] = Relationship(back_populates="user")


# ─── Exchange Rate ────────────────────────────────────────────────────────────

class ExchangeRate(SQLModel, table=True):
    __tablename__ = "exchange_rates"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    month: int
    year: int
    zmw_to_usd: float
    source: str = Field(default="MANUAL", max_length=100)  # API or MANUAL
    fetched_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    transactions: List["Transaction"] = Relationship(back_populates="exchange_rate")


# ─── Budget ───────────────────────────────────────────────────────────────────

class Budget(SQLModel, table=True):
    __tablename__ = "budgets"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    project_code: str = Field(max_length=50, index=True)
    line_item_name: str = Field(max_length=200)
    tcode: str = Field(max_length=50)
    allocated_usd: float
    allocated_zmw: float
    spent_usd: float = Field(default=0.0)
    spent_zmw: float = Field(default=0.0)
    period_start: date
    period_end: date
    version: int = Field(default=1)
    is_current: bool = Field(default=True)
    uploaded_by_id: str = Field(foreign_key="users.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    transactions: List["Transaction"] = Relationship(back_populates="budget")


# ─── Transaction ──────────────────────────────────────────────────────────────

class Transaction(SQLModel, table=True):
    __tablename__ = "transactions"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    local_id: str = Field(max_length=255, unique=True, index=True)  # device-generated UUID
    df_user_id: str = Field(foreign_key="users.id")
    budget_id: str = Field(foreign_key="budgets.id")
    exchange_rate_id: str = Field(foreign_key="exchange_rates.id")
    date: date
    amount_zmw: float
    amount_usd: float
    category: ExpenseCategory
    route_type: RouteType
    transaction_status: TransactionStatus
    review_status: ReviewStatus = Field(default=ReviewStatus.PENDING)
    description: str
    document_url: Optional[str] = Field(default=None, max_length=500)
    is_synced: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    submitted_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    df_user: Optional[User] = Relationship(back_populates="transactions")
    budget: Optional[Budget] = Relationship(back_populates="transactions")
    exchange_rate: Optional[ExchangeRate] = Relationship(back_populates="transactions")
    reviews: List["Review"] = Relationship(back_populates="transaction")


# ─── Review ───────────────────────────────────────────────────────────────────

class Review(SQLModel, table=True):
    __tablename__ = "reviews"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    transaction_id: str = Field(foreign_key="transactions.id")
    reviewer_id: str = Field(foreign_key="users.id")
    review_type: ReviewType
    decision: ReviewDecision
    comment: Optional[str] = Field(default=None)
    reviewed_at: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    transaction: Optional[Transaction] = Relationship(back_populates="reviews")
    reviewer: Optional[User] = Relationship(back_populates="reviews")


# ─── Audit Log ────────────────────────────────────────────────────────────────

class AuditLog(SQLModel, table=True):
    __tablename__ = "audit_logs"

    id: str = Field(default_factory=lambda: str(uuid.uuid4()), primary_key=True)
    user_id: str = Field(foreign_key="users.id")
    user_role: str = Field(max_length=50)
    action: str = Field(max_length=100)
    table_name: str = Field(max_length=100)
    record_id: str
    old_value: Optional[str] = Field(default=None)  # JSON string
    new_value: Optional[str] = Field(default=None)  # JSON string
    ip_address: Optional[str] = Field(default=None, max_length=45)
    timestamp: datetime = Field(default_factory=datetime.utcnow)

    # Relationships
    user: Optional[User] = Relationship(back_populates="audit_logs")