import axios from "axios";
import { Notification } from "../types/Notification";

export const fetchNotifications = async (): Promise<Notification[]> => {
    try {
        const response = await axios.get(`http://10.10.103.204:4000/mentor/notifications`, {
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