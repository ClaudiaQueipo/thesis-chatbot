// AssistantInfo.js
import { useState } from "react";
import { Input, Textarea } from "@nextui-org/react";
import useAssistantStore from "../../store/assistantStore";

export default function AssistantInfo() {
  const assistantInput = useAssistantStore(state => state.assistant)
  const setAssistantInput = useAssistantStore(state => state.setAssistant)
  const [isEdit, setIsEdit] = useState(location.pathname.split("/").pop() === "edit-assistant")

  return (
    <>
      <Input
        label="Nombre"
        isRequired
        isClearable
        variant="faded"
        size="lg"
        type="text"
        placeholder="Escribe el nombre de tu asistente"
        value={assistantInput.name}
        onChange={(event) => {
          setAssistantInput({
            ...assistantInput,
            name: event.target.value
          })
        }}
      />
      <Textarea
        label="Descripción"
        placeholder="Escribe una descripción que te permita identificar a tu asistente"
        variant='faded'
        size="lg"
        value={assistantInput.description}
        onChange={(event) => {
          setAssistantInput({
            ...assistantInput,
            description: event.target.value
          })
        }}
      />
      {!isEdit && <Textarea
        label="Conocimiento del asistente"
        placeholder="Escribe conocimiento para tu asistente o carga un archivo"
        variant='faded'
        size="lg"
        value={assistantInput.knowledge}
        onChange={(event) => {
          setAssistantInput({
            ...assistantInput,
            knowledge: event.target.value
          })
        }}
      />}
    </>
  );
}
