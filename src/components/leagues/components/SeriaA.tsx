import React from 'react';
import { BaseLeague } from './BaseLeague';

const Bundesliga: React.FC = () => {
  const standingsSrc = 'https://widgets.sofascore.com/embed/tournament/33/season/63515/standings/Serie%20A?widgetTitle=Serie%20A&showCompetitionLogo=true';
  const teamOfTheWeekSrc = 'https://widgets.sofascore.com/embed/unique-tournament/35/season/63516/round/19392/teamOfTheWeek?showCompetitionLogo=true&widgetTheme=light&widgetTitle=Bundesliga';

  return (
    <BaseLeague title="Serie A">
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        {/* Standings - Left Column */}
        <div className="w-full lg:w-1/2">
          <div className="w-full overflow-x-auto">
            <div style={{
              minWidth: '320px',
              width: '100%',
              margin: '0 auto',
              position: 'relative',
              paddingBottom: '183%',
              height: 0,
              overflow: 'hidden'
            }}>
              <iframe 
                id="sofa-standings-embed-seria-a"
                src={standingsSrc}
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
              href="https://www.sofascore.com/tournament/football/italy/serie-a/23#id:63515" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Sofascore
            </a>
          </div>
        </div>

        {/* Team of the Week - Right Column */}
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <div className="w-full max-w-lg mx-auto">
            <div style={{
              width: '100%',
              margin: '0 auto',
              position: 'relative',
              paddingBottom: '120%',
              height: 0,
              overflow: 'hidden'
            }}>
              <iframe 
                id="sofa-totw-embed-bundesliga"
                src={teamOfTheWeekSrc}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  transform: 'scale(0.9)',
                  transformOrigin: 'top left',
                  overflow: 'hidden'
                }}
                title="Bundesliga Team of the Week"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <div className="text-xs text-center text-muted-foreground p-2">
            Team of the Week provided by{' '}
            <a 
              href="https://www.sofascore.com/tournament/football/germany/bundesliga/35" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Sofascore
            </a>
          </div>
        </div>
      </div>
    </BaseLeague>
  );
};

export default Bundesliga;
