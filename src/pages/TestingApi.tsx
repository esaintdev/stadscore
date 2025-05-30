import React, { useEffect, useState } from 'react';

interface Match {
  id: string;
  competition: string;
  home: string;
  away: string;
  result: string;
}

const TestingApi = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://livescore-api.com/api-client/fixtures/list.json?&key=demo_key&secret=demo_secret');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Adjust the following line based on the actual structure of the API response
        setMatches(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) return <div>Loading matches...</div>;
  if (error) return <div>Error: {error}</div>;
  if (matches.length === 0) return <div>No matches found</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Live Matches</h1>
      <div className="grid gap-4">
        {matches.map((match) => (
          <div key={match.id} className="p-4 border rounded-lg shadow">
            <div className="font-semibold">{match.competition}</div>
            <div className="flex justify-between items-center my-2">
              <span>{match.home}</span>
              <span className="font-bold">{match.result || 'vs'}</span>
              <span>{match.away}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestingApi;