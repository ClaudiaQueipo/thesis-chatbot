from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import sqlite3

class ExtractAction(Action):
    def name(self) -> Text:
        return "action_test"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        

        dispatcher.utter_message(text="Esto es una prueba de una RASA Action!")
        return []

# class ExtractAction(Action):
#     def name(self) -> Text:
#         return "action_test"

#     def run(self, dispatcher: CollectingDispatcher,
#             tracker: Tracker,
#             domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
#         texto = tracker.latest_message.get("text")
#         conn = sqlite3.connect("prueba.db")

#         cursor = conn.cursor()

#         cursor.execute("INSERT INTO no_answer(question) VALUES(?)", (texto,))
#         conn.commit()

#         conn.close()

#         dispatcher.utter_message(text="Escribiste {}. Verdad? ".format(texto))
#         return []

class ActionSayName(Action):
    
    def name(self) -> Text:
        return "action_say_name"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        name = tracker.get_slot("name")
        if not name:
            dispatcher.utter_message(text="No se tu nombre.")
        else:
            dispatcher.utter_message(text=f"Tu nombre es {name}!")
        return []



