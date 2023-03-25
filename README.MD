RASA CHAT/VOICE BOT
This Chatbot allows users to comunicate with it through chat and voice channels. It was developed using the RASA framework and has a custom API developed with FAST-API. The Chatbot uses a Whisper model for audio synthesis.

👷‍ Installation
The first thing we must do is run the command:

python pip install -r requirements.txt
🤖 Train the bot
To train the chatbot, open up your console and navigate to the folder where you have saved your project. Then, run the command

cd rasa_bot
to navigate to your project directory. Once there, run

rasa train
to train your language model.

⚡️ Action Deployment:
Once the model is trained, it is necessary to deploy the action server before running your bot. This can be done by running the command

rasa run actions
⚡️🤖 Running the Bot:
Then, to run your bot, open another commandline in previous directory. Then, run the command

rasa run --cors "*"
to run your bot in the production environment.

⚡️🎤 Running Whisper
Finally, open another command terminal and type the command

python run.py
and wait for the model to start. The Whisper service would then be enabled for use.

🎨 Setup ReactJS UI
To setup the interface, you must run the command

cd web
npm install 
Now to see the interface execute the command

npm run start
This command will open a connection with the localhost in port 3000 localhost:3000