import React, { useEffect } from 'react';

declare global {
  interface Window {
    jQuery: any;
  }
}

interface TopScorersProps {
  competitionId: string;
  seasonId: string;
}

const TopScorers: React.FC<TopScorersProps> = ({ competitionId, seasonId }) => {
  useEffect(() => {
    // Load jQuery if not already loaded
    if (!window.jQuery) {
      const jqueryScript = document.createElement('script');
      jqueryScript.src = 'https://code.jquery.com/jquery-2.1.4.min.js';
      document.body.appendChild(jqueryScript);
    }

    // Load Stats FC Top Scorers SDK
    if (!document.getElementById('statsfc-top-scorers-js')) {
      const script = document.createElement('script');
      script.id = 'statsfc-top-scorers-js';
      script.src = 'https://cdn.statsfc.com/js/top-scorers.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Cleanup function
    return () => {
      const jquery = document.querySelector('script[src*="jquery"]');
      if (jquery) jquery.remove();
      
      const statsScript = document.getElementById('statsfc-top-scorers-js');
      if (statsScript) statsScript.remove();
    };
  }, []);

  return (
    <div className="w-full mt-6">
      <div className="bg-card rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4">Top Scorers</h3>
        <div 
          className="statsfc-top-scorers" 
          data-key="jdE1tcxrIlCCYsFmjmwebYXrRBWrUQv7tbixJUiJ"
          data-competition={competitionId}
          data-season={seasonId}
        >
          <div className="loading">Loading top scorers...</div>
        </div>
      </div>
    </div>
  );
};

export default TopScorers;
