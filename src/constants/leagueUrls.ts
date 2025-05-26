// League widget configurations
export const LEAGUE_URLS: Record<string, string> = {
  pl: 'sofastats:1:61627', // Premier League - SofaScore widget
  laliga: 'https://widgets.sofascore.com/embed/tournament/36/season/61643/standings/LaLiga?widgetTitle=LaLiga&showCompetitionLogo=true', // La Liga - SofaScore widget
  bundesliga: 'https://widgets.sofascore.com/embed/tournament/35/season/61642/standings/Bundesliga?widgetTitle=Bundesliga&showCompetitionLogo=true', // Bundesliga - SofaScore widget
  seriea: 'https://sportsloci.com/widgets/league-standings-no/135/rgb(0, 0, 0)', // Serie A
  ligue1: 'footystats:12337', // Ligue 1 - FootyStats widget
  ucl: 'https://sportsloci.com/widgets/live-scores-no/1005/rgb(0,0,0)', // Champions League
  uel: 'https://sportsloci.com/widgets/league-standings-no/3/rgb(0, 0, 0)', // Europa League
};

// Leagues that use the FootyStats widget
export const FOOTYSTATS_LEAGUES = ['ligue1'];

// Leagues that use the SofaScore widget
export const SOFASTATS_LEAGUES = ['pl', 'laliga', 'bundesliga'];

// Default URL when no league is selected or league ID doesn't match
export const DEFAULT_LEAGUE_URL = 'https://sportsloci.com/widgets/league-standings-no/39/rgb(0, 0, 0)';
