import axios from 'axios';
import { Trainee } from '../types/Trainee';
const apiUrl = import.meta.env.VITE_API_URL;

// Axios function to fetch trainees with the fixed role "TRAINEE"
export async function fetchTrainees(): Promise<Trainee[]> {
  try {
    const response = await axios.get(`http://${apiUrl}/admin/users/TRAINEE`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trainees:", error);
    throw error;
  }
}

export async function fetchMentors(): Promise<Trainee[]> {
  try {
    const response = await axios.get(`http://${apiUrl}/admin/users/MENTOR`);
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor:", error);
    throw error;
  }
}