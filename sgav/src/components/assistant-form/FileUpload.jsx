// FileUpload.js
import React from "react";
import { Button, Chip } from "@nextui-org/react";

const pStyle = { fontSize: "0.75em", color: "#f5a524" };

export default function FileUpload({
  hiddenFileInput,
  handleFileChange,
  flexRowStyle,
  setSelectedFile,
  selectedFile,
}) {
  return (
    <div style={flexRowStyle}>
      <div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={hiddenFileInput}
          onChange={(event) => handleFileChange(event.target.files[0])}
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
  );
}
