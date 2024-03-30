from typing import Dict, Any, Text, List, Union
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from rasa.core.actions.forms import FormAction
from rasa.shared.core.events import SlotSet


class ActionSubmitForm(Action):
    def name(self) -> Text:
        return "action_submit_form"

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
        return [
            SlotSet("nombre", nombre),
            SlotSet("apellidos", apellidos),
            SlotSet("sexo", sexo),
            SlotSet("fecha_nacimiento", fecha_nacimiento),
            SlotSet("tarjeta_menor", tarjeta_menor),
            SlotSet("provincia", provincia),
            SlotSet("municipio", municipio),
            SlotSet("direccion", direccion),
            SlotSet("raza", raza),
            SlotSet("area_salud", area_salud),
            SlotSet("hospital", hospital),
        ]
