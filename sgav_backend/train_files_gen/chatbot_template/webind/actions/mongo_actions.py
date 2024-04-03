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
        consultas = collection_consulta.find({"paciente": paciente})
        consultas_list = list(consultas)
        # print(consultas_list) # Comentado para evitar imprimir en la consola

        listado_consultas = []
        index = 1
        for consulta in consultas_list:
            # Construir el string siguiendo el formato especificado
            consulta_str = f"{index}. {consulta.get('fecha', '')} - {consulta.get('motivo', '')}\n"
            consulta_str += f"\t\t- {consulta.get('paciente', '')}\n"
            consulta_str += f"\t\t- {consulta.get('examenes_pendientes', '')}\n"
            consulta_str += f"\t\t- {consulta.get('resultado_examenes', '')}\n"
            consulta_str += f"\t\t- {consulta.get('examen_fisico', '')}\n"
            consulta_str += f"\t\t- {consulta.get('impresion_diagnostica', '')}\n"
            consulta_str += f"\t\t- {consulta.get('diagnostico_def', '')}\n"
            consulta_str += f"\t\t- {consulta.get('tratamiento', '')}\n"
            consulta_str += f"\t\t- {consulta.get('evolucion', '')}\n"
            consulta_str += f"\t\t- {consulta.get('fecha_proxima_consulta', '')}\n"
            consulta_str += f"\t\t- {consulta.get('positivo', '')}\n"
            consulta_str += f"\t\t- {consulta.get('medico', '')}\n"
            consulta_str += "\n"
            
            # Agregar el string a la lista
            listado_consultas.append(consulta_str)
            index = index + 1 
        consultas_str = ''.join(listado_consultas)
        return consultas_str
    except Exception as e:
        print(f"Error en get_consultas_from_paciente: {e}")
        return []
