import React, { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    Textarea,
    Spinner,
    Button,
} from "@nextui-org/react";
import { saveAs } from 'file-saver';
import useQuestionsStore from '../../store/questionsStore';
import useAnswersStore from '../../store/answersStore';
import useAssistantStore from '../../store/assistantStore';
import assistantService from '../../services/assistant.service';
import { toast, Toaster } from "sonner"

export default function GeneratedQA({ cardStyle, flexRowStyle }) {
    const questions = useQuestionsStore(state => state.questions)
    const setQuestions = useQuestionsStore(state => state.setQuestions)
    const answers = useAnswersStore(state => state.answers)
    const setAnswers = useAnswersStore(state => state.setAnswers)
    const assistant = useAssistantStore(state => state.assistant)
    const setAssistantInput = useAssistantStore(state => state.setAssistant)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchAnswers = async () => {
            setLoading(true)
            const data = await assistantService.generateAnswers(questions.split("\n"))
            setAnswers(data)
            setAssistantInput({
                ...assistant,
                answers: data
            })
            setLoading(false)

        }
        if (questions.length > 0) fetchAnswers()

    }, [questions]);

    const handleGenerateFiles = async () => {
        const response = await assistantService.generateFiles(
            questions,
            answers,
            assistant.name
        )
        const blob = new Blob([response], { type: 'application/zip' });
        saveAs(blob, `${assistant.name !== "" ? assistant.name : "bot"}.zip`);
    }

    const handleSaveResults = async () => {
        const status = await assistantService.saveAssistant(assistant)
        if (status) {
            return toast.success("Tu asistente ha sido guardado")
        } else {
            return toast.error("Ha ocurrido un error, intenta de nuevo")
        }
    }

    return (
        <Card style={cardStyle}>
            <CardBody style={{ gap: "10px", position: 'relative' }}>
                <p>Preguntas y Respuestas generadas</p>
                <Textarea
                    label="Preguntas"
                    placeholder="Podrás editar este contenido cuando se analice el conocimiento."
                    variant='faded'
                    size="lg"
                    maxRows={6}
                    value={questions.length > 0 ? questions.toString() : ""}
                    onChange={(event) => {
                        setQuestions(event.target.value.split("\n"));
                        setAssistantInput({
                            ...assistant,
                            questions: event.target.value.split("\n")
                        });
                    }}
                    disabled={loading} // Deshabilita el Textarea cuando está en carga
                />
                <div style={{ position: 'relative' }}>
                    <Textarea
                        label="Respuestas"
                        variant="faded"
                        size="lg"
                        disabled={loading}
                        maxRows={6}
                        value={answers.length > 0 ? answers.toString() : ''}
                        onChange={(event) => {
                            setAnswers(event.target.value.split("\n"));
                            setAssistantInput({
                                ...assistant,
                                answers: event.target.value.split('\n'),
                            });
                        }}
                        style={{ opacity: loading ? 0.5 : 1 }}
                    />
                    {loading && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                            }}
                        >
                            <Spinner label="Generando respuestas..." color="secondary" />
                        </div>
                    )}
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button onClick={handleGenerateFiles} color="secondary" variant="shadow" className="text-white" fullWidth>
                        Generar Archivos
                    </Button>
                    <Button onClick={handleSaveResults} color="warning" variant="solid" fullWidth>
                        Guardar resultados
                    </Button>
                </div>
                <Toaster richColors theme='dark' duration={3000} position='bottom-center' />
            </CardBody>
        </Card>
    )
}
