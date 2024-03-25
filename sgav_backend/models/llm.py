# from langchain.llms import LlamaCpp
from langchain_openai import OpenAI
from langchain_community.llms import LlamaCpp
from core.config import settings


# llm = LlamaCpp(
#     model_path='./zephyr-7b-beta.Q4_K_M.gguf',
#     model_path=settings.MODEL_PATH,
#     temperature=0.75,
#     top_p=1,
#     verbose=True,
#     n_ctx=4096,
# )


llm = OpenAI(model_name="gpt-3.5-turbo-instruct")
