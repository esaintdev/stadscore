// LeagueTable.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { LEAGUE_COMPONENTS, DEFAULT_LEAGUE } from './leagueMapping';
import LeagueSelector from './LeagueSelector';

interface LeagueTableProps {
  leagueId?: string;
} 

const LeagueTable = ({ leagueId }: LeagueTableProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const activeLeagueId = leagueId || params.leagueId;
  
  // If no league is selected, show the league selector
  if (!activeLeagueId) {
    return (
      <div className="p-4 overflow-x-hidden">
        <h1 className='text-2xl font-bold mb-6 dark:text-gray-900'>Select a League</h1>
        <LeagueSelector
          leagues={Object.values(LEAGUE_COMPONENTS).map((league) => ({
            id: league.id,
            name: league.name,
            country: league.country,
            logo: league.logo
          }))}
          activeLeagueId={null}
          onSelectLeague={(id) => navigate(`/league-tables/${id}`)}
        />
      </div>
    );
  }

  // Get the league component or fallback to default
  const league = LEAGUE_COMPONENTS[activeLeagueId] || LEAGUE_COMPONENTS[DEFAULT_LEAGUE];
  const LeagueComponent = league.component;
  
  return (
    <div className="w-full p-4">
      <button 
        onClick={() => navigate('/league-tables')}
        className="mb-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Leagues
      </button>
      <div className="mb-6 flex items-center gap-4">
        {league.logo && (
          <img 
            src={league.logo} 
            alt={`${league.name} logo`} 
            className="h-12 w-12 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48';
            }}
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{league.name}</h1>
          <p className="text-gray-600">{league.country}</p>
        </div>
      </div>
      <LeagueComponent />
    </div>
  );
};

export default LeagueTable;