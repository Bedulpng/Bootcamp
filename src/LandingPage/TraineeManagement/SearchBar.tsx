import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={24} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Find Trainee's Name or Nickname 🔍"
        className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-full focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200 text-lg transition-all shadow-lg"
      />
    </div>
  );
}