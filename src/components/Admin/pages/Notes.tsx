import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";

const notesData = [
  { id: "N001", title: "Course Updates", author: "John Doe", date: "2024-01-15", category: "Announcement" },
  { id: "N002", title: "Student Progress Report", author: "Jane Smith", date: "2024-02-01", category: "Report" },
  { id: "N003", title: "Teaching Guidelines", author: "Mike Johnson", date: "2024-01-10", category: "Guidelines" },
  { id: "N004", title: "Upcoming Events", author: "Sarah Wilson", date: "2024-02-15", category: "Announcement" },
];

export default function Notes() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Notes Management</h2>
        <Button>Create New Note</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Note ID</TableHead>
                <TableHead className="text-center">Title</TableHead>
                <TableHead className="text-center">Author</TableHead>
                <TableHead className="text-center">Date</TableHead>
                <TableHead className="text-center">Category</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notesData.map((note) => (
                <TableRow key={note.id}>
                  <TableCell className="text-center">{note.id}</TableCell>
                  <TableCell className="text-center">{note.title}</TableCell>
                  <TableCell className="text-center">{note.author}</TableCell>
                  <TableCell className="text-center">{note.date}</TableCell>
                  <TableCell className="text-center">{note.category}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
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