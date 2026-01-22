"use client";

import React, { useEffect, useState } from "react";

import { FaYoutube, FaInstagram } from "react-icons/fa";

import { FaTiktok } from "react-icons/fa";

import { MdBarChart } from "react-icons/md";

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

    {

      icon: <FaYoutube className="text-moonstone text-5xl mb-2" />,

      value: 23000,

      accent: "from-naranja/20 to-jet/80",

      label: "YouTube",

      description: "Followers"

    },

    {

      icon: <FaTiktok className="text-moonstone text-5xl mb-2" />,

      value: 11800,

      accent: "from-moonstone/20 to-jet/80",

      label: "TikTok",

      description: "Likes"

    },

    {

      icon: <FaInstagram className="text-moonstone text-5xl mb-2" />,

      value: 53000,

      accent: "from-jet/50 to-naranja/10",

      label: "Instagram",

      description: "Followers"

    },

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

    <section className="bg-jet snap-start min-h-screen w-full flex items-center justify-center py-20 md:py-0 scroll-mt-15" data-section="stats">

      <motion.div

        className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl px-4 md:px-6"

        variants={containerVariants}

        initial="hidden"

        whileInView="visible"

        exit="hidden"

        viewport={{ once: false, amount: 0.2 }}

      >

        {/* 3 cajas arriba */}

        {statsDisplay.map((stat, i) => (

          <motion.div

            key={i}

            className={`bg-white p-2 shadow-sm flex flex-col items-center justify-center gap-2 text-center hover:shadow-md transition-shadow duration-300 aspect-square md:aspect-auto md:h-auto border-2 border-naranja min-h-[120px] md:min-h-[180px]`}

            variants={itemVariants}

            whileHover={{ scale: 1.08 }}

          >

            <div className="text-naranja">{stat.icon}</div>

            <span className="text-sm font-bold tracking-widest text-moonstone uppercase">{stat.label}</span>

            <AnimatedNumber value={stat.value} />

            <span className="text-xs md:text-sm text-moonstone mt-2">{stat.description}</span>

          </motion.div>

        ))}

        {/* Caja de vistas totales abajo */}

        <motion.div

          className="col-span-1 md:col-span-3 bg-white p-2 md:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3 hover:shadow-md transition-shadow duration-300 border-2 border-naranja min-h-[100px] md:min-h-[140px]"

          variants={itemVariants}

          whileHover={{ scale: 1.04 }}

        >

          <div className="flex items-center gap-4 md:gap-6">

            <div className="size-16 rounded-2xl bg-jet flex items-center justify-center text-naranja">

              <MdBarChart size={32} />

            </div>

            <div className="flex flex-col text-center md:text-left">

              <span className="text-lg font-bold text-naranja">Vistas totales</span>

              <span className="text-sm text-moonstone">Agregado en todas las plataformas</span>

            </div>

          </div>

          <AnimatedNumber value={4450000} />

        </motion.div>

      </motion.div>

    </section>

  );

}



// Animación de número tipo máquina tragamonedas

function AnimatedNumber({ value }: { value: number }) {

  const [display, setDisplay] = useState(0);

  useEffect(() => {

    let start = 0;

    const duration = 1200;

    const step = Math.max(1, Math.floor(value / 60));

    const interval = setInterval(() => {

      start += step;

      if (start >= value) {

        setDisplay(value);

        clearInterval(interval);

      } else {

        setDisplay(start);

      }

    }, duration / (value / step));

    return () => clearInterval(interval);

  }, [value]);

  // Formatear número con K/M

  function formatNumber(num: number) {

    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";

    if (num >= 1000) return Math.floor(num / 1000) + "K";

    return num.toString();

  }

  return (

    <span className="text-2xl md:text-6xl font-extrabold text-naranja drop-shadow-lg mb-1 md:mb-2 font-oswald">

      {formatNumber(display)}

    </span>

  );

}