import React, { useEffect, useState } from 'react';

interface TeamPerformance {
  team: {
    id: number;
    name: string;
    slug: string;
  };
  statistics: {
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsScored: number;
    goalsConceded: number;
    cleanSheets: number;
  };
}

const TeamPerformance = () => {
  const [teamData, setTeamData] = useState<TeamPerformance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamPerformance = async () => {
      try {
        const response = await fetch('https://www.sofascore.com/api/v1/team/44/performance');
        if (!response.ok) throw new Error('Failed to fetch team performance');
        const data = await response.json();
        setTeamData(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamPerformance();
  }, []);

  if (loading) return <div>Loading team performance...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!teamData) return <div>No data available</div>;

  const { team, statistics } = teamData;

  return (
    <div style={{ 
      color: '#000', 
      padding: '1.5rem', 
      border: '1px solid #e2e8f0', 
      borderRadius: '0.5rem',
      backgroundColor: '#fff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      maxWidth: '600px',
      margin: '1rem auto'
    }}>
      <h3 style={{ 
        marginBottom: '1rem',
        fontSize: '1.25rem',
        fontWeight: '600',
        color: '#1a202c'
      }}>
        {team.name} Performance
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem',
        marginTop: '1rem'
      }}>
        <StatCard title="Matches Played" value={statistics.matchesPlayed} />
        <StatCard title="Wins" value={statistics.wins} color="#48bb78" />
        <StatCard title="Draws" value={statistics.draws} color="#ecc94b" />
        <StatCard title="Losses" value={statistics.losses} color="#f56565" />
        <StatCard title="Goals Scored" value={statistics.goalsScored} />
        <StatCard title="Goals Conceded" value={statistics.goalsConceded} />
        <StatCard title="Clean Sheets" value={statistics.cleanSheets} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color = '#4a5568' }) => (
  <div style={{ 
    padding: '1rem',
    backgroundColor: '#f8fafc',
    borderRadius: '0.375rem',
    textAlign: 'center',
    borderLeft: `4px solid ${color}`
  }}>
    <div style={{ 
      fontSize: '0.875rem',
      color: '#718096',
      marginBottom: '0.25rem'
    }}>
      {title}
    </div>
    <div style={{ 
      fontSize: '1.5rem',
      fontWeight: '700',
      color: color
    }}>
      {value}
    </div>
  </div>
);

export default TeamPerformance;