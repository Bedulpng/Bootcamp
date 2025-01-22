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
import { Eye } from "lucide-react";
import { Mentor } from "@/types/Trainee";
import { fetchMentors } from "@/Api/FetchUsersByRole";

interface NotesTableProps {
  onViewGraderNotes: (graderId: string, graderName: string, visibility: string) => void;
}

export default function Notes({ onViewGraderNotes }: NotesTableProps) {
  const [graders, setGraders] = useState<Mentor[]>([]);

  useEffect(() => {
    const getGraders = async () => {
      try {
        const graders = await fetchMentors();
        setGraders(graders);
      } catch (error) {
        console.error("Failed to fetch Mentors:", error);
      } finally {
      }
    };

    getGraders();
  }, []);

  return (
    <div className="space-y-6">

      <Card>
        <CardHeader>
          <CardTitle>All Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">#</TableHead>
                <TableHead className="text-center">Grader Name</TableHead>
                <TableHead className="text-center">Nickname</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {graders.map((grader, index) => (
                <TableRow key={grader.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">
                    {grader.fullName}
                  </TableCell>
                  <TableCell
                    className={`text-center ${
                      !grader.nickname ? "text-gray-500" : ""
                    }`}
                  >
                    {grader.nickname || "No Nickname"}
                  </TableCell>
                  <TableCell className="text-center">{grader.email}</TableCell>
                  <TableCell className="text-center">{grader.role}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        onViewGraderNotes(grader.id, grader.fullName, "");
                      }}
                    >
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
