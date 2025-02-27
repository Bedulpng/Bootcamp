"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Building2, GraduationCap, Briefcase } from "lucide-react";

const features = [
  {
    icon: <GraduationCap className="w-8 h-8 text-blue-500" />,
    title: "200+ Graduates",
    description: "Successfully completed our intensive bootcamp program",
  },
  {
    icon: <MapPin className="w-8 h-8 text-red-500" />,
    title: "On the spot learning",
    description: "Practical, hands-on experience with real-world projects",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-purple-600" />,
    title: "87% Hired",
    description: "Our graduates find relevant jobs within 3 months",
  },
  {
    icon: <Building2 className="w-8 h-8 text-emerald-500" />,
    title: "Be part of Us",
    description: "Join our growing community of tech professionals",
  },
];

export function Testimonial() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-white dark:from-gray-900 dark:to-gray-950">
      {/* Decorative background elements */}
      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Why <span className="text-primary">Us</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Reasons why you should choose WGS Bootcamp for your tech journey
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-screen-xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.2 }}
              className="group"
            >
              <div className="h-full perspective-1000">
                <div className="relative h-full transform-style-3d transition-transform duration-500 group-hover:rotate-y-10 group-hover:rotate-x-10">
                  {/* Pure black shadow with higher opacity */}
                  <div className="absolute inset-0 bg-black rounded-2xl transform translate-x-3 translate-y-3 transition-all duration-300 group-hover:translate-x-5 group-hover:translate-y-5 group-hover:blur-md opacity-50" />

                  {/* Card content with 1px border */}
                  {/* Card content with increased height */}
                  <div className="relative h-full min-h-[340px] bg-white dark:bg-gray-800 rounded-2xl p-8 flex flex-col items-center justify-center border-black dark:border-white border-[2px] transition-all duration-300 shadow-lg">
                    {/* Icon container */}
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full transform scale-[0.8]" />
                      <div className="relative w-20 h-20 bg-gray-100 dark:bg-gray-800/50 rounded-full flex items-center justify-center dark:border-white">
                        {feature.icon}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
