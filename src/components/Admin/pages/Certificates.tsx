import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { Certificate } from "@/types/Trainee";
import { fetchAllCertificates } from "@/Api/FetchCertificate";
import { CertificateModal } from "../Modal/CertModal";
import NoSubmitted from "@/components/Examiner/Class/NoTask";
import { toast } from "react-hot-toast";
const apiUrl = import.meta.env.VITE_API_URL;

export default function Certificates() {
  const [certOpen, setIsCertOpen] = useState(false);
  const [certificates, setCertificates] = useState<Certificate[]>([]);


     useEffect(() => {
        const getCert = async () => {
          try {
            const certificates = await fetchAllCertificates();
            setCertificates(certificates);
          } catch (error) {
            console.error("Failed to fetch batch:", error);
          } finally {
          }
        };
    
        getCert();
      }, []);

  const handleOpenCertModal = () => {
    setIsCertOpen(true);
  }

  const handleDownload = async (fileUrl: string, fileName: string) => {
    try {
      if (!fileUrl) {
        toast.error("No file available for download.");
        return;
      }
  
      const response = await fetch(`http://${apiUrl}${fileUrl}`, {
        method: "GET",
        mode: "cors", // Ensure CORS mode is enabled
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.statusText}`);
      }
  
      const blob = await response.blob();
      const fileType = blob.type; // Get the actual file type (e.g., image/png)
  
      console.log("Downloaded file type:", fileType); // Debugging: check the MIME type
  
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
  
      // Ensure the correct file extension
      const extension = fileType.split("/")[1] || "png";
      a.href = url;
      a.download = fileName || `certificate.${extension}`;
  
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      window.URL.revokeObjectURL(url);
      toast.success("Certificate downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download certificate.");
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold tracking-tight">Certificate Management</h2>
      <div className="flex flex-col gap-3">
        <Button onClick={handleOpenCertModal}>Issue New Certificate</Button>
        <span className="ml-3">Showing {certificates.length} certificate</span>
        </div>
        <CertificateModal isOpen={certOpen} setIsOpen={setIsCertOpen} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Certificates</CardTitle>
        </CardHeader>
        <CardContent>
          {certificates.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">#</TableHead>
                  <TableHead className="text-center">Student</TableHead>
                  <TableHead className="text-center">Class</TableHead>
                  <TableHead className="text-center">Batch</TableHead>
                  <TableHead className="text-center">Issued Date</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {certificates.map((cert, index) => (
                  <TableRow key={cert.id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{cert.trainee?.fullName ?? "N/A"}</TableCell>
                    <TableCell className="text-center">{cert.class?.className ?? "N/A"}</TableCell>
                    <TableCell className="text-center">{cert.batch?.batchTitle ?? "N/A"}</TableCell>
                    <TableCell className="text-center">{cert.issuedAt
                        ? new Date(cert.issuedAt).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "N/A"}</TableCell>
                    <TableCell className="text-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownload(cert.filepath.replace("public", ""), `${cert.trainee?.fullName}_certificate`)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <NoSubmitted/>
          )}
        </CardContent>
      </Card>
    </div>
  );
}