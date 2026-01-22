import React from "react";
import { motion, useTransform, useSpring, MotionValue } from "framer-motion";

interface CardProps {
  image: string;
  active: boolean;
}

const Card: React.FC<CardProps> = ({ image, active }) => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex items-center justify-center"
      initial={{ opacity: 0, scale: 1, x: 0, y: 0 }}
      animate={
        active
          ? { opacity: 1, scale: 1.1, x: 0, y: 0 }
          : { opacity: 0, scale: 1, x: 100, y: 60 }
      }
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      style={{ zIndex: active ? 2 : 1 }}
    >
      <motion.img
        src={image}
        alt="carousel card"
        className="bg-jet w-full h-full object-contain scale-140"
        initial={{ x: -40, y: -20 }}
        animate={active ? { x: 0, y: 0 } : { x: 40, y: 20 }}
        transition={{ type: "spring", stiffness: 60, damping: 30 }}
      />
    </motion.div>
  );
};

export default Card;
