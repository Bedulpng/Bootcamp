"use client"

import type React from "react"
import { motion } from "framer-motion"

const LeadingComp: React.FC = () => {
  const companies = [
    { name: "BCA", logo: "/com/bca.png" },
    { name: "Nutrifood", logo: "/com/Nutrifood.png" },
    { name: "KAI", logo: "/com/kereta.png" },
    { name: "Jago", logo: "/com/bank_jago.png" },
    { name: "Sinarmas Land", logo: "/com/sinarmas.png" },
    { name: "DJP", logo: "/com/djp.png" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="bg-gradient-to-b from-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-slate-900">
            Trusted by Leading Companies
          </h2>
          <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-slate-600 text-lg">
            We have partnered with leading businesses through corporate training and collaboration with industry
            professionals to support our transformational learning experiences.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {companies.map((company) => (
            <motion.div
              key={company.name}
              className="w-full h-24 flex items-center justify-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              variants={item}
            >
              <div className="relative w-full h-full">
                <img
                  src={company.logo || "/placeholder.svg"}
                  alt={company.name}
                  className="object-contain p-2"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LeadingComp

