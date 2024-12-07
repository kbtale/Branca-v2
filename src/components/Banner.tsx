import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Banner() {
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  
  const skyY = useTransform(scrollY, [0, 500], [0, 100]);
  const grassY = useTransform(scrollY, [0, 500], [0, -100]);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        style={{ y: skyY }}
      >
        <img 
          src="/images/SKY_BANNER.png" 
          alt="Sky" 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <motion.div 
        className="absolute inset-0"
        style={{ y: grassY }}
      >
        <img 
          src="/images/GRASS_BANNER.png" 
          alt="Grass" 
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-club-dark/90" />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <img 
            src="/images/logo.png" 
            alt="Branca Fútbol" 
            className="w-48 h-48 mx-auto mb-8 drop-shadow-2xl"
          />
          <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Bienvenido a Branca Fútbol</h1>
          <p className="text-xl opacity-90 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">Pasión por el deporte rey</p>
        </div>
      </div>
    </div>
  );
}
