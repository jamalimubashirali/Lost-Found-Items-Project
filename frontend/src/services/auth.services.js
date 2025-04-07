import { config } from "@/config/config";
import axios from "axios";

class AuthService {
    constructor(){
        this.baseUrl = config.baseUrl;
    }

    async login(email, password) {
        try {
            const response = await axios.post(`${this.baseUrl}/users/login`, { email, password } , {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async register(data) {
        try {
            const response = await axios.post(`${this.baseUrl}/users/register`, { 
                username : data.username,
                name  : data.name,
                email : data.email,
                password : data.password,
             } , {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }

    async logout() {
        try {
            const response = await axios.post(`${this.baseUrl}/users/logout`, {}, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message);
        }
    }
}

const authService = new AuthService();

export default authService;