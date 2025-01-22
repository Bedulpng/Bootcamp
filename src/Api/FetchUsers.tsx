import axios from 'axios';
import { Trainee, Note } from '../types/Trainee';

// Axios function to fetch trainees with the fixed role "TRAINEE"
export async function fetchUsers(): Promise<Trainee[]> {
  try {
    const response = await axios.get('http://10.10.103.204:4000/admin/users');
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
      `http://10.10.103.204:4000/mentor/notes/${graderId}/${visibility}`,
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

