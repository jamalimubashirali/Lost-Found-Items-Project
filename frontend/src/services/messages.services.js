import { config } from "@/config/config";
import axios from "axios";

class MessagesService {
    constructor(){
        this.baseUrl = config.baseUrl + "/messages";
    }

    async createMessage(chatId, text) {
        try {
            const response = await axios.post(`${this.baseUrl}/create-message`, {chatId , text}, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error creating message:", error);
            throw error;
        }
    }

    async deleteMessage(messageId) {
        try {
            const response = await axios.delete(`${this.baseUrl}/delete-message/${messageId}`, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting message:", error);
            throw error;
        }
    }
}

const messagesService = new MessagesService();
export default messagesService;