import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Users, BookOpen, GraduationCap, Award, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BatchModal } from "../Modal/BatchModal";
import { ClassModal } from "../Modal/ClassModal";
import UserModalForm from "../Modal/UserModal";

export default function DashboardAdmin() {
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const handleOpenUserModal = () => {
    setIsUserOpen(true);
  }

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

  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      trend: "+12%",
      trendUp: true,
      color: "bg-blue-500",
    },
    {
      title: "Active Batches",
      value: "42",
      icon: BookOpen,
      trend: "+4%",
      trendUp: true,
      color: "bg-green-500",
    },
    {
      title: "Classes Today",
      value: "8",
      icon: GraduationCap,
      trend: "-2",
      trendUp: false,
      color: "bg-yellow-500",
    },
    {
      title: "Certificates Issued",
      value: "856",
      icon: Award,
      trend: "+24%",
      trendUp: true,
      color: "bg-purple-500",
    },
  ];

  const activities = [
    {
      icon: BookOpen,
      title: "New batch created: Web Development",
      time: "2 hours ago",
    },
    {
      icon: Award,
      title: "Certificate issued to John Doe",
      time: "3 hours ago",
    },
    {
      icon: Activity,
      title: "Class scheduled: React Basics",
      time: "1 day ago",
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
                  "flex flex-row items-center justify-between space-y-0 pb-2 text-white",
                  stat.color
                )}
              >
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4" />
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center space-y-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p
                  className={cn(
                    "text-xs",
                    stat.trendUp ? "text-green-600" : "text-red-600"
                  )}
                >
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center p-3 border rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Icon className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => (window.location.href = "/notification")}
              >
                Show More
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center space-y-4">
            <Button className="w-full" variant="outline" onClick={handleOpenBatchModal}>
              Create New Batch
            </Button>
            <BatchModal
              isOpen={isBatchModalOpen}
              onClose={handleCloseBatchModal}
              onSubmit={handleCloseBatchModal}
            />
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
  );
}
