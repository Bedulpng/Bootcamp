import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UserModalForm from "../Modal/UserModal";
import { useEffect } from "react";
import { fetchUsers } from "@/Api/FetchUsers";
import { Trainee } from "@/types/Trainee";

export default function Users() {
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [trainees, setTrainees] = useState<Trainee[]>([]);

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
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <div className="flex flex-col gap-3">
          <Button onClick={handleOpenUserModal}>Create New Batch</Button>
          <span className="ml-3">Showing {trainees.length} Users</span>
        </div>
        <UserModalForm open={isUserOpen} setOpen={setIsUserOpen} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">#</TableHead> {/* New column for numbering */}
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
                    {user.fullName || "-  "} 
                  </TableCell>
                  <TableCell className="text-center">{user.email}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      user.role === "TRAINEE" ? "secondary" :
                      user.role === "MENTOR" || user.role === "EXAMINER" ? "default" : "outline"
                    }>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={
                      user.userstatus === "VERIFIED" ? "secondary" : "default"
                    }>
                      {user.userstatus}
                    </Badge>
                  </TableCell>
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
