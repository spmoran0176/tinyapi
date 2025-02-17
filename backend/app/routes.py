from fastapi import APIRouter, Depends
from app.core.config import settings
from app.auth import get_user, get_admin_user

router = APIRouter()


@router.get("/admin")
def admin_route(user: dict = Depends(get_admin_user)):
    return {
        "message": "You're an admin.",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.groups,
        },
    }
    

@router.get("/user")
def admin_route(user: dict = Depends(get_user)):
    return {
        "message": "You're a user.",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.groups,
        },
    }
