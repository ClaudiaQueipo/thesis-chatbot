from fastapi import FastAPI
from fastapi.responses import FileResponse
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

agent = Agent.load("rasa_bot\\models\\20230114-225027-resonnt-yaw.tar.gz")

@app.get('/')
async def root():
    return FileResponse("web\index.html")

@app.post("/webhooks/rest/webhook")
async def chat(msg: Msg):
    responses = await agent.handle_text(msg.message)
    response_text = responses[0]["text"]
    return response_text       
