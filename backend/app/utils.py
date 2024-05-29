from fastapi import HTTPException
from app.model import crud

import jwt

SECRET_KEY = "SECRET_KEY"

async def get_user_by_token(token: str, db):
    """
    Get a user by token
    :param token: str
    :param db: AsyncSession
    :return: models.User
    
    """
    try:
        token_data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        username = token_data.get("username")
        user = await crud.get_user_by_username(db, username)
        return user
    except: 
        raise HTTPException(status_code=401, detail="Invalid token")
    

def create_access_token(username: str):
    """
    Create an access token
    :param username: str
    :return: dict
    
    """
    
    token = jwt.encode({"username": username}, SECRET_KEY)
    return {
        "token": token,
        "username": username
    }