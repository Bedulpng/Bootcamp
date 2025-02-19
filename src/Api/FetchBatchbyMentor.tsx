import axios from "axios";
import { Batch, Class } from "../types/Trainee";

export interface FetchBatchesResponse {
  batches: Batch[];
}

export interface FetchClassResponse {
  classData: Class[];
}

export const fetchBatchesByMentorId = async (
  mentorId: string
): Promise<Batch[]> => {
  try {
    const response = await axios.get<FetchBatchesResponse>(
      `http://192.168.1.12:4000/admin/batch/${mentorId}`
    );
    return response.data?.batches || [];
  } catch (error) {
    console.error("Error fetching batches:", error);
    return []; // Return an empty array on error
  }
};

export const fetchClassById = async (
  classId: string | undefined
): Promise<Class[]> => {
  try {
    if (!classId) {
      throw new Error("classId is required but was undefined");
    }

    const response = await axios.get<FetchClassResponse>(
      `http://192.168.1.12:4000/admin/class/${classId}/class`
    );

    // Ensure response.data?.classData is always an array
    const classData = response.data?.classData;
    if (Array.isArray(classData)) {
      return classData; // Return as is if already an array
    } else if (classData) {
      return [classData]; // Wrap single object in an array
    }
    return [];
  } catch (error) {
    console.error("Error fetching class:", error);
    return [];
  }
};



