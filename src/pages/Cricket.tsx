
import React from 'react';
import WidgetContainer from '@/components/widgets/WidgetContainer';

const Cricket = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Cricket</h1>
      
      <div className="text-sm text-muted-foreground mb-4">
        Get the latest cricket scores, fixtures, and standings from around the world.
      </div>
      
      <WidgetContainer 
        title="Cricket Live Scores" 
        height="500px"
        widgetHtml=""
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <WidgetContainer 
          title="International Cricket" 
          height="300px"
          widgetHtml=""
        />
        
        <WidgetContainer 
          title="Domestic Cricket" 
          height="300px"
          widgetHtml="<iframe frameborder='0' height='15000' src='http://www.oddstake.com/widgets/football-livescore-widget.php' style='margin: 0px; padding: 0px; border-width: 0px; outline: 0px; vertical-align: baseline; background-color: transparent; overflow: hidden;' width='550'></iframe>"
        />
      </div>
    </div>
  );
};

export default Cricket;
