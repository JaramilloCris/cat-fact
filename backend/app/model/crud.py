from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
import app.model.models as models
import app.model.schemas as schemas
from sqlalchemy import func, desc


async def get_user_by_username(db: AsyncSession, username: str):
    """
    Get a user by username
    :param db: AsyncSession
    :param username: str
    :return: models.User
    
    """

    result = await db.execute(select(models.User).filter(models.User.username == username))
    return result.scalar_one_or_none()

async def create_user(db: AsyncSession, user: schemas.UserCreate):
    """
    Create a user
    :param db: AsyncSession
    :param user: schemas.UserCreate
    :return: models.User
    
    """

    db_user = models.User(username=user.username)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def get_all_cat_facts(db: AsyncSession):
    """
    Get all cat facts
    :param db: AsyncSession
    :return: list[models.CatFact]
    
    """

    result = await db.execute(select(models.CatFact))
    return result.scalars().all()

async def like_cat_fact(db: AsyncSession, user_id: int, cat_fact_id: int):
    """
    Like a cat fact
    :param db: AsyncSession
    :param user_id: int
    :param cat_fact_id: int
    :return: models.UserCatFactLike

    """

    like = models.UserCatFactLike(user_id=user_id, cat_fact_id=cat_fact_id)
    db.add(like)
    await db.commit()
    await db.refresh(like)
    return like

async def unlike_cat_fact(db: AsyncSession, user_id: int, cat_fact_id: int):
    """
    Unlike a cat fact
    :param db: AsyncSession
    :param user_id: int
    :param cat_fact_id: int
    :return: models.UserCatFactLike or None

    """

    result = await db.execute(select(models.UserCatFactLike).filter(models.UserCatFactLike.user_id == user_id, models.UserCatFactLike.cat_fact_id == cat_fact_id))
    like = result.scalar_one_or_none()
    if like:
        await db.delete(like)
        await db.commit()
        return like
    return None

async def get_liked_cat_facts_by_user(db: AsyncSession, user_id: int):
    """
    Get liked cat facts by user
    :param db: AsyncSession
    :param user_id: int
    :return: list[models.UserCatFactLike]
    
    """

    result = await db.execute(select(models.UserCatFactLike).filter(models.UserCatFactLike.user_id == user_id))
    return result.scalars().all()

async def get_cat_facts_by_ids(db: AsyncSession, cat_fact_ids: list[int]):
    """
    Get cat facts by ids
    :param db: AsyncSession
    :param cat_fact_ids: list[int]
    :return: list[models.CatFact]
    
    """

    result = await db.execute(select(models.CatFact).filter(models.CatFact.id.in_(cat_fact_ids)))
    return result.scalars().all()

async def get_popular_cat_facts(db: AsyncSession):
    """
    Get popular cat facts
    :param db: AsyncSession
    :return: list[tuple[models.CatFact, int]]
    
    """
    
    result = await db.execute(
        select(models.CatFact, func.count(models.UserCatFactLike.id).label('likes'))
        .join(models.UserCatFactLike, models.CatFact.id == models.UserCatFactLike.cat_fact_id)
        .group_by(models.CatFact.id)
        .order_by(desc('likes'))
    )
    return result.fetchall()
