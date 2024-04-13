from datetime import datetime, timezone
from typing import Annotated
from bson import ObjectId
from pydantic import BaseModel, Field

from models.pydantic_oid import ObjectIdPydanticAnnotation


class LogModel(BaseModel):
    ID: Annotated[ObjectId, ObjectIdPydanticAnnotation] | None = Field(
        alias="_id", default=None
    )
    user_id: Annotated[ObjectId, ObjectIdPydanticAnnotation] | str
    username: str
    reason: str
    created_at: datetime = Field(default=datetime.now(tz=timezone.utc))


# class LogModel(BaseModel):
#     ID: Annotated[ObjectId, ObjectIdPydanticAnnotation] | None = Field(
#         alias="_id", default=None
#     )
#     user_id: Annotated[ObjectId, ObjectIdPydanticAnnotation] | str
#     username: str
#     reason: str
