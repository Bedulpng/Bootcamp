"use client"

import { useState, useRef } from "react"
import ReactCrop, { type Crop } from "react-image-crop"
import "react-image-crop/dist/ReactCrop.css"
import { X } from "lucide-react"
import axios from "axios";
import { toast } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;

interface ImageCropModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
  onCropComplete: (croppedImageUrl: string) => void
  classId: string;
}

const CROP_WIDTH = 1280
const CROP_HEIGHT = 720

export function ImageCropModal({ isOpen, onClose, imageUrl, onCropComplete, classId }: ImageCropModalProps) {
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 100, height: 56.25, x: 0, y: 0 })
  const [isLoading, setIsLoading] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null)

  if (!isOpen) return null

  const handleCropComplete = () => {
    if (imageRef.current && crop.width && crop.height) {
      const canvas = document.createElement("canvas")
      canvas.width = CROP_WIDTH
      canvas.height = CROP_HEIGHT
      const ctx = canvas.getContext("2d")

      if (ctx) {
        const scaleX = imageRef.current.naturalWidth / imageRef.current.width
        const scaleY = imageRef.current.naturalHeight / imageRef.current.height

        ctx.drawImage(
          imageRef.current,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          CROP_WIDTH,
          CROP_HEIGHT,
        )

        canvas.toBlob(
          async (blob) => {
            if (blob) {
              setIsLoading(true);

              const fileType = blob.type;
              if (!["image/jpeg", "image/jpg", "image/png"].includes(fileType)) {
                alert("Only JPEG, JPG, and PNG files are allowed.");
                setIsLoading(false);
                return;
              }

              const formData = new FormData();
              formData.append("classId", classId);
              formData.append("coverImage", blob, "cropped-image.jpg");

              try {
                await axios.post(`http://${apiUrl}/uploads/class-cover`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                });

                toast.success("Cover Updated!", {
                  position: "top-center",
                  style: {
                    background: "green",
                    color: "white",
                    fontWeight: "bold",
                  },
                });

                onCropComplete(URL.createObjectURL(blob));
                onClose();
              } catch (error) {
                console.error("Error uploading image:", error);
              } finally {
                setIsLoading(false);
              }
            }
          },
          "image/jpeg",
          0.95,
        )
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Adjust Image</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" disabled={isLoading}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <ReactCrop crop={crop} onChange={(c) => setCrop(c)} aspect={16 / 9} locked={true}>
          <img ref={imageRef} src={imageUrl || "/placeholder.svg"} alt="Crop me" style={{ maxWidth: "100%" }} />
        </ReactCrop>
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleCropComplete}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Crop and Save"}
          </button>
        </div>
      </div>
    </div>
  )
}
