import React, { useEffect } from 'react';

interface SportsWidgetProps {
  title?: string;
  height?: string;
}

const SportsWidget: React.FC<SportsWidgetProps> = ({ title = 'Live Scores', height = '700px' }) => {
  useEffect(() => {
    const scriptId = 'soccersapi-widget-script';

    // Check if the script is already present
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://ls.soccersapi.com/widget/res/awo_w9000_682fba927a5ad/widget.js';
      script.type = 'text/javascript';
      script.async = true;
      script.id = scriptId;
      document.body.appendChild(script);
    }

    return () => {
      // Optional: Cleanup script if needed
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="widget-container w-full mb-6">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div
        id="ls-widget"
        data-w="awo_w9000_682fba927a5ad"
        className="livescore-widget rounded-lg bg-secondary/20"
        style={{ height }}
      />
    </div>
  );
};

export default SportsWidget;
