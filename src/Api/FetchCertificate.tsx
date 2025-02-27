import axios from 'axios';

// Define the function to fetch the professional profile image URL based on user ID
export async function fetchCertificate(userId: string): Promise<string | null> {
  try {
    const response = await axios.get(`http://10.10.103.195:4000/trainee/${userId}/certificate`);
    return response.data.certificates || null;
  } catch (error) {
    console.error("Error fetching certificate", error);
    throw error;
  }
}

// Fetch all certificates
export async function fetchAllCertificates(): Promise<any[]> {
  try {
    const response = await axios.get("http://10.10.103.195:4000/trainee/certificates");
    return response.data;
  } catch (error) {
    console.error("Error fetching all certificates", error);
    throw error;
  }
}

// Fetch a certificate by certificate ID
export async function fetchCertificateById(certificateId: string): Promise<any | null> {
  try {
    const response = await axios.get(`http://10.10.103.195:4000/trainee/certificates/${certificateId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching certificate by ID", error);
    throw error;
  }
}

