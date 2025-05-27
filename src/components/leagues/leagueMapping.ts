import { ComponentType } from 'react';
import LaLiga from './components/LaLiga';
import PremierLeague from './components/PremierLeague';
import Bundesliga from './components/Bundesliga';
import SeriaA from './components/SeriaA';
interface LeagueComponent {
  component: ComponentType<any>;
  name: string;
  id: string;
  logo: string;
  country: string;
}

export const LEAGUE_COMPONENTS: Record<string, LeagueComponent> = {
  pl: {
    component: PremierLeague,
    name: 'Premier League',
    id: 'pl',
    logo: 'https://media-3.api-sports.io/football/leagues/39.png',
    country: 'England'
  },
  laliga: {
    component: LaLiga,
    name: 'La Liga',
    id: 'laliga',
    logo: 'https://media-3.api-sports.io/football/leagues/140.png',
    country: 'Spain'
  },
  bundesliga: {
    component: Bundesliga,
    name: 'Bundesliga',
    id: 'bundesliga',
    logo: 'https://media-3.api-sports.io/football/leagues/78.png',
    country: 'Germany'
  },
  sa: {
    component: SeriaA,
    name: 'Serie A',
    id: 'sa',
    logo: 'https://a.espncdn.com/i/leaguelogos/soccer/500/12.png',
    country: 'Italy'
  },
  // Add more leagues here as they are created
};

export const DEFAULT_LEAGUE = 'laliga'; // Default to Premier League
