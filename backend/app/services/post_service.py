from ..database.mongodb import db
from bson import json_util, ObjectId
import json

class PostService:
    @staticmethod
    async def get_all_posts():
        posts = list(db.posts.find())
        return json.loads(json_util.dumps(posts))
    
    @staticmethod
    async def get_post(id: str):
        try:
            post = db.posts.find_one({"_id": ObjectId(id)})
            if post:
                return json.loads(json_util.dumps(post))
            return None
        except:
            return None
    
    @staticmethod
    async def create_post(post: dict):
        result = db.posts.insert_one(post)
        return str(result.inserted_id) 