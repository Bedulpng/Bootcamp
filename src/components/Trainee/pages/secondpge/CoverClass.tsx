"use client"

const apiUrl = import.meta.env.VITE_API_URL;
interface ClassCoverProps {
  coverImage?: string | null
}

export function ClassCover({ coverImage }: ClassCoverProps) {
  return (
    <div className="relative w-full pt-[56.25%] rounded-t-lg overflow-hidden">
      {coverImage ? (
        <img
          src={`http://${apiUrl}${coverImage.replace("/public", "")}`}
          alt={`Img`}
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
    
    </div>
  );
}
