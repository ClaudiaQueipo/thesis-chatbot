import AssistantForm from "../../components/assistant-form/AssistantForm";
import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Chip,
} from "@nextui-org/react";
import { useState } from "react";

const flexRowStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
};
const cardStyle = {
  minWidth: "300px",
  width: "100%",
  maxWidth: "50%",
};

const sectionStyle = {
  display: "flex",
  // height: "100%",
  width: "100%",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  gap: "50px",
  // margin: "50px 20px",
};

export default function CreateAssistant() {
  const [questions, setQuestions] = useState("");

  return (
    <div style={{ position: "relative", margin: "0 100px" }}>
      <Link
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          marginTop: "30px",
          color: "#f5a524",
        }}
        to="/gestion-asistentes"
      >
        EvoAssist
      </Link>
      <section style={sectionStyle}>
        <AssistantForm
          cardStyle={cardStyle}
          flexRowStyle={flexRowStyle}
          setQuestions={setQuestions}
        />
        <Card style={cardStyle}>
          <CardBody style={{ gap: "10px" }}>
            <p>Preguntas y Respuestas generadas</p>
            <Textarea
              label="Preguntas"
              placeholder="Podrás editar este contenido cuando se analice el conocimiento."
              size="lg"
              maxRows={6}
              value={questions}
            />
            <Textarea
              label="Respuestas"
              placeholder="Podrás editar este contenido cuando se analice el conocimiento."
              size="lg"
              maxRows={6}
            />
            <div style={flexRowStyle}>
              <Button color="secondary" variant="shadow" className="text-white">
                Generar Archivos
              </Button>
              <Button color="warning" variant="shadow" className="text-white">
                Guardar resultados
              </Button>
            </div>
          </CardBody>
        </Card>
      </section>
    </div>
  );
}
