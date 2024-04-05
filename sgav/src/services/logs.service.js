class LogService {
    constructor() {
        this.base_path = "http://0.0.0.0:8080/logs/";
    }

    async createLog(logData) {
        try {
            const response = await fetch(this.base_path + "create", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating log:', error);
            throw error;
        }
    }

    async fetchLogs() {
        try {
            const response = await fetch(this.base_path + "fetch-logs");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching logs:', error);
            throw error;
        }
    }
}

const logService = new LogService();
export default logService;
