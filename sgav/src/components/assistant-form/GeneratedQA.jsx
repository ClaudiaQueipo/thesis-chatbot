import React, { useEffect, useState } from 'react'

import {
    Card,
    CardBody,
    Input,
    Textarea,
    Button,
    Chip,
} from "@nextui-org/react";
import useQuestionsStore from '../../store/questionsStore';
import useAnswersStore from '../../store/answersStore';
import useAssistantStore from '../../store/assistantStore';
import assistantService from '../../services/assistant.service';

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
            setLoading(false)

        }
        if (questions.length > 0) fetchAnswers()

    }, [questions]);



    return (
        <Card style={cardStyle}>
            <CardBody style={{ gap: "10px" }}>
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
                />
                <Textarea
                    label="Respuestas"
                    variant='faded'
                    placeholder="Podrás editar este contenido cuando se analice el conocimiento."
                    size="lg"
                    maxRows={6}
                    value={answers.length > 0 ? answers.join("\n") : ""}
                    onChange={(event) => {
                        setAnswers(event.target.value);
                        setAssistantInput({
                            ...assistant,
                            answers: event.target.value.split("\n")
                        });
                    }}
                />
                <div style={{ display: "flex", gap: "10px" }}>
                    <Button color="secondary" variant="shadow" className="text-white" fullWidth>
                        Generar Archivos
                    </Button>
                    <Button color="warning" variant="solid" fullWidth>
                        Guardar resultados
                    </Button>
                </div>
            </CardBody>
        </Card>
    )
}
