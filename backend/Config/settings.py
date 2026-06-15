from passlib.context import CryptContext
from Model.Model import UserRole

# ─── JWT ─────────────────────────────────────────────────────────────────────

SECRET_KEY = "fft-world-vision-zambia-super-secret-key-2026"  # Change in production
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 480  # 8 hours

# ─── Password Hashing ─────────────────────────────────────────────────────────

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

# ─── CORS ─────────────────────────────────────────────────────────────────────

CORS_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:8081",   # Expo dev server
    "http://localhost:19006",  # Expo web
    "exp://localhost:19000",   # Expo Go
    "*",                       # Allow all for prototype demo
]

# ─── RBAC Permission Map ──────────────────────────────────────────────────────
# Maps each role to the set of actions it is permitted to perform.
# Used by the auth middleware to enforce access control.

ROLE_PERMISSIONS: dict[UserRole, list[str]] = {
    UserRole.DF: [
        "submit_transaction",
        "view_own_transactions",
        "view_own_budget",
        "view_exchange_rate",
    ],
    UserRole.FINANCE: [
        "view_all_transactions",
        "review_transaction",
        "upload_budget",
        "view_all_budgets",
        "view_reports",
        "view_exchange_rate",
        "set_exchange_rate",
        "view_audit_logs",
    ],
    UserRole.DME: [
        "view_activity_transactions",
        "review_transaction",
        "view_all_transactions",
        "review_dme_transaction",
        "view_targets",
        "upload_targets",
        "view_reports",
    ],
    UserRole.SUPERVISOR: [
        "view_all_transactions",
        "view_all_budgets",
        "view_reports",
        "add_comment",
        "view_exchange_rate",
    ],
    UserRole.SUPER_USER: [
        # Super user has all permissions
        "submit_transaction",
        "view_own_transactions",
        "view_own_budget",
        "view_all_transactions",
        "review_transaction",
        "review_dme_transaction",
        "upload_budget",
        "view_all_budgets",
        "view_reports",
        "view_exchange_rate",
        "set_exchange_rate",
        "view_audit_logs",
        "manage_users",
        "override_approval",
        "view_targets",
        "upload_targets",
        "add_comment",
    ],
}

def has_permission(role: UserRole, action: str) -> bool:
    """Check if a role has permission to perform an action."""
    return action in ROLE_PERMISSIONS.get(role, [])