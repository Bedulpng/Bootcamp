import React, { useRef, useState } from 'react';
import { ImageIcon, Upload } from 'lucide-react';

interface ImageUploadProps {
  label: string;
  onImageChange: (file: File) => void;
  previewUrl?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ label, onImageChange, previewUrl }) => {
  const [preview, setPreview] = useState<string>(previewUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
      <div
        onClick={handleClick}
        className="w-24 h-24 bg-gray-200 rounded-full flex flex-col items-center justify-center mb-2 cursor-pointer hover:bg-gray-300 transition-colors relative group"
      >
        {preview ? (
          <img
            src={preview}
            alt={label}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <ImageIcon className="w-8 h-8 text-gray-400" />
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <Upload className="w-6 h-6 text-white" />
        </div>
      </div>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};

export default ImageUpload;