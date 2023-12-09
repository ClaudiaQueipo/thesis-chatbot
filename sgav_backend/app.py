from fastapi import FastAPI
from routes import assistant
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(assistant)
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
