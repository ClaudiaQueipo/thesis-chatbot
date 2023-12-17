// AssistantForm.js
import React, { useRef, useState, useEffect } from "react";
import { Card, CardBody, Button, Spinner } from "@nextui-org/react";
import AssistantInfo from "./AssistantInfo";
import FileUpload from "./FileUpload";
import assistantService from "../../services/assistant.service";
import useQuestionsStore from "../../store/questionsStore";

const pStyle = { fontSize: "0.75em", color: "#f5a524" };

export default function AssistantForm({
  cardStyle,
  flexRowStyle,
}) {
  const [loading, setLoading] = useState(false)
  const setQuestions = useQuestionsStore(state => state.setQuestions)
  const [selectedFile, setSelectedFile] = useState("");

  const hiddenFileInput = useRef(null);


  const handleFileChange = (file) => {
    setSelectedFile(file);
  };

  const sendFileKnowledge = async () => {
    try {
      setLoading(true)
      const data = await assistantService.generateQuestions(selectedFile);
      setQuestions(data);
      setLoading(false)

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card style={cardStyle}>
      <CardBody style={{ gap: "10px" }}>
        <p>Datos del asistente</p>
        <AssistantInfo/>
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
          className="text-white "
          onClick={sendFileKnowledge}
          isDisabled={loading}
        >
          {loading ? <><Spinner color="white" size="sm" />
            Analizando...</>
            : "Analizar"}

        </Button>
      </CardBody>
    </Card>
  );
}
