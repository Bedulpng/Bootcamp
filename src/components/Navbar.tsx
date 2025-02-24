"use client"

import { useState, useEffect } from "react"
import { LogIn, X, User2, ChevronDown, Users } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProgramsOpen, setIsProgramsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const togglePrograms = () => setIsProgramsOpen(!isProgramsOpen)

  const navigate = useNavigate()

  const handleReadMore = (id: string) => {
    navigate(`/programs/${id}`)
  }

  return (
    <motion.nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-start h-20">
          {/* Logo */}
          <div className="flex items-center ml-[10px]">
            <Link to="/">
              <img
                src={isScrolled ? "/Logo_black.png" : "/white_logo.png"}
                alt="Logo"
                className="h-12 w-12 object-contain"
              />
            </Link>
          </div>

          {/* Centered Links */}
          <div className="flex-grow flex justify-center">
            <div className="hidden md:flex items-center space-x-8">
              {/* Programs Section with Dropdown */}
              <div className="relative" onMouseLeave={() => setIsProgramsOpen(false)}>
                <button
                  onMouseEnter={togglePrograms}
                  className={`flex items-center gap-1 transition-colors font-medium ${
                    isScrolled ? "text-[#000000] hover:text-[#0033FF]" : "text-white hover:text-white/80"
                  }`}
                >
                  Programs
                  {/* {isProgramsOpen ? (
                    <ChevronUp className="text-[#0033FF] transition-transform" />
                  ) : (
                    <ChevronDown className="text-[#0033FF] transition-transform" />
                  )} */}
                  <motion.div animate={{ rotate: isProgramsOpen ? 0 : 180 }} transition={{ duration: 0.3 }}>
                    <ChevronDown className="text-[#0033FF]" />
                  </motion.div>
                </button>

                {/* Dropdown Modal */}
                <AnimatePresence>
                  {isProgramsOpen && (
                    <motion.div
                      className="absolute left-[-10%] sm:left-[100%] md:left-0 lg:left-[-350%] transform mt-2 flex justify-center w-[90vw] max-w-[1000px] bg-white shadow-lg z-50 rounded-lg"                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Triangle */}
                      <div
                        className="absolute top-[-12px] left-[470px] transform -translate-x-1/2 w-0 h-0"
                        style={{
                          borderLeft: "12px solid transparent",
                          borderRight: "12px solid transparent",
                          borderBottom: "12px solid white",
                        }}
                      />

                      <div className="p-8">
                        <h3 className="text-lg font-semibold mb-4">Programs</h3>
                        <p className="mb-6">
                          Transform your career with code. Master in-demand tech skills in months. Join the digital
                          revolution today.
                        </p>

                        <hr className="border-gray-200 mb-6" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
                          {/* Program Cards */}
                          {[
                            {
                              id: "fullstack",
                              title: "Full Stack Coding Bootcamp",
                              description:
                                "Become a Full Stack software developer using React, Javascript and Node. Master the most sought-after- skills and land a job as a developer.",
                              icon: <img src="/fs.png" alt="Full Stack Icon" />,
                            },
                            {
                              id: "qualityassurance",
                              title: "Quality Assurance",
                              description:
                                "Become a Quality Assurance Engineer mastering Selenium and Jest. Learn automated testing best practices and land a job as a QA professional.",
                              icon: <img src="/qa.png" alt="QA Icon" />,
                            },
                          ].map((program, index) => (
                            <div key={index} className="border rounded-lg p-4 shadow hover:shadow-md transition-all">
                              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                                <div className="text-3xl mb-2 p-4 rounded-full bg-blue-50">{program.icon}</div>
                                <h4 className="font-bold text-lg mb-2">{program.title}</h4>
                                <p className="text-sm text-gray-600 mb-4">{program.description}</p>
                                <button
                                  className="bg-[#0033FF] text-white px-8 py-3 rounded-lg hover:bg-[#0033FF]/90 transition-colors font-medium"
                                  onClick={() => handleReadMore(program.id)}
                                >
                                  Read More
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* About Link */}
              <Link
                to="/about"
                className={`transition-colors font-medium ${
                  isScrolled ? "text-[#000000] hover:text-[#0033FF]" : "text-white hover:text-white/80"
                }`}
              >
                About
              </Link>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={openModal}
            className="bg-[#0033FF] text-white px-6 py-2.5 rounded-lg hover:bg-[#0033FF]/90 transition-colors flex items-center gap-2 font-medium"
          >
            <span>Login</span>
            <LogIn className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Login Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-white p-8 rounded-xl max-w-md mx-auto shadow-lg z-50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              {/* Close Button */}
              <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <h2 className="text-center text-xl font-semibold mb-6">Login Account as</h2>
              <div className="flex justify-center space-x-4">
                <button
                  className="flex items-center px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
                  onClick={() => navigate("/login/trainee")}
                >
                  <User2 className="h-5 w-5 mr-2" />
                  Trainee
                </button>
                <button
                  className="flex items-center px-4 py-2 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 transition-colors"
                  onClick={() => navigate("/login/mentor")}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Grader
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

