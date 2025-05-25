import React from 'react';
import { BaseLeague } from './BaseLeague';

const LaLiga: React.FC = () => {
  const iframeSrc = 'https://widgets.sofascore.com/embed/tournament/36/season/61643/standings/LaLiga?widgetTitle=LaLiga&showCompetitionLogo=true';
  
  return (
    <BaseLeague title="La Liga">
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
            id="sofa-standings-laliga"
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
            title="La Liga Standings"
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
          href="https://www.sofascore.com/tournament/football/spain/laliga/8#id:61643" 
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

export default LaLiga;
