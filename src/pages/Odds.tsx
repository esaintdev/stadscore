
import React, { useState } from 'react';
import OddsWidget from '@/components/widgets/OddsWidget';
import ComingSoonWidget from '@/components/widgets/ComingSoonWidget';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Odds = () => {
  const [selectedSport, setSelectedSport] = useState<'football' | 'basketball' | 'tennis' | 'american-football' | 'baseball' | 'hockey' | 'cricket' | 'boxing' | 'golf' | 'formula1'>('football');
  
  const hasWidget = (sport: string) => {
    return ['football', 'basketball', 'tennis', 'american-football', 'baseball', 'hockey'].includes(sport);
  };
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Betting Odds</h1>
      
      <div className="overflow-x-auto pb-2">
        <div className="flex flex-nowrap gap-2 min-w-max">
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
          <button 
            onClick={() => setSelectedSport('american-football')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSport === 'american-football' 
                ? 'bg-stadscore text-white' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            American Football
          </button>
          <button 
            onClick={() => setSelectedSport('baseball')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSport === 'baseball' 
                ? 'bg-stadscore text-white' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Baseball
          </button>
          <button 
            onClick={() => setSelectedSport('hockey')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSport === 'hockey' 
                ? 'bg-stadscore text-white' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Hockey
          </button>
          <button 
            onClick={() => setSelectedSport('cricket')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSport === 'cricket' 
                ? 'bg-stadscore text-white' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Cricket
          </button>
          <button 
            onClick={() => setSelectedSport('boxing')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSport === 'boxing' 
                ? 'bg-stadscore text-white' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Boxing
          </button>
          <button 
            onClick={() => setSelectedSport('golf')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSport === 'golf' 
                ? 'bg-stadscore text-white' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Golf
          </button>
          <button 
            onClick={() => setSelectedSport('formula1')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedSport === 'formula1' 
                ? 'bg-stadscore text-white' 
                : 'bg-secondary text-foreground hover:bg-secondary/80'
            }`}
          >
            Formula 1
          </button>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mb-4">
        Showing best available odds from top bookmakers.
      </div>
      
      {hasWidget(selectedSport) ? (
        <OddsWidget sport={selectedSport as any} />
      ) : (
        <ComingSoonWidget 
          title={`${selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)} Betting Odds`} 
          description={`We're in the process of adding ${selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)} betting odds to our platform. Check back soon!`}
          height="600px"
        />
      )}
    </div>
  );
};

export default Odds;
