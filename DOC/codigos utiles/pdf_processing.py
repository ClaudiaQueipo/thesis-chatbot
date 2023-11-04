
# Algoritmo para leer los textos de un pdf y asi extraer 
#la info de los archivos de conocimiento que se le suministren
# al sistema de generacion de asistentes virtuales
from PyPDF2 import PdfReader

reader = PdfReader("RLHF.pdf")
page = reader.pages[0]
print(page.extract_text())



