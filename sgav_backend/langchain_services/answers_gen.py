from langchain.vectorstores import Chroma
from langchain.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from models import llm


async def answers_generation(docs_question_gen, questions):
    embeddings = HuggingFaceEmbeddings(
        model_name="jaimevera1107/all-MiniLM-L6-v2-similarity-es",
        model_kwargs={"device": "cpu"},
    )

    vector_store = Chroma.from_documents(docs_question_gen, embeddings)

    # llm_answer_gen = LlamaCpp(model_path=MODEL_PATH,temperature=0.75,top_p=1,verbose=True,n_ctx=4096)

    answer_gen_chain = RetrievalQA.from_chain_type(
        llm=llm, chain_type="stuff", retriever=vector_store.as_retriever(k=2)
    )

    question_list = questions.questions

    answers = []

    for idx, question in enumerate(question_list):
        answer = answer_gen_chain.run(question)
        answers.append(f"{idx+1} - {answer}")

    return answers
