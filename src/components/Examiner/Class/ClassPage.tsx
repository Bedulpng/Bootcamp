"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClassCard } from "./ClassCard";
import { ClassCardSkeleton } from "./ClassCardSkeleton";
// import { ColorPickerModal } from "./ColorPickerModal";
// import { ImageCropModal } from "./ImageCropModal";
import { Class } from "@/types/Trainee";
import NoClassIllustration from "@/components/Trainee/pages/secondpge/NothingHandle/NoClass";

export default function ExaminerClassPage() {
  const { batchId } = useParams<{ batchId: string }>();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
//   const [editingClassId, setEditingClassId] = useState<string | null>(null);
//   const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
//   const [isImageCropOpen, setIsImageCropOpen] = useState(false);
//   const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://192.168.1.12:4000/admin/class/${batchId}/batch`);
        if (!response.ok) {
        }
        const data: Class[] = await response.json();
        console.log("class data", data)
        setClasses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (batchId) fetchClasses();
  }, [batchId]);

//   const handleEditColors = (classId: string) => {
//     setEditingClassId(classId);
//     setIsColorPickerOpen(true);
//   };

//   const handleImageUpload = (file: File) => {
//     const imageUrl = URL.createObjectURL(file);
//     setTempImageUrl(imageUrl);
//     setIsImageCropOpen(true);
//   };

//   const handleCropComplete = (croppedImageUrl: string) => {
//     if (editingClassId) {
//       setClasses((prevClasses) =>
//         prevClasses.map((c) =>
//           c.id === editingClassId ? { ...c, coverImage: croppedImageUrl, gradientColors: undefined } : c
//         )
//       );
//     }
//     setIsColorPickerOpen(false);
//     setIsImageCropOpen(false);
//   };

return (
  <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
    {error && <p className="text-red-500">{error}</p>}

    {loading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <ClassCardSkeleton key={index} />
        ))}
      </div>
    ) : classes.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {classes.map((classItem) => (
          <ClassCard
            key={classItem.id}
            id={classItem.id}
            batchId={batchId}
            className={classItem.className}
            createdAt={classItem.createdAt}
            coverImage={classItem.cover?.filePath}
          />
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <NoClassIllustration />
      </div>
    )}
  </div>
);
}
