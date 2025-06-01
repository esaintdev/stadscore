import React from 'react';

const ClubWorldCup = () => {
  return (
    <div>
      <iframe 
        id="sofa-cupTree-embed-357-69619-10819534" 
        src="https://widgets.sofascore.com/embed/unique-tournament/357/season/69619/cuptree/10819534?widgetTitle=Club World Championship 2025, Playoffs&showCompetitionLogo=true&widgetTheme=light" 
        style={{
          height: '900px',
          maxWidth: '100%',
          width: '100%'
        }} 
        frameBorder="0" 
        scrolling="yes"
        title="Club World Cup Fixtures"
      ></iframe>
      <div style={{
        fontSize: '12px',
        fontFamily: 'Arial, sans-serif',
        textAlign: 'left',
        marginTop: '8px'
      }}>
        Cup tree provided by{' '}
        <a 
          target="_blank" 
          rel="noopener noreferrer" 
          href="https://www.sofascore.com/tournament/football/world/club-world-championship/357#id:69619"
        >
          Sofascore
        </a>
      </div>
    </div>
  );
};

export default ClubWorldCup;