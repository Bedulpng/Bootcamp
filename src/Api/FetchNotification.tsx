import axios from "axios";
import { Notification } from "../types/Notification";

export const fetchNotifications = async (): Promise<Notification[]> => {
    try {
        const response = await axios.get(`http://192.168.1.7:4000/mentor/notifications`, {
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