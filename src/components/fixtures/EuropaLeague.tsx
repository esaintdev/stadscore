import React from 'react';

const ClubWorldCup = () => {
  return (
    <div>
      <iframe 
        id="sofa-cupTree-embed-357-69619-10819534" 
        src="https://widgets.sofascore.com/embed/unique-tournament/679/season/61645/cuptree/10819860?widgetTitle=UEFA Europa League 24/25, Knockout stage&showCompetitionLogo=true&widgetTheme=dark" 
        style={{
          height: '900px',
          maxWidth: '100%',
          width: '100%'
        }} 
        frameBorder="0" 
        scrolling="yes"
        title="Europa League"
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
          href="https://www.sofascore.com/tournament/football/europe/uefa-europa-league/679#id:61645"
        >
          Sofascore
        </a>
      </div>
    </div>
  );
};

export default ClubWorldCup;