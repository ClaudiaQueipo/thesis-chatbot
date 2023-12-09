import React, { useRef, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Chip,
} from "@nextui-org/react";

const pStyle = { fontSize: "0.75em", color: "#f5a524" };

export default function AssistantForm({
  cardStyle,
  flexRowStyle,
  setQuestions,
}) {
  const hiddenFileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState("");

  const [assistantInput, setAssistantInput] = useState({
    name: "",
    description: "",
    knowledge: "",
    file: "",
  });

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setSelectedFile(fileUploaded);
    const fileType = fileUploaded.type;
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    if (!allowedTypes.includes(fileType)) {
      alert(
        "Tipo de archivo no permitido. Solo se permiten archivos PDF, DOCX y TXT."
      );
      event.target.value = null;
      return;
    }
  };

  const sendFileKnowledge = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await fetch(
      "http://0.0.0.0:8000/assistants/gen-questions",
      {
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        body: formData,
        // body: JSON.stringify(inputData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      setQuestions(data);
    }
  };

  return (
    <Card style={cardStyle}>
      <CardBody style={{ gap: "10px" }}>
        <p>Datos del asistente</p>

        <Input
          label="Nombre"
          isRequired
          isClearable
          variant="flat"
          size="lg"
          type="text"
          placeholder="Escribe el nombre de tu asistente"
          value={assistantInput.name}
          onChange={(event) => {
            setAssistantInput((prev) => {
              const updatedInput = {
                ...prev,
                name: event.target.value,
              };
              return updatedInput;
            });
          }}
        />
        <Textarea
          label="Descripción"
          placeholder="Escribe una descripción que te permita identificar a tu asistente"
          size="lg"
          value={assistantInput.description}
          onChange={(event) => {
            setAssistantInput((prev) => {
              const updatedInput = {
                ...prev,
                description: event.target.value,
              };
              return updatedInput;
            });
          }}
        />
        <Textarea
          label="Conocimiento del asistente"
          placeholder="Escribe conocimiento para tu asistente o carga un archivo"
          size="lg"
          value={assistantInput.knowledge}
          onChange={(event) => {
            setAssistantInput((prev) => {
              const updatedInput = {
                ...prev,
                knowledge: event.target.value,
              };
              return updatedInput;
            });
          }}
        />
        <div style={flexRowStyle}>
          <div>
            <input
              type="file"
              style={{ display: "none" }}
              ref={hiddenFileInput}
              onChange={handleChange}
              accept=".pdf,.docx,.txt"
            />
            <Button
              className="text-white"
              onClick={() => hiddenFileInput.current.click()}
              color="secondary"
              variant="shadow"
            >
              Cargar Archivo
            </Button>
          </div>
          {selectedFile && (
            <Chip onClose={() => setSelectedFile("")}>
              <p style={pStyle}>{selectedFile.name}</p>
            </Chip>
          )}
        </div>
        <p style={pStyle}>Tipos de archivos permitidos: PDF, DOCX, TXT</p>
        <Button
          color="secondary"
          variant="shadow"
          className="text-white"
          onClick={sendFileKnowledge}
        >
          Analizar
        </Button>
      </CardBody>
    </Card>
  );
}
