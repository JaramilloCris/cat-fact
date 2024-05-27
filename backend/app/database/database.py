from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, declarative_base
from sqlalchemy import MetaData

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@db/postgres"

engine = create_async_engine(DATABASE_URL, echo=True)
metadata = MetaData()
Base = declarative_base()

async_session = sessionmaker(
    engine, expire_on_commit=False, class_=AsyncSession
)
