import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Users, 
  GraduationCap,
  Award,
  ClipboardList,
  Layers,
  Wrench
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'batch', label: 'Batch', icon: Layers },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'classes', label: 'Class Management', icon: GraduationCap },
  { id: 'certificates', label: 'Certificate Management', icon: Award },
  { id: 'notes', label: 'Notes Management', icon: ClipboardList },
  { id: 'access', label: 'Routes Access', icon: Wrench },
];

export default function SidebarAdmin({ isOpen, setIsOpen, currentPage, setCurrentPage }: SidebarProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 h-screen transition-all duration-300 ease-in-out",
        "border-r border-gray-200 dark:border-gray-700",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {isOpen && (
          <img
          src="/Logo_black_big.png"
          alt="Logo"
          width={150}
          height={50}
          className="rounded"
        />
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "hover:bg-gray-100 dark:hover:bg-gray-700",
            !isOpen && "w-full"
          )}
        >
          {isOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="mt-4 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full mb-1",
                isOpen ? "justify-start px-3" : "justify-center px-2",
                "hover:bg-gray-100 dark:hover:bg-gray-700",
                currentPage === item.id && "bg-gray-100 dark:bg-gray-700"
              )}
              onClick={() => setCurrentPage(item.id)}
            >
              <Icon className={cn("h-5 w-5", isOpen && "mr-2")} />
              {isOpen && <span>{item.label}</span>}
            </Button>
          );
        })}
      </nav>
    </div>
  );
}