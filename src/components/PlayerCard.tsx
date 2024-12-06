import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import '../styles/PlayerCard.css';

export interface PlayerProps {
  name: string;
  position: string;
  category: 'Delanteros' | 'Centrocampistas' | 'Defensas' | 'Porteros' | 'Cuerpo Técnico';
  image: string;
  number?: number;
  role?: string;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Delanteros':
      return 'from-red-500/30';
    case 'Centrocampistas':
      return 'from-blue-500/30';
    case 'Defensas':
      return 'from-yellow-500/30';
    case 'Porteros':
      return 'from-green-500/30';
    case 'Cuerpo Técnico':
      return 'from-purple-500/30';
    default:
      return 'from-gray-500/30';
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Delanteros':
      return '/images/fw.svg';
    case 'Centrocampistas':
      return '/images/mid.svg';
    case 'Defensas':
      return '/images/def.svg';
    case 'Porteros':
      return '/images/gk.svg';
    case 'Cuerpo Técnico':
      return '/images/mgr.svg';
    default:
      return '';
  }
};

export default function PlayerCard({ name, position, category, image, number, role }: PlayerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const gradientClass = getCategoryColor(category);
  const positionIcon = getCategoryIcon(category);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll(".card");
    
    const handleMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    cards.forEach(card => {
      card.addEventListener("mousemove", handleMouseMove as EventListener);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener("mousemove", handleMouseMove as EventListener);
      });
    };
  }, []);

  return (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`card neu-shadow rounded-2xl overflow-hidden bg-gradient-to-b ${gradientClass} to-club-dark ${!isMobile ? 'hover-effect' : ''}`}>
        <div className="wrapper"></div>
        <div className="card-border"></div>
        <div className="card-image-container relative aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="card-content absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-3 mb-1">
              {positionIcon && (
                <img
                  src={positionIcon}
                  alt={category}
                  className="w-6 h-6 opacity-90"
                />
              )}
              <h3 className="text-xl font-bold">{name}</h3>
            </div>
            <p className="text-sm opacity-90">
              {category === 'Cuerpo Técnico' ? role : `${position} | #${number}`}
            </p>
            <div className="mt-2">
              <span className="text-xs px-3 py-1 rounded-full bg-club-green/20 backdrop-blur-sm border border-club-green-light/20">
                {category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
