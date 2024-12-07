import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  description: string;
}

export default function VideoCarousel() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    fetchVideos();

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch('/api/youtube');
      if (!response.ok) throw new Error('Error fetching videos');
      const data = await response.json();
      setVideos(data);
    } catch (err) {
      setError('Error loading videos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-16 h-16 rounded-full neu-shadow-sm animate-pulse bg-club-dark"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10 neu-shadow rounded-xl p-6 bg-club-dark">
        {error}
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 md:px-0">
      <div className="neu-shadow rounded-2xl overflow-hidden bg-club-dark">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: isMobile ? 0 : 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isMobile ? 0 : -100 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videos[currentIndex]?.id}`}
                title={videos[currentIndex]?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              ></iframe>
            </div>
            <div className="p-6 md:p-8">
              <h3 className="text-xl font-bold mb-2 text-white">{videos[currentIndex]?.title}</h3>
              <p className="text-gray-400 text-sm">
                {videos[currentIndex]?.publishedAt}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none">
          <button
            onClick={handlePrevious}
            className={`w-12 h-12 rounded-full flex items-center justify-center pointer-events-auto focus:outline-none text-white hover:scale-110 transition-all duration-200 shadow-xl border border-white/20 ${currentIndex !== 0 ? 'bg-club-green hover:bg-club-green-light' : 'bg-black/80'}`}
            aria-label="Previous video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className={`w-12 h-12 rounded-full flex items-center justify-center pointer-events-auto focus:outline-none text-white hover:scale-110 transition-all duration-200 shadow-xl border border-white/20 ${currentIndex !== videos.length - 1 ? 'bg-club-green hover:bg-club-green-light' : 'bg-black/80'}`}
            aria-label="Next video"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Video Indicators */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-club-green-light' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
