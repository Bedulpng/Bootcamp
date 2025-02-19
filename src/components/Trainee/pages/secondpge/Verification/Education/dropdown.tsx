import type React from "react"

interface DropdownProps {
  label: string
  name: string
  value: string
  onChange: (name: string, value: string) => void
  options: string[]
  error?: string
}

export const Dropdown: React.FC<DropdownProps> = ({ label, name, value, onChange, options, error }) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`mt-1 block w-full rounded-md shadow-sm ${
          error
            ? "border-red-300 focus:border-red-300 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-300 focus:ring-blue-500"
        } sm:text-sm`}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  )
}

