import { config } from "@/config/config";
import axios from "axios";

class ItemsService {
    constructor() {
        this.baseUrl = config.baseUrl;
    }

    async createItem(itemData){
        try {
            const formData = new FormData();
            for (const key in itemData) {
                formData.append(key, itemData[key]);
            }
    
            const response = await axios.post(`${this.baseUrl}/items/create`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            return response.data;
        } catch (error) {
            console.error("Error creating item:", error);
            throw error;
            
        }
    }

    async getAllLostItems() {
        try {
            const response = await axios.get(`${this.baseUrl}/items/lost`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error fetching lost items:", error);
            throw error;
        }
    }

    async getAllFoundItems() {
        try {
            const response = await axios.get(`${this.baseUrl}/items/found`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error fetching found items:", error);
            throw error;
        }
    }

    async searchItems(query) {
        try {
            const response = await axios.get(`${this.baseUrl}/items/search`, {
                params: { query },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Error searching items:", error);
            throw error;
        }
    }

    async getLostItem(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/items/lost-item/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error fetching lost item:", error);
            throw error;
        }
    }

    async updateItemStatus(id, status) {
        try {
            const response = await axios.patch(`${this.baseUrl}/items/update-status/${id}`, { status }, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error updating item status:", error);
            throw error;
        }
    }

    async updateItemDetails(id, itemData) {
        try {
            const formData = new FormData();
            for (const key in itemData) {
                formData.append(key, itemData[key]);
            }
    
            const response = await axios.patch(`${this.baseUrl}/items/update-details/${id}`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
    
            return response.data;
        } catch (error) {
            console.error("Error updating item details:", error);
            throw error;
        }
    }

    async deleteItem(id) {
        try {
            const response = await axios.delete(`${this.baseUrl}/items/delete-item/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error deleting item:", error);
            throw error;
        }
    }
}

const itemsService = new ItemsService();
export default itemsService;