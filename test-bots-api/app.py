from time import sleep
from flask import Flask, request, jsonify
import subprocess
import os
import socket
import zipfile
import requests

app = Flask(__name__)

# Almacena los puertos que están actualmente en uso
used_ports = {}

def download_and_unzip_bot(bot_name: str):
    """Descarga el archivo zip del bot y lo descomprime en la carpeta bots."""
    try:
        # Asegura que la carpeta bots exista
        bot_dir = os.path.join("bots", bot_name)
        os.makedirs(bot_dir, exist_ok=True) # Mueve esta línea aquí
        zip_path = os.path.join(bot_dir, f"{bot_name}.zip")

        # Verifica si el archivo zip del bot ya existe
        if os.path.exists(zip_path):
            return

        # Descarga el archivo zip
        url = f"http://localhost:8080/bots/{bot_name}.zip"

        response = requests.get(url)
        with open(zip_path, "wb") as f:
            f.write(response.content)

        # Descomprime el archivo zip
        with zipfile.ZipFile(zip_path, "r") as zip_ref:
            zip_ref.extractall(bot_dir)

        # Elimina el archivo zip después de descomprimir
        os.remove(zip_path)
    except Exception as e:
        print(f"Error en download_and_unzip_bot: {e}")


def find_free_port():
    """Busca un puerto libre y devuelve su número."""
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(("", 0))
        return s.getsockname()[1]

@app.route("/test/<bot_name>", methods=["GET"])
def start_bot(bot_name: str):
    try:
        if bot_name in used_ports:
            return jsonify({"error": f"Ya existe un bot llamado {bot_name}"}), 400

        download_and_unzip_bot(bot_name)

        bot_dir = os.path.join("bots", bot_name, "rasa_bot")

        port = find_free_port()
        used_ports[bot_name] = port

        ## Training the model 
        command = f'rasa train'.split()
        print(os.listdir(bot_dir))
        process = subprocess.Popen(command, cwd=bot_dir)
        

        ## Running the model 
        command = f'rasa run --enable-api --cors "*" --port {port}'.split()
        process = subprocess.Popen(command, cwd=bot_dir)

        while True:
            sleep(5)
            # Aquí es donde enviamos la petición cada 5 segundos
            try:
                response = requests.post(f'http://localhost:{port}/webhooks/rest/webhook', json={"sender": "test", "message": "hola"})
                if response.status_code == 200:
                    # Si la respuesta es exitosa, retornamos el mensaje de que el bot está corriendo
                    return jsonify({"port": port}), 200
            except requests.exceptions.RequestException as e:
                pass
        

    except Exception as e:
        print(f"Error en start_bot: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/stop_bot/<int:port>", methods=["GET"])
def stop_bot(port: int):
    # Comando para encontrar el PID del proceso que está usando el puerto especificado
    command = f"lsof -i :{port} | awk 'NR!=1 {{print $2}}'"
    process = subprocess.Popen(
        command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )
    output, error = process.communicate()

    if error:
        return jsonify({"error": f"Error al buscar el proceso: {error.decode()}"}), 500

    pid = output.decode().strip()

    if not pid:
        return jsonify({"error": "No se encontró ningún proceso usando el puerto especificado."}), 404

    # Comando para terminar el proceso de manera ordenada
    kill_command = f"kill -SIGINT {pid}"
    subprocess.run(kill_command, shell=True)

    return jsonify({"message": f"El proceso en el puerto {port} ha sido terminado."}), 200

if __name__ == "__main__":
    app.run(debug=True)
