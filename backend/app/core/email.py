from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
from typing import List
from ..core.config import settings

conf = ConnectionConfig(
    MAIL_USERNAME=settings.MAIL_USERNAME,
    MAIL_PASSWORD=settings.MAIL_PASSWORD,
    MAIL_FROM=settings.MAIL_FROM,
    MAIL_PORT=settings.MAIL_PORT,
    MAIL_SERVER=settings.MAIL_SERVER,
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

async def send_welcome_email(email: EmailStr, username: str):
    html = f"""
    <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome to Blog Website, {username}!</h2>
        <p>Thank you for registering with us. We're excited to have you on board!</p>
        <p>You can now:</p>
        <ul>
            <li>Create and publish blog posts</li>
            <li>Read other users' posts</li>
            <li>Interact with the community</li>
        </ul>
        <p>Best regards,<br>The Blog Website Team</p>
    </div>
    """
    
    message = MessageSchema(
        subject="Welcome to Blog Website!",
        recipients=[email],
        body=html,
        subtype="html"
    )

    fm = FastMail(conf)
    await fm.send_message(message) 