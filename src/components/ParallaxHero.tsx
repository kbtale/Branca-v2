import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="h-screen relative overflow-hidden">
      {/* Background Field */}
      <motion.div 
        style={{ y, scale: 1.2 }}
        className="absolute inset-0 bg-[url('/images/soccer-field.jpg')] bg-cover bg-center"
      >
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Parallax Players */}
      <motion.img
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '30%']) }}
        src="/images/player1.png"
        className="absolute -left-10 bottom-0 h-[90vh] object-contain z-10"
        alt="Soccer Player"
      />
      <motion.img
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '20%']) }}
        src="/images/player2.png"
        className="absolute -right-10 bottom-0 h-[90vh] object-contain z-10"
        alt="Soccer Player"
      />

      {/* Club Shield and Content */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4"
      >
        <img
          src="/images/shield.png"
          alt="Branca Fútbol Shield"
          className="w-40 h-40 mb-8"
        />
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-center">
          Branca Fútbol
        </h1>
        <p className="text-xl md:text-2xl">Pasión, Dedicación, Victoria</p>
      </motion.div>
    </div>
  );
}
