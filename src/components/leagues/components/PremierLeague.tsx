import React from 'react';
import { BaseLeague } from './BaseLeague';
import TopScorers from './TopScorers';

const PremierLeague: React.FC = () => {
  const iframeSrc = 'https://widgets.sofascore.com/embed/tournament/1/season/61627/standings/Premier%20League?widgetTitle=Premier%20League&showCompetitionLogo=true';
  
  return (
    <BaseLeague title="">
      <div className="w-full overflow-x-auto">
        <div style={{
          minWidth: '320px',
          width: '100%',
          maxWidth: '768px',
          margin: '0 auto',
          position: 'relative',
          paddingBottom: '140%',
          height: '100%',
          overflow: 'hidden'
        }}>
          <iframe 
            id="sofa-standings-premier-league"
            src={iframeSrc}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              overflow: 'auto'
            }}
            title="Premier League Standings"
            scrolling="yes"
            allowFullScreen
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <div className="text-xs text-center text-muted-foreground p-2">
        Standings provided by{' '}
        <a 
          href="https://www.sofascore.com/tournament/football/england/premier-league/17#id:61627" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
          loading="lazy"
        />
      </div>
      
      {/* Top Scorers Section */}
      <div className="w-full mt-8">
        <TopScorers 
          competitionId="premier-league" 
          seasonId="2023" 
        />
      </div>
    </BaseLeague>
  );
};

export default PremierLeague;
