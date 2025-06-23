from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import post_routes, user_routes

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(post_routes.router)
app.include_router(user_routes.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
