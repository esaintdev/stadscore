
import React from 'react';
import WidgetContainer from './WidgetContainer';

interface SportsWidgetProps {
  sport: 'football' | 'basketball' | 'tennis' | 'baseball' | 'hockey' | 'american-football' | 'cricket' | 'golf';
  type: 'livescore' | 'fixtures' | 'results' | 'standings';
  height?: string;
}

const SportsWidget: React.FC<SportsWidgetProps> = ({ sport, type, height }) => {
  // Use alternative widgets based on sport type
  const getWidgetHtml = () => {
    // Use different widget providers for better compatibility
    if (sport === 'football') {
      switch (type) {
        case 'livescore':
          return `<iframe src="https://www.scorebat.com/embed/livescore/" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>`;
        case 'fixtures':
          return `<iframe src="https://footystats.org/api/club?id=1&type=fixtures&timezone=Europe/London" width="100%" height="100%" frameborder="0"></iframe>`;
        case 'results':
          return `<iframe src="https://www.fctables.com/england/premier-league/iframe/?type=results&lang_id=2&country=67&template=10&team=180284&timezone=Pacific/Midway" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>`;
        case 'standings':
          return `<iframe src="https://www.fctables.com/england/premier-league/iframe/?type=table&lang_id=2&country=67&template=10&timezone=Pacific/Midway&time=24&po=1&ma=1&wi=1&dr=1&los=1&gf=1&ga=1&gd=1&pts=1&ng=0&form=1&width=100%&height=100%&font=Verdana&fs=12&lh=22&bg=FFFFFF&fc=333333&logo=1&tlink=1&ths=1&thb=1&thba=FFFFFF&thc=000000&bc=dddddd&hob=f5f5f5&hobc=ebe7e7&lc=333333&sh=1&hfb=1&hbc=3bafda&hfc=FFFFFF" width="100%" height="100%" frameborder="0" scrolling="no"></iframe>`;
        default:
          return '';
      }
    } else if (sport === 'basketball') {
      return `<iframe src="https://www.flashscore.com/basketball/" width="100%" height="100%" frameborder="0"></iframe>`;
    } else if (sport === 'tennis') {
      return `<iframe src="https://widgets.flashscore.com/?identity=stadscore&sports=2&selectedStage=2" width="100%" height="100%" frameborder="0"></iframe>`;
    } else if (sport === 'cricket') {
      return `<iframe src="https://widgets.flashscore.com/?identity=stadscore&sports=13&selectedStage=2" width="100%" height="100%" frameborder="0"></iframe>`;
    } else if (sport === 'baseball') {
      return `<iframe src="https://widgets.flashscore.com/?identity=stadscore&sports=6&selectedStage=2" width="100%" height="100%" frameborder="0"></iframe>`;
    } else if (sport === 'hockey') {
      return `<iframe src="https://widgets.flashscore.com/?identity=stadscore&sports=4&selectedStage=2" width="100%" height="100%" frameborder="0"></iframe>`;
    } else if (sport === 'american-football') {
      return `<iframe src="https://widgets.flashscore.com/?identity=stadscore&sports=5&selectedStage=2" width="100%" height="100%" frameborder="0"></iframe>`;
    } else if (sport === 'golf') {
      return `<iframe src="https://widgets.flashscore.com/?identity=stadscore&sports=8&selectedStage=2" width="100%" height="100%" frameborder="0"></iframe>`;
    }
    
    // Default fallback
    return `<iframe src="https://widgets.flashscore.com/?identity=stadscore" width="100%" height="100%" frameborder="0"></iframe>`;
  };

  const getTitle = () => {
    const sportTitle = sport.charAt(0).toUpperCase() + sport.slice(1);
    
    switch (type) {
      case 'livescore':
        return `${sportTitle} Live Scores`;
      case 'fixtures':
        return `${sportTitle} Upcoming Matches`;
      case 'results':
        return `${sportTitle} Recent Results`;
      case 'standings':
        return `${sportTitle} Standings`;
      default:
        return sportTitle;
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

export default SportsWidget;
