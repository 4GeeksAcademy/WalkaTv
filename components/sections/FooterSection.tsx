'use client';

import React from "react";
import { motion } from "framer-motion";

export default function FooterSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full bg-[#000] text-white py-4 md:py-6 border-t border-naranja/20">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div
          className="flex flex-col items-center gap-3"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          variants={containerVariants}
          viewport={{ once: false, amount: 0.5 }}
        >
          {/* Copyright - Simple */}
          <motion.p
            className="text-center text-moonstone/50 text-xs md:text-xs"
            variants={itemVariants}
          >
            © 2025 Walka TV. Todos los derechos reservados.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
