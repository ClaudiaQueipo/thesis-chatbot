import { Component } from "react";
import Header from "./header/header";
import "./App.css";
import send from "./img/icono/icono (2).png";
import audio from "./img/icono/icono (1).png";
import "./Media.css";
import "./ModoDark.css";
import vmsg from "vmsg";
import wasmurl from "./vmsg.wasm";
import "./altura.css";
import listen from "./img/icono/listen.png";
import musc from "./img/icono/icons8_Audio_Wave.ico";
import { utter, postAudio } from "./message_handlers";

const recorder = new vmsg.Recorder({
  wasmURL: wasmurl,
});


/*############## Procesar el audio con Whisper ################# */
async function processAudio(blob) {
  const audioEnviado = URL.createObjectURL(blob);
  const text_response = await postAudio(blob);
  sendAudio(audioEnviado, text_response);
}

function sendAudio(blob, text_response) {
  const pregunta = document.createElement("div");
  const respuesta = document.createElement("div");
  const ZonaRespuesta = document.createElement("div");
  const ZonaPregunta = document.createElement("div");
  const messages = document.getElementById("message-area");
  const audio = document.createElement("audio");
  const contenido = document.createElement("p");
  const btnaudioResponses = document.createElement("img");
  const icono = document.createElement("div");
  const clave = document.createElement("img");
  const clave2 = document.createElement("img");
  const clave3 = document.createElement("img");

  //audio.src = URL.createObjectURL(blob)
  audio.src = blob;

  audio.controls = true;
  btnaudioResponses.src = listen;
  //! Aqui va la respuesta

  contenido.textContent = text_response;
  clave.src = musc;
  clave2.src = musc;
  clave3.src = musc;

  respuesta.classList.add("Message-response");
  pregunta.classList.add("Message-Send");
  ZonaPregunta.classList.add("MessageChatZone2");
  ZonaRespuesta.classList.add("MessageChatZone1");
  btnaudioResponses.classList.add("btnaudioResponses");
  icono.classList.add("icono");
  icono.textContent = "B";
  contenido.classList.add("contenido");
  clave.classList.add("clave");
  clave2.classList.add("clave");
  clave3.classList.add("clave");

  messages.appendChild(ZonaPregunta);
  ZonaPregunta.appendChild(pregunta);
  pregunta.appendChild(audio);

  messages.appendChild(ZonaRespuesta);
  ZonaRespuesta.appendChild(icono);
  ZonaRespuesta.appendChild(respuesta);
  respuesta.appendChild(btnaudioResponses);
  respuesta.appendChild(clave);
  respuesta.appendChild(clave2);
  respuesta.appendChild(clave3);

  btnaudioResponses.addEventListener("click", () => {
    decir(contenido.textContent);

    function decir(texto) {
      speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
    }
  });
}

class App extends Component {
  state = {
    isLoading: false,
    isRecording: false,
    recordings: [],
  };
  /*#####################Para el audio#######################*/
  record = async () => {
    this.setState({ isLoading: true });
    const btnA = document.getElementById("audio");
    btnA.style.background = "red";

    if (this.state.isRecording) {
      const blob = await recorder.stopRecording();
      this.setState({
        isLoading: false,
        isRecording: false,
      });
      processAudio(blob);
      btnA.style.background = "var(--color-violet)";
    } else {
      try {
        await recorder.initAudio();
        await recorder.initWorker();
        recorder.startRecording();
        this.setState({ isLoading: false, isRecording: true });
      } catch (e) {
        console.error(e);
        this.setState({ isLoading: false });
      }
    }
  };

  render() {
    const { isLoading, isRecording, recordings } = this.state;
    const submit = async (e) => {
      e.preventDefault();
      const data = Array.from(new FormData(e.target));
      const valores = Object.fromEntries(data);
      const msm = valores.input;
      let botResponse = await utter(msm);
      console.log(botResponse)

      this.setState({ mensaje: msm, numero: this.state.numero + 1 });
      if (msm) {
        mostarMsm(msm, botResponse);
      }
    };

    const mostarMsm = (msm, msmResponse) => {
      const respuesta = document.createElement("div");
      const pregunta = document.createElement("div");
      const ZonaRespuesta = document.createElement("div");
      const ZonaPregunta = document.createElement("div");
      const icono = document.createElement("div");

      respuesta.classList.add("Message-response");
      pregunta.classList.add("Message-Send");
      ZonaRespuesta.classList.add("MessageChatZone1");
      ZonaPregunta.classList.add("MessageChatZone2");
      icono.classList.add("icono");

      respuesta.textContent = msmResponse;
      pregunta.textContent = msm;
      icono.textContent = "B";

      const messages = document.getElementById("message-area");

      messages.appendChild(ZonaPregunta);
      ZonaPregunta.appendChild(pregunta);
      messages.appendChild(ZonaRespuesta);
      ZonaRespuesta.appendChild(icono);
      ZonaRespuesta.appendChild(respuesta);

      const input = document.getElementById("input");
      input.value = "";
    };

    return (
      <>
        <Header></Header>

        <div className="message-area" id="message-area"></div>

        <div className="from-container">
          <form className="form" onSubmit={submit}>
            <input
              placeholder="Message"
              className="input"
              id="input"
              name="input"
            ></input>

            <button className="button" type="submit">
              <img src={send}></img>
            </button>
          </form>
          <button
            className="button-audio"
            id="audio"
            data-role="controls"
            disabled={isLoading}
            onClick={this.record}
          >
            <img src={audio}></img>
          </button>
        </div>
      </>
    );
  }
}

export default App;
