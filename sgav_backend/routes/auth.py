from bson import ObjectId
from fastapi.responses import JSONResponse
from core.config import settings
from datetime import timedelta
from http.client import HTTPException
from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from models.assistant import UserEmail
from models.user import User
from service.auth import create_access_token, get_password_hash, verify_password
from utils import database

users_collection = database["users"]

auth_router = APIRouter(prefix="/auth", tags=["AUTH"])


@auth_router.post("/register")
async def register(user: User):
    try:
        user_existing = users_collection.find_one({"email": user.email})
        if user_existing:
            return {"error": "El usuario ya existe"}
        hashed_password = get_password_hash(user.password)
        user_dict = user.model_dump(exclude={"ID"}, by_alias=True)
        user_dict["hashed_password"] = hashed_password
        user_dict.pop("password")
        users_collection.insert_one(user_dict)
        return {"message": "Usuario registrado exitosamente"}
    except Exception as e:
        print(f"Error en register: {e}")


@auth_router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_collection.find_one({"email": form_data.username})
    if not user:
        return JSONResponse(
            content="Correo electrónico o contraseña incorrectos",
        )
    if not verify_password(form_data.password, user["hashed_password"]):

        return JSONResponse(
            content="Correo electrónico o contraseña incorrectos",
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@auth_router.get("/users/")
async def get_all_users():
    all_users = list(users_collection.find())
    
    users = []
    for u in all_users:
        u['_id'] = str(u['_id'])
        users.append(u)
    return users

# Prueba para ver si el usuario se insertó
@auth_router.get("/user/{user_id}")
async def get_user_by_id(user_id: str):
    try:
        user_id = ObjectId(user_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail="ID de usuario inválido")

    user = users_collection.find_one({"_id": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    print(f"Nombre: {user['first_name']}, Apellido: {user['last_name']}")

    return {"message": "Información del usuario mostrada por consola"}


@auth_router.get("/user-id/")
async def get_user_id_by_email(user: UserEmail):
    user = users_collection.find_one({"email": user.email})
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    user_id = str(user["_id"])
    return {"user_id": user_id}


@auth_router.post("/admin/")
async def is_admin(user: UserEmail):
    user = users_collection.find_one({"email": user.email})
    if user is None:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"isAdmin": user["role"] == "ADMIN"}
