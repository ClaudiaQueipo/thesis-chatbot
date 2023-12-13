// AssistantInfo.js
import React from "react";
import { Input, Textarea } from "@nextui-org/react";

export default function AssistantInfo({ assistantInput, setAssistantInput }) {
  return (
    <>
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
          setAssistantInput((prev) => ({ ...prev, name: event.target.value }));
        }}
      />
      <Textarea
        label="Descripción"
        placeholder="Escribe una descripción que te permita identificar a tu asistente"
        size="lg"
        value={assistantInput.description}
        onChange={(event) => {
          setAssistantInput((prev) => ({
            ...prev,
            description: event.target.value,
          }));
        }}
      />
      <Textarea
        label="Conocimiento del asistente"
        placeholder="Escribe conocimiento para tu asistente o carga un archivo"
        size="lg"
        value={assistantInput.knowledge}
        onChange={(event) => {
          setAssistantInput((prev) => ({
            ...prev,
            knowledge: event.target.value,
          }));
        }}
      />
    </>
  );
}
