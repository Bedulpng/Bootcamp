import type React from "react";

interface BooleanSelectProps {
  label: string;
  name: string;
  value: boolean | null; // Allow null for validation
  onChange: (name: string, value: boolean) => void;
  error?: string;
}

export const BooleanSelect: React.FC<BooleanSelectProps> = ({
  label,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value !== null ? value.toString() : ""}
        onChange={(e) => onChange(name, e.target.value === "true")}
        className={`mt-1 block w-full rounded-md shadow-sm ${
          error
            ? "border-red-300 focus:border-red-300 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-300 focus:ring-blue-500"
        } sm:text-sm`}
      >
        <option value="" disabled>
          Select an option
        </option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
