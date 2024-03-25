# Dockerfile para el Asistente Virtual Rasa
FROM python:3.11

WORKDIR /app

RUN pip install rasa

COPY . .

EXPOSE 5005

CMD ["rasa", "run", "--enable-api", "--cors", "*", "--debug"]
