import React from 'react';

interface SportsWidgetProps {
  sportId: string;
  title: string;
}

const SportsWidget: React.FC<SportsWidgetProps> = ({ sportId, title }) => {
  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="h-[540px] w-full">
        <iframe
          src={`https://www.sofascore.com/team/football/paris-saint-germain/17`}
          title={title}
          className="w-full h-full border-0"
          scrolling="no"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      </div>
    </div>
  );
};

export default SportsWidget;
