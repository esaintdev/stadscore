
import React from 'react';

interface WidgetContainerProps {
  widgetHtml: string;
  height?: string;
  title: string;
  className?: string;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ widgetHtml, height = '500px', title, className }) => {
  return (
    <div className={`widget-container w-full mb-6 ${className || ''}`}>
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg bg-secondary/20 flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-center p-6">
          <h3 className="text-lg font-semibold mb-2">Widget Container Placeholder</h3>
          <p className="text-muted-foreground mb-3">Title: {title}</p>
          <p className="text-xs text-muted-foreground">Custom widget container to be added here</p>
          <p className="text-xs text-muted-foreground mt-2 text-gray-400">Original HTML content removed</p>
        </div>
      </div>
    </div>
  );
};

export default WidgetContainer;
