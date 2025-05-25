
import React, { useState } from 'react';
import { useLeagues } from '@/services/matchesService';
import LeagueSelector from '@/components/leagues/LeagueSelector';
import { Skeleton } from "@/components/ui/skeleton";
import FootballWidget from '@/components/widgets/FootballWidget';

const Tables = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>('football');
  
  const { leagues, loading: leaguesLoading } = useLeagues();
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">League Tables</h1>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <button 
          onClick={() => setSelectedSport('football')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedSport === 'football' 
              ? 'bg-stadscore text-white' 
              : 'bg-secondary text-foreground hover:bg-secondary/80'
          }`}
        >
          Football
        </button>
        <button 
          onClick={() => setSelectedSport('basketball')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedSport === 'basketball' 
              ? 'bg-stadscore text-white' 
              : 'bg-secondary text-foreground hover:bg-secondary/80'
          }`}
        >
          Basketball
        </button>
        <button 
          onClick={() => setSelectedSport('tennis')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedSport === 'tennis' 
              ? 'bg-stadscore text-white' 
              : 'bg-secondary text-foreground hover:bg-secondary/80'
          }`}
        >
          Tennis
        </button>
      </div>
      
      {selectedSport === 'football' && leaguesLoading ? (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {Array(5).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-md" />
          ))}
        </div>
      ) : selectedSport === 'football' && (
        <LeagueSelector 
          leagues={leagues}
          activeLeagueId={selectedLeagueId || ''} 
          onSelectLeague={(id) => setSelectedLeagueId(id || null)} 
        />
      )}
      
      {selectedSport === 'football' && (
        <FootballWidget type="standings" league={selectedLeagueId || undefined} height="800px" />
      )}
      
      {selectedSport === 'basketball' && (
        <FootballWidget type="standings" height="800px" />
      )}
      
      {selectedSport === 'tennis' && (
        <div className="text-center py-12 text-muted-foreground">
          Tennis rankings are displayed by player rather than by league standings.
        </div>
      )}
    </div>
  );
};

export default Tables;
