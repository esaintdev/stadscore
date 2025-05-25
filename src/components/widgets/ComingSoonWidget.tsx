
import React from 'react';
import { cn } from '@/lib/utils';

interface ComingSoonWidgetProps {
  title: string;
  description?: string;
  height?: string;
  className?: string;
}

const ComingSoonWidget: React.FC<ComingSoonWidgetProps> = ({ 
  title, 
  description = "We're working on adding live data for this sport. Check back soon!",
  height = "400px",
  className 
}) => {
  return (
    <div className={cn("w-full mb-4", className)}>
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div 
        className="w-full overflow-hidden bg-card rounded-md shadow-sm border"
        style={{ height }}
      >
        <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center">
          <div className="relative w-24 h-24 mb-6">
            <div className="absolute inset-0 bg-stadscore/20 rounded-full animate-ping"></div>
            <div className="absolute inset-2 bg-stadscore/40 rounded-full animate-ping animation-delay-150"></div>
            <div className="absolute inset-4 bg-stadscore/60 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-12 h-12 text-stadscore" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-foreground mb-2">Coming Soon</h3>
          <p className="text-muted-foreground max-w-md">{description}</p>
          
          <div className="mt-8 w-full max-w-xs">
            <div className="h-2 bg-secondary rounded-full overflow-hidden mb-1">
              <div className="h-full bg-stadscore animate-progress-bar w-3/4"></div>
            </div>
            <p className="text-xs text-muted-foreground text-right">Almost there...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonWidget;
