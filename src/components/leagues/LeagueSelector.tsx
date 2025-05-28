
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface LeagueSelectorProps {
  leagues: Array<{
    id: string;
    name: string;
    country: string;
    logo: string;
  }>;
  activeLeagueId: string | null;
  onSelectLeague: (leagueId: string) => void;
  className?: string;
}

const LeagueSelector: React.FC<LeagueSelectorProps> = ({ 
  leagues, 
  activeLeagueId, 
  onSelectLeague,
  className
}) => {
  return (
    <div className={cn("w-full mb-4", className)}>
      <ScrollArea className="w-full pb-2">
        <div className="flex space-x-2 pb-3 px-1">
          <Button
            variant={activeLeagueId === null ? "default" : "outline"}
            size="sm"
            className="whitespace-nowrap hover:shadow-md transition-all duration-300"
            onClick={() => onSelectLeague('')}
          >
            All Leagues
          </Button>
          
          {leagues.map(league => (
            <Button
              key={league.id}
              variant={activeLeagueId === league.id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap flex items-center gap-1.5 hover:shadow-md transition-all duration-300 animate-in"
              onClick={() => onSelectLeague(league.id)}
            >
              {league.logo && (
                <img 
                  src={league.logo || "https://via.placeholder.com/20"}
                  alt={league.name} 
                  className="h-4 w-4 object-contain" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/20";
                  }}
                />
              )}
              {league.name}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeagueSelector;
