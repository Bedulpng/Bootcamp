import axios from 'axios';
import { Batch, Class } from '../types/Trainee';

export const fetchBatches = async (): Promise<Batch[]> => {
    try {
      const response = await axios.get(`http://10.10.103.248:4000/admin/batch`);
      return response.data;
    } catch (error) {
      console.error('Error fetching batches:', error);
      throw error;
    }
  };

  export const fetchBatchesById = async (batchId : string): Promise<Batch[]> => {
    try {
      const response = await axios.get(`http://10.10.103.248:4000/admin/batch/${batchId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching batches:', error);
      throw error;
    }
  };

  export const editBatch = async (
    id: string,
    batchPayload: {
      batchNum?: number;
      batchClass?: string[];
      batchTitle?: string;
      mentors?: string[]; // Array of mentor IDs
    }
  ): Promise<Batch> => {
    try {
      const response = await axios.put(
        `http://10.10.103.248:4000/admin/batch/${id}`,
        batchPayload
      );
      return response.data;
    } catch (error) {
      console.error('Error editing batch:', error);
      throw error;
    }
  };

  export const assignParticipantsToBatch = async (
    batchId: string,
    participants: string[] // Array of participant IDs
  ): Promise<Batch> => {
    try {
      const response = await axios.put(
        `http://10.10.103.248:4000/admin/batch/${batchId}/participants`,
        { participants }
      );
      return response.data;
    } catch (error) {
      console.error('Error assigning participants to batch:', error);
      throw error;
    }
  };

export const fetchClasses = async (): Promise<Class[]> => {
  try {
      const response = await axios.get('http://10.10.103.248:4000/admin/class');
      return response.data;
    } catch (error) {
      console.error("Error fetching classes:", error);
      throw error;
  }
  };

  export const fetchCB = async (userId: string): Promise<{ classes: Class[], batches: Batch[] }> => {
    try {
      const response = await axios.get(`http://10.10.103.248:4000/trainee/${userId}/cb`);
      return response.data;
    } catch (error) {
      console.error("Error fetching classes and batches:", error);
      throw error;
    }
  };


