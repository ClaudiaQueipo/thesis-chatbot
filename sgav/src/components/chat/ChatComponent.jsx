import { useState } from "react";
import { Avatar, Badge, ScrollShadow, Card, CardBody, Textarea, Button } from "@nextui-org/react";
import { CheckIcon } from "../../assets/Icons/CheckIcon";
import { botService } from "../../services/test_bot.service";

export default function ChatComponent() {
    const [messages, setMessages] = useState([
        { text: "Hi! How can I help you today?", isBot: true },
        { text: "Im looking to buy a new phone. Can you recommend a good one?", isBot: false }
    ]);
    const [inputValue, setInputValue] = useState("");

    const handleMessageSend = async () => {
        if (inputValue.trim() === "") return;

        try {
            // Envía el mensaje al bot y recibe la respuesta
            const botResponse = await botService.sendSms(inputValue);

            // Actualiza el estado de los mensajes con el mensaje del usuario y la respuesta del bot
            setMessages([
                ...messages,
                { text: inputValue, isBot: false },
                { text: botResponse, isBot: true }
            ]);

            setInputValue(""); // Limpia el valor del input
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
                        <Card className="max-w-xs py-2 px-3" style={{ backgroundColor: message.isBot ? "#27272a" : "inherit" }}>
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
