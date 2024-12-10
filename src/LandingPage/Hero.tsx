import { useNavigate } from "react-router-dom";

export function Hero() {

  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80"
          alt="Students collaborating"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
          {/* <img
            src='/white_logo.png'
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
            <span className="text-white font-semibold">WGS Bootcamp</span> */}
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6">
            Turn Passion into <span className="text-[#0033FF]">Profession</span>. Code your future
          </h1>
          
          <p className="text-xl text-gray-200 mb-8">
            Join our intensive coding bootcamp and learn from industry experts. 
            Master the latest technologies and start your journey to becoming a 
            professional developer.
          </p>
          
          <div className="flex gap-4">
            <button className="bg-[#0033FF] text-white px-8 py-3 rounded-lg hover:bg-[#0033FF]/90 transition-colors font-medium"
            onClick={() => {
              window.location.hash = '#program'; // Navigate to #program
            }}
            >
              Programs
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-colors font-medium"
            onClick={() => navigate("/about")}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}