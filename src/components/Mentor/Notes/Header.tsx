import React from "react";

type HeaderProps = {
  filter: "All" | "FOR_TRAINEE" | "FOR_GRADER";
  setFilter: React.Dispatch<React.SetStateAction<"All" | "FOR_TRAINEE" | "FOR_GRADER">>;
};

export default function Header({ }: HeaderProps) {
  return (
    <header className="bg-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      </div>
    </header>
  );
}
