import { useState, useRef, useEffect } from "react";
import { Avatar, Badge, ScrollShadow, Card, CardBody, Textarea, Button } from "@nextui-org/react";
import { CheckIcon } from "../../assets/Icons/CheckIcon";
import { botService } from "../../services/test_bot.service";

export default function ChatComponent() {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef(null); // Referencia para el contenedor de mensajes

    const handleMessageSend = async () => {
        if (inputValue.trim() === "") return;

        try {
            const botResponse = await botService.sendSms(inputValue);

            setMessages([
                ...messages,
                { text: inputValue, isBot: false },
                { text: botResponse, isBot: true }
            ]);

            setInputValue("");
        } catch (error) {
            console.error("Error sending message to bot:", error);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleMessageSend();
        }
    };

    // Función para desplazarse automáticamente al último mensaje
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]); // Dependencia para que se ejecute cada vez que cambie el estado de los mensajes

    return (
        <div className="flex flex-col h-full overflow-hidden">
            <header className="flex items-center justify-between p-4 border-b bg-[#f1f5f9]">
                <div className="flex items-center gap-4 space-x-4">
                    <Badge
                        isOneChar
                        content={<CheckIcon />}
                        color="success"
                        placement="bottom-right"
                    >
                        <Avatar
                            isBordered
                            color="success"
                            radius="md"
                            src="https://i.pravatar.cc/300?u=a042581f4e290267072"
                        />
                    </Badge>
                    <h4>Asistente</h4>
                </div>
            </header>
            <ScrollShadow className="flex-grow p-4 space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.isBot ? "justify-start" : "justify-end"} items-center space-x-2 gap-4 mb-2`}>
                        {message.isBot ? (
                            <Avatar
                                className="h-6 w-6"
                                src="https://i.pravatar.cc/300?u=a042581f4e290267072"
                            />
                        ) : null}
                        <Card className="max-w-xs py-1 px-2" style={{ backgroundColor: message.isBot ? "#27272a" : "inherit" }}>
                            <CardBody>
                                <p>{message.text}</p>
                            </CardBody>
                        </Card>
                        {!message.isBot ? (
                            <Avatar
                                className="h-6 w-6"
                                src="https://i.pravatar.cc/300?u=a042581f4e290267072"
                            />
                        ) : null}
                    </div>
                ))}
                <div ref={messagesEndRef} /> {/* Referencia para desplazarse al último mensaje */}
            </ScrollShadow>
            <div className="flex-shrink-0 p-4 border-t bg-[#f1f5f9]">
                <div className="flex space-x-2 items-center justify-center gap-4">
                    <Textarea
                        className="flex-grow rounded-md"
                        placeholder="Type your message here."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                    />
                    <Button color="secondary" onClick={handleMessageSend}>Enviar</Button>
                </div>
            </div>
        </div>
    );
}
