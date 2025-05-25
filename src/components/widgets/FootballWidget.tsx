import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface SportsWidgetProps {
  height?: string;
  width?: string;
}

const SportsWidget: React.FC<SportsWidgetProps> = ({ height = '100%', width = '100%' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const widgetTheme = theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous content
    container.innerHTML = '';

    if (widgetTheme === 'dark') {
      // Dark theme widget (ScoreBat)
      const scriptId = 'scorebat-jssdk';
      const iframeId = 'scorebat-widget';

      // Add the script
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://www.scorebat.com/embed/embed.js?v=arrv';
        script.async = true;
        
        const firstScript = document.getElementsByTagName('script')[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        }
      }

      // Create the iframe
      const iframe = document.createElement('iframe');
      iframe.id = iframeId;
      iframe.src = 'https://www.scorebat.com/embed/livescore/?token=MjEzMTk1XzE3NDgxODE5MzFfOTU1YmE3YzJlNjYzZjEwNDliZDAwN2I1MDk2ZjUyMDM5ZTVjZjFkMg==';
      iframe.frameBorder = '0';
      iframe.width = width;
      iframe.height = height;
      iframe.allowFullscreen = true;
      iframe.allow = 'autoplay; fullscreen';
      iframe.style.width = '100%';
      iframe.style.height = '760px';
      iframe.style.overflow = 'hidden';
      iframe.style.display = 'block';
      iframe.className = '_scorebatEmbeddedPlayer_';
      
      container.appendChild(iframe);

      // Cleanup
      return () => {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) existingScript.remove();
        if (document.getElementById(iframeId)) {
          document.getElementById(iframeId)?.remove();
        }
      };
    } else {
      // Light theme widget (SoccersAPI)
      const scriptId = 'soccersapi-widget-script';
      const widgetId = 'soccersapi-widget';

      // Add the script
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://ls.soccersapi.com/widget/res/awo_w9000_682fba927a5ad/widget.js';
        script.type = 'text/javascript';
        script.async = true;
        document.body.appendChild(script);
      }

      // Create the widget container
      const widgetDiv = document.createElement('div');
      widgetDiv.id = widgetId;
      widgetDiv.setAttribute('data-w', 'awo_w9000_682fba927a5ad');
      widgetDiv.className = 'livescore-widget rounded-lg bg-secondary/20';
      widgetDiv.style.width = width;
      widgetDiv.style.height = height;
      
      container.appendChild(widgetDiv);

      // Cleanup
      return () => {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) existingScript.remove();
        if (document.getElementById(widgetId)) {
          document.getElementById(widgetId)?.remove();
        }
      };
    }
  }, [height, width, widgetTheme]);

  return (
    <div 
      ref={containerRef} 
      className="widget-container w-full mb-6 rounded-lg overflow-hidden"
      style={{ width }}
    />
  );
};

export default SportsWidget;
