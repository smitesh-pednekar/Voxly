from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from ..models.user import User, UserCreate, UserLogin
from ..services.user_service import UserService
from ..core.security import create_access_token, verify_token
from ..core.config import settings
from ..core.email import send_welcome_email

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

class UserController:
    @staticmethod
    async def register_user(user: UserCreate):
        db_user = await UserService.create_user(user)
        if not db_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
        
        # Send welcome email
        try:
            await send_welcome_email(user.email, user.username)
        except Exception as e:
            print(f"Failed to send welcome email: {e}")
            # Don't raise exception here as registration was successful
            
        return db_user

    @staticmethod
    async def login_user(form_data: OAuth2PasswordRequestForm):
        user = await UserService.authenticate_user(form_data.username, form_data.password)
        if not user:
            raise HTTPException(
                status_code=401,
                detail="Incorrect email or password"
            )
        
        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.email}, expires_delta=access_token_expires
        )
        
        return {"access_token": access_token, "token_type": "bearer"}

    @staticmethod
    async def get_current_user(token: str = Depends(oauth2_scheme)):
        email = verify_token(token)
        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )
        
        user = await UserService.get_user_by_email(email)
        if user is None:
            raise HTTPException(status_code=404, detail="User not found")
        
        return user 