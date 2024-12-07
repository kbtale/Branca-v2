import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function RotatingLogo() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      const rotateXValue = ((mouseY - windowHeight / 2) / windowHeight) * 25;
      const rotateYValue = ((mouseX - windowWidth / 2) / windowWidth) * 25;
      
      rotateX.set(-rotateXValue);
      rotateY.set(rotateYValue);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        transition: 'all 0.15s ease'
      }}
      className="w-24 h-24"
    >
      <img
        src="/images/logo.png"
        alt="Branca Fútbol"
        className="w-full h-full object-contain"
      />
    </motion.div>
  );
}
