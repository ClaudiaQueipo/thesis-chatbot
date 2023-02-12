async function utter(msg) {
  const payload = {
    message: msg,
  };
  try {
    const response = await fetch(
      "http://localhost:5005/webhooks/rest/webhook",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    return await response.text();
    // if (result) {
    //   return result;
    // }
  } catch (e) {
    console.log(e);
  }
}
async function postAudio(audio) {
  const formData = new FormData();

  formData.append("file", audio, "audio.mp3");
  

  const response = await fetch("http://localhost:5005/whisper/audio", {
    method: "POST",
    body: formData,
  });

  
  return await response.json();
}

export { utter, postAudio };
