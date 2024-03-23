import os
from typing import Optional
from dotenv import load_dotenv


class Settings:

    LLM_PATH: Optional[str] = None
    SECRET_KEY: Optional[str] = None
    ALGORITHM: Optional[str] = None
    ACCESS_TOKEN_EXPIRE_MINUTES: Optional[int] = None

    def __init__(self) -> None:

        load_dotenv()
        self.LLM_PATH = os.environ.get("MODEL_PATH")
        self.SECRET_KEY = os.environ.get("SECRET_KEY")
        self.ALGORITHM = os.environ.get("ALGORITHM")
        self.ACCESS_TOKEN_EXPIRE_MINUTES = int(
            os.environ.get("ACCESS_TOKEN_EXPIRE_MINUTES")
        )


settings = Settings()
