# Usar la imagen oficial de Python 3.11.8
FROM python:3.11.8

WORKDIR /code

ENV ACCEPT_EULA=Y
RUN apt-get update -y && apt-get update \
  && apt-get install -y --no-install-recommends \ 
  curl gcc g++ gnupg unixodbc-dev libgl1-mesa-glx \
  make cmake

COPY ./requirements.txt /code/requirements.txt

RUN pip install -r /code/requirements.txt

COPY ./ /code/

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
