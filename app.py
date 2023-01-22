from fastapi import FastAPI
from fastapi.responses import FileResponse
from rasa.model_training import train
from fastapi.middleware.cors import CORSMiddleware
from schemas import Msg, RasaAgent
from rasa.core.agent import Agent
import os


app = FastAPI(
    title="Thesis Chat/Voice Bot",
    version="0.1.5"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)


@app.get('/')
async def root():
    
    return FileResponse("web\index.html")


def setAgent():
    folder = f"rasa_bot\\models"
    files = os.listdir(folder)

    file_times = {}
    
    for file in files:
        path = os.path.join(folder, file)
        
        if os.path.isfile(path):
            file_times[file] = os.path.getmtime(path)
        
    sorted_files = sorted(file_times.items(), key=lambda x: x[1] )
    last_model=sorted_files[-1][0]
    
    agent = Agent.load(f"rasa_bot\\models\\{last_model}")
    return agent

rasa = RasaAgent(setAgent())

@app.post("/webhooks/rest/webhook")
async def chat(msg: Msg):
    responses = await rasa.agent.handle_text(msg.message)
    response_text = responses[0]["text"]
    return response_text  

# @message.post("/whisper/audio")
# async def recive_audio(file: UploadFile):
    
#     content = await file.read()

@app.get("/train")
async def train_bot():
    train(domain="rasa_bot\\domain.yml", config="rasa_bot\\config.yml",
            training_files=["rasa_bot\\data\\nlu.yml",
                            "rasa_bot\\data\\rules.yml",
                            "rasa_bot\\data\\stories.yml"],
            output="rasa_bot\\models\\",)
    rasa.__setagent__(setAgent())
    return {"message": "ChatBot entrenado con exito!"}
