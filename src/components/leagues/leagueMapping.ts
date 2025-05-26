import { ComponentType } from 'react';
import LaLiga from './components/LaLiga';
import PremierLeague from './components/PremierLeague';
import Bundesliga from './components/Bundesliga';

interface LeagueComponent {
  component: ComponentType<any>;
  name: string;
  id: string;
}

export const LEAGUE_COMPONENTS: Record<string, LeagueComponent> = {
  laliga: {
    component: LaLiga,
    name: 'La Liga',
    id: 'laliga'
  },
  pl: {
    component: PremierLeague,
    name: 'Premier League',
    id: 'pl'
  },
  bundesliga: {
    component: Bundesliga,
    name: 'Bundesliga',
    id: 'bundesliga'
  },
  // Add more leagues here as they are created
};

export const DEFAULT_LEAGUE = 'pl'; // Default to Premier League
