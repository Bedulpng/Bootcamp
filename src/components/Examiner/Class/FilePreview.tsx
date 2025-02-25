import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Files } from "@/types/Trainee";

const FilePreview: React.FC<{ file: Files }> = ({ file }) => {
    const [, setAspectRatio] = useState<{
      width: number;
      height: number;
    } | null>(null);

    useEffect(() => {
      if (file.mimetype === "video/mp4") {
        const video = document.createElement("video");
        video.src = file.filepath;
        video.preload = "metadata";

        video.onloadedmetadata = () => {
          setAspectRatio({
            width: video.videoWidth,
            height: video.videoHeight,
          });
        };
      }
    }, [file]);

    const renderVideo = () => (
      <div className="w-full aspect-video bg-black flex items-center justify-center">
        <video
          src={`http://10.10.103.248:4000${file.filepath
            .replace(/\\/g, "/")
            .replace("public", "")}`}
          controls
          className="w-full h-full"
          aria-label="Video preview"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    );

    const renderPDF = () => (
      <iframe
        // src={`file.filepath.replace`}
        src={`http://10.10.103.248:4000${file.filepath
          .replace(/\\/g, "/")
          .replace("public", "")}`}
        title={`Preview of ${file.filename}`}
        className="w-full h-[80vh]"
        aria-label="PDF preview"
      />
    );

    const renderUnsupported = () => (
      <div className="w-full h-[80vh] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="mb-4">
            Preview not available for {file.mimetype.toUpperCase()} files
          </p>
          <Button asChild>
            <a href={file.filename} download>
              Download File
            </a>
          </Button>
        </div>
      </div>
    );

    switch (file.mimetype) {
      case "video/mp4":
        return renderVideo();
      case "image/jpeg":
      case "image/png":
      case "application/pdf":
        return renderPDF();
      default:
        return renderUnsupported();
    }
  };

export default FilePreview;
