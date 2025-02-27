import axios from 'axios';
import { Trainee, Note, Class } from '../types/Trainee';
const apiUrl = import.meta.env.VITE_API_URL;

// Axios function to fetch trainees with the fixed role "TRAINEE"
export async function fetchUsers(): Promise<Trainee[]> {
  try {
    const response = await axios.get(`http://${apiUrl}/admin/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trainees:", error);
    throw error;
  }
}

export async function fetchNotesByGrader(graderId: string, visibility: string): Promise<Note[]> {
  try {
    const token = localStorage.getItem("refreshToken"); // Assuming the token is stored in localStorage
    const response = await axios.get<Note[]>(
      `http://${apiUrl}/mentor/notes/${graderId}/${visibility}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notes by grader:", error);
    throw error;
  }
}

export async function fetchClassesByUserId(userId: string): Promise<Class[]> {
  try {    
    const response = await axios.get<Class[]>(
      `http://${apiUrl}/trainee/class/user/${userId}`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching classes by user ID:', error);
    throw error;
  }
}

