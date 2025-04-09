import { config } from "@/config/config";
import axios from "axios";

class UserServices{
    constructor(){
        this.baseUrl = config.baseUrl;
    }
    
    async getAllUsers(){
        try {
            const response = await axios.get(`${this.baseUrl}/users/all-users` , {
                withCredentials : true,
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    async getSelf(){
        try {
            const response = await axios.get(`${this.baseUrl}/users/me` , {
                withCredentials : true,
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    }

    async getUserById(id){
        try {
            const response = await axios.get(`${this.baseUrl}/users/${id}` , {
                withCredentials : true,
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching user:", error);
            throw error;
        }
    }

    async updateUser(id , {
        name,
        email,
        username,
    }){
        try {
            const response = await axios.put(`${this.baseUrl}/users/update/${id}` , {
                name,
                email,
                username,
            } , {
                withCredentials : true,
                headers : {
                    "Content-Type" : "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }
}

const userServices = new UserServices();
export default userServices;