import { useState } from "react";
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
import UserModalForm from "../Modal/UserModal";
import { useEffect } from "react";
import { fetchUsers } from "@/Api/FetchUsers";
import { Trainee } from "@/types/Trainee";
import { PenBoxIcon, Trash2Icon } from "lucide-react";
import UserModalEdit from "../Modal/Edit-Modal/EditUserModal";
import { DeleteUserModal } from "../Modal/Edit-Modal/DeleteUserModal";
import NoSubmitted from "@/components/Examiner/Class/NoTask";

export default function Users() {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>(""); // State for selected batch ID
  const [fullName, setFullName] = useState<string>("");

  useEffect(() => {
    const getTrainees = async () => {
      try {
        const trainees = await fetchUsers();
        setTrainees(trainees);
      } catch (error) {
        console.error("Failed to fetch trainees:", error);
      } finally {
      }
    };

    getTrainees();
  }, []);

  const handleOpenUserModal = () => {
    setIsUserOpen(true);
  };

  const handleOpenUserEdit = () => {
    setIsEditUserOpen(true);
  };

  const handleOpenUserDelete = (id: string, fullName: string) => {
    setFullName(fullName); // Set the selected batch title
    setSelectedUserId(id); // Set the selected batch ID
    setIsDeleteUserOpen(true);
  };

  const handleCloseUserDelete = () => {
    setIsDeleteUserOpen(false);
  };

  const handleEditUsers = (id: string, fullName: string) => {
    setFullName(fullName); // Set the selected batch title
    setSelectedUserId(id); // Set the selected batch ID
    setIsEditUserOpen(true); // Open the modal for editing
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <div className="flex flex-col gap-3">
          <Button onClick={handleOpenUserModal}>Create New Users</Button>
          <span className="ml-3">Showing {trainees.length} Users</span>
        </div>
        <UserModalForm open={isUserOpen} setOpen={setIsUserOpen} />
        <UserModalEdit
          open={isEditUserOpen}
          setOpen={setIsEditUserOpen}
          id={selectedUserId}
          fullName={fullName}
        />
        <DeleteUserModal
          isOpen={isDeleteUserOpen}
          id={selectedUserId}
          fullName={fullName}
          onClose={handleCloseUserDelete}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          {trainees.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">#</TableHead>
                  <TableHead className="text-center">Full Name</TableHead>
                  <TableHead className="text-center">Email</TableHead>
                  <TableHead className="text-center">Role</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainees.map((user, index) => (
                  <TableRow key={user.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center flex flex-col items-center gap-2">
                      {user.fullName || "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.email ?? "-"}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          user.role === "TRAINEE"
                            ? "secondary"
                            : user.role === "MENTOR" || user.role === "EXAMINER"
                            ? "default"
                            : "outline"
                        }
                      >
                        {user.role ?? "-"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        variant={
                          user.userstatus === "VERIFIED"
                            ? "secondary"
                            : "default"
                        }
                      >
                        {user.userstatus ?? "-"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-yellow-600 hover:text-yellow-600"
                        onClick={() => {
                          handleEditUsers(user.id, user.fullName ?? "-");
                          handleOpenUserEdit();
                        }}
                      >
                        <PenBoxIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-500"
                        onClick={() =>
                          handleOpenUserDelete(user.id, user.fullName ?? "-")
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
