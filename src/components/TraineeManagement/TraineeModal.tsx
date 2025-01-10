import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Trainee } from '../../types/Trainee';
import { InfoField } from './InfoField';
import { fetchProfileImage } from '@/Api/FetchProfile';
import { fetchCertificate } from '@/Api/FetchCertificate';

interface TraineeModalProps {
  trainee: Trainee;
  onClose: () => void;
}

export function TraineeModal({ trainee, onClose }: TraineeModalProps) {
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [certificates, setCertificates] = useState<string | null>(null);

    useEffect(() => {
        // Fetch the profile image when the modal opens
        const fetchImage = async () => {
          try {
            const imageUrl = await fetchProfileImage(trainee.id);
            setProfileImage(imageUrl); // Set the profile image URL
          } catch (error) {
            console.error("Error fetching profile image:", error);
          }
        };
    
        fetchImage();
      }, [trainee.id]);

      useEffect(() => {
        // Fetch the profile image when the modal opens
        const fetchImage = async () => {
          try {
            const certUrl = await fetchCertificate(trainee.id);
            setCertificates(certUrl); // Set the profile image URL
          } catch (error) {
            console.error("Error fetching profile image:", error);
          }
        };
    
        fetchImage();
      }, [trainee.id]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-blue-600">Meet {trainee.nickname}! 🌟</h2>
                <button 
                onClick={onClose}
                className="text-blue-400 hover:text-blue-600 transition-colors"
                >
                <X size={28} />
                </button>
            </div>

            <div className="space-y-8">
                <div className="flex justify-center">
                <img
                    src={`http://10.10.103.6:4000${profileImage}`}
                    alt={trainee.fullName}
                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow-xl"
                />
                </div>

                <div className="grid grid-cols-2 gap-6">
                <InfoField label="Full Name" value={trainee.fullName} emoji="📛" />
                <InfoField label="Nickname" value={trainee.nickname} emoji="✨" />
                <InfoField label="Address" value={trainee.address} emoji="🏠" />
                <InfoField label="Mobile" value={trainee.mobile} emoji="📱" />
                <InfoField label="Email" value={trainee.email} emoji="📧" />
                <InfoField label="Github" value={trainee.github} emoji="💻" />
                </div>

                <div className="bg-blue-100/50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="font-bold text-xl text-blue-600 mb-3">Confidence Boost 🚀</h3>
                <p className="text-lg text-blue-800">{trainee.confident}</p>
                </div>

                <div>
                <h3 className="font-bold text-xl text-blue-600 mb-4">Achievement Gallery 🏆</h3>
                {trainee.certificates.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                    {trainee.certificates.map((cert, index) => (
                        <div key={cert.id} className="space-y-2">
                        <img
                            src={`http://10.10.103.6:4000${certificates}`} // Assuming 'id' in this case contains the image URL for the certificate
                            alt={`Certificate ${index + 1}`}
                            className="w-full rounded-2xl shadow-lg hover:transform hover:scale-105 transition-transform"
                        />
                        <p className="text-sm text-blue-600 italic">{new Date(cert.issuedAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-lg text-blue-400 italic text-center py-8">
                    No certificates yet... but the journey is just beginning! 🌱
                    </p>
                )}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }
