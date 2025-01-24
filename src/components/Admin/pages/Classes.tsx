import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClassModal } from "../Modal/ClassModal";
import { fetchClasses } from "@/Api/FetchingBatches&Classes";
import { Class } from "@/types/Trainee";
import { PenBoxIcon } from "lucide-react";
import { EditClassModal } from "../Modal/Edit-Modal/EditClassModal";

export default function Classes() {
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isEditClassOpen, setIsEditClassOpen] = useState(false);
  const [fetchedClasses, setFetchedClasses] = useState<Class[]>([]); // Store all classes fetched from the API

    useEffect(() => {
      const getClasses = async () => {
        try {
          const fetchedClasses = await fetchClasses();
          setFetchedClasses(fetchedClasses);
          console.log('Fetched classes:', fetchedClasses);
        } catch (error) {
          console.error('Failed to fetch classes:', error);
        } finally {
        }
      };
  
      getClasses();
    }, []);

  const handleOpenClassModal = () => {
    setIsClassModalOpen(true);
  };

  const handleCloseClassModal = () => {
    setIsClassModalOpen(false);
  };

  const handleOpenEdit = () => {
    setIsEditClassOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditClassOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Class Management</h2>
        <div className="flex flex-col gap-3">
          <Button onClick={handleOpenClassModal}>Create New Class</Button>
          <span className="ml-3">Showing {fetchedClasses.length} Class</span>
        </div>
        <ClassModal
            isOpen={isClassModalOpen}
            onClose={handleCloseClassModal}
            onSubmit={handleCloseClassModal}
        />
        <EditClassModal
            isOpen={isEditClassOpen}
            onClose={handleCloseEdit}
            onSubmit={handleCloseEdit}
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
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Participant</TableHead>
                <TableHead className="text-center">Instructor</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fetchedClasses.map((class_, index) => (
                <TableRow key={class_.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{class_.className}</TableCell>
                  <TableCell className="text-center">{class_.participant}</TableCell>
                  <TableCell className="text-center">{class_.mentors.length}</TableCell> 
                  <TableCell className="text-center">
                  {new Date(class_.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                    </TableCell> 
                  <TableCell className="text-center">
                    <Badge variant={
                      class_.status === "Tba" ? "secondary" :
                      class_.status === "Ongoing" ? "default" : "outline"
                    }>
                      {class_.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                  <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-yellow-600 hover:text-yellow-600"
                  onClick={handleOpenEdit}
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