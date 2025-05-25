import React from 'react';

interface BaseLeagueProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const BaseLeague: React.FC<BaseLeagueProps> = ({ 
  title, 
  children, 
  className = '' 
}) => {
  return (
    <div className={`w-full max-w-6xl mx-auto ${className}`}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full">
          <h1 className="text-2xl font-bold mb-6">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default BaseLeague;
