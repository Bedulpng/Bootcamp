import axios from 'axios';
import { Batch, Class } from '../types/Trainee';

export const fetchBatches = async (): Promise<Batch[]> => {
    try {
      const response = await axios.get(`http://10.10.103.25:4000/admin/batch`);
      return response.data;
    } catch (error) {
      console.error('Error fetching batches:', error);
      throw error;
    }
  };
  

export const fetchClasses = async (): Promise<Class[]> => {
  try {
      const response = await axios.get('http://10.10.103.25:4000/admin/class');
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
  }
  };

  export const fetchCB = async (userId: string): Promise<{ classes: Class[], batches: Batch[] }> => {
    try {
      const response = await axios.get(`http://10.10.103.25:4000/trainee/${userId}/cb`);
      return response.data;
    } catch (error) {
      console.error("Error fetching classes and batches:", error);
      throw error;
    }
  };
