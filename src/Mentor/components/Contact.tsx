import { MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const navigate = useNavigate(); 
  return (
    <div className="min-h-screen bg-white flex items-center p-4">
      <div className="max-w-5xl w-full mx-auto">
        <div className="space-y-8">
          <h1 className="text-lg font-montserrat font-semibold text-wgs-blue tracking-wider uppercase">
            Get in Touch With Us
          </h1>

          <div className="flex justify-between items-start gap-8">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 flex-1 max-w-2xl">
              What Can We Do to Help You?
            </h2>

            <div className="flex flex-col items-end space-y-6 flex-1">
              <p className="text-gray-600 text-lg text-right">
                In a digital world, evolve or get left behind. Ready to lead the change?
              </p>

              <button
                className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-wgs-blue rounded-xl shadow-md hover:bg-blue-700 transform transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => navigate('/contact')}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
