import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLeagues } from '@/services/matchesService';
import LeagueSelector from '@/components/leagues/LeagueSelector';
import { Skeleton } from '@/components/ui/skeleton';
import FootballWidget from '@/components/widgets/FootballWidget';

const League = () => {
  const { leagueId: paramLeagueId } = useParams<{ leagueId?: string }>();
  const navigate = useNavigate();
  const { leagues, loading } = useLeagues();
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);

  // Set initial league from URL params or first available league
  useEffect(() => {
    if (leagues.length > 0) {
      const leagueToSelect = paramLeagueId || leagues[0]?.id || null;
      setSelectedLeagueId(leagueToSelect);
    }
  }, [leagues, paramLeagueId]);

  const handleLeagueSelect = (leagueId: string) => {
    setSelectedLeagueId(leagueId);
    navigate(`/league/${leagueId}`, { replace: true });
  };

  const selectedLeague = leagues.find(league => league.id === selectedLeagueId) || null;

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">League Tables</h1>
      
      <div className="bg-card rounded-lg p-4 shadow">
        <LeagueSelector
          leagues={leagues}
          activeLeagueId={selectedLeagueId}
          onSelectLeague={handleLeagueSelect}
        />
        
        {selectedLeague && (
          <div className="mt-6">
            <FootballWidget 
              type="standings"
              league={selectedLeague.id}
              height="800px"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default League;
