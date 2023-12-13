// AssistantForm.js
import React, { useRef, useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import AssistantInfo from "./AssistantInfo";
import FileUpload from "./FileUpload";

const pStyle = { fontSize: "0.75em", color: "#f5a524" };

export default function AssistantForm({
  cardStyle,
  flexRowStyle,
  setQuestions,
}) {
  const [selectedFile, setSelectedFile] = useState("");
  const [assistantInput, setAssistantInput] = useState({
    name: "",
    description: "",
    knowledge: "",
  });
  const hiddenFileInput = useRef(null);

  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const sendFileKnowledge = async () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const response = await fetch(
      "http://0.0.0.0:8000/assistants/gen-questions",
      {
        method: "POST",
        body: formData,
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
        <AssistantInfo
          assistantInput={assistantInput}
          setAssistantInput={setAssistantInput}
        />
        <FileUpload
          flexRowStyle={flexRowStyle}
          hiddenFileInput={hiddenFileInput}
          handleFileChange={handleFileChange}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
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
