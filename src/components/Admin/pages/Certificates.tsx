import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";

const certificateData = [
  { id: "CERT001", student: "John Doe", course: "Web Development", issueDate: "2024-01-15", status: "Issued" },
  { id: "CERT002", student: "Jane Smith", course: "Data Science", issueDate: "2024-02-01", status: "Pending" },
  { id: "CERT003", student: "Mike Johnson", course: "UI/UX Design", issueDate: "2024-01-10", status: "Issued" },
  { id: "CERT004", student: "Sarah Wilson", course: "Mobile Development", issueDate: "2024-02-15", status: "Processing" },
];

export default function Certificates() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Certificate Management</h2>
        <Button>Issue New Certificate</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Certificate ID</TableHead>
                <TableHead>Student</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificateData.map((cert) => (
                <TableRow key={cert.id}>
                  <TableCell>{cert.id}</TableCell>
                  <TableCell>{cert.student}</TableCell>
                  <TableCell>{cert.course}</TableCell>
                  <TableCell>{cert.issueDate}</TableCell>
                  <TableCell>{cert.status}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
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