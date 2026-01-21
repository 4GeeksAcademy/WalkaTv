"use client";
import React, { useState, useEffect } from "react";
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
  const [stats, setStats] = useState<YoutubeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYoutubeStats = async () => {
      try {
        const response = await fetch("/api/youtube-stats");
        if (!response.ok) throw new Error("Error fetching stats");
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(String(err));
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchYoutubeStats();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return Math.floor(num / 1000000) + "M";
    if (num >= 1000) return Math.floor(num / 1000) + "K";
    return num.toString();
  };

  const statsDisplay = stats
    ? [
        { label: "Suscriptores", value: formatNumber(stats.subscribers), accent: "from-naranja/20 to-jet/80" },
        { label: "Vistas", value: formatNumber(stats.views), accent: "from-moonstone/20 to-jet/80" },
        { label: "Videos", value: stats.videoCount.toString(), accent: "from-jet/50 to-naranja/10" },
      ]
    : [];

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

  if (loading) {
    return (
      <section className="snap-start min-h-screen w-full flex items-center justify-center bg-[#000] py-20 md:py-0" data-section="stats">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <div className="w-12 h-12 border-4 border-naranja border-t-transparent rounded-full" />
          </motion.div>
          <p className="text-moonstone mt-4">Cargando estadísticas...</p>
        </div>
      </section>
    );
  }

  if (error || !stats) {
    return (
      <section className="snap-start min-h-screen w-full flex items-center justify-center bg-[#000] py-20 md:py-0" data-section="stats">
        <div className="text-center">
          <p className="text-naranja font-bold mb-4">Error cargando estadísticas</p>
          <p className="text-moonstone text-sm">{error}</p>
        </div>
      </section>
    );
  }

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
            <span className="text-xs md:text-sm font-bold text-moonstone uppercase tracking-widest">{stat.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
