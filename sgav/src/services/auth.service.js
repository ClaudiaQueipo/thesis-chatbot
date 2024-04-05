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

    async getAllUsers() {
        try {
            const response = await axios.get(`${API_URL}/auth/users/`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener todos los usuarios: ", error);
            throw error;
        }
    }
    
    async getUserIdByEmail(email) {
        try {
            const response = await axios.get(`${API_URL}/auth/user-id/?email=${email}`);
            return response.data;
        } catch (error) {
            console.error("Error al obtener el ID del usuario por correo electrónico: ", error);
            throw error;
        }
    }

    async isAdmin(userEmail) {
        try {
            const response = await axios.post(`${API_URL}/auth/admin/`, userEmail);
            return response.data;
        } catch (error) {
            console.error("Error al verificar si el usuario es administrador: ", error);
            throw error;
        }
    }

    logout() {
        removeUser()
    }

}

const authService = new AuthService();

export default authService;
