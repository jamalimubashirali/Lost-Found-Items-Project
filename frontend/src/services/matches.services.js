import { config } from "@/config/config";
import axios from "axios";

class MatchesService {
    constructor(){
        this.baseUrl = config.baseUrl + "/matches";
    }

    async createMatches(itemId) {
        try {
            const response = await axios.post(`${this.baseUrl}/create-match/${itemId}`, {} , {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getMatches(itemId) {
        try {
            const response = await axios.get(`${this.baseUrl}/get-match/${itemId}`, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async updateMatchStatus(matchId , foundItemId) {
        try {
            const response = await axios.patch(`${this.baseUrl}/update-match/${matchId}`, {foundItemId} , {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

const matchesService = new MatchesService();
export default matchesService;