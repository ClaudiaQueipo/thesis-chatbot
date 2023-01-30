import whisper
import os
import time

#Bibliografy
#  https://github.com/openai/whisper


audioDirectory = 'audio_sample'
model = whisper.load_model("medium")

# load audio and pad/trim it to fit 30 seconds

audioList = ['en_translate_tts.mp3', 'es_translate_tts.mp3']
asrAudioConvertionTime = []
cwd = os.getcwd()

for iAudio in audioList:
    st = time.time()

    address = cwd + os.sep + audioDirectory + os.sep + iAudio
    print(" Apply Wisper model to audion " + address)
    if (os.path.exists(address)):
        print('File exist')
    #audio = whisper.load_audio(address)
    #audio = whisper.pad_or_trim(audio)

    # make log-Mel spectrogram and move to the same device as the model
    #mel = whisper.log_mel_spectrogram(audio).to(model.device)

    # detect the spoken language
    #_, probs = model.detect_language(mel)
    #print(f"Detected language: {max(probs, key=probs.get)}")

    # Internally, the  transcribe()  method   reads   the  entire
    # file and processes the audio with a sliding 30-second window,
    # performing autoregressive sequence-to-sequence predictions on each window.

    result = model.transcribe(address)
    #print(result)
    print(result["text"])

    # decode the audio
    # options = whisper.DecodingOptions()
    # result = whisper.decode(model, mel, options)

    # print the recognized text
    #print(result.text)
    # get the end time
    et = time.time()

    # get the execution time
    elapsed_time = et - st
    print('Execution time:', elapsed_time, 'seconds')
    asrAudioConvertionTime.append(elapsed_time)

print(' Median time to ASR convertion with Wispher in seconds ',
      sum(items for items in asrAudioConvertionTime)/ len(audioList))