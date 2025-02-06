import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClassCard } from "./ClassCard";
import { Class } from "../../../../types/Trainee";
import { fetchClassesByUserId } from "@/Api/FetchUsers";
import { jwtDecode } from "jwt-decode";
import ClassesPageSkeleton from "../../Skeleton/ClassPage";

export default function ClassesPage() {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Class[]>([]);
  const [, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [delay,setDelay] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setDelay(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Decode the token to get the user ID
  const token = localStorage.getItem("refreshToken");
  const decodedToken: { id: string } = jwtDecode(token as string);
  const userId = decodedToken.id;
  console.log(userId)

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
    navigate(`/trainee/class/${classId}`);
  };

  // Transform class data for the ClassCard component
  const transformClassData = (cls: Class) => {
    console.log("Class object:", cls);
    console.log("Batches:", cls.batches);

    const transformedData = {
      id: cls.id,
      classNames: cls.className,
      mentorName: cls.mentors.map((mentor) => mentor.fullName).join(", "),
      mentorProfile:
        cls.mentors
          .flatMap((mentor) => mentor.profiles.map((p) => p.filepath))
          .join(", ") || "path/to/default-image.jpg", 
    };

    console.log("Transformed class data:", transformedData);

    return transformedData;
  };

  if (delay) {
    return (
      <ClassesPageSkeleton />
    );
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
              onClick={() => handleClassClick(cls.id)
              }
            />
          );
        })}
      </div>
    </div>
  );
}