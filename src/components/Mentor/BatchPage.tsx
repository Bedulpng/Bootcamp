import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Batch } from '../../types/Trainee';


const DashboardPage = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const [batchData, setBatchData] = useState<Batch | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchBatch = async () => {
      try {
        const response = await fetch(`http://192.168.1.8:4000/admin/batchs/${batchId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch batch with ID: ${batchId}`);
        }
        const data: Batch = await response.json();
        setBatchData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      }
    };

    fetchBatch();
  }, [batchId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!batchData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard for Batch {batchData.id}</h1>
      <pre>{JSON.stringify(batchData, null, 2)}</pre>
    </div>
  );
};

export default DashboardPage;
