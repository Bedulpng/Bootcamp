"use client";

interface BatchCoverProps {
  title: string;
  coverImage?: string | null;
}

export function ClassDetailCover({ title, coverImage }: BatchCoverProps) {
  return (
    <div className="relative w-full pt-[56.25%] rounded-t-lg overflow-hidden flex flex-col">
      <div className="absolute inset-0">
        {coverImage ? (
          <img
            src={`http://10.10.103.248:4000${coverImage.replace("/public", "")}`}
            alt={`Cover for ${title}`}
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
        )}
      </div>

      {/* Batch title positioned relatively at the bottom */}
      <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 px-4 py-2 rounded-md w-fit">
        <h2 className="text-white text-lg font-semibold">{title}</h2>
      </div>
    </div>
  );
}
