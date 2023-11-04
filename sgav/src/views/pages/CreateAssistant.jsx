import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Textarea,
  Button,
  Chip,
} from "@nextui-org/react";

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
const pStyle = { fontSize: "0.75em", color: "#f5a524" };

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
  const hiddenFileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState("");

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setSelectedFile(fileUploaded.name);
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
      event.target.value = null; // Limpia el input de archivo
      return;
    }

    // Aquí puedes manejar la carga del archivo
  };

  return (
    <div style={{ margin: "0 100px" }}>
      <section style={sectionStyle}>
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
            />
            <Textarea
              label="Descripción"
              placeholder="Escribe una descripción que te permita identificar a tu asistente"
              size="lg"
            />
            <Textarea
              label="Conocimiento del asistente"
              placeholder="Escribe conocimiento para tu asistente o carga un archivo"
              size="lg"
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
                  onClick={() => hiddenFileInput.current.click()}
                  color="secondary"
                  variant="shadow"
                >
                  Cargar Archivo
                </Button>
              </div>
              {selectedFile && (
                // <Chip onClose={() => setSelectedFile("")}>
                //   <p style={pStyle}>
                //     {selectedFile.length > 30
                //       ? `${selectedFile.slice(0, 20)}...${
                //           selectedFile.split(".")[1]
                //         }`
                //       : selectedFile}
                //   </p>
                // </Chip>
                <Chip onClose={() => setSelectedFile("")}>
                  <p style={pStyle}>{selectedFile}</p>
                </Chip>
              )}
            </div>
            <p style={pStyle}>Tipos de archivos permitidos: PDF, DOCX, TXT</p>
            <Button color="secondary" variant="shadow">
              Analizar
            </Button>
          </CardBody>
        </Card>

        <Card style={cardStyle}>
          <CardBody style={{ gap: "10px" }}>
            <p>Preguntas y Respuestas generadas</p>
            <Textarea
              label="Preguntas"
              placeholder="Podrás editar este contenido cuando se analice el conocimiento."
              size="lg"
              maxRows={6}
            />
            <Textarea
              label="Respuestas"
              placeholder="Podrás editar este contenido cuando se analice el conocimiento."
              size="lg"
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
      </section>
    </div>
  );
}
