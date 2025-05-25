
import React from 'react';
import MatchCard from './MatchCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MatchesListProps {
  title: string;
  matches: Array<{
    id: string;
    status: 'LIVE' | 'UPCOMING' | 'FINISHED';
    minute?: number;
    homeTeam: {
      name: string;
      logo: string;
      score?: number;
    };
    awayTeam: {
      name: string;
      logo: string;
      score?: number;
    };
    league: {
      name: string;
      country: string;
    };
    startTime: string;
  }>;
}

const MatchesList: React.FC<MatchesListProps> = ({ title, matches }) => {
  if (matches.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center py-4 text-muted-foreground">No matches available at the moment</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {matches.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchesList;
