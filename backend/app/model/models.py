from sqlalchemy import Column, Integer, String, ForeignKey, Table, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database.database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)

class CatFact(Base):
    __tablename__ = "cat_facts"
    id = Column(Integer, primary_key=True, index=True)
    fact = Column(String)

class UserCatFactLike(Base):
    __tablename__ = "user_cat_fact_likes"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    cat_fact_id = Column(Integer, ForeignKey("cat_facts.id"), nullable=False)
    UniqueConstraint('user_id', 'cat_fact_id', name='unique_user_cat_fact')
