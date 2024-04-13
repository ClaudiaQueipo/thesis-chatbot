import { useEffect, useState } from 'react'
import {
    Card,
    CardBody,
    Textarea,
    Spinner,
    Button,
    Link
} from "@nextui-org/react";
import useQuestionsStore from '../../store/questionsStore';
import useAnswersStore from '../../store/answersStore';
import useAssistantStore from '../../store/assistantStore';
import assistantService from '../../services/assistant.service';
import { toast, Toaster } from "sonner"
import { getUser } from '../../utils/auth';
import { useNavigate } from "react-router-dom"
import authService from '../../services/auth.service';
import logService from '../../services/logs.service';

export default function GeneratedQA({ cardStyle, flexRowStyle }) {
    const questions = useQuestionsStore(state => state.questions)
    const setQuestions = useQuestionsStore(state => state.setQuestions)
    const answers = useAnswersStore(state => state.answers)
    const setAnswers = useAnswersStore(state => state.setAnswers)
    const assistant = useAssistantStore(state => state.assistant)
    const setAssistantInput = useAssistantStore(state => state.setAssistant)

    const [linkBot, setLinkBot] = useState('')
    const [loading, setLoading] = useState(false)
    const [loadingGenerate, setLoadingGenerate] = useState(false)
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(location.pathname.split("/").pop() === "edit-assistant")
    useEffect(() => {
        const fetchAnswers = async () => {
            setLoading(true)
            const data = await assistantService.generateAnswers(questions)
            setAnswers(data)
            setAssistantInput({
                ...assistant,
                answers: data
            })
            setLoading(false)

        }
        if (questions.length > 0 && !isEdit) fetchAnswers()

    }, [questions]);

    const handleGenerateFiles = async () => {
        try {
            setLoadingGenerate(true)
            const response = await assistantService.generateFiles(
                questions,
                answers,
                assistant.name
            )

            if (response && response.download_link) {

                console.log(response)
                const downloadLink = response.download_link;
                setLinkBot(downloadLink)
                // const fetchResponse = await fetch(downloadLink);
                // const blob = await fetchResponse.blob();

                // const url = window.URL.createObjectURL(blob);

                // window.open(url, '_blank', 'download');

            } else {
                toast.error("Error al generar el archivo. Intente nuevamente.");
            }
        } catch (e) {
            console.log(`Error en handleGenerateFiles: ${e}`)
        } finally {

            setLoadingGenerate(false)
        }

    }

    const handleSaveResults = async () => {

        let status;
        let reason;

        if (isEdit) {
            status = await assistantService.updateAssistant(assistant._id, assistant)
            reason = `${getUser()} HA ACTUALIZADO ${assistant.toString()}`
        } else {
            status = await assistantService.saveAssistant(assistant)
            reason = `${getUser()} HA INSERTADO ${assistant.toString()}`
        }
        const user_id = authService.getUserIdByEmail(getUser())

        const log = {
            "user_id": getUser(),
            "username": user_id,
            "reason": reason
        }

        await logService.createLog(log)

        if (!status) {
            return toast.error("Ha ocurrido un error, intenta de nuevo")
        }

        setAnswers([])
        setQuestions([])
        setAssistantInput({
            _id: null,
            name: "",
            description: "",
            knowledge: "",
            questions: "",
            answers: "",
            username: getUser()
        })

        toast.success("Tu asistente ha sido guardado")
        setTimeout(() => navigate('/gestion-asistentes'), 2000);
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
                    value={questions.length > 0 ? questions.join('\n') : ""}
                    onChange={(event) => {
                        setQuestions(event.target.value.split("\n"));
                        setAssistantInput({
                            ...assistant,
                            questions: event.target.value.split("\n")
                        });
                    }}
                    disabled={loading}
                />
                <div style={{ position: 'relative' }}>
                    <Textarea
                        label="Respuestas"
                        variant="faded"
                        size="lg"
                        disabled={loading}
                        maxRows={6}
                        value={answers.length > 0 ? answers.join('\n') : ""}
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
                    <Button onClick={handleGenerateFiles} color="secondary" variant="shadow" isLoading={loadingGenerate} className="text-white" fullWidth>
                        Generar Archivos
                    </Button>
                    <Button onClick={handleSaveResults} color="warning" variant="solid" fullWidth>
                        Guardar resultados
                    </Button>
                </div>
                <div style={{display: "flex", width: "100%", justifyContent: "center"}}>
                    {/* {linkBot && <a href={linkBot}>Descargar el bot</a>} */}
                    {linkBot && <Link color="primary" href={linkBot}>Desargar asistente {assistant.name}</Link>}
                </div>
                <Toaster richColors theme='dark' duration={3000} position='bottom-center' />
            </CardBody>
        </Card>
    )
}
