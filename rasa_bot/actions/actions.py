from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
import sqlite3
import json

class ExtractAction(Action):
    def name(self) -> Text:
        return "action_test"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        # responses:
        # {
        #     'first': {
        #         message: 'Ok, field First updated',
        #         action: {
        #             model: 'first',
        #             type: 'text',
        #             message: 'Execute actions'
        #         }
        #     },
        #     'second': {
        #         message: 'Ok, field second updated',
        #         action: {
        #             model: 'second',
        #             type: 'checkbox',
        #             message: 'negation_value'
        #         }
        #     },
        #     'search': {
        #         message: 'Ok, search action',
        #         action: {
        #             model: 'search',
        #             type: 'button',
        #             message: 'Execution search button'
        #         }
        #     },
        #     'four': {
        #         message: 'Ok, open select  action',
        #         action: {
        #             model: 'five',
        #             type: 'select_component',
        #             message: 'Open select five'
        #         }
        #     },
        #
        # },

        x = {
            "name": "John",
            "age": 30,
            "married": True,
            "divorced": False,
            "children": ("Ann", "Billy"),
            "pets": None,
            "cars": [
                {"model": "BMW 230", "mpg": 27.5},
                {"model": "Ford Edge", "mpg": 24.1}
            ]
        }
        
        message = json.dumps(x)
        oldMessage = "Esto es una prueba de una RASA Action!"
        dispatcher.utter_message(text=message)
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



