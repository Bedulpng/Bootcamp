import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Image, Folder } from "lucide-react";

interface ClassCardProps {
  classNames: string;
  mentorName: string;
  mentorProfile: string;
  onClick?: () => void; // Add onClick to the props
}

export function ClassCard({
  classNames,
  mentorName,
  mentorProfile,
  onClick, // Destructure onClick
}: ClassCardProps) {
  return (
    <Card
      className="w-[300px] h-[320px] overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer" // Add cursor-pointer
      onClick={onClick} // Attach onClick handler here
    >
      {/* Header Section with Gradient */}
      <div className="relative h-[120px] bg-gradient-to-br from-slate-700 to-slate-500 p-4 text-white">
        {/* Class Info */}
        <div className="space-y-2">
          <h2 className="text-lg font-bold">{classNames}</h2>
          <p className="text-sm opacity-90">{mentorName}</p>
        </div>

        {/* Profile Picture */}
        <Avatar className="absolute -bottom-10 right-4 h-20 w-20 border-4 border-white shadow-lg">
          <AvatarImage src={`http://10.10.103.13:4000${mentorProfile.replace(/\\/g, "/").replace("public", "")}`} alt={mentorName} />
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
      <div className="p-3 border-t flex justify-between">
        <p className="text-muted-foreground text-xs">Actions</p>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Image className="h-4 w-4 text-slate-600" />
          </Button>
          <Button variant="ghost" size="icon">
            <Folder className="h-4 w-4 text-slate-600" />
          </Button>
        </div>
      </div>
    </Card>
  );
}