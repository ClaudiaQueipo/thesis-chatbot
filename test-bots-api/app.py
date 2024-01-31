from fastapi import FastAPI
import subprocess
import os
import socket

app = FastAPI()

# Almacena los puertos que están actualmente en uso
used_ports = {}

def find_free_port():
   """Busca un puerto libre y devuelve su número."""
   with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
       s.bind(('', 0))
       return s.getsockname()[1]

@app.post("/test/{bot_name}")
async def start_bot(bot_name: str):
   # Comprueba si el bot existe
   if bot_name in used_ports:
       return {"error": f"Ya existe un bot llamado {bot_name}"}

   # Define la ruta del directorio del bot
   bot_dir = os.path.join("bots", bot_name)

   # Busca un puerto libre
   port = find_free_port()
   used_ports[bot_name] = port

   # Ejecuta el comando para iniciar el servidor de Rasa
   command = f"rasa run --enable-api --cors \"*\" --debug --port {port}".split()
   subprocess.Popen(command, cwd=bot_dir)

   return {"message": f"El bot {bot_name} se está iniciando en el puerto {port}..."}
