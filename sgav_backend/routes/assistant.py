from datetime import datetime
import shutil
import uuid
from bson import ObjectId
from core.config import settings
from fastapi import APIRouter, HTTPException, UploadFile
from fastapi.responses import JSONResponse, Response
from langchain_services.answers_gen import answers_generation
from models import Assistant, Questions, QA
from models.assistant import UserEmail
from train_files_gen import gen_files
from utils import database
from langchain_services import questions_generation
import tempfile
import os

assistant = APIRouter(prefix="/assistants", tags=["ASSISTANTS"])
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
        print(f"Error en create_assistant: {e}")


@assistant.put("/edit/{assistant_id}")
async def edit_assistant(assistant_id: str, updated_assistant: Assistant):
    try:
        updated_assistant_data = updated_assistant.model_dump(
            by_alias=True,
            exclude={"ID"},
        )

        updated_assistant_data["updated_at"] = datetime.now()

        result = assistants_collection.update_one(
            {"_id": ObjectId(assistant_id)}, {"$set": updated_assistant_data}
        )

        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Assistant not found")

        return Response(status_code=200)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")


@assistant.delete("/delete/{assistant_id}")
async def delete_assistant(assistant_id: str):
    try:
        result = assistants_collection.delete_one({"_id": ObjectId(assistant_id)})

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Assistant not found")

        return Response(status_code=200)
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail="Internal server error")


@assistant.post("/gen-files")
def generate_train_files(qa: QA):

    folder_name = f"{qa.name}-{uuid.uuid4()}"

    bot_folder_path = f"./train_files_gen/{folder_name}"

    shutil.copytree("./train_files_gen/chatbot_template", bot_folder_path)

    data_dir = f"./{folder_name}/rasa_bot/data"

    gen_files.generarArchivos(qa.questions, qa.answers, data_dir)

    zip_file_name = shutil.make_archive(folder_name, "zip", bot_folder_path)
    dest_dir = "./bots"

    zip_file_path = os.path.join(dest_dir, f"./{folder_name}.zip")
    shutil.move(zip_file_name, zip_file_path)

    shutil.rmtree(bot_folder_path)

    return JSONResponse(
        content={"download_link": f"{settings.API_URL}/bots/{folder_name}.zip"}
    )


@assistant.post("/fetch-assistants")
async def fetch_assistants(user_email: UserEmail):
    try:
        user = users_collection.find_one({"email": user_email.email})
        user_id = user["_id"]

        assistants = assistants_collection.find({"user_id": user_id})

        return list(map(lambda a: Assistant(**a), assistants))

    except Exception as e:
        print(e)
        return {"error": "Error al obtener asistentes"}
