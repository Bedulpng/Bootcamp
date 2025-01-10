import axios from 'axios';

// Define the function to fetch the professional profile image URL based on user ID
export async function fetchCertificate(userId: string): Promise<string | null> {
  try {
    const response = await axios.get(`http://10.10.103.6:4000/trainee/${userId}/certificate`);
    return response.data.certificates || null;
  } catch (error) {
    console.error("Error fetching certificate", error);
    throw error;
  }
}
