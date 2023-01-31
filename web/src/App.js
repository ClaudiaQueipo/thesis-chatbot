import { Component } from "react";
import Header from "./header/header";
import "./App.css";
import send from "./img/icono/icono (2).png";
import audio from "./img/icono/icono (1).png";
import "./Media.css";
import "./ModoDark.css";
import utter from "./sms";

class App extends Component {
  state = { mensaje: "", numero: 0 };

  render() {
    const submit = async (e) => {
      e.preventDefault();
      const data = Array.from(new FormData(e.target));
      const valores = Object.fromEntries(data);
      const msm = valores.input;
      let botResponse = await utter(msm);
      console.log(botResponse);

      this.setState({ mensaje: msm, numero: this.state.numero + 1 });
      mostarMsm(msm, botResponse);
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
          <button className="button-audio" id="audio" data-role="controls">
            <img src={audio}></img>
          </button>
        </div>
      </>
    );
  }
}

export default App;
