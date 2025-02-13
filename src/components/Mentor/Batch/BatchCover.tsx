"use client";

interface BatchCoverProps {
  batchTitle: string;
  coverImage?: string | null;
}

export function BatchCover({ batchTitle, coverImage }: BatchCoverProps) {
    return (
      <div className="relative w-full pt-[56.25%] rounded-t-lg overflow-hidden">
        {coverImage ? (
          <img
            src={`http://10.10.103.13:4000${coverImage.replace("/public", "")}`}
            alt={`Cover for ${batchTitle}`}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <img
            src="/placeholder.jpg"
            alt="Placeholder"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        {/* Ensure the title is fixed and always visible */}
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 px-4 py-2 rounded-md w-auto z-10">
          <h2 className="text-white text-lg font-semibold">{batchTitle}</h2>
        </div>
      </div>
    );
  }
   
