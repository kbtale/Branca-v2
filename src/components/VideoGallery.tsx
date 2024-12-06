import { motion } from 'framer-motion';

interface Video {
  id: string;
  title: string;
}

const videos: Video[] = [
  { id: 'VIDEO_ID_1', title: 'Highlights Temporada 2023' },
  { id: 'VIDEO_ID_2', title: 'Mejores Momentos - Copa 2023' },
  { id: 'VIDEO_ID_3', title: 'Entrevista con el Entrenador' },
  // Add more videos as needed
];

export default function VideoGallery() {
  return (
    <div className="py-20">
      <h2 className="text-4xl font-bold text-center mb-12">Videos Recientes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glassmorphic rounded-xl overflow-hidden"
          >
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="border-0"
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{video.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
