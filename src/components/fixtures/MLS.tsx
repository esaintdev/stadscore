import { useEffect } from 'react';

const FootballFixtures = () => {
  useEffect(() => {
    // Prevent multiple script injections
    const existingScript = document.getElementById('scores365-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://widgets.365scores.com/main.js';
      script.id = 'scores365-script';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div>
      <div
        data-widget-type="entityScores"
        data-entity-type="league"
        data-entity-id="104"
        data-theme="dark"
        data-lang="en"
        data-widget-id="9194e9e1-40a7-4565-bf9d-c59e2f41f08b"
      />
      <div id="powered-by">
        Powered by{' '}
        <a id="powered-by-link" href="https://www.365scores.com" target="_blank" rel="noreferrer">
          365Scores.com
        </a>
      </div>
    </div>
  );
};

export default FootballFixtures;
