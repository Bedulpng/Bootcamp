import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

// Define the function to fetch the professional profile image URL based on user ID
export async function fetchProfileImage(userId: string): Promise<string | null> {
  try {
    const response = await axios.get(`http://${apiUrl}/trainee/${userId}/pro`);
    return response.data.profileImage || null;
  } catch (error) {
    console.error("Error fetching profile image:", error);
    throw error;
  }
}
