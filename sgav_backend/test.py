import re
def format_title(data: str): 

    tilde_mapping = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'ñ': 'n'
    }

    def remove_tildes_and_enye(text):
        for tilde_letter, non_tilde_letter in tilde_mapping.items():
            text = text.replace(tilde_letter, non_tilde_letter)
        return text

    normalized_text = re.sub(r'[^\w\s]', '', data.lower())

    normalized_text = remove_tildes_and_enye(normalized_text)

    result = re.sub(r'\s+', '_', normalized_text)

    return result
data = "¿Por qué la materia oscura es crucial para entender el comportamiento del universo?"
print(format_title(data))
