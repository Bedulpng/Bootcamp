import type React from "react"

interface SkillRatingProps {
  index: number
  skill: { name: string; rating: number }
  onChange: (index: number, name: string, rating: number) => void
  error?: string
}

export const SkillRating: React.FC<SkillRatingProps> = ({ index, skill, onChange, error }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={`skill-${index}`} className="block text-sm font-medium text-gray-700">
        Skill {index + 1}
      </label>
      <div className="flex space-x-2">
        <input
          type="text"
          id={`skill-${index}`}
          value={skill.name}
          onChange={(e) => onChange(index, e.target.value, skill.rating)}
          className={`mt-1 block w-full rounded-md shadow-sm ${
            error
              ? "border-red-300 focus:border-red-300 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-300 focus:ring-blue-500"
          } sm:text-sm`}
          placeholder="Enter skill name"
        />
        <select
          value={skill.rating}
          onChange={(e) => onChange(index, skill.name, Number.parseInt(e.target.value))}
          className="mt-1 block w-24 rounded-md shadow-sm border-gray-300 focus:border-blue-300 focus:ring-blue-500 sm:text-sm"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

