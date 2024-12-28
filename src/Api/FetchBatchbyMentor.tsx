import axios from 'axios';
import { Batch } from '../types/Trainee';

export interface FetchBatchesResponse {
  batches: Batch[];
}

export const fetchBatchesByMentorId = async (mentorId: string): Promise<Batch[]> => {
    try {
      const response = await axios.get<FetchBatchesResponse>(`http://192.168.1.8:4000/admin/batch/${mentorId}`);
      return response.data?.batches || []; // Return an empty array if batches is undefined or null
    } catch (error) {
      console.error('Error fetching batches:', error);
      return []; // Return an empty array on error
    }
  };
  
