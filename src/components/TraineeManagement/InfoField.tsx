interface InfoFieldProps {
  label: string;
  value: string;
  emoji: string;
}

export function InfoField({ label, value, emoji }: InfoFieldProps) {
  return (
    <div className="bg-white/50 rounded-xl p-4 shadow-md">
      <p className="text-sm text-blue-500 font-medium flex items-center gap-2">
        {emoji} {label}
      </p>
      <p className="text-lg font-medium text-blue-800 mt-1">{value}</p>
    </div>
  );
}