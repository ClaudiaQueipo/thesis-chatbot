from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from routes import assistant, auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(assistant)
app.include_router(auth_router)

app.mount("/bots", StaticFiles(directory="bots"), name="bots")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Server Working!"}
