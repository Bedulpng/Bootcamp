import axios from 'axios';
import { Trainee } from '../types/Trainee';

// Axios function to fetch trainees with the fixed role "TRAINEE"
export async function fetchUsers(): Promise<Trainee[]> {
  try {
    const response = await axios.get('http://10.10.103.25:4000/admin/users');
    return response.data;
  } catch (error) {
    console.error("Error fetching trainees:", error);
    throw error;
  }
}
