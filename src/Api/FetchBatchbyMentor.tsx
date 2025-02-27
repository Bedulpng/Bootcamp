import axios from "axios";
import { Batch, Class } from "../types/Trainee";
const apiUrl = import.meta.env.VITE_API_URL;


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
      `http://${apiUrl}/admin/batch/${mentorId}`
    );
    return response.data?.batches || [];
  } catch (error) {
    console.error("Error fetching batches:", error);
    return []; // Return an empty array on error
  }
};

export const fetchClassById = async (
  classId: string | undefined,
  order: "asc" | "desc" = "asc" // Default to "asc"
): Promise<Class[]> => {
  try {
    if (!classId) throw new Error("classId is required but was undefined");

    // Pass the order parameter to the API
    const response = await axios.get<FetchClassResponse>(
      `http://${apiUrl}/admin/class/${classId}/class`,
      { params: order === "desc" ? { order: "desc" } : {} } // Only send if "desc"
    );

    const classData = response.data?.classData;
    return Array.isArray(classData) ? classData : classData ? [classData] : [];
  } catch (error) {
    console.error("Error fetching class:", error);
    return [];
  }
};
 



