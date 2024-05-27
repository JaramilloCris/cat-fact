from pydantic import BaseModel

class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        orm_mode = True

class CatFactBase(BaseModel):
    fact: str

class CatFact(CatFactBase):
    id: int

    class Config:
        orm_mode = True

class UserCatFactLikeBase(BaseModel):
    user_id: int
    cat_fact_id: int

class UserCatFactLike(UserCatFactLikeBase):
    id: int

    class Config:
        orm_mode = True
