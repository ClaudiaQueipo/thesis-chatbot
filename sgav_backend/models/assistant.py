<<<<<<< HEAD:sgav_backend/models/Assistent.py
from typing import Annotated

=======
>>>>>>> 853c0c784a651355bec76fe4bb15bcbc3aab2fa8:sgav_backend/models/assistant.py
from typing import Annotated, List
from pydantic import BaseModel, Field
from models.pydantic_oid import ObjectId, ObjectIdPydanticAnnotation


class Assistant(BaseModel):
    ID: Annotated[ObjectId, ObjectIdPydanticAnnotation] = Field(
        alias="_id", default=None
    )
    name: str = Field(alias="name", default="")
    description: str = Field(alias="description", default="")
    knowledge: str = Field(alias="knowledge", default="")
    questions: List[str] = Field(alias="questions", default=list())
    answers: List[str] = Field(alias="answers", default=list())


class Questions(BaseModel):
    questions: List[str] = Field(alias="questions", default=list())


class Answers(BaseModel):
    answers: List[str] = Field(alias="answers", default=list())


class QA(BaseModel):
    name: str = Field(alias="name", default="")
    questions: List[str] = Field(alias="questions", default=list())
    answers: List[str] = Field(alias="answers", default=list())
