import axios from "axios";
import { Notification } from "../types/Notification";
const apiUrl = import.meta.env.VITE_API_URL;

export const fetchNotifications = async (): Promise<Notification[]> => {
    try {
        const response = await axios.get(`http://${apiUrl}/mentor/notifications`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
            },
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching batches:', error);
        throw error;
      }
    };