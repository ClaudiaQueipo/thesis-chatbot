from bson import ObjectId
from fastapi import APIRouter
from models.log import LogModel
from utils import database


log_router = APIRouter(prefix="/logs", tags=["LOGS"])
logs_collection = database["logs"]


@log_router.post("/create")
async def create_log(log: LogModel):
    log.user_id = ObjectId(log.user_id)
    inserted_log = logs_collection.insert_one(
        log.model_dump(by_alias=True, exclude={"ID"})
    )
    return {"id": str(inserted_log.inserted_id)}


# Endpoint para obtener todos los logs
@log_router.get("/fetch-logs")
async def get_logs():
    logs = []
    db_logs = logs_collection.find()
    print(list())
    for log in db_logs:
        logs.append(LogModel(**log))
    return logs
