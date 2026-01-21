'use client';

import React from "react";
import { motion } from "framer-motion";
import VideoCarousel from "./VideoCarousel";

const trendingVideos = [
  { title: "DECEPCIÓN O SORPRESA", id: "1", thumb: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80", youtubeUrl: "https://www.youtube.com/watch?v=G2ICpDByyj4" },
  { title: "EXCLUSIVA con WALKA TV", id: "2", thumb: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80", youtubeUrl: "https://www.youtube.com/watch?v=XYu6bbzd-mE" },
  { title: "Entrevista Exclusiva", id: "3", thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80", youtubeUrl: "https://www.youtube.com/watch?v=video3" },
  { title: "Resumen Jornada", id: "4", thumb: "https://images.unsplash.com/photo-1552168324-d612d08db8fe?w=800&q=80", youtubeUrl: "https://www.youtube.com/watch?v=video4" },
  { title: "Detrás de Cámaras", id: "5", thumb: "https://images.unsplash.com/photo-1465056836643-15a8d684ec2b?w=800&q=80", youtubeUrl: "https://www.youtube.com/watch?v=video5" },
];

export default function TrendingCarousel() {
  return (
    <section className="snap-start min-h-screen w-full flex flex-col items-center justify-center bg-[#000] py-20 md:py-0" style={{backgroundColor: '#000'}}>
      <motion.h2 
        className="text-3xl md:text-5xl font-bold mb-12 text-naranja font-oswald"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: false, amount: 0.3 }}
      >
        Top Trending
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <VideoCarousel
          videos={trendingVideos}
          autoplay={true}
          autoplayInterval={5000}
          showThumbnails={true}
          compact={false}
        />
      </motion.div>
    </section>
  );
}
