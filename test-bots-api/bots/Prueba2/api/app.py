import time

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware

import os
import whisper

def findModel():
    folder_path = 'WHISPER'

    list_of_files = os.listdir(folder_path)

    pt_files = []

    for i in list_of_files:
        if i.endswith('.pt'):
            pt_files.append(i)

    pt_file = pt_files[0]
    
    return pt_file

model_name = findModel()
print(' PATH TO WHISPER  = ' + 'WHISPER' + os.path.sep + model_name)
model = whisper.load_model('WHISPER' + os.path.sep + model_name)


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
    print(result.text)
    return  result.text



