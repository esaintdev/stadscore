
import React from 'react';
import ComingSoonWidget from '@/components/widgets/ComingSoonWidget';

const Cricket = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold tracking-tight">Cricket</h1>
      
      <div className="text-sm text-muted-foreground mb-4">
        Get the latest cricket scores, fixtures, and standings from around the world.
      </div>
      
      <ComingSoonWidget 
        title="Cricket Live Scores" 
        description="Our comprehensive cricket coverage is coming soon. We're building integrations with the best cricket data providers to bring you live scores, commentary, and statistics."
        height="500px"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-card border rounded-md p-6 animate-in fade-in animation-delay-150 hover-glow transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-2">International Cricket</h3>
          <p className="text-muted-foreground mb-4">Follow all major international cricket tournaments including the ICC World Cup, T20 World Cup, and The Ashes.</p>
          <div className="relative h-40 overflow-hidden rounded-md bg-secondary/50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-stadscore/20 animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className="text-sm font-medium">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-card border rounded-md p-6 animate-in fade-in animation-delay-300 hover-glow transition-shadow duration-300">
          <h3 className="text-lg font-semibold mb-2">Domestic Cricket</h3>
          <p className="text-muted-foreground mb-4">Keep up with domestic cricket leagues like the IPL, Big Bash, CPL, and county cricket.</p>
          <div className="relative h-40 overflow-hidden rounded-md bg-secondary/50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-stadscore/20 animate-ping"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <p className="text-sm font-medium">Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cricket;
