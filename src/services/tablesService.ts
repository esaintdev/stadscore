
import { useState, useEffect } from 'react';
import { League } from './matchesService';

// Types
export interface TeamStanding {
  position: number;
  team: {
    id: string;
    name: string;
    logo: string;
  };
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: string[]; // e.g., ["W", "L", "W", "D", "W"]
}

export interface LeagueStandings {
  league: League;
  standings: TeamStanding[];
}

// Mock data for teams
const mockTeams = {
  'pl': [
    { id: 'man_city', name: 'Manchester City', logo: 'https://media.api-sports.io/football/teams/50.png' },
    { id: 'liverpool', name: 'Liverpool', logo: 'https://media.api-sports.io/football/teams/40.png' },
    { id: 'chelsea', name: 'Chelsea', logo: 'https://media.api-sports.io/football/teams/49.png' },
    { id: 'man_utd', name: 'Manchester United', logo: 'https://media.api-sports.io/football/teams/33.png' },
    { id: 'arsenal', name: 'Arsenal', logo: 'https://media.api-sports.io/football/teams/42.png' },
  ],
  'laliga': [
    { id: 'real_madrid', name: 'Real Madrid', logo: 'https://media.api-sports.io/football/teams/541.png' },
    { id: 'barcelona', name: 'Barcelona', logo: 'https://media.api-sports.io/football/teams/529.png' },
    { id: 'atletico', name: 'Atletico Madrid', logo: 'https://media.api-sports.io/football/teams/530.png' },
    { id: 'sevilla', name: 'Sevilla', logo: 'https://media.api-sports.io/football/teams/536.png' },
  ],
  'bundesliga': [
    { id: 'bayern', name: 'Bayern Munich', logo: 'https://media.api-sports.io/football/teams/157.png' },
    { id: 'dortmund', name: 'Borussia Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png' },
    { id: 'leipzig', name: 'RB Leipzig', logo: 'https://media.api-sports.io/football/teams/173.png' },
  ],
  'seriea': [
    { id: 'milan', name: 'AC Milan', logo: 'https://media.api-sports.io/football/teams/489.png' },
    { id: 'inter', name: 'Inter', logo: 'https://media.api-sports.io/football/teams/505.png' },
    { id: 'juventus', name: 'Juventus', logo: 'https://media.api-sports.io/football/teams/496.png' },
  ],
  'ligue1': [
    { id: 'psg', name: 'Paris Saint Germain', logo: 'https://media.api-sports.io/football/teams/85.png' },
    { id: 'marseille', name: 'Marseille', logo: 'https://media.api-sports.io/football/teams/81.png' },
    { id: 'lyon', name: 'Lyon', logo: 'https://media.api-sports.io/football/teams/80.png' },
  ],
};

// Mock leagues data
const mockLeagues: League[] = [
  { id: 'pl', name: 'Premier League', country: 'England', logo: 'https://media.api-sports.io/football/leagues/39.png' },
  { id: 'laliga', name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png' },
  { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', logo: 'https://media.api-sports.io/football/leagues/78.png' },
  { id: 'seriea', name: 'Serie A', country: 'Italy', logo: 'https://media.api-sports.io/football/leagues/135.png' },
  { id: 'ligue1', name: 'Ligue 1', country: 'France', logo: 'https://media.api-sports.io/football/leagues/61.png' },
];

// Helper function to generate random form results
const generateRandomForm = () => {
  const results = ["W", "D", "L"];
  return Array.from({ length: 5 }, () => results[Math.floor(Math.random() * results.length)]);
};

// Generate mock standings data
const generateMockStandings = (): LeagueStandings[] => {
  return mockLeagues.map(league => {
    const teams = mockTeams[league.id as keyof typeof mockTeams] || [];
    
    // Shuffle teams to create random standings
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    
    // Generate mock standings
    const standings: TeamStanding[] = shuffledTeams.map((team, index) => {
      // Random stats but ensuring they make sense mathematically
      const played = 10 + Math.floor(Math.random() * 10); // 10-19 games played
      const won = Math.floor(Math.random() * (played + 1));
      const drawn = Math.floor(Math.random() * (played - won + 1));
      const lost = played - won - drawn;
      const goalsFor = won * 2 + drawn + Math.floor(Math.random() * 10);
      const goalsAgainst = lost * 2 + drawn + Math.floor(Math.random() * 5);
      
      return {
        position: index + 1,
        team: {
          id: team.id,
          name: team.name,
          logo: team.logo
        },
        played,
        won,
        drawn,
        lost,
        goalsFor,
        goalsAgainst,
        goalDifference: goalsFor - goalsAgainst,
        points: won * 3 + drawn,
        form: generateRandomForm()
      };
    });
    
    // Sort by points
    standings.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points;
      }
      return b.goalDifference - a.goalDifference;
    });
    
    // Update positions after sorting
    standings.forEach((team, index) => {
      team.position = index + 1;
    });
    
    return {
      league,
      standings
    };
  });
};

// Exported hooks
export const useLeagueStandings = () => {
  const [leagueStandings, setLeagueStandings] = useState<LeagueStandings[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const standings = generateMockStandings();
      setLeagueStandings(standings);
      setLoading(false);
    }, 1000);
  }, []);
  
  return { leagueStandings, loading };
};

export const useStandingsByLeagueId = (leagueId: string) => {
  const [standings, setStandings] = useState<LeagueStandings | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const allStandings = generateMockStandings();
      const leagueStandings = allStandings.find(s => s.league.id === leagueId) || null;
      setStandings(leagueStandings);
      setLoading(false);
    }, 800);
  }, [leagueId]);
  
  return { standings, loading };
};
