import React, { useState } from "react";
import axios from "axios";
import { GraduationCap } from "lucide-react";
import { LoginLayout } from "./LoginLayout";
import { LoginForm } from "./LoginForm";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { DotSpinner } from "../SpinnerLoading";
const apiUrl = import.meta.env.VITE_API_URL;

// Tipe untuk login data
type LoginData = {
  email: string;
  password: string;
};

export function TraineeLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    loginData: LoginData
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        `http://${apiUrl}/trainee/login`,
        {
          ...loginData,
          role: "TRAINEE", // Menambahkan role TRAINEE secara default
        }
      );

      const { accessToken, refreshToken } = response.data;

      // Simpan token ke localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Redirect atau log pesan sukses
      navigate("/trainee/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.message ||
          "An error occurred. Please check your credentials.";
        setError(message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout
      icon={
        <GraduationCap className="h-12 w-12 mx-auto text-purple-600 mb-2" />
      }
      title="Trainee Login"
      subtitle="Welcome! Please login to access your learning journey"
    >
      <LoginForm
        type="trainee"
        onSubmit={(e, loginData) => handleSubmit(e, loginData)}
      />
      {loading && (
        <div className="flex items-center justify-center h-screen w-full">
          <DotSpinner />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </LoginLayout>
  );
}
