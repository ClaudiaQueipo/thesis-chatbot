# RASA CHAT/VOICE BOT SYSTEM GENERATION

This system allows users to create and comunicate with the chatbots through chat and
voice and video channels. It was developed using the RASA framework and has a custom API developed with FAST-API. The created chatbots uses a Whisper model for audio synthesis.

## Project Structure considerations.
1. In DOC folder is hosted my thesis and some helpful documents to this proyect.
2. In sgav folder we have the frontend code of the Virtual Assistants Management System
3. In Web folder we have the code of a chat interface, for users to prove the created asistants using text, voice and video channels

### Software and Hardware requirements
1. Software
Python 3.10 version or later
node js 18 version or later
visual studio code or pycharm editors 
docker (This is optional if you have mongodb alredy installed natively in your pc)
mongodb 4 version or later
2. Hardware
6GB ram minimun 
CPU with 2 cores minimun
GPU (this is optional but it helps a lot when you are using LLMs locally, they perform better with GPU)
Storage 15 GB aproximately, can change according to the llm that you are using


## Q&A generation algorithm
You can try this algorithm in google collab using this [Notebook](https://github.com/ClaudiaQueipo/thesis-chatbot/blob/master/DOC/Generacion%20de%20preguntas%20y%20respuestas/QA_Generation.ipynb) have in count that you have to upload a pdf file and specify the location of the file in google collab

## 👷‍ Installation
The installation process has 3 important steps
1. Backend setup
2. Frontend setup 


### Backend SETUP
---
First of all you need a LLM alredy downloaded, when you have one, put it on sgav_backend folder and change model path in sgav_backend/models/llm.py

#### Database installation
Then we have to install the database in this case MongoDB, you can use the docker-compose.yml 

> [!IMPORTANT]
> If you are using docker in a blocked country you should see this article for using it without any problems [docker a lo cubano](https://www.sysadminsdecuba.com/2020/04/docker-a-lo-cubano/)


Starting the service in detached mode, this is useful for querying the db using mongosh
```bash
docker-compose up -d
```

> [!NOTE]
Db credentials 
Username: root
Password: root

note: You can change credentials config in docker-compose.yml

If you want to down the docker container service you have to use this command
```bash
docker-compose down
```

Next we need to install the python deps

1. We have to change the current dir

```bash
cd sgav_backend/
```

2. This is an optional step but is a good practice to create a virtual environment to this dependencies
see pip or conda documentation to do this and then follow the steps

3. install deps

> [!NOTE]
If you are using Windows comment this lines in the requirements.txt:
uvloop==0.19.0 
triton==2.1.0
then execute the following command

```bash
pip install -r requirements.txt
```

3. Set up your env variables
If you not change anything in docker compose your credentials have to look like this

```python
DB_USER="root"
DB_PASSWORD="root"
DB_HOST="localhost"
DB_PORT="27017"
DB_NAME="sgav"
```

4. run server with the following command

```bash
python main.py
```

### Frontend SETUP
---
We have to move to the project directory

```bash
cd sgav
```

Then to install the dependencies execute the command
this command can change depending on what node package manager you are using i.e: yarn, bun or pnpm
see the oficial documentation of theese package managers for more info

```bash
npm install
```

in sgav folder

Then to run the proyect we can run the following command
if you are using npm:

```bash
npm run dev
```

## Created assistants

> [!IMPORTANT]
> A very important consideration is when you download a created assistant it comes with a docker-compose file that allows you to build an image an run all the services of the container in order to use it without worrying about installing deps and stuff.

## Implementing a chatbot ui with audio and video in Angular
In this [rar file](https://github.com/ClaudiaQueipo/thesis-chatbot/blob/master/DOC/angular%20video%20audio.rar) is an aproach to achieve it.
