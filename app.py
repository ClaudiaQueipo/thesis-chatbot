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

WHISPER_MODEL_NAME = 'medium.pt'
print(' PATH TO WHISPER  = ' + 'WHISPER' + os.path.sep + WHISPER_MODEL_NAME)
model = whisper.load_model('WHISPER' + os.path.sep + WHISPER_MODEL_NAME)


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

