
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeagues } from '@/services/matchesService';
import LeagueSelector from '@/components/leagues/LeagueSelector';
import { Circle, CircleDot, CircleX } from 'lucide-react';
import SportsWidget from '@/components/widgets/FootballWidget';

const sportsCategories = [
  { id: 'football', name: 'Football', icon: Circle, href: '/' },
  { id: 'basketball', name: 'Basketball', icon: CircleDot, href: '/basketball' },
  { id: 'tennis', name: 'Tennis', icon: Circle, href: '/tennis' },
  { id: 'handball', name: 'Handball', icon: CircleX, href: '/handball' },
  { id: 'volleyball', name: 'Volleyball', icon: Circle, href: '/volleyball' },
  { id: 'baseball', name: 'Baseball', icon: CircleDot, href: '/baseball' },
  { id: 'cricket', name: 'Cricket', icon: CircleX, href: '/cricket' },
];

const Basketball = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>('basketball');
  
  const { leagues, loading: leaguesLoading } = useLeagues();
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight mb-4">Live Scores</h1>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-max">
          {sportsCategories.map((sport) => (
            <button 
              key={sport.id}
              onClick={() => setSelectedSport(sport.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedSport === sport.id 
                  ? 'bg-stadscore text-white shadow-lg hover:shadow-stadscore/20' 
                  : 'bg-secondary text-foreground hover:bg-secondary/80 hover:shadow-md'
              }`}
            >
              {sport.icon && <sport.icon className="w-4 h-4" />}
              <Link to={sport.href} className="ml-2">{sport.name}</Link>
            </button>
          ))}
        </div>
      </div>

      {selectedSport === 'basketball' && (
        <>
          {leaguesLoading ? (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {Array(5).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-8 w-24 rounded-md" />
              ))}
            </div>
          ) : (
            <LeagueSelector 
              leagues={leagues}
              activeLeagueId={selectedLeagueId || ''} 
              onSelectLeague={(id) => setSelectedLeagueId(id || null)}
              className="mt-2" 
            />
          )}

          <Tabs defaultValue="live" className="w-full">
            <TabsContent value="live">
              <SportsWidget title="Basketball Live Scores" height="700px" />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
};

export default Basketball;
