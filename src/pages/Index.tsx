import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Menu, X } from 'lucide-react';
import { useLeagues } from '@/services/matchesService';
import LeagueSelector from '@/components/leagues/LeagueSelector';
import LeagueTable from '@/components/leagues/LeagueTable';
import FootballWidget from '@/components/widgets/FootballWidget';

const HomePage = () => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  const { leagues, loading: leaguesLoading } = useLeagues();
  const selectedSport = 'football'; // Default sport now handled in header
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };
  
  return (
    <div className="flex w-full h-full bg-gray-50 relative">
      {/* Mobile Sidebar Overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-26 md:top-[var(--header-height,112px)] z-40 h-[calc(100vh-5rem)] md:h-[calc(100vh-var(--header-height,112px))] bg-white border-r border-gray-200 p-4 transition-transform duration-300 ease-in-out ${
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
        
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">FIFA World Ranking</h2>
          <div className="mt-4">
            <iframe 
              style={{ height: '500px', width: '100%', border: 'none' }} 
              src='https://www.scoremer.com/widgets/fifa_world_ranking?c=2F8162&f=FFF' 
              title="FIFA World Ranking"
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-full transition-all duration-300 relative z-30">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-gray-200 bg-white flex items-center sticky top-0 z-10">
          <button 
            className="text-gray-500 hover:text-gray-700 mr-4"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-[#ff5b00]">
            {selectedSport === 'football' ? 'Football' : selectedSport}
          </h1>
        </div>
        
        <div className="p-4 md:p-6 w-full">
          <Tabs defaultValue="live" className="w-full max-w-7xl mx-auto">
            <div className="flex justify-center w-full mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger className='bg-gray-800 text-white' value="live">Live Matches</TabsTrigger>
                <TabsTrigger className='bg-gray-800 text-white' value="standings">League Table</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="live" className="w-full">
              <FootballWidget />
            </TabsContent>
            <TabsContent value="standings" className="w-full overflow-x-hidden">
              <div className="min-w-max w-full ">
                <LeagueTable />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
