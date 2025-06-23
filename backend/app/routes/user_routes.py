from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from ..controllers.user_controller import UserController
from ..models.user import User, UserCreate

router = APIRouter()

@router.post("/register", response_model=User)
async def register(user: UserCreate):
    return await UserController.register_user(user)

@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    return await UserController.login_user(form_data)

@router.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(UserController.get_current_user)):
    return current_user 

