from fastapi import APIRouter, UploadFile
from fastapi.responses import Response
from langchain_services.answers_gen import answers_generation
from models import Assistant, Questions
from utils import database
from langchain_services import questions_generation
import tempfile
import os

assistant = APIRouter(prefix="/assistants")
assistants_collection = database["assistants"]


@assistant.post("/gen-questions")
async def q_gen(
    # assistant: Assistant,
    file: UploadFile,
):
    try:
        with tempfile.NamedTemporaryFile(delete=False) as temp:
            temp.write(await file.read())
            temp_path = temp.name

        assistant.knowledge = file.filename

        questions, docs = await questions_generation(temp_path)
        assistant.docs = docs
        return questions

    finally:
        os.unlink(temp_path)


@assistant.post("/gen-answers")
async def a_gen(questions: Questions):
    try:
        answers = await answers_generation(
            docs_question_gen=assistant.docs, questions=questions
        )
        return answers
    except Exception as e:
        print(e)


@assistant.post("/create")
async def create_assistant(assistant: Assistant):
    try:
        assistants_collection.insert_one(
            assistant.model_dump(
                by_alias=True,
                exclude={"ID"},
            )
        )
        return Response(status_code=200)
    except Exception as e:
        print(e)
