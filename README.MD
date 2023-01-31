# RASA CHAT/VOICE BOT 
This Chatbot allows users to comunicate with it through chat and
voice channels. It was developed using the RASA framework and has a custom API developed with FAST-API. The Chatbot uses a Whisper model for audio synthesis.

## 👷‍ Installation
The first thing we must do is run the command:

```bash
python pip install -r requirements.txt
```

## 🤖 Train the bot

```bash 
uvicorn app:app --port 5005 --reload
```
Open your browser in [localhost:5005/train](http://localhost:5005/train)


## 👩‍💻 Let´s test the bot
To test the bot, you must run the command

```bash 
uvicorn app:app --port 5005 --reload
```

## Setup ReactJS UI
To setup the interface, you must run the command 

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
