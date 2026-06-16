from sqlmodel import SQLModel, create_engine, Session
from typing import Generator
from datetime import date
import uuid

DATABASE_URL = "sqlite:///./fft.db"

engine = create_engine(
    DATABASE_URL,
    echo=True,
    connect_args={"check_same_thread": False}  # Required for SQLite
)


def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session


def create_db_and_tables():
    from Model.Model  import User, ExchangeRate, Budget, Transaction, Review, AuditLog  # noqa: ensure all models registered
    SQLModel.metadata.create_all(engine)


def seed_data():
    """Seed demo users, exchange rate, and budget for the prototype demo."""
    from Model.Model import User, ExchangeRate, Budget, Transaction, UserRole, ExpenseCategory, RouteType, TransactionStatus, ReviewStatus
    from Config.settings import get_password_hash
    from datetime import datetime

    with Session(engine) as session:

        # Check if already seeded
        from sqlmodel import select
        existing = session.exec(select(User)).first()
        if existing:
            return

        # ── Users ──────────────────────────────────────────────────────────
        df_user = User(
            id=str(uuid.uuid4()),
            full_name="David Mwale",
            email="df@worldvision.org",
            password_hash=get_password_hash("password123"),
            role=UserRole.DF,
        )
        finance_user = User(
            id=str(uuid.uuid4()),
            full_name="Janet Phiri",
            email="finance@worldvision.org",
            password_hash=get_password_hash("password123"),
            role=UserRole.FINANCE,
        )
        dme_user = User(
            id=str(uuid.uuid4()),
            full_name="Moses Banda",
            email="dme@worldvision.org",
            password_hash=get_password_hash("password123"),
            role=UserRole.DME,
        )
        super_user = User(
            id=str(uuid.uuid4()),
            full_name="Admin User",
            email="admin@worldvision.org",
            password_hash=get_password_hash("password123"),
            role=UserRole.SUPER_USER,
        )

        session.add_all([df_user, finance_user, dme_user, super_user])
        session.commit()
        session.refresh(df_user)
        session.refresh(finance_user)

        # ── Exchange Rate ───────────────────────────────────────────────────
        exchange_rate = ExchangeRate(
            month=4,
            year=2026,
            zmw_to_usd=19.28,
            source="MANUAL",
        )
        session.add(exchange_rate)
        session.commit()
        session.refresh(exchange_rate)

        # ── Budgets ─────────────────────────────────────────────────────────
        budget1 = Budget(
            project_code="ZM-2026-WASH",
            line_item_name="Community Training Materials",
            tcode="TC-4501",
            allocated_usd=1884.70,
            allocated_zmw=50000.00,
            spent_usd=471.18,
            spent_zmw=12500.00,
            period_start=date(2026, 1, 1),
            period_end=date(2026, 12, 31),
            uploaded_by_id=finance_user.id,
        )
        budget2 = Budget(
            project_code="ZM-2026-WASH",
            line_item_name="Field Transport",
            tcode="TC-4502",
            allocated_usd=3769.40,
            allocated_zmw=100000.00,
            spent_usd=1200.00,
            spent_zmw=31848.00,
            period_start=date(2026, 1, 1),
            period_end=date(2026, 12, 31),
            uploaded_by_id=finance_user.id,
        )
        budget3 = Budget(
            project_code="ZM-2026-WASH",
            line_item_name="Office Administration",
            tcode="TC-4503",
            allocated_usd=942.35,
            allocated_zmw=25000.00,
            spent_usd=850.00,
            spent_zmw=22559.00,
            period_start=date(2026, 1, 1),
            period_end=date(2026, 12, 31),
            uploaded_by_id=finance_user.id,
        )

        session.add_all([budget1, budget2, budget3])
        session.commit()
        session.refresh(budget1)

        # ── Seeded Transactions (so Finance queue is not empty on demo) ─────
        txn1 = Transaction(
            local_id=str(uuid.uuid4()),
            df_user_id=df_user.id,
            budget_id=budget1.id,
            exchange_rate_id=exchange_rate.id,
            date=date(2026, 4, 3),
            amount_zmw=1500.00,
            amount_usd=56.52,
            category=ExpenseCategory.ACTIVITY,
            route_type=RouteType.FINANCE_AND_DME,
            transaction_status=TransactionStatus.PAID,
            review_status=ReviewStatus.PENDING,
            description="Transport to Chibombo community meeting",
        )
        txn2 = Transaction(
            local_id=str(uuid.uuid4()),
            df_user_id=df_user.id,
            budget_id=budget2.id,
            exchange_rate_id=exchange_rate.id,
            date=date(2026, 4, 2),
            amount_zmw=800.00,
            amount_usd=30.14,
            category=ExpenseCategory.ADMIN,
            route_type=RouteType.FINANCE_ONLY,
            transaction_status=TransactionStatus.PAID,
            review_status=ReviewStatus.PENDING,
            description="Office stationery purchase",
        )

        session.add_all([txn1, txn2])
        session.commit()

        print("✅ Seed data created successfully")
        print("   DF:      df@worldvision.org / password123")
        print("   Finance: finance@worldvision.org / password123")
        print("   DME:     dme@worldvision.org / password123")
        print("   Admin:   admin@worldvision.org / password123")