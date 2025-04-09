import { config } from "@/config/config";
import axios from "axios";

class ItemsService {
    constructor() {
        this.baseUrl = config.baseUrl;
    }

    async createItem({
        itemName,
        itemType,
        description,
        category,
        lostDate,
        location,
        itemImage
    }) {
        try {
            const formData = new FormData();
            formData.append("itemName", itemName);
            formData.append("itemType", itemType);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("location", location);
            formData.append("lostDate", lostDate);
            formData.append("itemImage", itemImage);


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

    async searchItems(searchParams) {
        try {
            const response = await axios.get(`${this.baseUrl}/items/search`, {
                params: {
                    query: searchParams.query,       // General search term
                    itemName: searchParams.itemName, // Specific field searches
                    description: searchParams.description,
                    category: searchParams.category,
                    location: searchParams.location,
                    itemType: searchParams.itemType, // 'lost' or 'found'
                    dateRange: searchParams.dateRange, // e.g. '7days', '30days'
                    page: searchParams.page,         // For pagination
                    limit: searchParams.limit        // Items per page
                },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error("Error searching items:", error);
            throw error;
        }
    }

    async getItem(id) {
        try {
            const response = await axios.get(`${this.baseUrl}/items/${id}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error fetching item:", error);
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

    async getAllItems() {
        try {
            const response = await axios.get(`${this.baseUrl}/items/all`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error fetching all items:", error);
            throw error;
        }
    }

    async getUserItems(userId) {
        try {
            const response = await axios.get(`${this.baseUrl}/items/user/${userId}`, { withCredentials: true });
            return response.data;
        } catch (error) {
            console.error("Error fetching user items:", error);
            throw error;
        }
    }
}

const itemsService = new ItemsService();
export default itemsService;