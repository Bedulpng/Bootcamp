import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BatchEdit } from "../Modal/Edit-Modal/EditBatchModal";
import { fetchBatches } from "@/Api/FetchingBatches&Classes";
import { Batch } from "@/types/Trainee";
import { PenBoxIcon } from "lucide-react";
import { BatchModal } from "../Modal/BatchModal";

export default function BatchAdmin() {
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isBatchEditOpen, setIsBatchEditOpen] = useState(false);
  const [fetchedBatch, setFetchedBatch] = useState<Batch[]>([]);
  const [selectedBatchId, setSelectedBatchId] = useState<string>(""); // State for selected batch ID
  const [batchTitle, setSelectedBatchTitle] = useState<string>(""); // State for selected batch title

  useEffect(() => {
    const getBatches = async () => {
      try {
        const fetchedBatchs = await fetchBatches();
        setFetchedBatch(fetchedBatchs);
        console.log("Batch Data", fetchedBatch);
      } catch (error) {
        console.error("Failed to fetch batch:", error);
      }
    };

    getBatches();
  }, []);

  const handleOpenBatchModal = () => {
    setIsBatchModalOpen(true);
  };

  const handleCloseBatchEditModal = () => {
    setIsBatchEditOpen(false);
  };

  const handleCloseBatchModal = () => {
    setIsBatchModalOpen(false);
  };

  const handleEditBatch = (batchId: string, batchTitle: string) => {
    setSelectedBatchTitle(batchTitle); // Set the selected batch title
    setSelectedBatchId(batchId); // Set the selected batch ID
    setIsBatchEditOpen(true); // Open the modal for editing
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Batch Management</h2>
        <div className="flex flex-col gap-3">
          <Button onClick={handleOpenBatchModal}>Create New Batch</Button>
          <span className="ml-3">Showing {fetchedBatch.length} Batches</span>
        </div>
        <BatchEdit
          isOpen={isBatchEditOpen}
          onClose={handleCloseBatchEditModal}
          batchId={selectedBatchId}
          batchTitles={batchTitle}
        />
        <BatchModal 
          isOpen={isBatchModalOpen} 
          onClose={handleCloseBatchModal}
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
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">Batch Number</TableHead>
                <TableHead className="text-center">Batch Title</TableHead>
                <TableHead className="text-center">Participants</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fetchedBatch.map((batch, index) => (
                <TableRow key={batch.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{batch.batchNum}</TableCell>
                  <TableCell className="text-center">{batch.batchTitle}</TableCell>
                  <TableCell className="text-center">{batch.participants.length}</TableCell>
                  <TableCell className="text-center">{batch.status}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-yellow-600 hover:text-yellow-600"
                      onClick={() => {
                        console.log("Edit Batch", batch.id, batch.batchTitle);
                        handleEditBatch(batch.id, batch.batchTitle)}} // Pass the batch ID on click
                    >
                      <PenBoxIcon className="h-4 w-4" />
                    </Button>
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
