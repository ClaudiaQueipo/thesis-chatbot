from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain_community.llms import LlamaCpp
from core.config import settings


from langchain_openai import OpenAI
llm = OpenAI(model_name="gpt-3.5-turbo-instruct")


async def answers_generation(docs_question_gen, questions):
    embeddings = HuggingFaceEmbeddings(
        model_name="jaimevera1107/all-MiniLM-L6-v2-similarity-es",
        model_kwargs={"device": "cpu"},
    )

    vector_store = Chroma.from_documents(docs_question_gen, embeddings)

    answer_gen_chain = RetrievalQA.from_chain_type(
        # llm=LlamaCpp(
        #     model_path=settings.LLM_PATH,
        #     temperature=0.75,
        #     top_p=1,
        #     verbose=True,
        #     n_ctx=4096,
        # ),
        llm=llm,
        chain_type="stuff",
        retriever=vector_store.as_retriever(k=2),
    )

    question_list = questions.questions

    answers = []

    for idx, question in enumerate(question_list):
        answer = answer_gen_chain.run(question)
        answers.append(f"{idx+1} - {answer}")

    return answers
