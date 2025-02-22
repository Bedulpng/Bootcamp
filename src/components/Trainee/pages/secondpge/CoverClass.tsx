"use client"

interface ClassCoverProps {
  coverImage?: string | null
}

export function ClassCover({ coverImage }: ClassCoverProps) {
  return (
    <div className="relative w-full pt-[56.25%] rounded-t-lg overflow-hidden">
      {coverImage ? (
        <img
          src={`http://192.168.254.104:4000${coverImage.replace("/public", "")}`}
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
