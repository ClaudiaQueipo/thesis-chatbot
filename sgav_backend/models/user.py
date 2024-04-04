from typing import Optional
from pydantic import BaseModel, Field

class TokenData(BaseModel):
    username: Optional[str] = None


class User(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str
    role: str = Field(default="USER")


class UserInDB(User):
    hashed_password: str
