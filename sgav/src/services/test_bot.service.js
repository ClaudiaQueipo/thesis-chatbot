import axios from "axios";
import { getPort } from "../utils/utils";

class BotService {
    constructor() {
        this.baseUrl = `http://localhost:5000`;
    }

    async startBot(botName) {
        try {
            const response = await axios.get(`${this.baseUrl}/test/${botName}`, { timeout: 300000 });
            return response.data;
        } catch (error) {
            console.error("Error starting bot:", error);
            throw error;
        }
    }

    async stopBot(port) {
        try {
            const response = await axios.get(`${this.baseUrl}/stop_bot/${port}`, { timeout: 300000 });
            return response.data;
        } catch (error) {
            console.error("Error stopping bot:", error);
            throw error;
        }
    }

    async sendSms(sms) {
        const payload = {
            message: sms,
        };
        try {
            const response = await fetch(
                // `http://localhost:${5005}/webhooks/rest/webhook`,
                `http://localhost:${getPort()}/webhooks/rest/webhook`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );

            const res = await response.json();
            return res[0].text

        } catch (e) {
            console.log(e);
        }
    }
}

const botService = new BotService()
export { botService }
