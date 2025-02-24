"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Users, Zap, Globe } from "lucide-react"

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

export default function AboutSection() {
  return (
    <section className="relative py-28 bg-[#0B1121] overflow-hidden">
      <div className="container mx-auto px-8 md:px-16 lg:px-24 max-w-7xl">
        <motion.div initial="initial" animate="animate" variants={staggerChildren} className="text-center mb-20">
          <motion.h2 variants={fadeIn} className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Our {" "}
            <span className="bg-gradient-to-r from-[#4169E1] to-[#9333EA] bg-clip-text text-transparent">
              Full-Stack Program
            </span>
          </motion.h2>
          <motion.p variants={fadeIn} className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Empowering the next generation of developers with cutting-edge skills and hands-on experience.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12">
          {[
            {
              title: "Comprehensive Curriculum",
              icon: Code,
              content:
                "Our program covers both frontend and backend technologies, ensuring you're prepared for the full spectrum of web development challenges.",
            },
            {
              title: "Industry-Driven Approach",
              icon: Users,
              content:
                "Learn from experienced professionals and work on real-world projects that simulate actual industry scenarios.",
            },
            {
              title: "Cutting-Edge Technologies",
              icon: Zap,
              content:
                "Stay ahead of the curve with our constantly updated curriculum featuring the latest tools and frameworks in the tech industry.",
            },
            {
              title: "Global Community",
              icon: Globe,
              content:
                "Join a diverse community of learners and mentors from around the world, expanding your network and opportunities.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="bg-[#0B1121]/80 border-white/10 backdrop-blur-xl h-full p-6 lg:p-8">
                <CardHeader className="pb-4">
                  <CardTitle className="text-3xl font-bold text-white flex items-center gap-4">
                    <item.icon className="w-8 h-8 text-[#4169E1]" />
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-lg leading-relaxed">{item.content}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">Why Choose Our Program?</h3>
          <div className="flex flex-wrap justify-center gap-4 px-6">
            {[
              "Flexible Learning",
              "1-on-1 Mentorship",
              "Career Support",
              "Project-Based Learning",
              "Industry Partnerships",
              "Lifetime Access",
            ].map((feature, index) => (
              <Badge key={index} variant="secondary" className="relative group overflow-hidden px-6 py-3 text-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4169E1]/20 to-[#9333EA]/20 group-hover:from-[#4169E1]/40 group-hover:to-[#9333EA]/40 transition-all duration-300" />
                <span className="relative text-black">{feature}</span>
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
