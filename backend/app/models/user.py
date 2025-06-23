from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: Optional[str] = None
    created_at: Optional[datetime] = datetime.now()

    class Config:
        # Use arbitrary_types_allowed for better MongoDB compatibility
        arbitrary_types_allowed = True 