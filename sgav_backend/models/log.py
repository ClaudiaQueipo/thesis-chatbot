from typing import Annotated
from bson import ObjectId
from pydantic import BaseModel, Field

from models.pydantic_oid import ObjectIdPydanticAnnotation


class LogModel(BaseModel):
    ID: Annotated[ObjectId, ObjectIdPydanticAnnotation] = Field(
        alias="_id", default=None
    )
    user_id: Annotated[ObjectId, ObjectIdPydanticAnnotation]
    username: str
    reason: str
