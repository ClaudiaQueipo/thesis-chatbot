from typing import Annotated

from typing import Annotated, List
from pydantic import BaseModel, Field
from models.pydantic_oid import ObjectId, ObjectIdPydanticAnnotation


class Assistent(BaseModel):
    ID: Annotated[ObjectId, ObjectIdPydanticAnnotation] = Field(
        alias="_id", default=None
    )
    name: str = Field(alias="name", default="")
    description: str = Field(alias="description", default="")
    knowledge: str = Field(alias="knowledge", default="")
    questions: List[str] = Field(alias="questions", default=list())
    answers: List[str] = Field(alias="answers", default=list())
