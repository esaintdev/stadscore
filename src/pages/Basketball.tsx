import React, { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';

interface SportsWidgetProps {
  height?: string;
  width?: string;
}

const SportsWidget: React.FC<SportsWidgetProps> = ({ height = '100%', width = '100%' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const selectedSport = 'basketball';
  const scheduleWidgetId = 'proballers-schedule-widget';
  const standingsWidgetId = 'proballers-standings-widget';
  const scheduleScriptId = 'proballers-schedule-script';
  const standingsScriptId = 'proballers-standings-script';
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);


  const handleLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  
  // Load a script and return a cleanup function
  const useScript = (src: string, id: string, onLoad: () => void) => {
    useEffect(() => {
      if (document.getElementById(id)) return;

      const script = document.createElement('script');
      script.id = id;
      script.src = src;
      script.async = true;
      script.onload = onLoad;

      document.body.appendChild(script);

      return () => {
        const scriptElement = document.getElementById(id);
        if (scriptElement) {
          scriptElement.remove();
        }
      };
    }, [src, id, onLoad]);
  };

  // Load schedule widget script
  useScript(
    'https://widgets.proballers.com/dist/team-schedule-results-full-widget-v1.0.js',
    scheduleScriptId,
    () => {
      if (window.PbTeamScheduleResultsFullWidget) {
        window.PbTeamScheduleResultsFullWidget.render();
      }
    }
  );

  // Load standings widget script
  useScript(
    'https://widgets.proballers.com/dist/league-standings-full-widget-v1.0.js',
    standingsScriptId,
    () => {
      if (window.PbLeagueStandingsFullWidget) {
        window.PbLeagueStandingsFullWidget.render();
      }
    }
  );

  // Cleanup widgets on unmount
  useEffect(() => {
    return () => {
      [scheduleWidgetId, standingsWidgetId].forEach(id => {
        const widget = document.getElementById(id);
        if (widget) {
          widget.innerHTML = '';
        }
      });
    };
  }, []);

  return (
    <div className="pb-8">
      <div className="md:hidden p-4 border-b border-gray-200 bg-white flex items-center sticky top-0 z-10">
        
        <button 
          className="text-gray-500 hover:text-gray-700 mr-4"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold text-[#ff5b00]">
          {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)}
        </h1>
      </div>
      
      <div className="container mx-auto px-4 mt-6 space-y-8">
        {/* Schedule Widget */}
        <div className="bg-transparent rounded-lg shadow-md overflow-hidden">
          <h2 className="text-lg font-semibold p-4 border-b">Schedule & Results</h2>
          <div 
            id={scheduleWidgetId}
            className="w-full"
            style={{ minHeight: '500px' }}
          >
            <div 
              className="proballers-widget-team-schedule-results-full" 
              data-proballers-widget-id="8a4323c1-9914-4242-b7c3-b18164b93f40"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <a href="https://www.proballers.com/" target="_blank" rel="noreferrer">
                Loading schedule...
              </a>
            </div>
          </div>
        </div>

        {/* Standings Widget */}
        <div className="bg-transparent rounded-lg shadow-md overflow-hidden">
          <h2 className="text-lg font-semibold p-4 border-b">League Standings</h2>
          <div 
            id={standingsWidgetId}
            className="w-full"
            style={{ minHeight: '500px' }}
          >
            <div 
              className="proballers-widget-league-standings-full" 
              data-proballers-widget-id="8f25b27f-83a6-45c2-829b-29e8592fca77"
              data-proballers-base-url="https://widgets.proballers.com"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              <a href="https://www.proballers.com/" target="_blank" rel="noreferrer">
                Loading standings...
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

declare global {
  interface Window {
    PbTeamScheduleResultsFullWidget: {
      render: () => void;
    };
    PbLeagueStandingsFullWidget: {
      render: () => void;
    };
  }
}

export default SportsWidget;
