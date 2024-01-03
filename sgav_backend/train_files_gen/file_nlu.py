import ruamel.yaml
from ruamel.yaml.scalarstring import PreservedScalarString as literal_
import os


literal = literal_  # Forma literal Yaml multilinea  | ó |-


def nluYaml(ques, res, name):  # Recibe preguntas y respuestas
    GENERATE_FILE = name
    try:
        global auxutter  # Arreglo donde se guardan preguntas y respuestas

        auxutter = []

        #######################################################

        # PLANTILLA para Archivo RASA
        for i in range(len(ques)):
            auxutter.append(
                {"intent": ques[i], 'examples': literal('- ' + ques[i])})

        nlu = {
            'nlu':
                [{'intent': 'saludar',
                  'examples': literal_('\n'.join([
                      '- Hola',
                      '- que tal',
                      '- buenos días',
                      '- buenas noches',
                      '- buenas tardes']) + '\n')
                  },

                 {'intent': 'despedir',
                  'examples': literal_('\n'.join(['- adiós',
                                                  '- buenas noches',
                                                  '- hasta luego']) + '\n')},

                 {'intent': 'afirmar',
                  'examples': literal_('\n'.join(['- Sí',
                                                  '- por supuesto',
                                                  '- correcto']) + '\n')},

                 {'intent': 'negar',
                  'examples': literal_('\n'.join(['- no',
                                                  '- nunca',
                                                  '- de ninguna manera',
                                                  '- no realmente'
                                                  ]) + '\n')},

                 {'intent': 'animo',
                  'examples': literal_('\n'.join(['- perfecto',
                                                  '- genial',
                                                  '- increíble',
                                                  '- Me siento muy bien',
                                                  '- Estoy genial',
                                                  '- Estoy increíble',
                                                  '- Estoy bien',
                                                  '- De acuerdo'
                                                  ]) + '\n')},

                 {'intent': 'no_animo',
                  'examples': literal_('\n'.join(['- mi día fue horrible',
                                                  '- Estoy triste',
                                                  '- Estoy decepcionado',
                                                  '- súper triste',
                                                  '- necesito ayuda',
                                                  '- ayuda',
                                                  '- Estoy tan triste',
                                                  '- triste',
                                                  '- muy triste',
                                                  '- infeliz',
                                                  '- no es bueno'
                                                  ]) + '\n')},

                 {'intent': 'bot',
                  'examples': literal_(
                      '\n'.join(['- ¿Eres un bot?',
                                 '- ¿Eres un humano?',
                                 '- ¿Estoy hablando con un bot?',
                                 '- ¿Estoy hablando con un humano?']) + '\n')},

                 {'intent': 'fuera_contexto',
                  'examples': literal_(
                      '\n'.join(['- quiero comida',
                                 '- puedes decirme que tengo basado en mi estado de salud',
                                 '- que es un unicornio',
                                 '- puedes tomar una decisión si te digo una situación',
                                 '- cuanto es calcular 1+1'
                                 ]) + '\n')},

                 ]
        }

        for iUtter in auxutter:
            nlu['nlu'].append(iUtter)
        versionRasa = {'version': "3.1"}

        #################################################################

        try:
            # Crear el Archivo
            dirname, filename = os.path.split(os.path.abspath(__file__))
            if os.path.exists(dirname + os.path.sep + GENERATE_FILE) == False:
                os.makedirs(dirname + os.path.sep + GENERATE_FILE)
            yaml_file = open(dirname + os.path.sep + GENERATE_FILE + os.path.sep + "nlu.yml",
                             mode="w+", encoding="utf-8")

            #########################################
            # Escribiendo la plantilla en el archivo

            yaml = ruamel.yaml.YAML()
            yaml.indent(mapping=2, sequence=3, offset=1)  # Sangria y margen
            yaml.dump(versionRasa, yaml_file)
            yaml.dump(nlu, yaml_file)

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
