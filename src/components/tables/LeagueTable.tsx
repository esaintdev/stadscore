
import React from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TeamStanding {
  position: number;
  team: {
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
  form: string[];
}

interface LeagueTableProps {
  leagueName: string;
  standings: TeamStanding[];
}

const LeagueTable: React.FC<LeagueTableProps> = ({ leagueName, standings }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{leagueName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-center w-10">P</TableHead>
                <TableHead className="text-center w-10">W</TableHead>
                <TableHead className="text-center w-10">D</TableHead>
                <TableHead className="text-center w-10">L</TableHead>
                <TableHead className="text-center w-14 hidden sm:table-cell">G</TableHead>
                <TableHead className="text-center w-10 hidden md:table-cell">+/-</TableHead>
                <TableHead className="text-center w-10">Pts</TableHead>
                <TableHead className="w-24 hidden md:table-cell">Form</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((team) => (
                <TableRow key={team.team.name}>
                  <TableCell className="text-center font-medium">
                    {team.position}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <img 
                        src={team.team.logo || "https://via.placeholder.com/20"} 
                        alt={team.team.name} 
                        className="h-5 w-5 object-contain" 
                      />
                      <span className="truncate">{team.team.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{team.played}</TableCell>
                  <TableCell className="text-center">{team.won}</TableCell>
                  <TableCell className="text-center">{team.drawn}</TableCell>
                  <TableCell className="text-center">{team.lost}</TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    {team.goalsFor}:{team.goalsAgainst}
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                  </TableCell>
                  <TableCell className="text-center font-bold">{team.points}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex space-x-1">
                      {team.form.map((result, idx) => (
                        <div 
                          key={idx} 
                          className={`h-5 w-5 rounded-sm flex items-center justify-center text-xs text-white font-medium ${
                            result === 'W' ? 'bg-green-500' : 
                            result === 'D' ? 'bg-gray-400' : 
                            'bg-red-500'
                          }`}
                        >
                          {result}
                        </div>
                      ))}
                    </div>
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

export default LeagueTable;
