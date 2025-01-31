import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClassCard } from "./ClassCard";
import { Class } from "../../../../types/Trainee";
import { fetchClassesByUserId } from "@/Api/FetchUsers";
import { jwtDecode } from "jwt-decode";

export default function ClassesPage() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Decode the token to get the user ID
  const token = localStorage.getItem("refreshToken");
  const decodedToken: { id: string } = jwtDecode(token as string);
  const userId = decodedToken.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedClasses = await fetchClassesByUserId(userId);
        setClasses(fetchedClasses);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to fetch classes. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Handle navigation to class details
  const handleClassClick = (classId: string) => {
    console.log(`Navigating to class with id: ${classId}`);
    navigate(`/trainee/class/${classId}`);
  };

  // Transform class data for the ClassCard component
  const transformClassData = (cls: Class) => {
    // Log the entire `cls` object to inspect its structure
    console.log("Class object:", cls);
  
    // Log `cls.batches` to inspect its structure
    console.log("Batches:", cls.batches);
  
    // Transform class data
    const transformedData = {
      id: cls.id,
      classNames: cls.className,
      mentorName: cls.mentors.map((mentor) => mentor.fullName).join(", "),
      mentorProfile:
        cls.mentors
          .flatMap((mentor) => mentor.profiles.map((p) => p.filepath))
          .join(", ") || "path/to/default-image.jpg", 
    };
  
    // Log the final transformed data
    console.log("Transformed class data:", transformedData);
  
    return transformedData;
  };

  if (loading) {
    return <div>Loading classes...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-12 place-items-center cursor-pointer">
        {classes.map((cls) => {
          const transformedClass = transformClassData(cls);
          return (
            <ClassCard
              key={cls.id}
              {...transformedClass}
              onClick={() => handleClassClick(cls.id)}
            />
          );
        })}
      </div>
    </div>
  );
}