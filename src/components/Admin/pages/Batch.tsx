import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BatchModal } from "../Modal/BatchModal";
import { fetchBatches } from "@/Api/FetchingBatches&Classes";
import { Batch } from "@/types/Trainee";


export default function BatchAdmin() {
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [fetchedBatch, setFetchedBatch] = useState<Batch[]>([]);

   useEffect(() => {
      const getBatches = async () => {
        try {
          const fetchedBatch = await fetchBatches();
          setFetchedBatch(fetchedBatch);
          console.log("Batch Data", fetchedBatch);
        } catch (error) {
          console.error("Failed to fetch batch:", error);
        } finally {
        }
      };
  
      getBatches();
    }, []);

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
        <div className="flex flex-col gap-3">
          <Button onClick={handleOpenBatchModal}>Create New Batch</Button>
          <span className="ml-3">Showing {fetchedBatch.length} Batch</span>
        </div>
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
                <TableHead className="text-center">Batch ID</TableHead>
                <TableHead className="text-center">Batch Number</TableHead>
                <TableHead className="text-center">Batch Title</TableHead>
                <TableHead className="text-center">Participants</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fetchedBatch.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="text-center">{batch.id}</TableCell>
                  <TableCell className="text-center">{batch.batchNum}</TableCell>
                  <TableCell className="text-center">{batch.batchTitle}</TableCell>
                  <TableCell className="text-center">{batch.participants.length}</TableCell>
                  <TableCell className="text-center">{batch.status}</TableCell>
                  <TableCell className="text-center">
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