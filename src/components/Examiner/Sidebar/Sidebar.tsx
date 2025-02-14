"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, Home, BookCheck, GraduationCap, UsersRound, LogOut, ListChecks } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SidebarExaminer({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) {

  return (
    <div
      className={`${isOpen ? "w-20" : "w-64"} h-screen bg-primary text-primary-foreground flex flex-col relative z-10 transition-all duration-300 ease-in-out`}
    >
      <div className="p-3.5 flex justify-between items-center border-b border-primary-foreground/20">
        {!isOpen && <img src="/white_logo_big.png" alt="logo" className="h-8 justify-center" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-primary-foreground/10"
        >
          {isOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          <NavItem icon={Home} label="Dashboard" to="/examiner/dashboard" isOpen={isOpen} />
          <NavItem icon={ListChecks} label="Submitted Final" to="/trainee/challenge" isOpen={isOpen} />
          <NavItem icon={BookCheck} label="Graded Final" to="/examiner/lesson" isOpen={isOpen} />
          <NavItem icon={GraduationCap} label="Class List" to="/examiner/lesson" isOpen={isOpen} />
          <NavItem icon={UsersRound} label="Trainee List" to="/examiner/lesson" isOpen={isOpen} />
        </nav>
      </ScrollArea>
      <div className="p-3 border-t border-primary-foreground/20">
        {/* Pass the logoutClick handler to the onClick prop */}
        <NavItem icon={LogOut} label="Logout" to="#" isOpen={isOpen} />
      </div>
      {/* <LogoutModal isOpen={showModal} onClose={handleCloseModal} onConfirm={confirmLogout} /> */}
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  to,
  isOpen,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  to: string;
  isOpen: boolean;
  onClick?: () => void;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the passed onClick function
    } else {
      navigate(to); // Default navigation behavior
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        flex items-center space-x-3 text-primary-foreground/80 hover:text-primary-foreground 
        hover:bg-primary-foreground/10 rounded-md p-3 transition-colors duration-200
        ${isOpen ? "justify-center" : ""}
      `}
    >
      <Icon className={`h-5 w-5 ${isOpen ? "mr-0" : "mr-3"}`} />
      {!isOpen && <span className="text-sm font-medium">{label}</span>}
    </button>
  );
}
