'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import VideoCarousel from "../ui/VideoCarousel";

interface YoutubeStats {
  subscribers: number;
  views: number;
  videoCount: number;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  youtubeUrl: string;
  description: string;
  viewCount: number;
}

export default function HeroSection() {
  const [stats, setStats] = useState<YoutubeStats | null>(null);
  const [topVideos, setTopVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, videosRes] = await Promise.all([
          fetch("/api/youtube-stats"),
          fetch("/api/youtube-top-videos"),
        ]);

        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }

        if (videosRes.ok) {
          const videosData = await videosRes.json();
          setTopVideos(videosData.videos);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return Math.floor(num / 1000000) + "M";
    if (num >= 1000) return Math.floor(num / 1000) + "K";
    return num.toString();
  };
  return (
    <section className="snap-start min-h-screen w-full flex flex-col md:flex-row-reverse items-center justify-center relative bg-[#000] text-white overflow-hidden pt-20 md:pt-0 px-4 md:px-0" data-section="hero">
      <div className="absolute inset-0 bg-gradient-to-r from-[#000] via-[#000]/80 to-transparent z-0" />
      
      {/* Left Column - Branding */}
      <motion.div
        className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start justify-center px-4 md:px-12 space-y-6 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <motion.h1
          className="font-oswald text-5xl md:text-7xl lg:text-8xl text-naranja drop-shadow-2xl tracking-widest leading-tight flex flex-col items-center md:items-start w-full text-center md:text-left"
          style={{}}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block">
            walk
            <span className="relative inline-block">
              a
              <span className="absolute left-1/2 -translate-x-1/2 top-[85%] text-base md:text-2xl lg:text-4xl text-moonstone font-bold tracking-tight whitespace-nowrap">TV</span>
            </span>
          </span>
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-moonstone font-medium max-w-md leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          El canal de deportes que te conecta con la pasión, la emoción y la mejor comunidad
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            onClick={() => window.open('https://www.youtube.com/@Walkaatv', '_blank')}
            className="bg-naranja text-black font-bold py-3 px-10 rounded-full text-base shadow-lg hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-naranja/50 font-oswald relative overflow-hidden group"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">SUSCRÍBETE</span>
            <motion.div
              className="absolute inset-0 bg-naranja/20 blur-xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
          <motion.button
            onClick={() => {
              const latestSection = document.querySelector('[data-section="latest"]');
              latestSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="border border-moonstone text-moonstone font-bold py-3 px-10 rounded-full text-base hover:bg-moonstone/10 hover:border-naranja transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-moonstone/50 relative overflow-hidden group"
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">VER MÁS</span>
            <motion.div
              className="absolute -inset-full bg-gradient-to-r from-transparent via-moonstone/10 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5 }}
            />
          </motion.button>
        </motion.div>

        <motion.div
          className="flex gap-6 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-center">
            <p className="text-3xl font-bold text-naranja font-oswald">76K</p>
            <p className="text-sm text-moonstone">Suscriptores</p>
          </div>
          <div className="text-center border-l border-naranja/30 pl-6">
            <p className="text-3xl font-bold text-naranja font-oswald">3M</p>
            <p className="text-sm text-moonstone">Views</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right Column - Video Preview */}
      <motion.div
        className="relative z-10 w-full md:w-3/4 flex flex-col items-center justify-center px-2 md:px-20 mt-8 md:mt-0"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        {topVideos.length > 0 ? (
          <VideoCarousel
            videos={topVideos.map((v) => ({
              id: v.id,
              title: v.title,
              thumb: v.thumbnail,
              youtubeUrl: v.youtubeUrl,
            }))}
            autoplay={true}
            autoplayInterval={5000}
            showThumbnails={false}
            compact={false}
          />
        ) : (
          <div className="w-full max-w-sm aspect-video bg-moonstone/20 rounded-3xl border-2 border-naranja/40 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-12 h-12 border-4 border-naranja border-t-transparent rounded-full" />
            </motion.div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
