import type React from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CustomPhoneInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}

export const CustomPhoneInput: React.FC<CustomPhoneInputProps> = ({
  label,
  name,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="space-y-1 w-full">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="w-full border rounded-md shadow-sm">
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          defaultCountry="ID"
          value={value}
          onChange={(newValue) => onChange(name, newValue || "")}
          className="w-full flex p-2 rounded-md focus:outline-none"
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
