from typing import Annotated, Optional
from bson import ObjectId
from pydantic import BaseModel, Field

from models.pydantic_oid import ObjectIdPydanticAnnotation

class TokenData(BaseModel):
    username: Optional[str] = None


class User(BaseModel):
    ID: Annotated[ObjectId, ObjectIdPydanticAnnotation] | None = Field(
        alias="_id", default=None
    )
    first_name: str
    last_name: str
    email: str
    password: str
    role: str = Field(default="USER")


class UserInDB(User):
    hashed_password: str
