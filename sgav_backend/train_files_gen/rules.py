from ruamel.yaml import YAML
import os


def rulesYaml(ques, res, name):   
    GENERATE_FILE = name
    try:
        global auxutter  # Arreglo donde se guardan preguntas y respuestas

        auxutter = []

        #######################################################

        # PLANTILLA para Archivo RASA
        '''for i in range(len(ques)):
            auxutter.append(
                {"rule": 'option ' + str(i + 1),
                 'steps': [{"intent": ques[i]}, {"action": 'utter_{}'.format(ques[i])}]})'''

        rules = {
            'rules': [{'rule': 'Diga "adiós" cada vez que el usuario se despida',
                       'steps': [{'intent': 'despedir'}, {'action': 'utter_adios'}]},
                      {'rule': "Diga 'Soy un bot' si el usuario duda de con quién conversa",
                       'steps': [{'intent': 'bot'}, {'action': 'utter_soybot'}]},
                      {'rule': "Diga 'no entiendo' si no reconoce una pregunta",
                       'steps': [{'intent': 'fuera_contexto'}, {'action': 'utter_fuera_contexto'}]},
                      {'rule': "Diga 'no entiendo' si una pregunta cae por debajo del umbral de confianza configurado (0.7)",
                       'steps': [{'intent': 'nlu_fallback'}, {'action': 'utter_fuera_contexto'}]}
                      ]}

        # for iUtter in auxutter:
        # rules['rules'].append(iUtter)
        versionRasa = {'version': "3.1"}
        #################################################################

        try:
            ################################################
            # Crear el Archivo
            dirname, filename = os.path.split(os.path.abspath(__file__))
            if os.path.exists(dirname + os.path.sep + GENERATE_FILE) == False:
                os.makedirs(dirname + os.path.sep + GENERATE_FILE)
            yaml_file = open(dirname + os.path.sep + GENERATE_FILE + os.path.sep + "rules.yml",
                             mode="w+", encoding="utf-8")

            #########################################
            # Escribiendo la plantilla en el archivo

            yaml = YAML()
            yaml.dump(versionRasa, yaml_file)
            yaml.dump(rules, yaml_file)

            ############################################
            # Validacion para posibles errores
        except Exception as error:
            print("Error al crear archivo o se creó pero está mal")
            print("Error: ", error)
        return True
    except Exception as error:
        print("Error al crear plantilla, archivo Rasa no creado")
        print("Error: ", error)
        return False
#######################################################################
