import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PlayerCard, { PlayerProps } from './PlayerCard';

const categories = [
  'Todos',
  'Delanteros',
  'Centrocampistas',
  'Defensas',
  'Porteros',
  'Cuerpo Técnico'
] as const;

const players: PlayerProps[] = [
  // Delanteros
  {
    name: 'Carlos Mendoza',
    position: 'Delantero Centro',
    category: 'Delanteros',
    image: '/images/Player1.png',
    number: 9,
    logoUrl: '/images/fw.svg'
  },
  {
    name: 'Lucas Vázquez',
    position: 'Extremo Derecho',
    category: 'Delanteros',
    image: '/images/Player2.png',
    number: 11,
    logoUrl: '/images/fw.svg'
  },
  {
    name: 'Javier Morales',
    position: 'Extremo Izquierdo',
    category: 'Delanteros',
    image: '/images/Player3.png',
    number: 7,
    logoUrl: '/images/fw.svg'
  },
  // Centrocampistas
  {
    name: 'Diego Ramírez',
    position: 'Mediocampista Ofensivo',
    category: 'Centrocampistas',
    image: '/images/Player1.png',
    number: 10,
    logoUrl: '/images/mid.svg'
  },
  {
    name: 'Andrés Silva',
    position: 'Mediocampista Central',
    category: 'Centrocampistas',
    image: '/images/Player2.png',
    number: 8,
    logoUrl: '/images/mid.svg'
  },
  {
    name: 'Miguel Ángel',
    position: 'Mediocampista Defensivo',
    category: 'Centrocampistas',
    image: '/images/Player3.png',
    number: 5,
    logoUrl: '/images/mid.svg'
  },
  // Defensas
  {
    name: 'Juan García',
    position: 'Defensa Central',
    category: 'Defensas',
    image: '/images/Player1.png',
    number: 4,
    logoUrl: '/images/def.svg'
  },
  {
    name: 'Roberto López',
    position: 'Lateral Derecho',
    category: 'Defensas',
    image: '/images/Player2.png',
    number: 2,
    logoUrl: '/images/def.svg'
  },
  {
    name: 'Fernando Castro',
    position: 'Lateral Izquierdo',
    category: 'Defensas',
    image: '/images/Player3.png',
    number: 3,
    logoUrl: '/images/def.svg'
  },
  {
    name: 'Pablo Martínez',
    position: 'Defensa Central',
    category: 'Defensas',
    image: '/images/Player1.png',
    number: 6,
    logoUrl: '/images/def.svg'
  },
  // Porteros
  {
    name: 'Miguel Torres',
    position: 'Portero',
    category: 'Porteros',
    image: '/images/Player2.png',
    number: 1,
    logoUrl: '/images/gk.svg'
  },
  {
    name: 'David Sánchez',
    position: 'Portero',
    category: 'Porteros',
    image: '/images/Player3.png',
    number: 13,
    logoUrl: '/images/gk.svg'
  },
  // Cuerpo Técnico
  {
    name: 'Antonio Ruiz',
    category: 'Cuerpo Técnico',
    position: 'Director Técnico',
    image: '/images/Player1.png',
    role: 'Director Técnico',
    logoUrl: '/images/mgr.svg'
  },
  {
    name: 'Carlos Vega',
    category: 'Cuerpo Técnico',
    position: 'Asistente Técnico',
    image: '/images/Player2.png',
    role: 'Asistente Técnico',
    logoUrl: '/images/mgr.svg'
  },
  {
    name: 'Luis Hernández',
    category: 'Cuerpo Técnico',
    position: 'Preparador Físico',
    image: '/images/Player3.png',
    role: 'Preparador Físico',
    logoUrl: '/images/mgr.svg'
  }
];

const categoryColors = {
  Delanteros: 'bg-red-500',
  Centrocampistas: 'bg-blue-500',
  Defensas: 'bg-green-500',
  Porteros: 'bg-yellow-500',
  'Cuerpo Técnico': 'bg-purple-500',
  Todos: 'bg-gray-500'
};

export default function TeamSection() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('Todos');

  const filteredPlayers = players.filter(player => 
    selectedCategory === 'Todos' || player.category === selectedCategory
  );

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Nuestro Equipo</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? `${categoryColors[category]} text-white shadow-lg`
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Players Grid */}
        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-8"
        >
          <AnimatePresence>
            {filteredPlayers.map(player => (
              <motion.div
                key={player.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <PlayerCard {...player} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
