from typing import Any

from fastapi import Depends, HTTPException, status

from app.models.domain.User import User
from app.services.EntraAuthorization import authorize
from app.core.config import settings


class ForbiddenAccess(HTTPException):
    def __init__(self, detail: Any = None) -> None:
        super().__init__(status_code=status.HTTP_403_FORBIDDEN, detail=detail, headers={"WWW-Authenticate": "Bearer"})


def get_user(user: User = Depends(authorize)) -> User:
    return user


def get_admin_user(user: User = Depends(authorize)) -> User:
    admin_group_id = settings.admin_group_id
    if admin_group_id in user.groups:
        return user
    raise ForbiddenAccess("Admin privileges required")
