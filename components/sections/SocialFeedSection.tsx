"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaInstagram, FaTiktok } from "react-icons/fa";

export default function SocialFeedSection() {
  return (
    <motion.section
      className="snap-start min-h-screen w-full flex flex-col items-center justify-center text-white px-4 py-20 md:py-0"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.h4
        className="text-3xl md:text-5xl font-bold mb-12 text-moonstone font-oswald"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Comunidad & Redes
      </motion.h4>
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center mb-8">
        <motion.a
          href="https://www.instagram.com/walkatv_/"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0 }}
          viewport={{ once: true }}
          className="bg-naranja text-jet hover:brightness-110 font-bold py-3 px-8 rounded-full shadow flex items-center gap-3 text-lg transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaInstagram className="text-2xl" /> Instagram
        </motion.a>
        <motion.a
          href="https://tiktok.com/@walkatv_"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          viewport={{ once: true }}
          className="bg-moonstone text-jet hover:brightness-110 font-bold py-3 px-8 rounded-full shadow flex items-center gap-3 text-lg transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaTiktok className="text-2xl" /> TikTok
        </motion.a>
        <motion.a
          href="https://www.youtube.com/@Walkaatv"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-jet border-2 border-naranja text-naranja hover:brightness-110 font-bold py-3 px-8 rounded-full shadow flex items-center gap-3 text-lg transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaYoutube className="text-2xl" /> YouTube
        </motion.a>
      </div>
      <motion.div
        className="text-moonstone max-w-xl text-center flex items-center justify-center gap-2 mt-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
      >
        Únete a nuestras redes sociales, somos tu algoritmo deportivo favorito
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="var(--color-naranja)"
          xmlns="http://www.w3.org/2000/svg"
          className="align-middle"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </motion.div>
    </motion.section>
  );
}
