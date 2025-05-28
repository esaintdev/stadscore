declare module 'soccer-api-types' {
  export interface Team {
    id: number;
    name: string;
    logo: string;
  }

  export interface Match {
    id: number;
    time: string;
    time_utc: string;
    home: Team;
    away: Team;
    ht_score: string;
    ft_score: string;
    status: string;
    league_id: number;
    league_name: string;
    league_country: string;
  }

  export interface TeamStanding {
    position: number;
    team: Team;
    points: number;
    matches_played: number;
    won: number;
    draw: number;
    lost: number;
    goals_for: number;
    goals_against: number;
    goal_difference: number;
  }

  
  export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
  }
  
  export interface LeagueStandings {
    league: League;
    standings: Array<{
      type: string;
      rows: TeamStanding[];
    }>;
  }
  
  export interface ApiResponse<T> {
    data: T;
    error?: {
      message: string;
    };
  }
}
declare module 'soccer-api-types' {
  export interface Team {
    id: number;
    name: string;
    logo: string;
  }

  export interface Match {
    id: number;
    time: string;
    time_utc: string;
    home: Team;
    away: Team;
    ht_score: string;
    ft_score: string;
    status: string;
    league_id: number;
    league_name: string;
    league_country: string;
  }

  export interface TeamStanding {
    position: number;
    team: Team;
    points: number;
    matches_played: number;
    won: number;
    draw: number;
    lost: number;
    goals_for: number;
    goals_against: number;
    goal_difference: number;
  }

  
  export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
  }
  
  export interface LeagueStandings {
    league: League;
    standings: Array<{
      type: string;
      rows: TeamStanding[];
    }>;
  }
  
  export interface ApiResponse<T> {
    data: T;
    error?: {
      message: string;
    };
  }
}
