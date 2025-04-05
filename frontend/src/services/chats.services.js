import { config } from "@/config/config";
import axios from "axios";

class ChatService {
    constructor() {
        this.baseURL = config.baseUrl + "/chats";
    }

    async startChat(userId , matchId) {
        try {
            const response = await axios.post(`${this.baseURL}/start-chat`, { userId , matchId } , {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error starting chat:", error);
            throw error;
        }
    }

    async getChatMessages(chatId) {
        try {
            const response = await axios.get(`${this.baseURL}/get-chat-message/${chatId}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching chat messages:", error);
            throw error;
        }
    }

    async deleteChat(chatId) {
        try {
            const response = await axios.delete(`${this.baseURL}/delete-chat/${chatId}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting chat:", error);
            throw error;
        }
    }

    async getUserChats() {
        try {
            const response = await axios.get(`${this.baseURL}/get-user-chats`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user chats:", error);
            throw error;
        }
    }
}

const chatService = new ChatService();
export default chatService;