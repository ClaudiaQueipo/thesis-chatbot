# RASA CHAT/VOICE BOT SYSTEM GENERATION

This system allows users to create and comunicate with the chatbots through chat and
voice and video channels. It was developed using the RASA framework and has a custom API developed with FAST-API. The created chatbots uses a Whisper model for audio synthesis.

## Project Structure considerations.

1. In DOC folder is hosted my thesis and some helpful documents to this proyect.
2. In sgav folder we have the frontend code of the Virtual Assistants Management System
3. In Web folder we have the code of a chat interface, for users to prove the created asistants using text, voice and video channels

## 👷‍ Installation

The first thing we must do is run the command:

```bash
python pip install -r requirements.txt
```

## 🤖 Train the bot

To train the chatbot, open up your console and navigate to the folder where you have saved your project. Then, run the command

```bash
cd rasa_bot
```

to navigate to your project directory. Once there, run

```bash
rasa train
```

to train your language model.

## ⚡️ Action Deployment:

Once the model is trained, it is necessary to deploy the action server before running your bot. This can be done by running the command

```bash
rasa run actions
```

## ⚡️🤖 Running the Bot:

Finally, to run your bot, open another commandline in previous directory. Then, run the command

```bash
rasa run --cors "*"
```

to run your bot in the production environment.

## Setting Up the SGAV System

### Backend
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

Executing the container
```bash
sudo docker exec -it container_name bash
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

2. install deps (you can create an env or whatever if you want)

```bash
pip install -r requirements.txt
```

3. Set up your env variables
If you not change anything in docker compose your credentials have to look like this

```js
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

### Frontend
---

First of all we have to install the dependencies by executing the command

```bash
npm install
```

in sgav folder

Then to run the proyect we can run the following command
if you are using npm:

```bash
npm run dev
```

with pnpm the command look like this:

```bash
pnpm run dev
```

## 🎨 Setup ReactJS Chat UI

To setup the chat interface, you must run the command

```bash
cd web
npm install
```

Now to see the chat interface execute the command

```bash
npm run start
```

This command will open a connection with the localhost in port 3000
[localhost:3000](http://localhost:3000)

# RASA CHAT/VOICE BOT

This Chatbot allows users to comunicate with it through chat and
voice channels. It was developed using the RASA framework and has a custom API developed with FAST-API. The Chatbot uses a Whisper model for audio synthesis.

## 👷‍ Installation

The first thing we must do is run the command:

```bash
python pip install -r requirements.txt
```

## 🤖 Train the bot

To train the chatbot, open up your console and navigate to the folder where you have saved your project. Then, run the command

```bash
cd rasa_bot
```

to navigate to your project directory. Once there, run

```bash
rasa train
```

to train your language model.

## ⚡️ Action Deployment:

Once the model is trained, it is necessary to deploy the action server before running your bot. This can be done by running the command

```bash
rasa run actions
```

## ⚡️🤖 Running the Bot:

Then, to run your bot, open another commandline in previous directory. Then, run the command

```bash
rasa run --cors "*"
```

to run your bot in the production environment.

## ⚡️🎤 Running Whisper

Finally, open another command terminal and type the command

```bash
python run.py
```

and wait for the model to start. The Whisper service would then be enabled for use.

## 🎨 Setup ReactJS Chat UI

To setup the chat interface, you must run the command

```bash
cd web
npm install
```

Now to see the interface execute the command

```bash
npm run start
```

This command will open a connection with the localhost in port 3000
[localhost:3000](http://localhost:3000)
