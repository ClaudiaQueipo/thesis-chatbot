import axios from "axios";
import { removeUser, setUser } from "../utils/auth";

const API_URL = import.meta.env.VITE_APP_API_URL

class AuthService {
    async register(user) {
        try {
            const response = await axios.post(`${API_URL}/auth/register`, user);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    }

    async login(formData) {
        try {
            const response = await axios.post(`${API_URL}/auth/login`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
            if (response.data && response.data.access_token) {
                return response.data;

            } else {
                throw Error("Error al loggearse")
            }
        } catch (error) {
            console.log("Error al hacer el login en authService: ", error)
        }
    }

    logout() {
        removeUser()
    }
}

const authService = new AuthService();

export default authService;
