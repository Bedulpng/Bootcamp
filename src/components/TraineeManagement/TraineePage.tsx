import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { TraineeTable } from './TraineeTable';
import { TraineeModal } from './TraineeModal';
import { Button } from '../ui/button';
import { Trainee } from '../../types/Trainee';
import { fetchTrainees } from '../../Api/FetchUsersByRole'; // Import the fetchTrainees service
import { DotSpinner } from '../SpinnerLoading';

export function TraineePages() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrainee, setSelectedTrainee] = useState<Trainee | null>(null);
  const [trainees, setTrainees] = useState<Trainee[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTrainees() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchTrainees(); // Fetch trainees using the service
        setTrainees(data);
      } catch (err) {
        setError('Failed to load trainees. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    loadTrainees();
  }, []);
  
  const filteredTrainees = trainees.filter((trainee) =>
    (trainee.fullName?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
    (trainee.nickname?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
);


  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <DotSpinner/>
      </div>
    );

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    // bg-gradient-to-br from-blue-100 via-blue-50 to-white
    <div className="min-h-screen p-6"> 
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-blue-600 tracking-tight">
            Trainee List
          </h1>
          <Button
            onClick={() => navigate('/dashboard/note')}
            className="px-6 py-3 bg-wgs-blue"
          >
            Notes Management 📝
          </Button>
        </div>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4">
          <TraineeTable
            trainees={filteredTrainees}
            onViewDetails={setSelectedTrainee}
          />
        </div>

        {selectedTrainee && (
          <TraineeModal
            trainee={selectedTrainee}
            onClose={() => setSelectedTrainee(null)}
          />
        )}
      </div>
    </div>
  );
}
