"use client";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "lucide-react";
import { Class, File } from "@/types/Trainee";
import { fetchClassById } from "@/Api/FetchBatchbyMentor";
import LessonModal from "./Modal/LessonUpload";
import ChallengeModal from "./Modal/ChallengeUpload";

interface ItemDetails {
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
        <Link to="/dashboard/batch">
          <Button variant="ghost" size="icon" className="rounded-full">
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to Classes</span>
          </Button>
        </Link>
        {/* <h1 className="text-3xl font-bold">{classes.title}</h1> */}
      </div>

      <div className="flex">
        <nav
          className={`bg-white rounded-lg shadow-md p-4 mr-6 transition-all duration-300 ${
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
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center w-full px-4 py-2 mb-2 rounded-md text-lg font-semibold transition-all duration-300 ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {isNavExpanded && <span className="ml-2">{item.label}</span>}
            </button>
          ))}
        </nav>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex-1 overflow-hidden"
          >
            {activeTab === "participants" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.isArray(classes) &&
                  classes.map((classItem, index) =>
                    classItem.users.map((user, userIndex) => (
                      <motion.div
                        key={`${index}-${userIndex}`} // Combine indices for unique key
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        <Card className="overflow-hidden">
                          <CardContent className="p-4 flex items-center">
                            <img
                              src={
                                user.profiles?.[0]?.filepath
                                  ? (console.log(
                                      "Filepath:",
                                      user.profiles[0].filepath
                                    ),
                                    `http://192.168.181.104:4000${user.profiles[0].filepath
                                      .replace(/\\/g, "/")
                                      .replace("public", "")}`)
                                  : "/placeholder.svg"
                              }
                              alt={user.fullName || "No userName"}
                              width={50}
                              height={50}
                              className="rounded-full mr-4"
                            />
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
                      </motion.div>
                    ))
                  )}
              </div>
            )}
            {(activeTab === "challenges" || activeTab === "lessons") && (
              <div className="relative">
                {/* Upload Form Positioned on Top Right */}
                <div className="absolute top-4 right-4 z-50 ">
                  {activeTab === "challenges" ? (
                    <ChallengeModal />
                  ) : (
                    <LessonModal />
                  )}
                </div>

                <motion.div
                  variants={expandVariants}
                  initial="collapsed"
                  animate={selectedItem ? "expanded" : "collapsed"}
                  className="grid gap-4"
                >
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
                            <motion.div
                              key={index}
                              variants={cardVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                            >
                              <Card
                                className={`overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 ${
                                  selectedItem === item
                                    ? "ring-2 ring-blue-500"
                                    : ""
                                }`}
                                onClick={() => handleItemClick(item)}
                              >
                                <CardHeader>
                                  <CardTitle>{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <p className="text-sm text-gray-600 truncate">
                                    {item.description}
                                  </p>
                                </CardContent>
                              </Card>
                            </motion.div>
                          ))
                      )}
                    </div>
                  </ScrollArea>

                  <AnimatePresence>
                    {selectedItem && (
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-lg p-6 border border-blue-200"
                      >
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {Array.isArray(classes) && classes.length > 0 ? (
                            classes.map((classItem) =>
                              classItem.users.map((user) => (
                                <motion.div
                                  key={user.id} // Assuming `user.id` is unique
                                  variants={cardVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                >
                                  <Card className="overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                                    <CardContent className="p-6 flex items-center space-x-4">
                                      <img
                                        src={
                                          user.profiles?.[0]?.filepath
                                            ? `http://192.168.181.104:4000${user.profiles[0].filepath
                                                .replace(/\\/g, "/")
                                                .replace("public", "")}`
                                            : "/placeholder.svg"
                                        }
                                        alt={user.fullName || "No userName"}
                                        width={60}
                                        height={60}
                                        className="rounded-full border-2 border-blue-300"
                                      />
                                      <div>
                                        <h3 className="text-lg font-bold text-gray-800">
                                          {user.fullName || "No userName"}
                                        </h3>
                                        <p className="text-sm text-blue-600">
                                          {user.role || "Student"}
                                        </p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              ))
                            )
                          ) : (
                            <p className="text-center col-span-full text-gray-600">
                              No users found in the classes.
                            </p>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
