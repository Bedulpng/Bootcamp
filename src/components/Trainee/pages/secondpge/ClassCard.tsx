import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ClassCover } from "./CoverClass";
const apiUrl = import.meta.env.VITE_API_URL;

interface ClassCardProps {
  classNames: string;
  mentorName: string;
  mentorProfile: string;
  coverImage: string;
  onClick?: () => void;
}

export function ClassCard({
  classNames,
  mentorName,
  mentorProfile,
  coverImage,
  onClick,
}: ClassCardProps) {
  return (
    <Card
      className="w-[300px] h-[350px] overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      {/* Header Section with Gradient */}
      <div className="relative h-[169px] p-4 text-white overflow-hidden">
        {/* ClassCover as Background */}
        <div className="absolute inset-0">
          <ClassCover coverImage={coverImage} />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Class Info - Ensure Text Stays Above Background */}
        <div className="relative z-10 space-y-2">
          <h2 className="text-lg font-bold">{classNames}</h2>
          <p className="text-sm opacity-90">{mentorName}</p>
        </div>
      </div>

      {/* Profile Picture Overlapping Both Sections */}
      <div className="relative">
        <Avatar className="absolute -top-10 right-4 h-20 w-20 border-4 border-white shadow-lg z-20">
          <AvatarImage
            src={`http://${apiUrl}${mentorProfile
              .replace(/\\/g, "/")
              .replace("public", "")}`}
            alt={mentorName}
          />
          <AvatarFallback className="text-lg font-bold">
            {mentorName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Content Area */}
      <div className="p-4 pt-12 flex-1">
        <div className="h-[80px] bg-muted/30 rounded-lg flex items-center justify-center text-muted-foreground text-sm font-medium">
          Additional Info
        </div>
      </div>

      {/* Footer with Actions */}
      <div className="p-3 border-t flex justify-between"></div>
    </Card>
  );
}
