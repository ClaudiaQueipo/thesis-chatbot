# Usar la imagen oficial de Python 3.11.8
FROM python:3.11.8

WORKDIR /app

ENV ACCEPT_EULA=Y
RUN apt-get update -y && apt-get update \
  && apt-get install -y --no-install-recommends \ 
  curl gcc g++ gnupg unixodbc-dev libgl1-mesa-glx \
  make cmake

COPY ./requirements.txt /app/requirements.txt

RUN pip install -r /app/requirements.txt

COPY ./ /app/

EXPOSE 8085
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8085"]
