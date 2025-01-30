import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Users, BookOpen, GraduationCap, Award, BookCheck, UserRoundCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BatchModal } from "../Modal/BatchModal";
import { ClassModal } from "../Modal/ClassModal";
import UserModalForm from "../Modal/UserModal";
import { Trainee, Batch, Class, Certificate } from "@/types/Trainee";
import { fetchBatches, fetchClasses } from "@/Api/FetchingBatches&Classes";
import { fetchUsers } from "@/Api/FetchUsers";
import { fetchAllCertificates } from "@/Api/FetchCertificate";
import { useNotifications } from "@/hooks/useNotifications";

const iconMap: { [key: string]: React.ReactNode } = {
  Lesson: <BookCheck className="h-4 w-4" />,
  Challenge: <UserRoundCheck className="h-4 w-4" />,
};

export default function DashboardAdmin() {
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [fetchedBatch, setFetchedBatch] = useState<Batch[]>([]);
  const [fetchedClasses, setFetchedClasses] = useState<Class[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const { notifications } = useNotifications();
  const [visibleCount, setVisibleCount] = useState(5);
  const [isExpanded, setIsExpanded] = useState(false); // Track whether the section is expanded
  // Start with showing 5 notifications

  useEffect(() => {
    const getUsers = async () => {
      try {
        const trainees = await fetchUsers();
        setTrainees(trainees);
      } catch (error) {
        console.error("Failed to fetch:", error);
      } finally {
      }
    };

    getUsers();
  }, []);

  useEffect(() => {
    const getBatches = async () => {
      try {
        const fetchedBatch = await fetchBatches();
        setFetchedBatch(fetchedBatch);
        console.log("Fetched batch:", fetchedBatch);
      } catch (error) {
        console.error("Failed to fetch batch:", error);
      } finally {
      }
    };

    getBatches();
  }, []);

  useEffect(() => {
    const getClasses = async () => {
      try {
        const fetchedClasses = await fetchClasses();
        setFetchedClasses(fetchedClasses);
        console.log("Fetched classes:", fetchedClasses);
      } catch (error) {
        console.error("Failed to fetch classes:", error);
      } finally {
      }
    };

    getClasses();
  }, []);

  useEffect(() => {
    const getCert = async () => {
      try {
        const certificates = await fetchAllCertificates();
        setCertificates(certificates);
      } catch (error) {
        console.error("Failed to fetch batch:", error);
      } finally {
      }
    };

    getCert();
  }, []);

  const handleOpenUserModal = () => {
    setIsUserOpen(true);
  };

  const handleOpenBatchModal = () => {
    setIsBatchModalOpen(true);
  };

  const handleCloseBatchModal = () => {
    setIsBatchModalOpen(false);
  };

  const handleOpenClassModal = () => {
    setIsClassModalOpen(true);
  };

  const handleCloseClassModal = () => {
    setIsClassModalOpen(false);
  };

  const handleToggleShowMore = () => {
    if (isExpanded) {
      // Collapse to the initial 5 notifications
      setVisibleCount(5);
    } else {
      // Show all notifications
      setVisibleCount(notifications.length);
    }
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  const stats = [
    {
      title: "Total Users",
      value: trainees.length,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Active Batches",
      value: fetchedBatch.length,
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      title: "Active Classes",
      value: fetchedClasses.length,
      icon: GraduationCap,
      color: "bg-yellow-500",
    },
    {
      title: "Certificates Issued",
      value: certificates.length,
      icon: Award,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader
                className={cn(
                  "flex flex-row items-center justify-center space-y-0 pb-2 text-white",
                  stat.color
                )}
              >
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 ml-2" />
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-2">
                <div className="text-2xl font-bold mt-4">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* Recent Activity Card */}
      <Card className="col-span-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications
                .slice(0, visibleCount) // Show notifications based on the current visible count
                .map((notif) => {
                  const notificationIcon = notif.type === "info" ? "Lesson" : "Challenge";
                  return (
                    <div
                      key={notif.id}
                      className="flex items-center p-3 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="text-blue-500">{iconMap[notificationIcon]}</div>
                      <div className="ml-4 flex-cols items-center justify-center">
                        <p className="text-sm font-medium">{notif.title}</p>
                        <p className="text-xs text-gray-500">{notif.description}</p>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-center text-gray-500">No notifications available.</p>
            )}
          </div>
          {/* Show More / Show Less Button */}
          <div className="flex justify-center mt-4">
            <Button
              variant="outline"
              className="w-1/2"
              onClick={handleToggleShowMore}
            >
              {isExpanded ? "Show Less" : "Show More"} {/* Change label dynamically */}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <Button className="w-full" variant="outline" onClick={handleOpenBatchModal}>
              Create New Batch
            </Button>
            <BatchModal isOpen={isBatchModalOpen} onClose={handleCloseBatchModal} />
            <Button className="w-full" variant="outline" onClick={handleOpenUserModal}>
              Add New User
            </Button>
            <UserModalForm open={isUserOpen} setOpen={setIsUserOpen} />
            <Button className="w-full" variant="outline" onClick={handleOpenClassModal}>
              Schedule Class
            </Button>
            <ClassModal
              isOpen={isClassModalOpen}
              onClose={handleCloseClassModal}
              onSubmit={handleCloseClassModal}
            />
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
}
