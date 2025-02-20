"use client";
import { colors } from "./EditCover";

interface BatchCoverProps {
  batchTitle: string;
  coverImage?: string | null;
}

export function BatchCover({ batchTitle, coverImage }: BatchCoverProps) {
  const getRandomColorFilePath = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex].filePath.replace("/public", "");
  };

  return (
    <div className="relative w-full pt-[56.25%] rounded-t-lg overflow-hidden flex flex-col">
      <div className="absolute inset-0">
        <img
          src={
            coverImage
              ? `http://192.168.1.12:4000${coverImage.replace("/public", "")}`
              : `http://192.168.1.12:4000${getRandomColorFilePath()}`
          }
          alt={`Cover for ${batchTitle}`}
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* {coverImage ? (
          <img
            src={`http://192.168.1.12:4000${coverImage.replace("/public", "")}`}
            alt={`Cover for ${batchTitle}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <img
            src="/placeholder.jpg"
            alt="Placeholder"
            className="w-full h-full object-cover"
            loading="eager"
          />
        )} */}
      </div>

      {/* Batch title positioned relatively at the bottom */}
      <div className="relative mt-auto bottom-4 left-4 bg-black bg-opacity-60 px-4 py-2 rounded-md w-fit">
        <h2 className="text-white text-lg font-semibold">{batchTitle}</h2>
      </div>
    </div>
  );
}
