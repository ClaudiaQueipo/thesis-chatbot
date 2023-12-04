from fastapi import APIRouter, UploadFile
from models import Assistant
from utils import database
from langchain_services import questions_generation
import tempfile
import os

assistant = APIRouter(prefix="/assistants")
collection = database["assistants"]


@assistant.post("/")
async def q_gen(
    # assistant: Assistant,
    file: UploadFile,
):
    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        assistant.knowledge = file.filename

        questions = await questions_generation(temp_path)
        return questions

    finally:
        os.unlink(temp_path)
