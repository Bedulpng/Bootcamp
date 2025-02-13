"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ClassCard } from "./ClassCard";
import { ClassCardSkeleton } from "./ClassCardSkeleton";
import { ColorPickerModal } from "./ColorPickerModal";
import { ImageCropModal } from "./ImageCropModal";
import { Class } from "@/types/Trainee";

export default function ClassPage() {
  const { batchId } = useParams<{ batchId: string }>();
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClassId, setEditingClassId] = useState<string | null>(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isImageCropOpen, setIsImageCropOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://192.168.1.7:4000/admin/class/${batchId}/batch`);
        if (!response.ok) {
          throw new Error(`Failed to fetch classes for batch with ID: ${batchId}`);
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

  const handleEditColors = (classId: string) => {
    setEditingClassId(classId);
    setIsColorPickerOpen(true);
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setTempImageUrl(imageUrl);
    setIsImageCropOpen(true);
  };

  const handleCropComplete = (croppedImageUrl: string) => {
    if (editingClassId) {
      setClasses((prevClasses) =>
        prevClasses.map((c) =>
          c.id === editingClassId ? { ...c, coverImage: croppedImageUrl, gradientColors: undefined } : c
        )
      );
    }
    setIsColorPickerOpen(false);
    setIsImageCropOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">      
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => <ClassCardSkeleton key={index} />)
          : classes.length > 0
          ? classes.map((classItem) => (
              <ClassCard
                key={classItem.id}
                id={classItem.id}
                className={classItem.className}
                createdAt={classItem.createdAt}
                coverImage={classItem.cover.filePath}
                onEditColors={() => handleEditColors(classItem.id)}
              />
            ))
          : <p>No classes available.</p>
        }
      </div>

      {isColorPickerOpen && editingClassId && (
        <ColorPickerModal
          isOpen={isColorPickerOpen}
          onClose={() => setIsColorPickerOpen(false)}
          onImageUpload={handleImageUpload}
          currentCoverImage={classes.find((c) => c.id === editingClassId)?.cover.filePath}
          className={classes.find((c) => c.id === editingClassId)?.className || ""}
          classId={classes.find((c) => c.id === editingClassId)?.id || ""}
        />
      )}

      {isImageCropOpen && tempImageUrl && (
        <ImageCropModal
          isOpen={isImageCropOpen}
          onClose={() => setIsImageCropOpen(false)}
          imageUrl={tempImageUrl}
          onCropComplete={handleCropComplete}
          classId={classes.find((c) => c.id === editingClassId)?.id || ""}
        />
      )}
    </div>
  );
}
