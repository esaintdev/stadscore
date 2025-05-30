
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import FootballWidget from '@/components/widgets/FootballWidget';
import { useLeagues } from '@/services/matchesService';
import LeagueSelector from '@/components/leagues/LeagueSelector';
import ComingSoonWidget from '@/components/widgets/ComingSoonWidget';
import { Card, CardContent } from '@/components/ui/card';
import { Circle, CircleDot, CircleX } from 'lucide-react';
import OddsWidget from '@/components/widgets/OddsWidget';
import LiveScoresWidget from '@/components/widgets/LiveScoresWidget';

import SportCategories from '@/components/widgets/SportCatergories';
import FootballFixtures from '@/components/fixtures/MLS';
import CompoundWidget from '@/components/widgets/CompoundWidget';

const HomePage = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>('football');
  
  const { leagues, loading: leaguesLoading } = useLeagues();
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      <div className="w-full overflow-hidden pb-2">
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="inline-block min-w-full">
              <SportCategories selectedSport={selectedSport} onSelectSport={setSelectedSport} />
            </div>
          </div>
          
          <style jsx>{`
            .scrollbar-hide {
              scrollbar-width: none; /* Firefox */
              -ms-overflow-style: none;  /* IE and Edge */
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none; /* Chrome, Safari and Opera */
              width: 0;
              height: 0;
            }
          `}</style>
        </div>
      </div>

      {selectedSport === 'football' && (
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
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="live" className="data-[state=active]:bg-stadscore data-[state=active]:text-white">Live Now</TabsTrigger>
              <TabsTrigger value="today" className="data-[state=active]:bg-stadscore data-[state=active]:text-white">Today</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live">
              <LiveScoresWidget type="livescores" league={selectedLeagueId || undefined} />
             
            </TabsContent>
            
            <TabsContent value="today">
              <FootballFixtures />
            </TabsContent>
          </Tabs>
        </>
      )}
      
      {selectedSport === 'basketball' && (
        <div className="grid gap-6">
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="live" className="data-[state=active]:bg-stadscore data-[state=active]:text-white">Live Now</TabsTrigger>
              <TabsTrigger value="odds" className="data-[state=active]:bg-stadscore data-[state=active]:text-white">Odds</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live">
              <FootballWidget type="livescores" height="700px" />
            </TabsContent>
            
            <TabsContent value="odds">
              <OddsWidget sport="basketball" height="700px" />
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {selectedSport === 'tennis' && (
        <div className="grid gap-6">
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-4">
              <TabsTrigger value="live" className="data-[state=active]:bg-stadscore data-[state=active]:text-white">Live Now</TabsTrigger>
              <TabsTrigger value="odds" className="data-[state=active]:bg-stadscore data-[state=active]:text-white">Odds</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live">
              <FootballWidget type="livescores" height="700px" />
            </TabsContent>
            
            <TabsContent value="odds">
              <OddsWidget sport="tennis" height="700px" />
            </TabsContent>
          </Tabs>
        </div>
      )}

      {(selectedSport === 'table-tennis' || selectedSport === 'handball' || 
        selectedSport === 'volleyball' || selectedSport === 'baseball' || 
        selectedSport === 'darts') && (
        <div className="grid gap-6">
          <ComingSoonWidget 
            title={`${SportCategories.find(s => s.id === selectedSport)?.name || ''} Live Scores`}
            description="We're working on adding live data for this sport. Check back soon!"
            height="600px"
          />
          <OddsWidget 
            sport={selectedSport === 'table-tennis' ? 'tennis' : 
                  selectedSport === 'volleyball' ? 'basketball' :
                  selectedSport === 'handball' ? 'basketball' :
                  selectedSport === 'darts' ? 'basketball' :
                  selectedSport as any}
            height="500px" 
          />
        </div>
      )}

      {selectedSport === 'cricket' && (
        <div className="grid gap-6">
          <ComingSoonWidget 
            title="Cricket Live Scores"
            description="Our cricket scorecards and statistics are coming soon!"
            height="600px"
          />
        </div>
      )}

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hover-glow transition-all duration-300">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-3">Popular Leagues</h2>
            <div className="grid grid-cols-2 gap-3">
              {leagues?.slice(0, 6).map((league) => (
                <button 
                  key={league.id}
                  onClick={() => {
                    setSelectedSport('football');
                    setSelectedLeagueId(league.id);
                  }}
                  className="flex items-center gap-2 p-3 rounded-md hover:bg-secondary transition-all duration-300"
                >
                  {league.logo && (
                    <img 
                      src={league.logo || "https://via.placeholder.com/24"} 
                      alt={league.name}
                      className="h-6 w-6 object-contain" 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://via.placeholder.com/24";
                      }}
                    />
                  )}
                  <span className="text-sm font-medium">{league.name}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover-glow transition-all duration-300">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold mb-3">Top Betting Odds</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary transition-all duration-300">
                <div className="flex items-center gap-2">
                  <CircleDot className="h-5 w-5 text-stadscore" />
                  <span>NBA Championship</span>
                </div>
                <button className="text-sm text-stadscore font-medium">View Odds</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary transition-all duration-300">
                <div className="flex items-center gap-2">
                  <Circle className="h-5 w-5 text-stadscore" />
                  <span>Grand Slam Finals</span>
                </div>
                <button className="text-sm text-stadscore font-medium">View Odds</button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-md hover:bg-secondary transition-all duration-300">
                <div className="flex items-center gap-2">
                  <CircleDot className="h-5 w-5 text-stadscore" />
                  <span>MLB World Series</span>
                </div>
                <button className="text-sm text-stadscore font-medium">View Odds</button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
