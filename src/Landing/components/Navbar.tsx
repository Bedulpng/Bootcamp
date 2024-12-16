import { useState, useEffect } from "react";
import Modal from "react-modal";
import { LogIn, X, User2, Presentation, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProgramsOpen, setIsProgramsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const togglePrograms = () => setIsProgramsOpen(!isProgramsOpen);
  const navigate = useNavigate();

  const handleReadMore = (id: string) => {
    navigate(`/programs/${id}`);
  };  

  const handleTraineeLogin = () => {
    navigate("/login/Trainee");
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <img
              src={isScrolled ? "/Logo_black.png" : "/white_logo.png"}
              alt="Logo"
              className="h-12 w-12 object-contain"
            />
          </Link>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Programs Dropdown */}
            <div
              className="relative"
              onMouseLeave={() => setIsProgramsOpen(false)}
            >
              <button
                onMouseEnter={togglePrograms}
                className={`flex items-center gap-1 font-medium transition-colors ${
                  isScrolled
                    ? "text-[#000000] hover:text-[#0033FF]"
                    : "text-white hover:text-white/80"
                }`}
              >
                Programs
                <ChevronDown className="text-[#0033FF]" />
              </button>

              {isProgramsOpen && (
                <div className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-[90vw] max-w-[1000px] bg-white shadow-lg z-50 rounded-lg">
                  <div
                    className="absolute top-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0"
                    style={{
                      borderLeft: "12px solid transparent",
                      borderRight: "12px solid transparent",
                      borderBottom: "12px solid white",
                    }}
                  />
                  <div className="p-8">
                    <h3 className="text-lg font-semibold mb-4">Programs</h3>
                    <p className="mb-6">
                      Transform your career with code. Master in-demand tech
                      skills in months. Join the digital revolution today.
                    </p>
                    <hr className="border-gray-200 mb-6" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      {[
                        {
                          id: "fullstack",
                          title: "Full Stack Coding Bootcamp",
                          description:
                            "Become a Full Stack software developer using React, Javascript and Node.",
                          icon: <img src="/fs.png" alt="Full Stack Icon" />,
                        },
                        {
                          id: "qualityassurance",
                          title: "Quality Assurance",
                          description:
                            "Become a Quality Assurance Engineer mastering Selenium and Jest.",
                          icon: <img src="/qa.png" alt="QA Icon" />,
                        },
                      ].map((program) => (
                        <div
                          key={program.id}
                          className="border rounded-lg p-4 shadow hover:shadow-md transition-all"
                        >
                          <div className="text-center">
                            <div className="text-3xl mb-2 p-4 rounded-full bg-blue-50">
                              {program.icon}
                            </div>
                            <h4 className="font-bold text-lg mb-2">
                              {program.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-4">
                              {program.description}
                            </p>
                            <button
                              className="bg-[#0033FF] text-white px-8 py-3 rounded-lg hover:bg-[#0033FF]/90"
                              onClick={() => handleReadMore(program.id)}
                            >
                              Read More
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* About Link */}
            <Link
              to="/about"
              className={`font-medium transition-colors ${
                isScrolled
                  ? "text-[#000000] hover:text-[#0033FF]"
                  : "text-white hover:text-white/80"
              }`}
            >
              About
            </Link>
          </div>

          {/* Login Button */}
          <button
            onClick={openModal}
            className="bg-[#0033FF] text-white px-6 py-2.5 rounded-lg hover:bg-[#0033FF]/90 flex items-center gap-2"
          >
            <span>Login</span>
            <LogIn className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Login Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        ariaHideApp={false}
        className="relative bg-white p-8 rounded-xl max-w-md mx-auto shadow-lg z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center"
      >
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-center text-xl font-semibold mb-6">
          Login Account as
        </h2>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleTraineeLogin}
            className="flex items-center px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200"
          >
            <User2 className="h-5 w-5 mr-2" />
            Trainee
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200">
            <Presentation className="h-5 w-5 mr-2" />
            Mentor
          </button>
        </div>
      </Modal>
    </nav>
  );
}
