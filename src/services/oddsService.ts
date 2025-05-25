import { useState, useEffect } from 'react';
import { League, Team } from './matchesService';

// Types
export interface BookmakerOdds {
  name: string;
  logo: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
}

export interface MatchOdds {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  bookmakers: BookmakerOdds[];
  startTime: string;
  league: League;
}

// Mock data
const mockBookmakers = [
  { name: 'Bet9ja', logo: 'https://www.bettingsites.ng/wp-content/uploads/2020/04/Bet9ja-logo-new.png' },
  { name: '1xBet', logo: 'https://www.bettingsites.ng/wp-content/uploads/2020/04/1xbet-logo.png' },
  { name: 'BetKing', logo: 'https://www.bettingsites.ng/wp-content/uploads/2020/04/betking-logo.png' },
  { name: '888Sport', logo: 'https://logodownload.org/wp-content/uploads/2021/04/888sport-logo-0.png' },
  { name: 'Betway', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Betway_logo.svg/2560px-Betway_logo.svg.png' },
];

// Helper function to generate random odds
const generateRandomOdds = () => {
  // Home odds between 1.5 and 4.0
  const homeOdds = 1.5 + Math.random() * 2.5;
  // Draw odds between 2.5 and 5.0
  const drawOdds = 2.5 + Math.random() * 2.5;
  // Away odds between 1.5 and 6.0
  const awayOdds = 1.5 + Math.random() * 4.5;
  
  return {
    home: parseFloat(homeOdds.toFixed(2)),
    draw: parseFloat(drawOdds.toFixed(2)),
    away: parseFloat(awayOdds.toFixed(2))
  };
};

// Generate mock match odds
const generateMockMatchOdds = (leagues: League[], teams: Record<string, Team[]>): MatchOdds[] => {
  const matchOdds: MatchOdds[] = [];
  
  // Current date
  const now = new Date();
  
  leagues.forEach(league => {
    const leagueTeams = teams[league.id];
    if (leagueTeams && leagueTeams.length >= 2) {
      // Generate odds for upcoming matches
      for (let i = 0; i < Math.min(3, Math.floor(leagueTeams.length / 2)); i++) {
        const homeTeamIndex = i * 2;
        const awayTeamIndex = i * 2 + 1;
        
        if (homeTeamIndex < leagueTeams.length && awayTeamIndex < leagueTeams.length) {
          const bookmakers = mockBookmakers.map(bookmaker => ({
            name: bookmaker.name,
            logo: bookmaker.logo,
            odds: generateRandomOdds()
          }));
          
          matchOdds.push({
            id: `${league.id}-odds-${i}`,
            homeTeam: leagueTeams[homeTeamIndex],
            awayTeam: leagueTeams[awayTeamIndex],
            bookmakers,
            startTime: new Date(now.getTime() + ((i + 1) * 24 * 60 * 60 * 1000)).toISOString(), // Future matches
            league
          });
        }
      }
    }
  });
  
  return matchOdds;
};

// Mock teams data
const mockTeams: Record<string, Team[]> = {
  'pl': [
    { id: 'man_utd', name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png' },
    { id: 'arsenal', name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
    { id: 'chelsea', name: 'Chelsea', logo: 'https://media.api-sports.io/football/teams/49.png' },
    { id: 'liverpool', name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
    { id: 'man_city', name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' },
  ],
  'laliga': [
    { id: 'real_madrid', name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
    { id: 'barcelona', name: 'Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
    { id: 'atletico', name: 'Atletico Madrid', logo: 'https://media.api-sports.io/football/teams/530.png' },
    { id: 'sevilla', name: 'Sevilla', logo: 'https://media.api-sports.io/football/teams/536.png' },
  ],
  // other leagues...
};

// Mock leagues data
const mockLeagues: League[] = [
  { id: 'pl', name: 'Premier League', country: 'England', logo: 'https://media.api-sports.io/football/leagues/39.png' },
  { id: 'laliga', name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png' },
  { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', logo: 'https://media.api-sports.io/football/leagues/78.png' },
  { id: 'seriea', name: 'Serie A', country: 'Italy', logo: 'https://media.api-sports.io/football/leagues/135.png' },
  { id: 'ligue1', name: 'Ligue 1', country: 'France', logo: 'https://media.api-sports.io/football/leagues/61.png' },
];

// Exported hooks
export const useMatchOdds = () => {
  const [matchOdds, setMatchOdds] = useState<MatchOdds[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const odds = generateMockMatchOdds(mockLeagues, mockTeams);
      setMatchOdds(odds);
      setLoading(false);
    }, 1000);
  }, []);
  
  return { matchOdds, loading };
};

export const useMatchOddsById = (matchId: string) => {
  const [matchOdds, setMatchOdds] = useState<MatchOdds | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const allOdds = generateMockMatchOdds(mockLeagues, mockTeams);
      const odds = allOdds.find(o => o.id === matchId) || null;
      setMatchOdds(odds);
      setLoading(false);
    }, 800);
  }, [matchId]);
  
  return { matchOdds, loading };
};
