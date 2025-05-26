import React from 'react';
import { BaseLeague } from './BaseLeague';

const Bundesliga: React.FC = () => {
  const iframeSrc = 'https://widgets.sofascore.com/embed/tournament/35/season/61642/standings/Bundesliga?widgetTitle=Bundesliga&showCompetitionLogo=true';
  
  return (
    <BaseLeague title="Bundesliga">
      <div className="w-full overflow-x-auto">
        <div style={{
          minWidth: '320px',
          width: '100%',
          maxWidth: '768px',
          margin: '0 auto',
          position: 'relative',
          paddingBottom: '140%',
          height: 0,
          overflow: 'hidden'
        }}>
          <iframe 
            id="sofa-standings-bundesliga"
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
            title="Bundesliga Standings"
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
          href="https://www.sofascore.com/tournament/football/germany/bundesliga/35" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Sofascore
        </a>
      </div>
    </BaseLeague>
  );
};

export default Bundesliga;
