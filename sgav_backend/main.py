<<<<<<< HEAD
import uvicorn

if __name__ == "__main__":
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
=======
from fastapi import FastApi

app = FastApi()

@app.get("/")
async def root():
    return "Hello world!"
>>>>>>> 0332606 (merge files)
