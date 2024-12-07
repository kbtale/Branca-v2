import { useState } from 'react';
import { motion } from 'framer-motion';
import PlayerCard, { PlayerProps } from './PlayerCard';

const categories = [
  'Todos',
  'Delanteros',
  'Centrocampistas',
  'Defensas',
  'Porteros',
  'Cuerpo Técnico'
] as const;

const categoryColors: Record<string, string> = {
  'Todos': 'bg-club-green-light',
  'Delanteros': 'bg-club-green-light',
  'Centrocampistas': 'bg-club-green-light',
  'Defensas': 'bg-club-green-light',
  'Porteros': 'bg-club-green-light',
  'Cuerpo Técnico': 'bg-club-green-light'
};

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

export default function TeamSection() {
  const [selectedCategory, setSelectedCategory] = useState<typeof categories[number]>('Todos');

  const filteredPlayers = players.filter(player => 
    selectedCategory === 'Todos' || player.category === selectedCategory
  );

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-12">El Equipazo</h2>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full transition-all ${
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {filteredPlayers.map(player => (
          <motion.div
            key={player.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PlayerCard {...player} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
