import logo from "./logo.svg";
import "./App.css";
import * as faceapi from "face-api.js";
import { useState, useEffect, useRef } from "react";
import {utter} from "./message_handlers"
import App1 from "./App";

function App() {
  const videoHeight = 480;
  const videoWidth = 640;
  const [initializing, setInitializing] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";
      setInitializing(true);
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]);
      startVideo();
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setInitializing(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (initializing) {
        setInitializing(false);
      }
      canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      const displaySize = {
        width: videoWidth,
        height: videoHeight,
      };
      faceapi.matchDimensions(canvasRef.current, displaySize);
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizeDetections = faceapi.resizeResults(detections, displaySize);
      canvasRef.current
        .getContext("2d")
        .clearRect(0, 0, videoWidth, videoHeight);
      faceapi.draw.drawDetections(canvasRef.current, resizeDetections);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resizeDetections);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resizeDetections);

      const expressions = detections[0].expressions;

      if (expressions.sad > 0.7 || expressions.angry > 0.7) {
        
        const sms = await utter("estoy triste")
        mostarMsm("Estoy triste", sms)
      }
      // console.log(detections)
    }, 5000);

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
  };

  return (
    <div className="App">
      <video
        ref={videoRef}
        autoPlay
        muted
        height={videoHeight}
        width={videoWidth}
        onPlay={handleVideoOnPlay}
      ></video>
      <canvas ref={canvasRef} id="canvas"></canvas>
    </div>
  );
}

export default App;
