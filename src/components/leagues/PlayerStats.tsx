import React from 'react';
import { Player } from '@/services/playerService';
import { Skeleton } from '@/components/ui/skeleton';

interface PlayerStatsProps {
  players: Player[];
  title: string;
  statKey: 'goals' | 'assists';
  loading: boolean;
}

const PlayerStatsCard: React.FC<PlayerStatsProps> = ({ players, title, statKey, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center py-2 border-b border-gray-100 last:border-0">
            <Skeleton className="w-8 h-8 rounded-full mr-3" />
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-1" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      {players.map((player, index) => (
        <div key={player.id} className="flex items-center py-2 border-b border-gray-100 last:border-0">
          <div className="w-8 text-center text-gray-500 font-medium">{index + 1}</div>
          <img 
            src={player.image} 
            alt={player.name} 
            className="w-8 h-8 rounded-full object-cover mr-3"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32';
            }}
          />
          <div className="flex-1">
            <div className="font-medium text-sm">{player.name}</div>
            <div className="text-xs text-gray-500">{player.team}</div>
          </div>
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
            {player[statKey]}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerStatsCard;
