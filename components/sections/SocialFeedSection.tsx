"use client";
import React from "react";
import { motion } from "framer-motion";

export default function SocialFeedSection() {
  return (
    <section className="snap-start min-h-screen w-full flex flex-col items-center justify-center bg-[#000] text-white px-4 py-20 md:py-0" style={{backgroundColor: '#000'}}>
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-12 text-moonstone font-oswald"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Comunidad & Redes
      </motion.h2>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8">
        {[
          { label: "Instagram", color: "bg-naranja" },
          { label: "Twitter", color: "bg-moonstone" },
          { label: "YouTube", color: "bg-jet border-2 border-naranja" },
        ].map((btn, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className={`${btn.color} hover:brightness-110 text-white font-bold py-3 px-8 rounded-full shadow transition-colors duration-200`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
      <motion.div
        className="text-moonstone max-w-xl text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        Únete a la comunidad Walka TV y participa en nuestras redes sociales para no perderte nada.
      </motion.div>
    </section>
  );
}
