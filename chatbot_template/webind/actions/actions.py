from typing import Dict, Any, Text, List, Union
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher

from .mongo_actions import insert_consulta, insert_patient


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

        dispatcher.utter_message(
            text=f"Formulario completado:\nNombre: {nombre}\nApellidos: {apellidos}\nHistoria Clínica: {historia_clinica}\nSexo: {sexo}\nFecha de Nacimiento: {fecha_nacimiento}\nTarjeta de Menor: {tarjeta_menor}\nProvincia: {provincia}\nMunicipio: {municipio}\nDirección: {direccion}\nRaza: {raza}\nÁrea de Salud: {area_salud}\nHospital: {hospital}"
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
        motivo = tracker.get_slot("motivo")
        examenes_pendientes = tracker.get_slot("examenes_pendientes")
        resultado_examenes = tracker.get_slot("resultado_examenes")
        examen_fisico = tracker.get_slot("examen_fisico")

        dispatcher.utter_message(
            text=f"Formulario completado:\nmotivo: {motivo}\nexamenes_pendientes: {examenes_pendientes}\nHistoria Clínica: {resultado_examenes}\nexamen_fisico: {examen_fisico}"
        )

        consulta = dict(
            motivo=motivo,
            examenes_pendientes=examenes_pendientes,
            resultado_examenes=resultado_examenes,
            examen_fisico=examen_fisico,
        )

        insert_consulta(consulta)

        return []
