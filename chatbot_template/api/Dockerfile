FROM  python:3.11.8

WORKDIR /app

ENV ACCEPT_EULA=Y
RUN apt-get update -y && apt-get update \
  && apt-get install -y --no-install-recommends curl gcc g++ gnupg unixodbc-dev libgl1-mesa-glx

RUN pip install --upgrade pip
RUN pip install fastapi uvicorn whisper

COPY . .

EXPOSE 8080