from fastapi import FastApi

app = FastApi()

@app.get("/")
async def root():
    return "Hello world!"
