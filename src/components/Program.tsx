"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

interface Program {
  id: string
  title: string
  desc_title: string
  description: string
  iconSrc: string
}

const programs: Program[] = [
  {
    id: "fullstack",
    title: "Full Stack Developer",
    desc_title: "Web & Software Development",
    description:
      "Become a Full Stack software developer using React, Javascript and Node. Master the most sought-after skills and land a job as a developer.",
    iconSrc: "/fs.png",
  },
  {
    id: "qualityassurance",
    title: "Quality Assurance",
    desc_title: "Software Testing",
    description:
      "Become a Quality Assurance Engineer mastering Selenium and Jest. Learn automated testing best practices and land a job as a QA professional.",
    iconSrc: "/qa.png",
  },
  // Add more programs dynamically here
]

export default function ProgramCards() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center gap-10 md:gap-20 p-4 mt-16 md:mt-[200px]">
      <div className="flex flex-wrap justify-center gap-8 md:gap-[200px] w-full mx-auto">
        {programs.map((program) => (
          <div
            key={program.id}
            className="relative group flex-shrink-0 w-full sm:w-80"
            onMouseEnter={() => setHoveredId(program.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Background shadow with improved transition */}
            <div className="absolute inset-0 bg-black rounded-lg transform translate-x-3 translate-y-3 transition-all duration-300 ease-in-out group-hover:translate-x-4 group-hover:translate-y-4"></div>

            {/* Main content with refined hover animation */}
            <div className="relative bg-white rounded-lg p-6 shadow-lg flex flex-col h-80 border-2 border-black transition-all duration-300 ease-in-out group-hover:translate-y-[-4px] group-hover:shadow-xl">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{program.desc_title}</p>
                  <h2 className="text-xl font-bold mt-1">{program.title}</h2>
                </div>
                <div className="flex items-center justify-center rounded-full p-1">
                  <div className="icon-container w-12 h-12 flex items-center justify-center overflow-hidden">
                    <img
                      src={program.iconSrc || "/placeholder.svg"}
                      alt={`${program.title} Icon`}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-grow justify-between">
                <p className="text-sm text-gray-700 leading-relaxed">{program.description}</p>

                <div className="mt-4 self-center w-full">
                  <Link
                    to={`/programs/${program.id}`}
                    className={`
                      block w-full text-center py-2.5 px-4 text-sm font-medium text-white 
                      bg-blue-600 border border-transparent rounded-md shadow-sm 
                      transition-all duration-300 ease-in-out
                      hover:bg-blue-700 hover:shadow-md
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                      ${hoveredId === program.id ? "scale-105" : ""}
                    `}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

