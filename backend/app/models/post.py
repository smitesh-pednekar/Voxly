from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class Post(BaseModel):
    title: str
    content: str
    author: str
    image: str
    created_at: Optional[datetime] = datetime.now() 