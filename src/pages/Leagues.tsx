import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Import league components
import PremierLeague from '@/components/leagues/PremierLeague';
import LaLiga from '@/components/leagues/LaLiga';
import SerieA from '@/components/leagues/SerieA';
import Bundesliga from '@/components/leagues/Bundesliga';
import Ligue1 from '@/components/leagues/Ligue1';
import Eredivise from '@/components/leagues/Eredivise';
// Import other league components as needed

type LeagueType = 'premier-league' | 'la-liga' | 'serie-a' | 'bundesliga' | 'ligue-1' | 'eredivise';

const Leagues = () => {
  const [activeLeague, setActiveLeague] = useState<LeagueType>('premier-league');

  const leagues: { id: LeagueType; name: string; component: React.ReactNode }[] = [
    { id: 'premier-league', name: 'Premier League', component: <PremierLeague /> },
    { id: 'la-liga', name: 'La Liga', component: <LaLiga /> },
    { id: 'serie-a', name: 'Serie A', component: <SerieA /> },
    { id: 'bundesliga', name: 'Bundesliga', component: <Bundesliga /> },
    { id: 'ligue-1', name: 'Ligue 1', component: <Ligue1 /> },
    { id: 'eredivise', name: 'Eredivise', component: <Eredivise /> },
  ];

  return (
    <div className="px-4 pt-4">
      <h1 className="text-2xl font-bold mb-6">Leagues</h1>
      
      <Tabs 
        value={activeLeague} 
        onValueChange={(value) => setActiveLeague(value as LeagueType)}
        className="w-full"
      >
        <TabsList className="grid w-full h-full grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-6">
          {leagues.map((league) => (
            <TabsTrigger 
              key={league.id} 
              value={league.id}
              className={`capitalize transition-all duration-200 ${
                activeLeague === league.id 
                  ? 'border-b-2 border-primary font-semibold' 
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {league.name}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <div className="mt-12">
        {leagues.map((league) => (
          <TabsContent key={league.id} value={league.id}>
            <div className="pb-8">
              {league.component}
            </div>
          </TabsContent>
        ))}
        </div>
      </Tabs>
    </div>
  );
};

export default Leagues;