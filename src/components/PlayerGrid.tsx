import { players } from '../data/players';
import PlayerCard from './PlayerCard';

export default function PlayerGrid() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {players.map((player, index) => (
          <PlayerCard key={index} {...player} />
        ))}
      </div>
    </div>
  );
}
