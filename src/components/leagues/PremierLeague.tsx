import { useEffect, useRef } from 'react';

const ScoreAxisWidget = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      if (
        event.data?.appHeight &&
        event.data?.inst === '2636c' &&
        iframeRef.current
      ) {
        iframeRef.current.style.height = `${parseInt(event.data.appHeight)}px`;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div
      id="scoreaxis-widget-2636c"
      style={{
        borderWidth: '1px',
        borderColor: 'rgba(0, 0, 0, 0.15)',
        borderStyle: 'solid',
        borderRadius: '8px',
        padding: '10px',
        background: '#000000',
        width: '100%',
      }}
    >
      <iframe
        ref={iframeRef}
        id="Iframe"
        src="https://www.scoreaxis.com/widget/standings-widget/8?autoHeight=1&bodyBackground=%23000000&textColor=%23ffffff&links=1&font=6&inst=2636c"
        style={{
          width: '100%',
          border: 'none',
          transition: 'all 300ms ease',
        }}
        title="ScoreAxis Widget"
      ></iframe>
      <div
        style={{
          fontSize: '12px',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'left',
          marginTop: '8px',
          color: '#fff',
        }}
      >
        Data provided by{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.scoreaxis.com/"
          style={{ color: '#ffffff' }}
        >
          Scoreaxis
        </a>
      </div>
    </div>
  );
};

export default ScoreAxisWidget;
