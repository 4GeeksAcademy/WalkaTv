'use client';

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Carousel from "../ui/Carousel/Carousel";
import InfiniteBanner from "../ui/InfiniteBanner";

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
  return (
    <section
      className="bg-jet snap-start min-h-screen w-full flex flex-col items-center justify-center relative text-white overflow-hidden pt-24"
      data-section="hero"
    >
      {/* Carrusel solo en pantallas md+ */}
      <div className="hidden md:flex w-full items-center justify-center h-[60vh] lg:h-[70vh]">
        <Carousel
          images={[ 
            "LogosWalka/BannerWalka.png",
          ]}
        />
      </div>
      {/* InfiniteBanner solo en móviles */}
      <div className="flex md:hidden w-full items-center justify-center h-[32vh]">
        <InfiniteBanner
          images={["LogosWalka/KSR1@2x.png", "LogosWalka/DM1@2x.png", "LogosWalka/LDJ1@2x.png", "LogosWalka/LSDE1.png", "LogosWalka/CafeC.png", "LogosWalka/IW2@2x.png" ]}
          height="h-24"
          gap="mx-6"
          duration={8}
        />
      </div>
    </section>
  );
}
