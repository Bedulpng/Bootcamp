import { format } from "date-fns";
import { Pencil, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ClassCover } from "./ClassCover";

interface ClassCardProps {
  id: string;
  batchId: string | undefined
  className: string;
  createdAt: string;
  coverImage?: string | null;
  onEditColors: () => void;
}

export function ClassCard({
  id,
  batchId,
  className,
  createdAt,
  coverImage,
  onEditColors,
}: ClassCardProps) {
  // Determine the final cover image or gradient
  const finalCoverImage = coverImage || null;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      <ClassCover
        className={className}
        coverImage={finalCoverImage}
      />
      <div className="p-4">
        <button
          onClick={onEditColors}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-label="Edit cover"
        >
          <Pencil className="h-4 w-4 text-gray-600" />
        </button>
        <p className="text-sm text-gray-500 mb-4">
          Created on {format(createdAt, "MMMM do, yyyy")}
        </p>
        <Link
          to={`/mentor/c/${id}/${batchId}`}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Go to Class
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
