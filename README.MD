# RASA CHAT/VOICE BOT 
This Chatbot allows users to comunicate with it through chat and
voice channels. It was developed using the RASA framework and has a custom API developed with FAST-API. The Chatbot uses a Whisper model for audio synthesis.

## 👷‍ Installation
The first thing we must do is run the command:

```bash
python pip install -r requirements.txt
```

## 🤖 Train the bot
Open your browser in [localhost:5005/train](http://localhost:5005/train)

## 👩‍💻 Let´s test the bot
To test the bot, you must run the command

```bash 
uvicorn app:app --port 5005 --reload
```
Then open your browser in [localhost:5005/](http://localhost:5005/)