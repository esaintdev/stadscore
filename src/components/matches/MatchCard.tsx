
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MatchCardProps {
  match: {
    id: string;
    status: 'LIVE' | 'UPCOMING' | 'FINISHED';
    minute?: number;
    homeTeam: {
      name: string;
      logo: string;
      score?: number;
    };
    awayTeam: {
      name: string;
      logo: string;
      score?: number;
    };
    league: {
      name: string;
      country: string;
    };
    startTime: string;
  };
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const [expanded, setExpanded] = useState(false);
  
  const isLive = match.status === 'LIVE';
  const isUpcoming = match.status === 'UPCOMING';
  
  const formattedTime = new Date(match.startTime).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  return (
    <Card className={cn(
      "mb-2 overflow-hidden transition-all duration-200 hover:border-stadscore/50",
      expanded ? "shadow-md" : "shadow-sm"
    )}>
      <div className="p-3">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
          <span>{match.league.name} • {match.league.country}</span>
          <div className={cn(
            "px-2 py-0.5 rounded text-xs font-medium",
            isLive ? "bg-red-500 text-white" : 
            isUpcoming ? "bg-blue-500 text-white" : 
            "bg-gray-200 text-gray-700"
          )}>
            {isLive ? `${match.minute}'` : isUpcoming ? formattedTime : 'FT'}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-3/4 flex items-center space-y-2 flex-col">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <img src={match.homeTeam.logo || "https://via.placeholder.com/30"} alt={match.homeTeam.name} className="w-5 h-5" />
                <span className="font-medium">{match.homeTeam.name}</span>
              </div>
              {(isLive || !isUpcoming) && (
                <span className={cn("font-bold", isLive && "text-stadscore active-score")}>
                  {match.homeTeam.score}
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <img src={match.awayTeam.logo || "https://via.placeholder.com/30"} alt={match.awayTeam.name} className="w-5 h-5" />
                <span className="font-medium">{match.awayTeam.name}</span>
              </div>
              {(isLive || !isUpcoming) && (
                <span className={cn("font-bold", isLive && "text-stadscore active-score")}>
                  {match.awayTeam.score}
                </span>
              )}
            </div>
          </div>
          
          <div className="w-1/4 pl-2 flex justify-end">
            <Button 
              variant="ghost" 
              size="sm"
              className="p-0 h-auto"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="px-3 py-2 bg-muted/30 border-t text-sm">
          {isUpcoming ? (
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center">
                <div className="font-semibold">1</div>
                <div className="text-xs text-muted-foreground">1.95</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">X</div>
                <div className="text-xs text-muted-foreground">3.40</div>
              </div>
              <div className="text-center">
                <div className="font-semibold">2</div>
                <div className="text-xs text-muted-foreground">4.20</div>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between">
                <span>Possession</span>
                <div className="flex gap-2">
                  <span className="font-medium">55%</span>
                  <span className="font-medium">45%</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Shots</span>
                <div className="flex gap-2">
                  <span className="font-medium">12</span>
                  <span className="font-medium">8</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span>Shots on target</span>
                <div className="flex gap-2">
                  <span className="font-medium">5</span>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default MatchCard;
