"use client";

import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Users,
  BookOpen,
  Trophy,
  ChevronRight,
  ArrowLeft,
  X,
  User2Icon,
} from "lucide-react";
import { Class, File } from "@/types/Trainee";
import { fetchClassById } from "@/Api/FetchBatchbyMentor";
import LessonModal from "./Modal/LessonUpload";
import ChallengeModal from "./Modal/ChallengeUpload";

interface ItemDetails {
  id: string;
  title: string;
  description: string;
  files?: File[];
  deadline?: string;
}

export default function ClassDetails() {
  const { classId } = useParams<{ classId: string }>();
  const [activeTab, setActiveTab] = useState("participants");
  const [isNavExpanded, setIsNavExpanded] = useState(true);
  const [selectedItem, setSelectedItem] = useState<ItemDetails | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classData = await fetchClassById(classId);
        console.log("Class Data:", classData);
        setClasses(classData);
      } catch (error) {
        console.error("Failed to fetch class:", error);
      }
    };

    fetchData();
  }, []);

  const tabVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.3 } },
  };

  const expandVariants = {
    collapsed: {
      gridTemplateColumns: "1fr",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    expanded: {
      gridTemplateColumns: "1fr 1fr",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  };

  const navItems = [
    { id: "participants", icon: Users, label: "Participants" },
    { id: "challenges", icon: Trophy, label: "Challenges" },
    { id: "lessons", icon: BookOpen, label: "Lessons" },
  ];

  const handleItemClick = (item: ItemDetails) => {
    setSelectedItem(item);
  };

  const closeExpanded = () => {
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Link to={`/dashboard/batch`}>
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to Classes</span>
          </Button>
        </Link>
        <div className="top-4 right-4 z-50">
          {activeTab === "challenges" ? (
            <ChallengeModal />
          ) : activeTab === "lessons" ? (
            <LessonModal />
          ) : null}
        </div>
        {/* <h1 className="text-3xl font-bold">{classes.title}</h1> */}
      </div>

      <div className="flex">
        <nav
          className={`bg-white rounded-lg shadow-md p-2 mr-6 transition-all duration-300 h-full ${
            isNavExpanded ? "w-64" : "w-16"
          }`}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="mb-4 w-full flex justify-center"
          >
            <ChevronRight
              className={`h-6 w-6 transition-transform duration-300 ${
                isNavExpanded ? "rotate-180" : ""
              }`}
            />
            <span className="sr-only">
              {isNavExpanded ? "Collapse navigation" : "Expand navigation"}
            </span>
          </Button>
          <div className="flex flex-col gap-2 overflow-hidden">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-4 py-2 rounded-md text-lg font-semibold transition-all duration-300 h-10 ${
                  activeTab === item.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span
                  className={`ml-2 transition-opacity duration-300 ${
                    isNavExpanded ? "opacity-100 w-auto" : "opacity-0 w-0"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>

        <AnimatePresence mode="wait">
          <div
            key={activeTab}
            className="container mx-auto px-4 min-h-screen overflow-hidden"
          >
            {activeTab === "participants" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(classes) &&
                  classes.map((classItem, index) =>
                    classItem.users.map((user, userIndex) => (
                      <Card
                        key={`${index}-${userIndex}`}
                        className="overflow-hidden"
                      >
                        <CardContent className="p-4 flex items-center">
                          {user.profiles?.[0]?.filepath ? (
                            <img
                              src={`http://10.10.103.13:4000${user.profiles[0].filepath
                                .replace(/\\/g, "/")
                                .replace("public", "")}`}
                              alt={user.fullName || "No userName"}
                              width={50}
                              height={50}
                              className="rounded-full mr-4"
                            />
                          ) : (
                            <User2Icon className="w-12 h-12 text-gray-500 mr-4 rounded-full" />
                          )}
                          <div>
                            <h3 className="font-semibold">
                              {user.fullName || "No userName"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {user.role || "Student"}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
              </div>
            )}
            {(activeTab === "challenges" || activeTab === "lessons") && (
              <div className="relative">
                {/* Upload Form Positioned on Top Right */}

                <div className="grid gap-4">
                  <ScrollArea className="h-[calc(100vh-200px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-4">
                      {classes.length === 0 ||
                      (activeTab === "challenges" &&
                        classes.every(
                          (classItem) => classItem.challenges.length === 0
                        )) ||
                      (activeTab === "lessons" &&
                        classes.every(
                          (classItem) => classItem.lessons.length === 0
                        )) ? (
                        <p className="text-gray-600 text-center">
                          No {activeTab} yet
                        </p>
                      ) : (
                        classes
                          .flatMap((classItem) =>
                            activeTab === "challenges"
                              ? classItem.challenges
                              : classItem.lessons
                          )
                          .map((item, index) => (
                            <div
                              key={index}
                              className={`overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ${
                                selectedItem === item
                                  ? "shadow-lg"
                                  : ""
                              }`}
                              onClick={() => handleItemClick(item)}
                            >
                              <Card>
                                <CardHeader>
                                  <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-600 truncate">
                                    {item.description}
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                          ))
                      )}
                    </div>
                  </ScrollArea>

                  {selectedItem && (
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg p-6 border border-blue-200">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold text-blue-800">
                          {selectedItem.title}
                        </h2>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={closeExpanded}
                        >
                          <X className="h-6 w-6" />
                          <span className="sr-only">Close details</span>
                        </Button>
                      </div>

                      <p className="text-gray-700 mb-4">
                        {selectedItem.description}
                      </p>

                      {selectedItem.files &&
                        selectedItem.files.map((file, index) => (
                          <p
                            key={index}
                            className="text-sm font-semibold text-blue-600 mb-2"
                          >
                            File: {file.filename}
                          </p>
                        ))}

                      {selectedItem.deadline && (
                        <p className="text-sm font-semibold text-blue-600">
                          Deadline:{" "}
                          {new Date(selectedItem.deadline).toLocaleString()}
                        </p>
                      )}

                      {/* Separator line */}
                      <hr className="my-4 border-blue-300" />

                      {/* Assignment & Submission Button */}
                      <button
                        className="w-full py-2 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
                        onClick={() =>
                          navigate(
                            `/dashboard/c/${classId}/s/${selectedItem.id}`
                          )
                        }
                      >
                        Assignment & Submission
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
