from typing import Annotated
from pydantic import BaseModel, Field

from models.pydantic_oid import ObjectId, ObjectIdPydanticAnnotation


class Assistent(BaseModel):
    ID: Annotated[ObjectId, ObjectIdPydanticAnnotation] = Field(
        alias="_id", default=None
    )
    name: str = Field(alias="name", default="")
    description: str = Field(alias="description", default="")
    name: str = Field(alias="name", default="")
    name: str = Field(alias="name", default="")
    name: str = Field(alias="name", default="")