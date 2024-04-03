from langchain.prompts import PromptTemplate
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain.chains.summarize import load_summarize_chain
from langchain_community.llms import LlamaCpp
from core.config import settings

from langchain_openai import OpenAI
llm = OpenAI(model_name="gpt-3.5-turbo-instruct")

async def questions_generation(DATA_PATH: str):
    try:
        prompt_template_questions = """Eres un experto en crear preguntas de práctica basadas en material de dominio general. 
        Tu objetivo es escribir preguntas y respuestas a partir de un contexto dado. Lo haces haciendo preguntas sobre el texto a continuación:
        {text}
        Crea preguntas que prepararán a una persona para responderlas. 
        Asegúrate de no perder ninguna información importante.

        PREGUNTAS:"""

        refine_template_questions = """Eres un experto en crear preguntas de práctica basadas en material de estudio. 
        Tu objetivo es ayudar a una persona a prepararse para responder estas preguntas. 
        Hemos recibido algunas preguntas de práctica hasta cierto punto: {existing_answer}. 
        Tenemos la opción de refinar las preguntas existentes o agregar nuevas, (solo si es necesario) con algo más de contexto a continuación.
        {text}
        Dado el nuevo contexto, refina las preguntas originales en español. Si el contexto no es útil, por favor proporciona las preguntas originales.

        PREGUNTAS: """

        PROMPT_QUESTIONS = PromptTemplate(
            template=prompt_template_questions, input_variables=["text"]
        )

        REFINE_PROMPT_QUESTIONS = PromptTemplate(
            input_variables=["existing_answer", "text"],
            template=refine_template_questions,
        )

        loader = PyPDFLoader(DATA_PATH)
        data = loader.load()

        text_question_gen = ""
        for page in data:
            text_question_gen += page.page_content

        text_splitter_question_gen = RecursiveCharacterTextSplitter(
            chunk_size=10000, chunk_overlap=50
        )

        text_chunks_question_gen = text_splitter_question_gen.split_text(
            text_question_gen
        )

        docs_question_gen = [Document(page_content=t) for t in text_chunks_question_gen]
        
        question_gen_chain = load_summarize_chain(
            llm,
            chain_type="refine",
            verbose=True,
            question_prompt=PROMPT_QUESTIONS,
            refine_prompt=REFINE_PROMPT_QUESTIONS,
        )

        questions = question_gen_chain.run(docs_question_gen)

        return questions, docs_question_gen
    except Exception as e:
        print(f"Error en gestions_gen: {e}")
