
import React, { useState } from 'react';
import { useLeagues } from '@/services/matchesService';
import LeagueSelector from '@/components/leagues/LeagueSelector';
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FootballWidget from '@/components/widgets/FootballWidget';

const Results = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSport, setSelectedSport] = useState<string>('football');
  
  const { leagues, loading: leaguesLoading } = useLeagues();
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Results</h1>
      
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
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
          
          <div className="mt-6">
            {selectedSport === 'football' && (
              <FootballWidget type="results" league={selectedLeagueId || undefined} />
            )}
            {selectedSport === 'basketball' && (
              <FootballWidget type="results" />
            )}
            {selectedSport === 'tennis' && (
              <FootballWidget type="results" />
            )}
          </div>
        </div>
        
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Results;
