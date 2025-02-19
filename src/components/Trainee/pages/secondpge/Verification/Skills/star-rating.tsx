import type React from "react"
import { Star } from "lucide-react"

interface StarRatingProps {
  rating: number
  onRatingChange: (rating: number) => void
}

export const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange }) => {
  return (
    <div className="flex items-center">
      {[...Array(10)].map((_, index) => {
        const starValue = index + 1
        return (
          <Star
            key={index}
            size={24}
            className={`cursor-pointer ${starValue <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            onClick={() => onRatingChange(starValue)}
          />
        )
      })}
    </div>
  )
}

