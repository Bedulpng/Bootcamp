import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ClassModal } from "../Modal/ClassModal";
import { fetchClasses } from "@/Api/FetchingBatches&Classes";
import { Class } from "@/types/Trainee";
import { PenBoxIcon, Trash2Icon, Wallpaper } from "lucide-react";
import { EditClassModal } from "../Modal/Edit-Modal/EditClassModal";
import { ColorPickerModal } from "@/components/Mentor/ClassCard/ColorPickerModal";
import { ImageCropModal } from "@/components/Mentor/ClassCard/ImageCropModal";
import NoSubmitted from "@/components/Examiner/Class/NoTask";
import { DeleteClassModal } from "../Modal/Edit-Modal/DeleteClass";

export default function Classes() {
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isEditClassOpen, setIsEditClassOpen] = useState(false);
  const [fetchedClasses, setFetchedClasses] = useState<Class[]>([]); // Store all classes fetched from the API
  const [selectedClassId, setSelectedClassId] = useState<string>(""); // Track the selected class ID
  const [selectedClassTitle, setSelectedClassTitle] = useState<string>("");
  const [coverImagePath, setCoverImagePath] = useState<string>("");
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isImageCropOpen, setIsImageCropOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>(""); // State for selected batch ID
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

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

  const handleOpenClassModal = () => {
    setIsClassModalOpen(true);
  };

  const handleCloseClassModal = () => {
    setIsClassModalOpen(false);
  };

  const handleOpenEdit = (classId: string, classTitle: string) => {
    setSelectedClassId(classId); // Set the selected class ID
    setSelectedClassTitle(classTitle);
    setIsEditClassOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditClassOpen(false);
  };

  const handleEditCover = (
    batchId: string,
    classTitle: string,
    coverImage: string
  ) => {
    setSelectedClassTitle(classTitle);
    setSelectedClassId(batchId);
    setCoverImagePath(coverImage);

    setTimeout(() => {
      setIsColorPickerOpen(true);
    }, 0); // Allow state update before opening modal
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setTempImageUrl(imageUrl);
    setIsImageCropOpen(true);
  };

  const handleCropComplete = () => {
    setIsColorPickerOpen(false);
    setIsImageCropOpen(false);
  };

  const handleOpenUserDelete = (id: string, title: string) => {
    setTitle(title); // Set the selected batch title
    setSelectedId(id); // Set the selected batch ID
    setIsDeleteOpen(true);
  };

  const handleCloseUserDelete = () => {
    setIsDeleteOpen(false);
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
          selectedClassId={selectedClassId}
          selectedClassTitle={selectedClassTitle}
        />
        <DeleteClassModal
                  isOpen={isDeleteOpen}
                  id={selectedId}
                  classTitle={title}
                  onClose={handleCloseUserDelete}
                />
        {isColorPickerOpen && selectedClassId && (
          <ColorPickerModal
            isOpen={isColorPickerOpen}
            onClose={() => setIsColorPickerOpen(false)}
            onImageUpload={handleImageUpload}
            currentCoverImage={coverImagePath}
            className={selectedClassTitle}
            classId={selectedClassId}
          />
        )}

        {isImageCropOpen && tempImageUrl && (
          <ImageCropModal
            isOpen={isImageCropOpen}
            onClose={() => setIsImageCropOpen(false)}
            imageUrl={tempImageUrl}
            onCropComplete={handleCropComplete}
            classId={selectedClassId}
          />
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Classes Available</CardTitle>
        </CardHeader>
        <CardContent>
          {fetchedClasses.length > 0 ? (
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
                {fetchedClasses.map((classes, index) => (
                  <TableRow key={classes.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">
                      {classes.className ?? "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      {classes.participant ?? 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {classes.mentors?.length ?? 0}
                    </TableCell>
                    <TableCell className="text-center">
                      {classes.createdAt
                        ? new Date(classes.createdAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          classes.status === "Tba"
                            ? "secondary"
                            : classes.status === "Ongoing"
                            ? "default"
                            : "outline"
                        }
                      >
                        {classes.status ?? "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-yellow-600 hover:text-yellow-600"
                        onClick={() =>
                          handleOpenEdit(classes.id, classes.className)
                        }
                      >
                        <PenBoxIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-green-600 hover:text-green-600"
                        onClick={() =>
                          handleEditCover(
                            classes.id,
                            classes.className,
                            classes.cover?.filePath ?? ""
                          )
                        }
                      >
                        <Wallpaper className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-500"
                        onClick={() =>
                          // handleOpenUserDelete(user.id, user.fullName ?? "-")
                          handleOpenUserDelete(classes.id, classes.className ?? "-")
                        }
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <NoSubmitted />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
