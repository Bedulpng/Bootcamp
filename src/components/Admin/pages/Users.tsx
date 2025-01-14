import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import UserModalForm from "../Modal/UserModal";

const userData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "TRAINEE", status: "VERIFIED" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "MENTOR", status: "VERIFIED" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "TRAINEE", status: "UNVERIFIED" },
  { id: 4, name: "Sarah Wilson", email: "sarah@example.com", role: "EXAMINER", status: "VERIFIED" },
];

export default function Users() {
  const [isUserOpen, setIsUserOpen] = useState(false);

  const handleOpenUserModal = () => {
    setIsUserOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <Button onClick={handleOpenUserModal}>Add New User</Button>
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
                <TableHead className="text-center">User</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userData.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center">{index + 1}</TableCell> {/* Auto-increment number */}
                  <TableCell className="text-center flex flex-col items-center gap-2">
                    {user.name}
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
                      user.status === "VERIFIED" ? "secondary" : "default"
                    }>
                      {user.status}
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
