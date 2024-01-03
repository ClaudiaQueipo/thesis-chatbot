from . import domYaml, nluYaml, storiesYaml, rulesYaml


async def generarArchivos(preguntas, respuestas, nombre):
    if (
        domYaml(preguntas, respuestas, nombre)
        & nluYaml(preguntas, respuestas, nombre)
        & storiesYaml(preguntas, respuestas, nombre)
        & rulesYaml(preguntas, respuestas, nombre)
    ):
        return "Archivos de entrenamiento creados con Exito :)"

    else:
        return "Algo salio mal al generar archivos :( "
