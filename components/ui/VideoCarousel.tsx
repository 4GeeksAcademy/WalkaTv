'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Video {
  title: string;
  id: string;
  thumb: string;
  youtubeUrl?: string;
}

interface VideoCarouselProps {
  videos: Video[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showThumbnails?: boolean;
  compact?: boolean;
}

export default function VideoCarousel({
  videos,
  autoplay = true,
  autoplayInterval = 5000,
  showThumbnails = true,
  compact = false,
}: VideoCarouselProps) {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, autoplayInterval);
    return () => clearInterval(interval);
  }, [autoplay, autoplayInterval, videos.length]);

  const nextVideo = () => setCurrentVideo((prev) => (prev + 1) % videos.length);
  const prevVideo = () =>
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);

  const mainContainerClass = compact
    ? "w-full max-w-md aspect-video rounded-3xl"
    : "relative aspect-video rounded-2xl";
  const mainBorderClass = compact
    ? "border-2 border-naranja/40"
    : "border-2 border-naranja";

  return (
    <div className="w-full flex flex-col items-center gap-6 md:gap-8">
      {/* Main Video Container */}
      <div className={`${mainContainerClass} overflow-hidden shadow-2xl ${mainBorderClass} relative group w-full max-w-sm md:max-w-md`}>
        <motion.img
          key={currentVideo}
          src={videos[currentVideo].thumb}
          alt={videos[currentVideo].title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Play Icon Overlay - Centered */}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/40 transition-all duration-300 cursor-pointer"
          onClick={() => {
            if (videos[currentVideo].youtubeUrl) {
              window.open(videos[currentVideo].youtubeUrl, '_blank');
            }
          }}
        >
          <div className="w-14 h-14 bg-naranja rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg">
            <svg
              className="w-7 h-7 text-white ml-1"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Navigation Buttons - Sides */}
        <button
          type="button"
          onClick={prevVideo}
          className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 bg-naranja hover:bg-naranja/80 text-black rounded-full w-8 md:w-12 h-8 md:h-12 flex items-center justify-center transition-all duration-300 cursor-pointer font-bold text-lg md:text-xl shadow-lg opacity-0 group-hover:opacity-100 z-20"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={nextVideo}
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 bg-naranja hover:bg-naranja/80 text-black rounded-full w-8 md:w-12 h-8 md:h-12 flex items-center justify-center transition-all duration-300 cursor-pointer font-bold text-lg md:text-xl shadow-lg opacity-0 group-hover:opacity-100 z-20"
        >
          ›
        </button>

        {/* Video Title - Bottom */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent pt-12 pb-4 px-4">
          <p className="text-white font-bold text-base md:text-lg font-oswald truncate">
            {videos[currentVideo].title}
          </p>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex gap-2 items-center">
        {videos.map((_, idx) => (
          <motion.button
            key={idx}
            onClick={() => setCurrentVideo(idx)}
            type="button"
            className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentVideo
                ? "bg-naranja w-8 shadow-lg shadow-naranja/50"
                : "bg-moonstone w-3 hover:bg-moonstone/80"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>



      {/* Thumbnails Gallery */}
      {showThumbnails && (
        <div className="flex gap-4 overflow-x-auto px-4 py-3 w-full max-w-2xl scrollbar-thin scrollbar-thumb-naranja/60">
          {videos.map((video, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setCurrentVideo(i)}
              className={`min-w-[100px] aspect-square rounded-lg cursor-pointer border-2 overflow-hidden transition-all hover:scale-105 relative group ${
                i === currentVideo
                  ? "border-naranja shadow-lg shadow-naranja/50 scale-105"
                  : "border-moonstone/40 hover:border-moonstone/70"
              }`}
              whileHover={{ scale: 1.08 }}
            >
              <img
                src={video.thumb}
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <svg className="w-6 h-6 text-naranja opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <div className="absolute bottom-1 left-1 right-1 bg-black/70 px-2 py-1 rounded text-xs text-white truncate font-oswald">
                {video.title}
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
