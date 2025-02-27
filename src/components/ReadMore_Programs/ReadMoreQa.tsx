"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Binary, Code2, Terminal, Server } from "lucide-react"
import { useNavigate } from "react-router-dom"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function RmFs() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const navigate = useNavigate()

  return (
    <div className="font-montserrat bg-[#0B1121] min-h-screen overflow-hidden">
      {/* Hero Banner */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-gradient-to-r from-[#4169E1]/20 to-[#9333EA]/20 mix-blend-multiply"
          />
        </div>

        <div className="relative container mx-auto px-6 py-12 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-4 items-center">
            <motion.div initial="initial" animate="animate" variants={staggerChildren} className="space-y-6 max-w-3xl">
              <motion.div variants={fadeIn}>
                <span className="inline-block bg-[#4169E1] text-white px-6 py-2 rounded-full text-base font-medium">
                  Our Program
                </span>
              </motion.div>
              <motion.div variants={fadeIn} className="space-y-2">
                <h1 className="text-6xl md:text-8xl font-bold text-white leading-none tracking-tight">
                  Quality{" "}
                  <span className="bg-gradient-to-r from-[#4169E1] to-[#9333EA] bg-clip-text text-transparent">
                    Assurance
                  </span>
                </h1>
              </motion.div>
              <motion.p variants={fadeIn} className="text-xl text-gray-300 max-w-2xl leading-relaxed">
                Become a master of Quality Assurance with our comprehensive program.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <motion.div
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="absolute -inset-1 bg-gradient-to-r from-[#4169E1] to-[#9333EA] rounded-2xl blur-xl"
              />
              <div className="relative bg-[#0B1121]/80 p-8 rounded-2xl backdrop-blur-xl border border-white/10 ">
                <div className="grid grid-cols-2 gap-8">
                  {[Binary, Code2, Terminal, Server].map((Icon, index) => (
                    <motion.div
                      key={index}
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        delay: index * 0.5,
                      }}
                      className="aspect-square flex items-center justify-center bg-gradient-to-r from-[#4169E1]/10 to-[#9333EA]/10 rounded-xl border border-white/5 "
                    >
                      <Icon className="w-12 h-12 text-[#4169E1]" />
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-[50px]"
                >
                  <div className="h-2 w-full bg-gradient-to-r from-[#4169E1] to-[#9333EA] rounded-full " />
                  <div className="mt-4 flex justify-between ">
                    {[0, 1].map((group) => (
                      <div key={group} className="flex space-x-1">
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            animate={{
                              height: ["24px", "36px", "24px"],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Number.POSITIVE_INFINITY,
                              repeatType: "reverse",
                              delay: i * 0.2 + group,
                            }}
                            className="w-1.5 bg-[#4169E1]/30 rounded-full "
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#4169E1]/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-[#4169E1]/20 to-transparent" />
      </section>

      {/* Program Details Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Program Highlights",
                content: [
                  "Software Testing Fundamentals",
                  "Test Planning and Strategy",
                  "Manual Testing Techniques",
                  "Automated Testing Basics",
                  "Performance Testing Principles",
                  "Bug Reporting and Tracking",
                  "Agile Testing Methodologies",
                ],
              },
              {
                title: "Program Details",
                details: [
                  { title: "Duration", text: "20 days, full-time flexible schedule" },
                  { title: "Format", text: "Offline lecture and hands-on practical assignments" },
                  { title: "Prerequisites", text: "Basic computer skills and familiarity with software applications" },
                  { title: "Career Support", text: "Resume building and interview preparation for QA positions" },
                ],
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="bg-[#0B1121]/80 border-white/10 backdrop-blur-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-2xl font-bold text-white">{card.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {card.content ? (
                      <ul className="space-y-4">
                        {card.content.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center space-x-3 text-gray-300"
                          >
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#4169E1] to-[#9333EA] flex items-center justify-center">
                              <CheckCircle className="h-4 w-4 text-white" />
                            </div>
                            <span className="text-lg">{item}</span>
                          </motion.li>
                        ))}
                      </ul>
                    ) : (
                      <div className="space-y-6 text-gray-300">
                        {card.details?.map((detail, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                          >
                            <h4 className="font-semibold mb-2 text-white text-lg">{detail.title}</h4>
                            <p className="text-lg">{detail.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <motion.div
              variants={staggerChildren}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3"
            >
              {[
                "Test Case Design",
                "Defect Management",
                "Regression Testing",
                "User Acceptance Testing",
                "API Testing",
                "Test Automation",
                "Performance Testing",
                "Security Testing",
                "Mobile App Testing",
                "CI/CD Integration",
              ].map((skill, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Badge variant="secondary" className="relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#4169E1]/20 to-[#9333EA]/20 group-hover:from-[#4169E1]/40 group-hover:to-[#9333EA]/40 transition-all duration-300" />
                    <div className="relative px-4 py-2 text-base text-black flex items-center space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#4169E1] to-[#9333EA]" />
                      <span>{skill}</span>
                    </div>
                  </Badge>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12"
            >
              <button className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition duration-300 ease-out rounded-full group" onClick={() => navigate("/")}>
                <span className="absolute inset-0 bg-gradient-to-r from-[#4169E1] to-[#9333EA] opacity-70 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                <span className="relative flex items-center space-x-2">
                  <span>Start Your Journey</span>
                  <svg
                    className="w-6 h-6 transition-transform duration-300 transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

