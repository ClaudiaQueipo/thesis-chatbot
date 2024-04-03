from datetime import datetime
import shutil
import uuid
from core.config import settings
from fastapi import APIRouter, UploadFile
from fastapi.responses import JSONResponse, Response, FileResponse
from langchain_services.answers_gen import answers_generation
from models import Assistant, Questions, QA
from train_files_gen import gen_files
from utils import database
from langchain_services import questions_generation
import tempfile
import os

assistant = APIRouter(prefix="/assistants")
assistants_collection = database["assistants"]
users_collection = database["users"]


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
    except Exception as e:
        print(f"Error en q_gen: {e}")
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
        user = users_collection.find_one({"email": assistant.user_id})
        assistant.user_id = user["_id"]
        new_assistant = assistant.model_dump(
            by_alias=True,
            exclude={"ID"},
        )

        new_assistant["created_at"] = datetime.now()

        assistants_collection.insert_one(new_assistant)
        return Response(status_code=200)
    except Exception as e:
        print(e)


@assistant.post("/gen-files")
def generate_train_files(qa: QA):
    
    folder_name = f"{qa.name}-{uuid.uuid4()}"

    bot_folder_path = f"./train_files_gen/{folder_name}"

    shutil.copytree("./train_files_gen/chatbot_template", bot_folder_path)

    data_dir = f"./{folder_name}/rasa_bot/data"

    gen_files.generarArchivos(qa.questions, qa.answers, data_dir)

    zip_file_name = shutil.make_archive(folder_name, "zip", bot_folder_path)
    dest_dir = "./bots"

    zip_file_path = os.path.join(dest_dir, f'./{folder_name}.zip')
    shutil.move(zip_file_name, zip_file_path)

    shutil.rmtree(bot_folder_path)

    return JSONResponse(
        content={"download_link": f"{settings.API_URL}/bots/{folder_name}.zip"}
    )
    # return FileResponse(
    #     f"{dest_dir}/{qa.name}.zip",
    #     filename=f"{qa.name}.zip",
    #     media_type="application/x-zip-compressed",
    # )


@assistant.get("/fetch-assistants")
async def fetch_assistants():
    try:
        assistants = assistants_collection.find()
        return list(map(lambda a: Assistant(**a), assistants))

    except Exception as e:
        print(e)
        return {"error": "Error al obtener asistentes"}
