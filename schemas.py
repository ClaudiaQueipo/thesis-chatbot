from pydantic import BaseModel
from fastapi import File

class Msg(BaseModel):
    message: str

# class UploadFile(BaseModel):
#     file: File
#     filename: str
