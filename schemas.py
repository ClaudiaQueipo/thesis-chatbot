from pydantic import BaseModel
from fastapi import File

class Msg(BaseModel):
    message: str

# class UploadFile(BaseModel):
#     file: File
#     filename: str

class RasaAgent:
    def __init__(self, Agent):
        self.agent = Agent
    def __setagent__(self,Agent):
        self.agent=Agent