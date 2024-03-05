from . import domYaml, nluYaml, storiesYaml, rulesYaml


async def generarArchivos(preguntas, respuestas, nombre) -> str | None:
    try:

        if (
            domYaml(preguntas, respuestas, nombre)
            & nluYaml(preguntas, respuestas, nombre)
            & storiesYaml(preguntas, respuestas, nombre)
            & rulesYaml(preguntas, respuestas, nombre)
        ):
            return 'Everything went just fine'

    except Exception as e:
        print(f"Something went wrong generating the files. Error: {e}") 
        return 