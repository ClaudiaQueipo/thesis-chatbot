from langchain.llms import LlamaCpp

llm = LlamaCpp(
    model_path="./llama-2-7b-chat.Q3_K_L_2.gguf",
    # model_path="./zephyr-7b-beta.Q4_K_M.gguf",
    temperature=0.75,
    top_p=1,
    verbose=True,
    n_ctx=4096,
)
