
import React from 'react';
import WidgetContainer from './WidgetContainer';

interface FootballWidgetProps {
  type: 'livescores' | 'fixtures' | 'results' | 'standings';
  league?: string;
  height?: string;
}

const FootballWidget: React.FC<FootballWidgetProps> = ({ type, league, height }) => {
  // Use LiveScore widget API
  const getWidgetHtml = () => {
    switch (type) {

      case 'livescores':
        return `<iframe src="https://www.livescore.in/free-livescore/all/" width="100%" height="100%" frameborder="0"></iframe>`;
      case 'fixtures':
        return `<iframe src="https://www.livescore.in/free-fixtures/all/" width="100%" height="100%" frameborder="0"></iframe>`;
      case 'results':
        return `<iframe src="https://www.livescore.in/free-results/all/" width="100%" height="100%" frameborder="0"></iframe>`;
      case 'standings':
        return `<iframe src="https://www.livescore.in/free-standings/${league || 'all'}/" width="100%" height="100%" frameborder="0"></iframe>`;
      default:
        return '';
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'livescores':
        return 'Live Football Scores';
      case 'fixtures':
        return 'Upcoming Football Matches';
      case 'results':
        return 'Recent Football Results';
      case 'standings':
        return 'Football Standings';
      default:
        return '';
    }
  };

  return (
    <WidgetContainer 
      widgetHtml={getWidgetHtml()} 
      height={height || '600px'} 
      title={getTitle()} 
    />
  );
};

export default FootballWidget;
