from fastapi import APIRouter, Depends
from app.core.config import settings
from app.auth import get_user, get_admin_user

router = APIRouter()


@router.get("/admin")
def admin_route(user: dict = Depends(get_admin_user)):
    return {
        "message": "You're an admin.",
        "user": {
            "name": user.name,
            "email": user.email,
            "user_id": user.id,
            "tenant_id": user.tenant_id,
            "ipaddr": user.ipaddr,
        },
    }
    

@router.get("/user")
def admin_route(user: dict = Depends(get_user)):
    return {
        "message": "You're a user.",
        "user": {
            "name": user.name,
            "email": user.email,
        },
    }
