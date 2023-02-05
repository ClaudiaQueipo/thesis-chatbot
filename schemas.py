from pydantic import BaseModel
from fastapi import File

class Msg(BaseModel):
    message: str

class RasaAgent:
    def __init__(self, Agent):
        self.agent = Agent
    def __setagent__(self,Agent):
        self.agent=Agent