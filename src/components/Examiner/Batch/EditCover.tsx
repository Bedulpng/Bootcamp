"use client";

import type React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { Upload, Save } from "lucide-react";
import { BatchCover } from "./BatchCover";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-hot-toast";

interface EditCoverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImageUpload: (file: File) => void;
  currentCoverImage?: string | null;
  batchTitle: string;
  batchId: string;
}

export function EditCoverModal({
  isOpen,
  onClose,
  onImageUpload,
  currentCoverImage,
  batchTitle,
  batchId,
}: EditCoverModalProps) {
  const [selectedColor, setSelectedColor] = useState("gray");
  const [coverImage, setCoverImage] = useState(currentCoverImage || "");

  const colors = [
    {
      name: "blue",
      class: "bg-blue-600",
      filePath: "/public/cover/blue-cover.jpg",
    },
    {
      name: "green",
      class: "bg-green-500",
      filePath: "/public/cover/green-cover.jpg",
    },
    {
      name: "orange",
      class: "bg-orange-500",
      filePath: "/public/cover/orange-cover.jpg",
    },
    {
      name: "purple",
      class: "bg-purple-600",
      filePath: "/public/cover/purple-cover.jpg",
    },
    {
      name: "red",
      class: "bg-red-600",
      filePath: "/public/cover/red-cover.jpg",
    },
    {
      name: "yellow",
      class: "bg-yellow-300",
      filePath: "/public/cover/yellow-cover.jpg",
    },
  ];

  const handleColorSelect = (colorName: string) => {
    const selected = colors.find((color) => color.name === colorName);
    if (selected) {
      setSelectedColor(colorName);
      setCoverImage(selected.filePath);
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("batchId", batchId);

      const selected = colors.find((color) => color.name === selectedColor);

      if (selected) {
        formData.append("fileName", selected.filePath.split("/").pop() || "");
      } else if (fileInputRef.current?.files?.[0]) {
        formData.append("coverImage", fileInputRef.current.files[0]);
      } else {
        console.warn("No cover selected.");
        onClose()
        return;
      }

      await axios.post(
        `http://10.10.103.13:4000/uploads/batch-cover`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success("Batch Cover Updated!");
      onClose();
    } catch (error) {
      console.error("Error updating batch cover:", error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-4xl mx-auto p-8 flex flex-row gap-8 items-start relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 space-y-6">
          <h2 className="text-xl font-medium">Customize Batch Cover Image</h2>

          {/* ✅ Cover Preview with Title Toggle */}
          <div className="relative w-full h-52 bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center">
            <BatchCover
              batchTitle={batchTitle}
              coverImage={coverImage}
            />
          </div>

          {/* Image Upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="w-full"
            variant="outline"
          >
            <Upload className="mr-2 h-4 w-4" /> Choose Image
          </Button>

          {/* Save/Cancel Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              <Save size={18} className="opacity-70" /> Save Changes
            </Button>
          </div>
        </div>

        {/* Color Picker */}
        <div className="flex-1 space-y-6">
          <p className="text-sm text-muted-foreground">
            Choose System Cover 
          </p>
          <div className="flex flex-wrap gap-4">
            <TooltipProvider>
              {colors.map((color) => (
                <Tooltip key={color.name} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <button
                      className={`w-14 h-14 rounded-full ${color.class} relative hover:scale-110 transition-transform border-2 border-transparent hover:border-white`}
                      aria-label={`Select ${color.name} theme`}
                      onClick={() => handleColorSelect(color.name)}
                    >
                      {selectedColor === color.name && (
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xl">
                          ✓
                        </span>
                      )}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="bottom"
                    className="relative mt-3 px-3 py-1.5 bg-white border shadow-sm text-black"
                  >
                    <p className="capitalize text-sm">{color.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
