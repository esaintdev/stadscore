import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/hooks/use-theme';

interface SportsWidgetProps {
  height?: string;
  width?: string;
}

const SportsWidget: React.FC<SportsWidgetProps> = ({ height = '100%', width = '100%' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const scriptId = 'scorebat-jssdk';
  const iframeId = 'scorebat-widget';
  const widgetTheme = theme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    // Check if the script is already present
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://www.scorebat.com/embed/embed.js?v=arrv';
      script.async = true;
      
      // Add the script to the document
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    }

    // Create the iframe with theme support
    const iframe = document.createElement('iframe');
    iframe.id = iframeId;
    iframe.src = `https://www.scorebat.com/embed/livescore/?token=MjEzMTk1XzE3NDgxODE5MzFfOTU1YmE3YzJlNjYzZjEwNDliZDAwN2I1MDk2ZjUyMDM5ZTVjZjFkMg==&theme=${widgetTheme}`;
    iframe.frameBorder = '0';
    iframe.width = width;
    iframe.height = height;
    iframe.allowFullscreen = true;
    iframe.allow = 'autoplay; fullscreen';
    iframe.style.width = width;
    iframe.style.height = height;
    iframe.style.overflow = 'hidden';
    iframe.style.display = 'block';
    iframe.className = '_scorebatEmbeddedPlayer_';

    // Add the iframe to the container
    const container = containerRef.current;
    if (container) {
      container.innerHTML = '';
      container.appendChild(iframe);
    }

    // Cleanup function
    return () => {
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
      const existingIframe = document.getElementById(iframeId);
      if (existingIframe) {
        existingIframe.remove();
      }
    };
  }, [height, width, widgetTheme]);

  return (
    <div 
      ref={containerRef} 
      className="widget-container w-full mb-6 rounded-lg overflow-hidden"
      style={{ height, width }}
    />
  );
};

export default SportsWidget;
