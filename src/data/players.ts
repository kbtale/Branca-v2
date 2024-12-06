export interface Player {
  name: string;
  position: string;
  category: 'Delanteros' | 'Centrocampistas' | 'Defensas' | 'Porteros' | 'Cuerpo Técnico';
  image: string;
  number?: number;
  role?: string;
  logoUrl?: string;
}

export const players: Player[] = [
  {
    name: "Carlos Martínez",
    position: "Delantero Centro",
    category: "Delanteros",
    image: "/images/Player1.png",
    number: 9,
  },
  {
    name: "Juan Rodríguez",
    position: "Mediocampista",
    category: "Centrocampistas",
    image: "/images/Player2.png",
    number: 8,
  },
  {
    name: "Miguel Torres",
    position: "Defensa Central",
    category: "Defensas",
    image: "/images/Player3.png",
    number: 4,
  }
];
