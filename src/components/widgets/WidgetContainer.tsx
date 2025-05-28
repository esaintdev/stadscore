
import React, { useEffect, useRef, useState } from 'react';
import { Loader } from 'lucide-react';

interface WidgetContainerProps {
  widgetHtml: string;
  height?: string;
  title: string;
  className?: string;
}

const WidgetContainer: React.FC<WidgetContainerProps> = ({ widgetHtml, height = '500px', title, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      try {
        // Clear previous content
        containerRef.current.innerHTML = '';
        
        // Insert new content
        containerRef.current.innerHTML = widgetHtml;
        
        // Handle iframe loading states
        const iframes = containerRef.current.querySelectorAll('iframe');
        if (iframes.length > 0) {
          const loadPromises = Array.from(iframes).map(iframe => {
            return new Promise<void>((resolve, reject) => {
              iframe.onload = () => {
                // Apply responsive styles to iframe
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';
                resolve();
              };
              iframe.onerror = () => {
                reject();
              };
              
              // Set sandbox attribute for security but allow necessary permissions
              iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms');
              
              // Set timeout for iframe loading
              setTimeout(() => {
                resolve(); // Resolve anyway after timeout to prevent hanging
              }, 8000);
            });
          });
          
          Promise.all(loadPromises)
            .then(() => setIsLoading(false))
            .catch(() => {
              setHasError(true);
              setIsLoading(false);
            });
        } else {
          setIsLoading(false);
        }
        
        // Execute any scripts in the widget HTML
        const scripts = containerRef.current.querySelectorAll('script');
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          
          Array.from(script.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
          });
          
          newScript.appendChild(document.createTextNode(script.innerHTML));
          script.parentNode?.replaceChild(newScript, script);
        });
      } catch (error) {
        console.error('Error loading widget:', error);
        setHasError(true);
        setIsLoading(false);
      }
    }
    
    return () => {
      // Cleanup function
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [widgetHtml, retryCount]);

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount(prev => prev + 1);
  };

  return (
    <div className={`widget-container w-full mb-6 ${className || ''}`}>
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <div 
        className="relative w-full overflow-hidden bg-card rounded-lg shadow-sm border transition-all duration-300 hover:shadow-md"
        style={{ height: isLoading ? '300px' : height }}
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-4 border-muted animate-ping opacity-75"></div>
              <Loader className="absolute inset-0 h-16 w-16 text-stadscore animate-spin m-auto" />
            </div>
            <p className="text-sm text-muted-foreground mt-4">Loading widget...</p>
          </div>
        )}
        
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-10">
            <div className="text-center max-w-xs">
              <p className="text-destructive mb-2">Unable to load widget</p>
              <p className="text-sm text-muted-foreground mb-4">There was a problem loading this content. Please try again.</p>
              <button 
                className="px-4 py-2 bg-stadscore text-white rounded-md text-sm hover:bg-stadscore/90 transition-colors"
                onClick={handleRetry}
              >
                Retry Loading
              </button>
            </div>
          </div>
        )}
        
        <div ref={containerRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default WidgetContainer;
