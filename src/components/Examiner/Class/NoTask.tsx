import { BugIcon as Spider } from "lucide-react";

export default function NoSubmitted() {
  const messages = [
    "No submissions yet!",
    "Waiting for something amazing...",
    "Still empty here!",
    "Nothing to see... for now.",
    "Do Something man!",
    "No submissions found!",
    "I Hev Noting :(",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="text-gray-400 mb-4">
        <Spider size={64} />
      </div>
      <p className="text-xl font-semibold text-gray-600">{randomMessage}</p>
    </div>
  );
}
