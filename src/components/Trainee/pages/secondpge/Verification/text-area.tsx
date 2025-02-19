import type React from "react"

interface TextAreaProps {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
}

export const TextArea: React.FC<TextAreaProps> = ({ label, name, value, onChange, error, placeholder }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className={`mt-1 block w-full rounded-md shadow-sm ${
          error
            ? "border-red-300 focus:border-red-300 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-300 focus:ring-blue-500"
        } sm:text-sm`}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

