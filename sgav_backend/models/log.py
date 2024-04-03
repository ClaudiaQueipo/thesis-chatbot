from pydantic import BaseModel


class LogModel(BaseModel):
    user_id: str
    reason: str
