import { useState, useEffect } from 'react';

// Mock data for top Premier League players (in a real app, this would be an API call)
const mockTopScorers = [
  {
    id: 1,
    name: 'Erling Haaland',
    team: 'Manchester City',
    position: 'Forward',
    goals: 25,
    assists: 5,
    image: 'https://media.api-sports.io/football/players/1100.png',
  },
  {
    id: 2,
    name: 'Harry Kane',
    team: 'Tottenham',
    position: 'Forward',
    goals: 22,
    assists: 7,
    image: 'https://media.api-sports.io/football/players/184.png',
  },
  {
    id: 3,
    name: 'Ivan Toney',
    team: 'Brentford',
    position: 'Forward',
    goals: 18,
    assists: 4,
    image: 'https://media.api-sports.io/football/players/19366.png',
  },
  {
    id: 4,
    name: 'Mohamed Salah',
    team: 'Liverpool',
    position: 'Forward',
    goals: 17,
    assists: 9,
    image: 'https://media.api-sports.io/football/players/521.png',
  },
  {
    id: 5,
    name: 'Marcus Rashford',
    team: 'Manchester United',
    position: 'Forward',
    goals: 16,
    assists: 5,
    image: 'https://media.api-sports.io/football/players/909.png',
  },
];

const mockTopAssists = [
  {
    id: 1,
    name: 'Kevin De Bruyne',
    team: 'Manchester City',
    position: 'Midfielder',
    assists: 15,
    image: 'https://media.api-sports.io/football/players/293.png',
  },
  {
    id: 2,
    name: 'Bukayo Saka',
    team: 'Arsenal',
    position: 'Midfielder',
    assists: 12,
    image: 'https://media.api-sports.io/football/players/1386.png',
  },
  {
    id: 3,
    name: 'Leandro Trossard',
    team: 'Arsenal',
    position: 'Forward',
    assists: 10,
    image: 'https://media.api-sports.io/football/players/19230.png',
  },
  {
    id: 4,
    name: 'Mohamed Salah',
    team: 'Liverpool',
    position: 'Forward',
    assists: 9,
    image: 'https://media.api-sports.io/football/players/521.png',
  },
  {
    id: 5,
    name: 'Michael Olise',
    team: 'Crystal Palace',
    position: 'Midfielder',
    assists: 8,
    image: 'https://media.api-sports.io/football/players/19430.png',
  },
];

export interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
  goals?: number;
  assists?: number;
  image: string;
}

export const usePlayerStats = () => {
  const [topScorers, setTopScorers] = useState<Player[]>([]);
  const [topAssists, setTopAssists] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setTopScorers(mockTopScorers);
      setTopAssists(mockTopAssists);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return { topScorers, topAssists, loading };
};
