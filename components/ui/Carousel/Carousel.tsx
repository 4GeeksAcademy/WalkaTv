import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Card from "./Card";

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length, paused]);

  const goPrev = () => {
    setPaused(true);
    setActive((prev) => (prev - 1 + images.length) % images.length);
  };
  const goNext = () => {
    setPaused(true);
    setActive((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Flecha izquierda */}
      {/* <button
        className="absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition shadow-xl"
        onClick={goPrev}
        aria-label="Anterior"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
      </button> */}
      {/* Carrusel */}
      <div className="w-full h-full flex items-center justify-center">
        {images.map((img, idx) => (
          <Card key={idx} image={img} active={active === idx} />
        ))}
      </div>
      {/* Flecha derecha */}
      {/* <button
        className="absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition shadow-xl"
        onClick={goNext}
        aria-label="Siguiente"
      >
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
      </button> */}
    </div>
  );
};

export default Carousel;
