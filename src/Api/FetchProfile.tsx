import axios from 'axios';

// Define the function to fetch the professional profile image URL based on user ID
export async function fetchProfileImage(userId: string): Promise<string | null> {
  try {
    const response = await axios.get(`http://10.10.103.25:4000/trainee/${userId}/pro`);
    return response.data.profileImage || null;
  } catch (error) {
    console.error("Error fetching profile image:", error);
    throw error;
  }
}
