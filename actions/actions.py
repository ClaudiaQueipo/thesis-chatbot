from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import sqlite3

# class ActionSaludar(Action):
#     def name(self) -> str:
#         return "saludar"
#
#     def run(self, dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict[str, Any]) -> List[Dict[str, Any]]:
#         dispatcher.utter_message(text="Hola, ¿cómo estás?")
#         return []


class ExtractAction(Action):
    def name(self) -> Text:
        return "action_test"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        texto = tracker.latest_message.get("text")
        conn = sqlite3.connect("prueba.db")

        cursor = conn.cursor()

        cursor.execute("INSERT INTO no_answer(question) VALUES(?)", (texto,))
        conn.commit()

        conn.close()

        dispatcher.utter_message(text="Escribiste {}. Verdad? ".format(texto))
        return []




