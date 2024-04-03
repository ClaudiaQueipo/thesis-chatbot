from pymongo import MongoClient


client = MongoClient(host="mongodb://root:root@localhost", port=27017)

db = client["webind"]
collection_patients = db["patients"]
collection_consulta = db["consultas"]


def insert_patient(patient: dict):
    try:
        collection_patients.insert_one(patient)
        return "Successfully insert"
    except Exception as error:
        print(f"Error {error}")


def insert_consulta(consulta: dict):
    try:
        collection_consulta.insert_one(consulta)
        return "Successfully insert"
    except Exception as error:
        print(f"Error {error}")

def get_consultas_from_paciente(paciente: str): 
    try: 
        consultas = collection_consulta.find({"paciente", paciente})
        print(consultas)
        return ""
    except Exception as e:
        print(f"Error en get_consultas_from_paciente: {e}")

