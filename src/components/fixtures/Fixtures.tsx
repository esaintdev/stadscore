
import React from 'react';
import ChampionsLeague from '@/components/fixtures/ChampionsLeague';
import MLS from '@/components/fixtures/MLS';

const Fixtures = () => {
  
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Upcoming Fixtures</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mt-2">
            <ChampionsLeague />
            <MLS />
          </div>
        </div>
        
        
      </div>
    </div>
  );
};

export default Fixtures;
