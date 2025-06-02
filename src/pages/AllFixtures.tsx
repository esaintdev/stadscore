import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Fixtures from '@/components/fixtures/Fixtures';
import ClubWorldCup from '@/components/fixtures/clubworldcup/ClubWorldCup';
import MLS from '@/components/fixtures/MLS';
import ChampionsLeague from '@/components/fixtures/ChampionsLeague';
import EuropaLeague from '@/components/fixtures/EuropaLeague';



// Add this to your global CSS or create a separate CSS module
const styles = `
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// Add the styles to the head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

const AllFixtures = () => {
  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">All Fixtures</h1>
      
      <Tabs defaultValue="all" className="w-full">
        <div className="relative">
          <div className="overflow-x-auto pb-3 -mx-4 sm:mx-0 scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="inline-flex w-max min-w-full px-4 sm:px-0">
              <TabsList className="w-full inline-flex space-x-1 sm:space-x-2 px-1 p-6">
                <TabsTrigger 
                  value="all" 
                  className="px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-sm transition-all duration-200 data-[state=active]:text-white data-[state=active]:bg-[#ff5b00]"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="Club World Cup" 
                  className="px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-sm transition-all duration-200 data-[state=active]:text-white data-[state=active]:bg-[#ff5b00]"
                >
                  Club World Cup
                </TabsTrigger>
                <TabsTrigger 
                  value="MLS" 
                  className="px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-sm transition-all duration-200 data-[state=active]:text-white data-[state=active]:bg-[#ff5b00]"
                >
                  MLS
                </TabsTrigger>
                <TabsTrigger 
                  value="UEFA Champions League" 
                  className="px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-sm transition-all duration-200 data-[state=active]:text-white data-[state=active]:bg-[#ff5b00]"
                >
                  UEFA Champions League
                </TabsTrigger>
                <TabsTrigger 
                  value="UEFA Europa League" 
                  className="px-4 py-2.5 text-sm font-medium whitespace-nowrap rounded-sm transition-all duration-200 data-[state=active]:text-white data-[state=active]:bg-[#ff5b00]"
                >
                  UEFA Europa League
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>
        
        <div className="px-1">
          <TabsContent value="all" className="mt-4">
          <Fixtures />
        </TabsContent>
        
        <TabsContent value="Club World Cup" className="mt-4">
          <ClubWorldCup />
        </TabsContent>
        
        <TabsContent value="MLS" className="mt-4">
          <MLS />
          </TabsContent>
          
          <TabsContent value="UEFA Champions League" className="mt-4">
          <ChampionsLeague />
          </TabsContent>
          
          <TabsContent value="UEFA Europa League" className="mt-4">
          <EuropaLeague />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default AllFixtures;