import React from "react";
import { motion } from "framer-motion";

interface InfiniteBannerProps {
  images: string[];
  height?: string; // Ej: "h-24"
  gap?: string;    // Ej: "mx-6"
  duration?: number; // Segundos
}

const InfiniteBanner: React.FC<InfiniteBannerProps> = ({
  images,
  height = "h-24",
  gap = "mx-12",
  duration = 15,
}) => {
  // Duplicar solo una vez para seamless
  const bannerImages = [...images, ...images];

  return (
    <div className={`relative w-full overflow-hidden ${height} bg-jet`}>
      <motion.div
        className="flex w-max items-center"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration,
            ease: "linear",
          },
        }}
        style={{ willChange: "transform" }}
      >
        {bannerImages.map((img, idx) => (
          <div
            key={idx}
            className={`flex-shrink-0 ${gap} flex items-center`}
          >
            <img
              src={img}
              alt=""
              className={`object-contain ${height} select-none pointer-events-none`}
              draggable={false}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteBanner;
