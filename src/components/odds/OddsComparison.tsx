
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface MatchOdds {
  id: string;
  homeTeam: {
    name: string;
    logo: string;
  };
  awayTeam: {
    name: string;
    logo: string;
  };
  bookmakers: Array<{
    name: string;
    logo: string;
    odds: {
      home: number;
      draw: number;
      away: number;
    };
  }>;
  startTime: string;
}

interface OddsComparisonProps {
  match: MatchOdds;
}

const OddsComparison: React.FC<OddsComparisonProps> = ({ match }) => {
  const formattedTime = new Date(match.startTime).toLocaleString([], {
    month: 'short', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: '2-digit'
  });

  const getBestOdds = (type: 'home' | 'draw' | 'away') => {
    const odds = match.bookmakers.map(bm => bm.odds[type]);
    return Math.max(...odds);
  };

  const bestHomeOdds = getBestOdds('home');
  const bestDrawOdds = getBestOdds('draw');
  const bestAwayOdds = getBestOdds('away');

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <img 
                  src={match.homeTeam.logo || "https://via.placeholder.com/30"} 
                  alt={match.homeTeam.name} 
                  className="h-6 w-6 object-contain"
                />
                <span>{match.homeTeam.name}</span>
              </div>
              <span>vs</span>
              <div className="flex items-center gap-1">
                <img 
                  src={match.awayTeam.logo || "https://via.placeholder.com/30"} 
                  alt={match.awayTeam.name} 
                  className="h-6 w-6 object-contain"
                />
                <span>{match.awayTeam.name}</span>
              </div>
            </div>
            <div className="text-sm font-normal text-muted-foreground">
              {formattedTime}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bookmaker</TableHead>
                <TableHead className="text-center">1</TableHead>
                <TableHead className="text-center">X</TableHead>
                <TableHead className="text-center">2</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {match.bookmakers.map((bookmaker) => (
                <TableRow key={bookmaker.name}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img 
                        src={bookmaker.logo || "https://via.placeholder.com/20"} 
                        alt={bookmaker.name} 
                        className="h-5 w-5 object-contain" 
                      />
                      <span>{bookmaker.name}</span>
                    </div>
                  </TableCell>
                  <TableCell 
                    className={`text-center font-medium ${
                      bookmaker.odds.home === bestHomeOdds ? "text-stadscore" : ""
                    }`}
                  >
                    {bookmaker.odds.home.toFixed(2)}
                  </TableCell>
                  <TableCell 
                    className={`text-center font-medium ${
                      bookmaker.odds.draw === bestDrawOdds ? "text-stadscore" : ""
                    }`}
                  >
                    {bookmaker.odds.draw.toFixed(2)}
                  </TableCell>
                  <TableCell 
                    className={`text-center font-medium ${
                      bookmaker.odds.away === bestAwayOdds ? "text-stadscore" : ""
                    }`}
                  >
                    {bookmaker.odds.away.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OddsComparison;
