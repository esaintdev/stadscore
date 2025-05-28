import axios from 'axios';

const API_KEY = process.env.REACT_APP_SOCCER_API_KEY;
const BASE_URL = 'https://api.soccersapi.com/v2.2';

interface ApiResponse<T> {
  data: T;
  error?: {
    message: string;
  };
}
interface Match {
  id: number;
  time: string;
  time_utc: string;
  home: {
    id: number;
    name: string;
    logo: string;
  };
  away: {
    id: number;
    name: string;
    logo: string;
  };
  ht_score: string;
  ft_score: string;
  status: string;
  league_id: number;
  league_name: string;
  league_country: string;
}

export const getLiveMatches = async (): Promise<Match[]> => {
  try {
    const response = await axios.get<ApiResponse<{ matches: Match[] }>>(
      `${BASE_URL}/matches/live?user=${API_KEY}&t=last_match`
    );
    return response.data.data.matches || [];
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return [];
  }
};

export const getMatchDetails = async (matchId: number): Promise<Match | null> => {
  try {
    const response = await axios.get<ApiResponse<{ match: Match }>>(
      `${BASE_URL}/matches/${matchId}?user=${API_KEY}`
    );
    return response.data.data.match || null;
  } catch (error) {
    console.error('Error fetching match details:', error);
    return null;
  }
};

export const getLeagueStandings = async (leagueId: number): Promise<any> => {
  try {
    const response = await axios.get<ApiResponse<any>>(
      `${BASE_URL}/leagues/standings?user=${API_KEY}&lid=${leagueId}`
    );
    return response.data.data || null;
  } catch (error) {
    console.error('Error fetching league standings:', error);
    return null;
  }
};
