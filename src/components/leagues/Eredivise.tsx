import { useEffect } from 'react';

const ScoreAxisWidget72 = () => {
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data.appHeight && event.data.inst === '7bd9a') {
        const iframe = document.querySelector('#scoreaxis-widget-7bd9a iframe');
        if (iframe) {
          iframe.style.height = `${parseInt(event.data.appHeight)}px`;
        }
      }
    };

    window.addEventListener('message', handleMessage, false);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div>
      <div
        id="scoreaxis-widget-7bd9a"
        style={{
          borderWidth: '1px',
          borderColor: 'rgba(0, 0, 0, 0.15)',
          borderStyle: 'solid',
          borderRadius: '8px',
          padding: '10px',
          backgroundColor: '#000000',
          width: '100%',
        }}
      >
        <iframe
          id="Iframe"
          src="https://www.scoreaxis.com/widget/standings-widget/72?autoHeight=1&bodyBackground=%23000000&textColor=%23ffffff&links=1&font=6&widgetRows=1%2C1%2C1%2C1%2C1%2C1%2C1%2C1%2C1%2C1&groupNum=undefined&inst=7bd9a"
          style={{
            width: '100%',
            border: 'none',
            transition: 'all 300ms ease',
          }}
          title="ScoreAxis Standings"
        />
      </div>
      <div
        style={{
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'left',
          color: '#ffffff',
          marginTop: '8px',
        }}
      >
        Data provided by{' '}
        <a
          href="https://www.scoreaxis.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#1e90ff' }}
        >
          Scoreaxis
        </a>
      </div>
    </div>
  );
};

export default ScoreAxisWidget72;
