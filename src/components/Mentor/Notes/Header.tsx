import React from "react";

type HeaderProps = {
  filter: "All" | "Trainee" | "Admin";
  setFilter: React.Dispatch<React.SetStateAction<"All" | "Trainee" | "Admin">>;
};

export default function Header({ }: HeaderProps) {
  return (
    <header className="bg-transparent">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Notes Manager</h1>
      </div>
    </header>
  );
}
