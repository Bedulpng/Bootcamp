"use client"

interface ClassCoverProps {
  className: string
  coverImage?: string | null
}

export function ClassCover({ className, coverImage }: ClassCoverProps) {
  return (
    <div className="relative w-full pt-[56.25%] rounded-t-lg overflow-hidden">
      {coverImage ? (
        <img
          src={`http://10.10.103.13:4000${coverImage.replace("/public", "")}`}
          alt={`Cover for ${className}`}
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      ) : 
      (
        <img
          src="/placeholder.jpg"
          alt="Placeholder"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h2 className="text-white text-3xl font-bold">{className}</h2>
      </div>
    </div>
  );
}
