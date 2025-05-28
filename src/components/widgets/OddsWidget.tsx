
import React from 'react';
import WidgetContainer from './WidgetContainer';

interface OddsWidgetProps {
  sport: 'football' | 'basketball' | 'tennis' | 'american-football' | 'baseball' | 'hockey';
  height?: string;
}

const OddsWidget: React.FC<OddsWidgetProps> = ({ sport, height }) => {
  // Use alternative widgets based on sport type
  const getWidgetHtml = () => {
    switch (sport) {
      case 'football':
        return `<iframe src="https://widgets.bsportsfan.com/bet365/football/webmaster/odds-table?gpid=&pc=3&lg=en" width="100%" height="100%" frameborder="0"></iframe>`;
      case 'basketball':
        return `<iframe src="https://widgets.bsportsfan.com/bet365/basketball/webmaster/odds-table?gpid=&pc=3&lg=en" width="100%" height="100%" frameborder="0"></iframe>`;
      case 'tennis':
        return `<iframe src="https://widgets.bsportsfan.com/bet365/tennis/webmaster/odds-table?gpid=&pc=3&lg=en" width="100%" height="100%" frameborder="0"></iframe>`;
      case 'american-football':
        return `<iframe src="https://widgets.bsportsfan.com/bet365/american-football/webmaster/odds-table?gpid=&pc=3&lg=en" width="100%" height="100%" frameborder="0"></iframe>`;
      case 'baseball':
        return `<iframe src="https://widgets.bsportsfan.com/bet365/baseball/webmaster/odds-table?gpid=&pc=3&lg=en" width="100%" height="100%" frameborder="0"></iframe>`;
      case 'hockey':
        return `<iframe src="https://widgets.bsportsfan.com/bet365/hockey/webmaster/odds-table?gpid=&pc=3&lg=en" width="100%" height="100%" frameborder="0"></iframe>`;
      default:
        return `<iframe src="https://widgets.oddspedia.com/widget?widgetId=inplay&excludeIds=79&utm_source=api&utm_medium=banner" width="100%" height="100%" frameborder="0"></iframe>`;
    }
  };

  const getTitle = () => {
    switch (sport) {
      case 'football':
        return 'Football Betting Odds';
      case 'basketball':
        return 'Basketball Betting Odds';
      case 'tennis':
        return 'Tennis Betting Odds';
      case 'american-football':
        return 'American Football Betting Odds';
      case 'baseball':
        return 'Baseball Betting Odds';
      case 'hockey':
        return 'Hockey Betting Odds';
      default:
        return 'Betting Odds';
    }
  };

  return (
    <WidgetContainer 
      widgetHtml={getWidgetHtml()} 
      height={height || '700px'} 
      title={getTitle()} 
    />
  );
};

export default OddsWidget;
