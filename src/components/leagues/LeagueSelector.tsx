
import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className={cn("w-full mb-4",  className)}>
      <ScrollArea className="w-full h-[400px] pr-4">
        <div className="space-y-2">
          <Button
            variant={activeLeagueId === null ? "default" : "outline"}
            size="sm"
            className="w-full justify-start bg-[#ff5b00] text-white border-none transition-colors duration-200 text-left px-4 py-2 rounded-sm font-bold"
            onClick={() => onSelectLeague('')}
          >
            All Leagues
          </Button>
          
          {leagues.map(league => (
            <Button
              key={league.id}
              variant={activeLeagueId === league.id ? "default" : "outline"}
              size="sm"
              asChild
              className="w-full justify-start items-center bg-gray-200 border-none text-black hover:bg-orange-500 gap-3 transition-colors duration-200 text-left px-2 py-2 rounded-sm font-medium"
              onClick={() => onSelectLeague(league.id)}
            >
              <Link to={`/league-tables/${league.id}`}>
              <div className="flex items-center gap-1.5">
                {league.logo && (
                  <img 
                    src={league.logo || "https://via.placeholder.com/20"}
                    alt={league.name} 
                    className="h-4 w-4 object-contain " 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://via.placeholder.com/20";
                    }}
                  />
                )}
                <span>{league.name}</span>
                <span></span>
                <span></span>
              </div>
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LeagueSelector;
