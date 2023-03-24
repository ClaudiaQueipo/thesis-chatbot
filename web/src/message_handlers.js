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

    // const res = await response.text();
    const res = await response.json();

    let responseList = [];
    for (let r of res) {
      responseList +=  r.text +  `. ` ;
    }

    return responseList;

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

  const response = await fetch("http://localhost:8000/whisper/audio", {
    method: "POST",
    body: formData,
  });

  const transcript = await response.json()
  return await utter(transcript)
  
}

export { utter, postAudio };
