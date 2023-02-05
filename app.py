import time

from fastapi import FastAPI, File, UploadFile
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from schemas import Msg, RasaAgent
from rasa.core.agent import Agent
from rasa.model_training import train
import os
import whisper
model = whisper.load_model("WHISPER\\tiny.pt")


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

    _, probs = model.detect_language(mel)
    print(f"Idioma: {max(probs, key=probs.get)}")

    options = whisper.DecodingOptions(fp16=False)
    result  = whisper.decode(model,mel,options)

    # result = model.transcribe(audio="audio.mp3",fp16=False)

    os.remove("audio.mp3")
    print(f"Tiempo {time.time()-start}")
    return {"transcription": result.text}
    
@app.get("/train")
async def train_bot():
    train(domain="rasa_bot\\domain.yml", config="rasa_bot\\config.yml",
            training_files=["rasa_bot\\data\\nlu.yml",
                            "rasa_bot\\data\\rules.yml",
                            "rasa_bot\\data\\stories.yml"],
            output="rasa_bot\\models\\",)
    rasa.__setagent__(setAgent())
    return {"message": "ChatBot entrenado con exito!"}
