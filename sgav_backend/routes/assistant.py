from datetime import datetime
import shutil
import subprocess
from fastapi import APIRouter, UploadFile
from fastapi.responses import Response, FileResponse
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
async def generate_train_files(qa: QA):
    await gen_files.generarArchivos(qa.questions, qa.answers, qa.name)
    folder_name = qa.name
    base_dir = "./train_files_gen"
    sub_dir = f"{base_dir}/{folder_name}"
    data_dir = f"{sub_dir}/data"

    if not os.path.exists(data_dir):
        os.makedirs(data_dir)

    for fname in os.listdir(sub_dir):
        if fname != "domain.yml" and os.path.isfile(os.path.join(sub_dir, fname)):
            shutil.move(os.path.join(sub_dir, fname), os.path.join(data_dir, fname))

    zip_file_name = shutil.make_archive(folder_name, "zip", sub_dir)

    # Mover el archivo zip a la carpeta 'bots'
    dest_dir = "./bots"
    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)
    shutil.move(zip_file_name, os.path.join(dest_dir, os.path.basename(zip_file_name)))
    shutil.rmtree(f"./train_files_gen/{folder_name}")
    return FileResponse(
        f"./{dest_dir}/{folder_name}.zip",
        filename=f"{zip_file_name}",
        media_type="application/x-zip-compressed",
    )


@assistant.get("/fetch-assistants")
async def fetch_assistants():
    try:
        assistants = assistants_collection.find()
        return list(map(lambda a: Assistant(**a), assistants))

    except Exception as e:
        print(e)
        return {"error": "Error al obtener asistentes"}
