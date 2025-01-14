import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClassModal } from "../Modal/ClassModal";

const classData = [
  { id: "C001", name: "Introduction to HTML", instructor: "Jane Smith", time: "09:00 AM", status: "Upcoming" },
  { id: "C002", name: "JavaScript Basics", instructor: "Mike Johnson", time: "11:00 AM", status: "In Progress" },
  { id: "C003", name: "React Fundamentals", instructor: "Sarah Wilson", time: "02:00 PM", status: "Completed" },
  { id: "C004", name: "Database Design", instructor: "John Doe", time: "04:00 PM", status: "Upcoming" },
];

export default function Classes() {
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);

  const handleOpenClassModal = () => {
    setIsClassModalOpen(true);
  };

  const handleCloseClassModal = () => {
    setIsClassModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Class Management</h2>
        <Button onClick={handleOpenClassModal}>Schedule New Class</Button>
        <ClassModal
            isOpen={isClassModalOpen}
            onClose={handleCloseClassModal}
            onSubmit={handleCloseClassModal}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Classes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Class ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Instructor</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classData.map((class_) => (
                <TableRow key={class_.id}>
                  <TableCell>{class_.id}</TableCell>
                  <TableCell>{class_.name}</TableCell>
                  <TableCell>{class_.instructor}</TableCell>
                  <TableCell>{class_.time}</TableCell>
                  <TableCell>
                    <Badge variant={
                      class_.status === "Upcoming" ? "secondary" :
                      class_.status === "In Progress" ? "default" : "outline"
                    }>
                      {class_.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}