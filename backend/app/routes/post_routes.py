from fastapi import APIRouter
from ..controllers.post_controller import PostController
from ..models.post import Post

router = APIRouter()

@router.get("/posts")
async def get_posts():
    return await PostController.get_posts()

@router.get("/posts/{id}")
async def get_post(id: str):
    return await PostController.get_post(id)

@router.post("/posts")
async def create_post(post: Post):
    return await PostController.create_post(post) 