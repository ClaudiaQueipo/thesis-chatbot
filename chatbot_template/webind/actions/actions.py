from typing import Dict, Any, Text, List, Union
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

from .mongo_actions import get_consultas_from_paciente, insert_consulta, insert_patient


class ActionSubmitFormPaciente(Action):
    def name(self) -> Text:
        return "action_submit_form_paciente"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        nombre = tracker.get_slot("nombre")
        apellidos = tracker.get_slot("apellidos")
        historia_clinica = tracker.get_slot("historia_clinica")
        sexo = tracker.get_slot("sexo")
        fecha_nacimiento = tracker.get_slot("fecha_nacimiento")
        tarjeta_menor = tracker.get_slot("tarjeta_menor")
        provincia = tracker.get_slot("provincia")
        municipio = tracker.get_slot("municipio")
        direccion = tracker.get_slot("direccion")
        raza = tracker.get_slot("raza")
        area_salud = tracker.get_slot("area_salud")
        hospital = tracker.get_slot("hospital")

        message = f"Formulario completado:\nNombre: {nombre}\nApellidos: {apellidos}\nHistoria Clínica: {historia_clinica}\nSexo: {sexo}\nFecha de Nacimiento: {fecha_nacimiento}\nTarjeta de Menor: {tarjeta_menor}\nProvincia: {provincia}\nMunicipio: {municipio}\nDirección: {direccion}\nRaza: {raza}\nÁrea de Salud: {area_salud}\nHospital: {hospital}"
        dispatcher.utter_message(
            text=message.replace("\n", "<br>")
        )

        patient = dict(
            nombre=nombre,
            apellidos=apellidos,
            historia_clinica=historia_clinica,
            sexo=sexo,
            fecha_nacimiento=fecha_nacimiento,
            tarjeta_menor=tarjeta_menor,
            provincia=provincia,
            municipio=municipio,
            direccion=direccion,
            raza=raza,
            area_salud=area_salud,
            hospital=hospital,
        )

        insert_patient(patient)

        return []


class ActionSubmitFormConsulta(Action):
    def name(self) -> Text:
        return "action_submit_form_consulta"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        
        paciente = tracker.get_slot("paciente")
        motivo = tracker.get_slot("motivo")
        examenes_pendientes = tracker.get_slot("examenes_pendientes")
        resultado_examenes = tracker.get_slot("resultado_examenes")
        examen_fisico = tracker.get_slot("examen_fisico")
        fecha = tracker.get_slot("fecha")
        impresion_diagnostica = tracker.get_slot("impresion_diagnostica")
        diagnostico_def = tracker.get_slot("diagnostico_def")
        tratamiento = tracker.get_slot("tratamiento")
        evolucion = tracker.get_slot("evolucion")
        fecha_proxima_consulta = tracker.get_slot("fecha_proxima_consulta")
        positivo = tracker.get_slot("positivo")
        mnt = tracker.get_slot("mnt")
        medico = tracker.get_slot("medico")

        dispatcher.utter_message(
            text=f"Formulario completado, su consulta ha sido agendada"
        )

        consulta = dict(
            paciente=paciente,
            motivo=motivo,
            examenes_pendientes=examenes_pendientes,
            resultado_examenes=resultado_examenes,
            examen_fisico=examen_fisico,
            fecha=fecha,
            impresion_diagnostica=impresion_diagnostica,
            diagnostico_def=diagnostico_def,
            tratamiento=tratamiento,
            evolucion=evolucion,
            fecha_proxima_consulta=fecha_proxima_consulta,
            positivo=positivo,
            mnt=mnt,
            medico=medico,
        )

        insert_consulta(consulta)

        return []


class ActionGetConsultasFromPaciente(Action):
    def name(self) -> Text:
        return "action_consultas_paciente"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        
        nombre_paciente = tracker.get_slot("nombre_paciente")
        print(nombre_paciente)
        consultas = get_consultas_from_paciente(nombre_paciente)

        dispatcher.utter_message(
            text=consultas
        )

        return []


