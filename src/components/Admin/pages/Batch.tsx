import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BatchModal } from "../Modal/BatchModal";

const batchData = [
  { id: "B001", name: "Web Development", startDate: "2024-01-15", students: 25, status: "Active" },
  { id: "B002", name: "Data Science", startDate: "2024-02-01", students: 30, status: "Active" },
  { id: "B003", name: "UI/UX Design", startDate: "2024-01-10", students: 20, status: "Completed" },
  { id: "B004", name: "Mobile Development", startDate: "2024-02-15", students: 28, status: "Active" },
];

export default function BatchAdmin() {
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

  const handleOpenBatchModal = () => {
    setIsBatchModalOpen(true);
  };

  const handleCloseBatchModal = () => {
    setIsBatchModalOpen(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Batch Management</h2>
        <Button onClick={handleOpenBatchModal}>Create New Batch</Button>
        <BatchModal
              isOpen={isBatchModalOpen}
              onClose={handleCloseBatchModal}
              onSubmit={handleCloseBatchModal}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Batches</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batchData.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell>{batch.id}</TableCell>
                  <TableCell>{batch.name}</TableCell>
                  <TableCell>{batch.startDate}</TableCell>
                  <TableCell>{batch.students}</TableCell>
                  <TableCell>{batch.status}</TableCell>
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