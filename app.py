from fastapi import FastAPI
from rasa.core.agent import Agent
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


class Msg(BaseModel):
    message: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

agent = Agent.load("models\\20230107-111015-yellow-deposition.tar")

@app.post("/webhooks/rest/webhook")
async def chat(msg: Msg):
    responses = await agent.handle_text(msg.message)
    response_text = responses[0]["text"]
    return response_text       
