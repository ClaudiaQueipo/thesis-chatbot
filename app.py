import time

from fastapi import FastAPI, File, UploadFile, status
from fastapi.responses import Response
from fastapi.middleware.cors import CORSMiddleware
from models.schemas import Msg, RasaAgent
from utils import database
from rasa.core.agent import Agent
from rasa.model_training import train
from rasa_sdk.endpoint import DEFAULT_SERVER_PORT

import os
import whisper

model = whisper.load_model("WHISPER\\tiny.pt")
DEFAULT_SERVER_PORT=5005

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
    response = Response(status_code=status.HTTP_200_OK)
    response.headers["location"]="http://localhost:3000"
    return response

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
    
    agent = Agent.load(model_path="rasa_bot\\models\\{last_model}", action_endpoint="rasa_bot\endpoints.yml")
    return agent

try:
    folder = f"rasa_bot\\models"
    if(os.listdir(folder)==[]):
        train(domain="rasa_bot\\domain.yml", config="rasa_bot\\config.yml",
            training_files=["rasa_bot\\data\\nlu.yml",
                            "rasa_bot\\data\\rules.yml",
                            "rasa_bot\\data\\stories.yml"],
            output="rasa_bot\\models\\")
    rasa = RasaAgent(setAgent())
    
except Exception as e:
    print(f"Error {e}")
    
@app.post("/webhooks/rest/webhook")
async def chat(msg: Msg):

    responses = await rasa.agent.handle_text(msg.message)
    response_text = responses[0]["text"]
    if "Lo siento, no puedo entender o manejar lo que acabas de decir." in response_text:
        database.insert_question(msg.message)
    return response_text  


@app.post("/whisper/audio")
async def recive_audio(file: UploadFile=File(...)):
    audio_bytes = file.file.read()

    with open("audio.mp3" , "wb") as f:
        f.write(audio_bytes)
    start = time.time()

    audio = whisper.load_audio("audio.mp3")
    audio = whisper.pad_or_trim(audio)

    mel = whisper.log_mel_spectrogram(audio).to(model.device)

    options = whisper.DecodingOptions(fp16=False,language="es")
    result  = whisper.decode(model,mel,options)

    os.remove("audio.mp3")
    print(f"Tiempo {time.time()-start}")
    responses = await rasa.agent.handle_text(result.text)
    response_text = responses[0]["text"]
    
    return  response_text
    
@app.get("/train")
async def train_bot():
    train(domain="rasa_bot\\domain.yml", config="rasa_bot\\config.yml",
            training_files=["rasa_bot\\data\\nlu.yml",
                            "rasa_bot\\data\\rules.yml",
                            "rasa_bot\\data\\stories.yml"],
            output="rasa_bot\\models\\",)
    rasa.__setagent__(setAgent())
    return {"message": "ChatBot entrenado con exito!"}


@app.get('/generate/report')
def generate_report():
    
    reports = database.generate_report()
    return reports