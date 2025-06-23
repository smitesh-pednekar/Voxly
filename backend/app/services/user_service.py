from ..database.mongodb import db
from ..models.user import UserCreate, User
from ..core.security import get_password_hash, verify_password
from typing import Optional
from bson import ObjectId

class UserService:
    @staticmethod
    async def create_user(user: UserCreate) -> Optional[User]:
        # Check if user already exists
        if await UserService.get_user_by_email(user.email):
            return None
        
        # Create new user
        user_dict = user.model_dump()
        user_dict["password"] = get_password_hash(user_dict["password"])
        result = db.users.insert_one(user_dict)
        
        # Return created user
        created_user = await UserService.get_user_by_id(str(result.inserted_id))
        return created_user

    @staticmethod
    async def authenticate_user(email: str, password: str) -> Optional[User]:
        user = await UserService.get_user_by_email(email)
        if not user:
            return None
        
        # Get user from database to access hashed password
        user_dict = db.users.find_one({"email": email})
        if not verify_password(password, user_dict["password"]):
            return None
            
        return user

    @staticmethod
    async def get_user_by_email(email: str) -> Optional[User]:
        user_dict = db.users.find_one({"email": email})
        if user_dict:
            user_dict["id"] = str(user_dict.pop("_id"))
            return User.model_validate(user_dict)
        return None

    @staticmethod
    async def get_user_by_id(user_id: str) -> Optional[User]:
        user_dict = db.users.find_one({"_id": ObjectId(user_id)})
        if user_dict:
            user_dict["id"] = str(user_dict.pop("_id"))
            return User.model_validate(user_dict)
        return None 