import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChallengeCard } from "./ChallengeCard";
import { LessonSkeleton } from "../../../Skeleton/LessonSkeleton";
import { FileText } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { Challenge } from "@/types/Trainee";
import axios from "axios";

export function NoChallenge() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
      <div className="rounded-full bg-muted p-3 mb-4">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold">Nothing here yet</h3>
      <p className="text-sm text-muted-foreground">No challenge found for the selected filters.</p>
    </motion.div>
  );
}

interface Tab {
  value: string;
  label: string;
}

interface AnimatedTabsProps {
  value: string;
  onValueChange: (value: string) => void;
  tabs: Tab[];
}

function AnimatedTabs({ value, onValueChange, tabs }: AnimatedTabsProps) {
  return (
    <div className="flex space-x-1 rounded-xl bg-muted p-1 flex-grow">
      {tabs.map((tab) => (
        <motion.button
          key={tab.value}
          className={`${
            value === tab.value ? "bg-background text-foreground" : "text-muted-foreground"
          } relative rounded-lg px-3 py-1.5 text-sm font-medium transition focus-visible:outline-2 flex-grow`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
          onClick={() => onValueChange(tab.value)}
        >
          {value === tab.value && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-background mix-blend-difference"
              style={{ borderRadius: 8 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </motion.button>
      ))}
    </div>
  );
}

export default function ChallengesPage() {
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");
  const [filteredChallenges, setFilteredChallenges] = useState<Challenge[]>([]);
  const [classList, setClassList] = useState<{ id: string; className: string }[]>([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token is missing");
        }
        const decodedToken = jwtDecode<{ id: string }>(refreshToken);
        const userId = decodedToken.id;

        const response = await axios.get(`http://192.168.1.7:4000/trainee/class/user/${userId}`);
        setClassList(response.data.map((cls: { id: string; className: string }) => ({
          id: cls.id,
          className: cls.className,
        })));
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) {
          throw new Error("Refresh token is missing");
        }
        const decodedToken = jwtDecode<{ id: string }>(refreshToken);
        const userId = decodedToken.id;

        let url = `http://192.168.1.7:4000/mentor/class-challenge/${userId}`;

        // Only add query params if "ALL" is not selected
        if (selectedStatus !== "ALL" || selectedClass !== "all") {
          const params: Record<string, string> = {};
          if (selectedClass !== "all") {
            params.classId = selectedClass;
          }
          if (selectedStatus !== "ALL") {
            params.challengeStatus = selectedStatus;
          }

          url += `?${new URLSearchParams(params).toString()}`;
        }

        // Fetch data using axios
        const response = await axios.get(url);

        // Flatten the lessons arrays into a single array
        const challenges = response.data.flatMap((item: { challenges: any[] }) => item.challenges);

        setFilteredChallenges(challenges);
      } catch (error) {
        console.error("Error fetching challenge:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, [selectedClass, selectedStatus]);

  if (loading) {
    return (
      <div className="space-y-4 p-4">
        {[...Array(4)].map((_, i) => (
          <LessonSkeleton key={i} />
        ))}
      </div>
    );
  }

  const tabs = [
    { value: "ALL", label: "All" },
    { value: "ASSIGNED", label: "Assigned" },
    { value: "SUBMITTED", label: "Submitted" },
    { value: "NOTSUBMITTED", label: "Not Submitted" },
    { value: "LATE", label: "Late" },
    { value: "GRADED", label: "Graded" },
  ];

  return (
    <div className="space-y-6 p-4">
      <div className="flex space-x-4 items-center">
        <AnimatedTabs value={selectedStatus} onValueChange={setSelectedStatus} tabs={tabs} />
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select class" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Classes</SelectItem>
            {classList.map((cls) => (
              <SelectItem key={cls.id} value={cls.id}>
                {cls.className}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="space-y-4">
          {filteredChallenges.length > 0 ? (
            filteredChallenges.map((challenge, index) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <ChallengeCard
                  selectedChallengeId={challenge.id}
                  title={challenge.title}
                  description={challenge.description}
                  mentor={challenge.mentor}
                  completionStatus={challenge.completionStatus}
                />
              </motion.div>
            ))
          ) : (
            <NoChallenge />
          )}
        </div>
      </AnimatePresence>
    </div>
  );
}
