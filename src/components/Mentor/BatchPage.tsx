import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Batch, Class } from "../../types/Trainee";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const [batchData, setBatchData] = useState<Batch | null>(null);
  const [classes, setClasses] = useState<Class[]>([]);
  const [error, setError] = useState<string>("");

  // Fetch batch data
  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const response = await fetch(`http://10.10.103.195:4000/admin/batchs/${batchId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch batch with ID: ${batchId}`);
        }
        const data: Batch = await response.json();
        setBatchData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    };

    if (batchId) fetchBatch();
  }, [batchId]);

  // Fetch class data
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`http://10.10.103.195:4000/admin/class/${batchId}/batch`);
        if (!response.ok) {
          throw new Error(`Failed to fetch classes for batch with ID: ${batchId}`);
        }
        const data: Class[] = await response.json();
        console.log(data)
        setClasses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred");
      }
    };

    if (batchId) fetchClasses();
  }, [batchId]);

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  if (!batchData) {
    return <div className="text-center">Loading batch details...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Classes for Batch: {batchData.batchTitle || "Unknown Batch"}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.length > 0 ? (
          classes.map((classData) => (
            <Card
              key={classData.id}
              className="w-full max-w-sm overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105"
            >
              <CardContent className="p-0">
                <div className="relative h-48 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 overflow-hidden">
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                  <img
                    src="/placeholder.svg?height=200&width=200"
                    alt="Class logo"
                    width={80}
                    height={80}
                    className="absolute left-4 bottom-4 rounded-full border-4 border-white transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 transition-colors duration-300 hover:text-purple-600">
                    {classData.className}
                  </h2>
                  <p className="text-gray-600 transition-colors duration-300 hover:text-gray-900">
                    {new Date(classData.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 px-6 py-4">
                <Link to={`/mentor/c/${classData.id}/b/${batchId}`} className="w-full">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    View Class Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center w-full col-span-full">
            <p className="text-gray-500 text-lg">No class yet for this batch.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
