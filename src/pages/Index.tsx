
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useLeagues } from '@/services/matchesService';
import LeagueSelector from '@/components/leagues/LeagueSelector';
import LeagueTable from '@/components/leagues/LeagueTable';
import FootballWidget from '@/components/widgets/FootballWidget';
import sportCategories from '@/components/sportCatergories';
import { Menu, X } from 'lucide-react';

const HomePage = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [selectedSport, setSelectedSport] = useState<string>('football');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const { leagues, loading: leaguesLoading } = useLeagues();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // Auto-close sidebar on mobile when resizing to desktop
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close sidebar when a link is clicked on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };
  
  return (
    <div className="flex w-full h-screen bg-gray-50 relative">
      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:static z-30 h-full bg-white border-r border-gray-200 p-4 overflow-y-auto transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } w-64`}
      >
        <button 
          className="md:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={() => setIsSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          <X className="h-6 w-6" />
        </button>
        
        {sportCategories(selectedSport, (sport) => {
          setSelectedSport(sport);
          handleLinkClick();
        })}

        {selectedSport === 'football' && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Leagues</h2>
            {leaguesLoading ? (
              <div className="space-y-2">
                {Array(5).fill(0).map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md bg-gray-200" />
                ))}
              </div>
            ) : (
              <LeagueSelector 
                leagues={leagues}
                activeLeagueId={selectedLeagueId || ''} 
                onSelectLeague={(id) => {
                  setSelectedLeagueId(id || null);
                  handleLinkClick();
                }}
              />
            )}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-full transition-all duration-300">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-gray-200 bg-white flex items-center sticky top-0 z-10">
          <button 
            className="text-gray-500 hover:text-gray-700 mr-4"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">
            {selectedSport === 'football' ? 'Football' : selectedSport}
          </h1>
        </div>
        
        <div className="p-4 md:p-6">
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
              <TabsTrigger value="live">Live Matches</TabsTrigger>
              <TabsTrigger value="standings">League Table</TabsTrigger>
            </TabsList>
            
            <TabsContent value="live">
              <FootballWidget />
            </TabsContent>
            <TabsContent value="standings">
              <LeagueTable leagueId={selectedLeagueId || undefined} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
