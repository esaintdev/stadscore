import { useEffect } from 'react';

const CompoundWidget = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'application/javascript';
        script.src = 'https://widget.enetscores.com/FW9CB70F65E0424744/cid/11/pr/42/lng/en';
        script.async = true;
    
        document.getElementById('enet-widget')?.appendChild(script);
    
        return () => {
          // Optional cleanup if needed
          script.remove();
        };
      }, []);
    
      return <div id="enet-widget" />;
    };

export default CompoundWidget;
