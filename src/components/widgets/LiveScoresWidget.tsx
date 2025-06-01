// LiveScoreWidget.tsx (React component)
import { useEffect, useRef } from 'react';

const LiveScoreWidget = () => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent reloading the script multiple times
    if (!document.getElementById('soccersapi-widget-script')) {
      const script = document.createElement('script');
      script.id = 'soccersapi-widget-script';
      script.src = 'https://ls.soccersapi.com/widget/res/awo_w9000_682fba927a5ad/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div
      id="ls-widget"
      data-w="awo_w9000_682fba927a5ad"
      className="livescore-widget"
      ref={widgetRef}
    />
  );
};

export default LiveScoreWidget;
