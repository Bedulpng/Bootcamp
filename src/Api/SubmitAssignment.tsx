import axios from "axios";

const API_URL = "http://10.10.103.13:4000";

export async function submitLessonCompletion(
  userId: string,
  lessonId: string,
  files?: File[]
): Promise<{
  message: string;
  files: any[];
  certificate?: any;
}> {
  if (!userId || !lessonId) {
    throw new Error("userId and lessonId are required.");
  }

  try {
    const formData = new FormData();
    formData.append("userId", userId);
    if (files && files.length > 0) {
      files.forEach((file) => formData.append("files", file));
    }

    const response = await axios.post(
      `${API_URL}/complete/lesson/${lessonId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error submitting lesson completion:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.error || "Failed to submit lesson completion."
    );
  }
}

export async function submitChallengeCompletion(
  userId: string,
  challengeId: string,
  files?: File[]
): Promise<{
  message: string;
  files: any[];
  certificate?: any;
}> {
  if (!userId || !challengeId) {
    throw new Error("userId and challengeId are required.");
  }

  try {
    const formData = new FormData();
    formData.append("userId", userId);
    if (files && files.length > 0) {
      files.forEach((file) => formData.append("files", file));
    }

    const response = await axios.post(
      `${API_URL}/complete/challenge/${challengeId}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Error submitting challenge completion:",
      error?.response?.data || error.message
    );
    throw new Error(
      error?.response?.data?.error || "Failed to submit challenge completion."
    );
  }
}

export const getLessonStatus = async (lessonId: string, userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/complete/lesson/${lessonId}/${userId}/status`);
    return response.data; // Expected response: { status: "SUBMITTED" | "NOTSUBMITTED" }
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Lesson not found");
    }
    throw new Error(
      error.response?.data?.message || "Error fetching lesson status"
    );
  }
};

export const getChallengeStatus = async (challengeId: string, userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/complete/challenge/${challengeId}/${userId}/status`);
    return response.data; // Expected response: { status: "SUBMITTED" | "NOTSUBMITTED" }
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Challenge not found");
    }
    throw new Error(
      error.response?.data?.message || "Error fetching challenge status"
    );
  }
};
