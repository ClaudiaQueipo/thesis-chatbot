# Dockerfile para el Asistente Virtual Rasa
FROM  python:3.9

WORKDIR /app


# ENV ACCEPT_EULA=Y

# RUN apt-get update -y && apt-get update \
#   && apt-get install -y --no-install-recommends curl gcc g++ gnupg unixodbc-dev libgl1-mesa-glx

# RUN pip install --upgrade pip

RUN pip install rasa pymongo --index-url http://nexus.prod.uci.cu/repository/pypi-proxy/simple --trusted-host nexus.prod.uci.cu

COPY . .

EXPOSE 5005
EXPOSE 5055

CMD ["rasa", "run", "--enable-api", "--cors", "*", "--debug"]
