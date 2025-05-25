
// This is a mock service that simulates fetching data from an API
// In a real application, you would replace these with actual API calls

import { useState, useEffect } from 'react';

// Types
export interface Team {
  id: string;
  name: string;
  logo: string;
  score?: number;
}

export interface League {
  id: string;
  name: string;
  country: string;
  logo: string;
}

export interface Match {
  id: string;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  minute?: number;
  homeTeam: Team;
  awayTeam: Team;
  league: League;
  startTime: string;
}

// Mock data
const mockLeagues: League[] = [
  // Top 5 European Leagues
  { id: 'pl', name: 'Premier League', country: 'England', logo: 'https://media.api-sports.io/football/leagues/39.png' },
  { id: 'laliga', name: 'La Liga', country: 'Spain', logo: 'https://media.api-sports.io/football/leagues/140.png' },
  { id: 'bundesliga', name: 'Bundesliga', country: 'Germany', logo: 'https://media.api-sports.io/football/leagues/78.png' },
  { id: 'seriea', name: 'Serie A', country: 'Italy', logo: 'https://media.api-sports.io/football/leagues/135.png' },
  { id: 'ligue1', name: 'Ligue 1', country: 'France', logo: 'https://media.api-sports.io/football/leagues/61.png' },
  
  // UEFA Competitions
  { id: 'ucl', name: 'UEFA Champions League', country: 'Europe', logo: 'https://media.api-sports.io/football/leagues/2.png' },
  { id: 'uel', name: 'UEFA Europa League', country: 'Europe', logo: 'https://media.api-sports.io/football/leagues/3.png' },
  { id: 'uecl', name: 'UEFA Conference League', country: 'Europe', logo: 'https://media.api-sports.io/football/leagues/848.png' },
  { id: 'uefa_supercup', name: 'UEFA Super Cup', country: 'Europe', logo: 'https://media.api-sports.io/football/leagues/667.png' },
  { id: 'euro_qual', name: 'European Championship', country: 'Europe', logo: 'https://media.api-sports.io/football/leagues/4.png' },
  { id: 'nations_league', name: 'UEFA Nations League', country: 'Europe', logo: 'https://media.api-sports.io/football/leagues/5.png' },
];

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
  'bundesliga': [
    { id: 'bayern', name: 'Bayern Munich', logo: 'https://media.api-sports.io/football/teams/157.png' },
    { id: 'dortmund', name: 'Borussia Dortmund', logo: 'https://media.api-sports.io/football/teams/165.png' },
    { id: 'leipzig', name: 'RB Leipzig', logo: 'https://media.api-sports.io/football/teams/173.png' },
  ],
  'seriea': [
    { id: 'juventus', name: 'Juventus', logo: 'https://media.api-sports.io/football/teams/496.png' },
    { id: 'milan', name: 'AC Milan', logo: 'https://media.api-sports.io/football/teams/489.png' },
    { id: 'inter', name: 'Inter', logo: 'https://media.api-sports.io/football/teams/505.png' },
  ],
  'ligue1': [
    { id: 'psg', name: 'Paris Saint Germain', logo: 'https://media.api-sports.io/football/teams/85.png' },
    { id: 'marseille', name: 'Marseille', logo: 'https://media.api-sports.io/football/teams/81.png' },
    { id: 'lyon', name: 'Lyon', logo: 'https://media.api-sports.io/football/teams/80.png' },
  ],
};

// Generate a random score
const getRandomScore = () => Math.floor(Math.random() * 5);

// Generate a random minute between 1 and 90
const getRandomMinute = () => Math.floor(Math.random() * 90) + 1;

// Generate mock matches
const generateMockMatches = (): Match[] => {
  const matches: Match[] = [];
  
  // Current date
  const now = new Date();
  
  // Generate live matches
  mockLeagues.forEach(league => {
    const teams = mockTeams[league.id];
    if (teams && teams.length >= 2) {
      // Add 1-2 live matches per league
      for (let i = 0; i < Math.min(2, Math.floor(teams.length / 2)); i++) {
        const homeTeamIndex = i * 2;
        const awayTeamIndex = i * 2 + 1;
        
        if (homeTeamIndex < teams.length && awayTeamIndex < teams.length) {
          matches.push({
            id: `${league.id}-live-${i}`,
            status: 'LIVE',
            minute: getRandomMinute(),
            homeTeam: { ...teams[homeTeamIndex], score: getRandomScore() },
            awayTeam: { ...teams[awayTeamIndex], score: getRandomScore() },
            league,
            startTime: new Date(now.getTime() - (40 * 60 * 1000)).toISOString(), // Started 40 minutes ago
          });
        }
      }
      
      // Add finished matches
      for (let i = 0; i < Math.min(3, Math.floor(teams.length / 2)); i++) {
        const homeTeamIndex = (i * 2 + 2) % teams.length;
        const awayTeamIndex = (i * 2 + 3) % teams.length;
        
        matches.push({
          id: `${league.id}-finished-${i}`,
          status: 'FINISHED',
          homeTeam: { ...teams[homeTeamIndex], score: getRandomScore() },
          awayTeam: { ...teams[awayTeamIndex], score: getRandomScore() },
          league,
          startTime: new Date(now.getTime() - (3 * 60 * 60 * 1000)).toISOString(), // 3 hours ago
        });
      }
      
      // Add upcoming matches
      for (let i = 0; i < Math.min(3, Math.floor(teams.length / 2)); i++) {
        const homeTeamIndex = (i * 2 + 4) % teams.length;
        const awayTeamIndex = (i * 2 + 5) % teams.length;
        
        matches.push({
          id: `${league.id}-upcoming-${i}`,
          status: 'UPCOMING',
          homeTeam: { ...teams[homeTeamIndex] },
          awayTeam: { ...teams[awayTeamIndex] },
          league,
          startTime: new Date(now.getTime() + ((i + 1) * 3 * 60 * 60 * 1000)).toISOString(), // In the future
        });
      }
    }
  });
  
  return matches;
};

// Exported hooks and functions
export const useLiveMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchMatches = () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const allMatches = generateMockMatches();
        const liveMatches = allMatches.filter(match => match.status === 'LIVE');
        setMatches(liveMatches);
        setLoading(false);
      }, 800);
    };
    
    fetchMatches();
    
    // In a real app, you might set up a polling mechanism here
    const intervalId = setInterval(() => {
      fetchMatches();
    }, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, []);
  
  return { matches, loading };
};

export const useUpcomingMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const allMatches = generateMockMatches();
      const upcomingMatches = allMatches
        .filter(match => match.status === 'UPCOMING')
        .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
      setMatches(upcomingMatches);
      setLoading(false);
    }, 800);
  }, []);
  
  return { matches, loading };
};

export const useFinishedMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const allMatches = generateMockMatches();
      const finishedMatches = allMatches
        .filter(match => match.status === 'FINISHED')
        .sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime());
      setMatches(finishedMatches);
      setLoading(false);
    }, 800);
  }, []);
  
  return { matches, loading };
};

export const useLeagues = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setLeagues(mockLeagues);
      setLoading(false);
    }, 500);
  }, []);
  
  return { leagues, loading };
};
