from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlmodel import Session, select
from typing import Optional

from Config.settings import SECRET_KEY, ALGORITHM, has_permission
from Model.Model import User, UserRole
from Config.database import get_session

security = HTTPBearer()


def decode_token(token: str) -> dict:
    """Decode and validate a JWT token."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )


def get_current_user(
        credentials: HTTPAuthorizationCredentials = Depends(security),
        session: Session = Depends(get_session),
) -> User:
    """Extract and validate the current user from the JWT token."""
    payload = decode_token(credentials.credentials)
    user_id: Optional[str] = payload.get("sub")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing user identity",
        )

    user = session.exec(select(User).where(User.id == user_id)).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is deactivated",
        )

    return user


def require_roles(*roles: UserRole):
    """
    Dependency factory that restricts access to specific roles.

    Usage:
        @router.get("/admin-only")
        def admin_route(user = Depends(require_roles(UserRole.SUPER_USER, UserRole.FINANCE))):
            ...
    """

    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required roles: {[r.value for r in roles]}",
            )
        return current_user

    return role_checker


def require_permission(action: str):
    """
    Dependency factory that checks RBAC permission for a specific action.

    Usage:
        @router.post("/transactions")
        def submit(user = Depends(require_permission("submit_transaction"))):
            ...
    """

    def permission_checker(current_user: User = Depends(get_current_user)) -> User:
        if not has_permission(current_user.role, action):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Your role '{current_user.role}' does not have permission to perform '{action}'",
            )
        return current_user

    return permission_checker