# Dependency to get DB session
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.model import schemas, crud
from app.database.database import async_session
from typing import List
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from app.utils import get_user_by_token, create_access_token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_db():
    async with async_session() as session:
        yield session

api_router = APIRouter()

@api_router.post("/register/")
async def register_user(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    """
    Register a user
    :param user: schemas.UserCreate
    :param db: AsyncSession
    :return: dict

    """
    db_user = await crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    user = await crud.create_user(db=db, user=user)
    return create_access_token(user.username)

@api_router.post("/login/")
async def login_user(user: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    """
    Login a user
    :param user: schemas.UserCreate
    :param db: AsyncSession
    :return: dict

    """
    db_user = await crud.get_user_by_username(db, username=user.username)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username")
    return create_access_token(db_user.username)

@api_router.get("/catfacts/", response_model=List[schemas.CatFact])
async def get_all_cat_facts(db: AsyncSession = Depends(get_db)):
    """
    Get all cat facts
    :param db: AsyncSession
    :return: list[schemas.CatFact]

    """

    return await crud.get_all_cat_facts(db=db)

@api_router.post("/catfact/like/")
async def like_cat_fact(data: dict, token: Annotated[str, Depends(oauth2_scheme)], db: AsyncSession = Depends(get_db)):
    """
    Like a cat fact
    :param data: dict
    :param token: str
    :param db: AsyncSession
    :return: models.UserCatFactLike
    
    """

    user = await get_user_by_token(token=token, db=db)
    cat_fact_id = data.get("cat_fact_id")
    print(user.id, cat_fact_id)
    like = await crud.like_cat_fact(db=db, user_id=user.id, cat_fact_id=cat_fact_id)
    return like

@api_router.post("/catfact/unlike/")
async def unlike_cat_fact(data: dict, token: Annotated[str, Depends(oauth2_scheme)], db: AsyncSession = Depends(get_db)):
    """
    Unlike a cat fact
    :param data: dict
    :param token: str
    :param db: AsyncSession
    :return: models.UserCatFactLike
    
    """

    user = await get_user_by_token(token=token, db=db)
    cat_fact_id = data.get("cat_fact_id")
    like = await crud.unlike_cat_fact(db=db, user_id=user.id, cat_fact_id=cat_fact_id)
    return like

@api_router.get("/user/liked/", response_model=List[schemas.CatFact])
async def get_liked_cat_facts(token: Annotated[str, Depends(oauth2_scheme)], db: AsyncSession = Depends(get_db)):
    """
    Get liked cat facts
    :param token: str
    :param db: AsyncSession
    :return: list[schemas.CatFact]
    
    """
    user = await get_user_by_token(token=token, db=db)
    likes = await crud.get_liked_cat_facts_by_user(db=db, user_id=user.id)
    cat_fact_ids = [like.cat_fact_id for like in likes]
    cat_facts = await crud.get_cat_facts_by_ids(db=db, cat_fact_ids=cat_fact_ids)
    return cat_facts

@api_router.get("/user/liked/id/", response_model=List[int])
async def get_liked_cat_fact_ids(token: Annotated[str, Depends(oauth2_scheme)], db: AsyncSession = Depends(get_db)):
    """
    Get liked cat fact ids
    :param token: str
    :param db: AsyncSession
    :return: list[int]    
    
    """
    user = await get_user_by_token(token=token, db=db)
    likes = await crud.get_liked_cat_facts_by_user(db=db, user_id=user.id)
    cat_fact_ids = [like.cat_fact_id for like in likes]
    return cat_fact_ids

@api_router.get("/catfacts/popular/", response_model=List[schemas.CatFact])
async def get_popular_cat_facts(db: AsyncSession = Depends(get_db)):
    """
    Get popular cat facts
    :param db: AsyncSession
    :return: list[schemas.CatFact]
    
    """
    
    result = await crud.get_popular_cat_facts(db=db)
    return [cat_fact for cat_fact, _ in result]
