import { useParams } from 'react-router-dom';
import { LEAGUE_COMPONENTS, DEFAULT_LEAGUE } from './leagueMapping';

interface LeagueTableProps {
  leagueId?: string;
}

const LeagueTable = ({ leagueId }: LeagueTableProps) => {
  const params = useParams();
  const activeLeagueId = leagueId || params.leagueId || DEFAULT_LEAGUE;
  
  // Get the league component or fallback to default
  const league = LEAGUE_COMPONENTS[activeLeagueId] || LEAGUE_COMPONENTS[DEFAULT_LEAGUE];
  const LeagueComponent = league.component;
  
  return (
    <div className="w-full">
      <LeagueComponent />
    </div>
  );
};

export default LeagueTable;
