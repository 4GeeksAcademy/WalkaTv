"use client";
import React from "react";
import { FaYoutube, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

interface YoutubeStats {
  subscribers: number;
  views: number;
  videoCount: number;
  title: string;
  description: string;
  thumbnail: string;
}

export default function BentoGrid() {
  // Datos hardcodeados con íconos
  const statsDisplay = [
    { icon: <FaYoutube className="text-moonstone hover:text-naranja transition-colors text-3xl md:text-4xl mb-2" />, value: "23K", accent: "from-naranja/20 to-jet/80", label: "YouTube" },
    { icon: <FaInstagram className="text-moonstone hover:text-naranja transition-colors text-3xl md:text-4xl mb-2" />, value: "53K", accent: "from-moonstone/20 to-jet/80", label: "Instagram" },
    { icon: null, value: "3M", accent: "from-jet/50 to-naranja/10", label: "Views" },
  ];

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  // ...ya no se maneja loading ni error porque los datos son hardcodeados

  return (
    <section className="snap-start min-h-screen w-full flex items-center justify-center bg-[#000] py-20 md:py-0" style={{backgroundColor: '#000'}} data-section="stats">
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        exit="hidden"
        viewport={{ once: false, amount: 0.2 }}
      >
        {statsDisplay.map((stat, i) => (
          <motion.div
            key={i}
            className={`rounded-2xl p-8 flex flex-col items-center justify-center shadow-xl border-2 border-naranja bg-gradient-to-b ${stat.accent} transition-all duration-300 hover:scale-110 hover:shadow-none glow-naranja-hover cursor-pointer`}
            variants={itemVariants}
            whileHover={{ scale: 1.1 }}
          >
            <span className="text-4xl md:text-6xl font-extrabold text-naranja drop-shadow-lg mb-4 font-oswald">{stat.value}</span>
            {stat.icon ? (
              <span className="mb-2">{stat.icon}</span>
            ) : (
              <span className="text-xs md:text-sm font-bold text-moonstone uppercase tracking-widest mb-2">{stat.label}</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
