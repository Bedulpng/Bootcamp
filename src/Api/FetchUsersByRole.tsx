import axios from 'axios';
import { Trainee } from '../types/Trainee';

// Axios function to fetch trainees with the fixed role "TRAINEE"
export async function fetchTrainees(): Promise<Trainee[]> {
  try {
    const response = await axios.get('http://10.10.103.248:4000/admin/users/TRAINEE');
    return response.data;
  } catch (error) {
    console.error("Error fetching trainees:", error);
    throw error;
  }
}

export async function fetchMentors(): Promise<Trainee[]> {
  try {
    const response = await axios.get('http://10.10.103.248:4000/admin/users/MENTOR');
    return response.data;
  } catch (error) {
    console.error("Error fetching mentor:", error);
    throw error;
  }
}