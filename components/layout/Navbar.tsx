"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaYoutube, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b-2 ${
        scrolled
          ? "bg-black/95 backdrop-blur-3xl shadow-xl border-naranja"
          : "bg-black/20 backdrop-blur-3xl border-transparent"
      }`}
      style={{ WebkitBackdropFilter: "blur(32px)" }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        <button
          onClick={() => {
            const heroSection = document.querySelector('[data-section="hero"]');
            heroSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          className={`text-lg md:text-2xl font-extrabold tracking-widest drop-shadow-lg transition-colors duration-300 font-oswald cursor-pointer hover:brightness-110 ${
            scrolled ? "text-naranja" : "text-white"
          }`}
        >
          WALKA TV
        </button>
        
        <div className="flex gap-4 md:gap-8 items-center">
          <div className="hidden md:flex gap-4 items-center">
            <button 
              onClick={() => {
                const videosSection = document.querySelector('[data-section="latest"]');
                videosSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-moonstone hover:text-naranja font-bold transition-colors text-sm cursor-pointer"
            >
              Videos
            </button>
            <button 
              onClick={() => {
                const communitySection = document.querySelector('[data-section="stats"]');
                communitySection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-moonstone hover:text-naranja font-bold transition-colors text-sm cursor-pointer"
            >
              Comunidad
            </button>
          </div>

          {/* Social Links */}
          <div className="flex gap-2 md:gap-3 items-center border-l border-naranja/30 pl-4 md:pl-6">
            <motion.a 
              href="https://www.youtube.com/@Walkaatv" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-moonstone hover:text-naranja transition-colors text-sm md:text-lg cursor-pointer"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaYoutube />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/walkatv_/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-moonstone hover:text-naranja transition-colors text-sm md:text-lg cursor-pointer"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaInstagram />
            </motion.a>
            <motion.a 
              href="https://tiktok.com/@walkatv" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-moonstone hover:text-naranja transition-colors text-sm md:text-lg cursor-pointer"
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTiktok />
            </motion.a>
          </div>
        </div>
      </div>
    </nav>
  );
}
