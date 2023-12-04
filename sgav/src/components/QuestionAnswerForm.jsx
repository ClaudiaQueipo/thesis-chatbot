import React from "react";

import { Card, CardBody, Textarea, Button } from "@nextui-org/react";

export default function QuestionAnswerForm({
  questions,
  setQuestions,
  answers,
  setAnswers,
  cardStyle,
  flexRowStyle,
}) {
  return (
    <Card
      style={{
        minWidth: "500px",
        width: "100%",
        maxWidth: "40%",
      }}
    >
      <CardBody style={{ gap: "10px" }}>
        <p>Preguntas y Respuestas generadas</p>
        <Textarea
          label="Preguntas"
          placeholder="Podrás editar este contenido cuando se analice el conocimiento."
          size="lg"
          value={questions !== undefined ? questions : ""}
          maxRows={6}
        />
        <Textarea
          label="Respuestas"
          placeholder="Podrás editar este contenido cuando se analice el conocimiento."
          size="lg"
          value={answers !== undefined ? answers : ""}
          maxRows={6}
        />
        <div style={flexRowStyle}>
          <Button color="secondary" variant="shadow">
            Generar Archivos
          </Button>
          <Button color="warning" variant="shadow">
            Guardar resultados
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
