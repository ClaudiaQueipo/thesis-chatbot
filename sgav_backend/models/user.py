from typing import Annotated, Optional
from pydantic import BaseModel, Field
from models.pydantic_oid import ObjectId, ObjectIdPydanticAnnotation
from typing import List, Annotated


# class User(BaseModel):
#     ID: Annotated[ObjectId, ObjectIdPydanticAnnotation] = Field(
#         alias="_id", default=None
#     )
#     first_name: str = Field(alias="first_name", default="")
#     last_name: str = Field(alias="last_name", default="")
#     email: str = Field(alias="email", default="")
#     password: str = Field(alias="password", default="")
#     rol: str = Field(alias="rol", default="USER")
#     assistants: List = Field(alias="assistants", default=list())
    
class TokenData(BaseModel):
    username: Optional[str] = None

class User(BaseModel):
    first_name: str
    last_name: str
    email: str
    password: str

class UserInDB(User):
    hashed_password: str
