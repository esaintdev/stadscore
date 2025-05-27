import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

interface SportsWidgetProps {
  height?: string;
  width?: string;
}

const Handball: React.FC<SportsWidgetProps> = ({ height = '100%', width = '100%' }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const selectedSport = 'handball';

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLinkClick = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Mobile Header */}
      <div className="md:hidden p-4 bg-black/80 backdrop-blur-md flex items-center sticky top-0 z-10">
        <button 
          className="text-white/80 hover:text-white mr-4 transition-colors"
          onClick={() => setIsSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
          {selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1)}
        </h1>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <div className="glass-card p-8 md:p-12 rounded-2xl backdrop-blur-lg border border-white/10 shadow-2xl">
            <div className="text-center">
              <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                  <svg 
                    className="w-12 h-12 md:w-16 md:h-16 text-orange-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-pink-600">
                Coming Soon
              </h2>
              
              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                We're working hard to bring you the best tennis experience. Stay tuned for exciting updates and features!
              </p>
              
              <div className="inline-flex items-center space-x-4">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                <span className="text-sm text-gray-400">Tennis section launching soon</span>
              </div>
              
              <div className="mt-12 pt-8 border-t border-white/10">
                <p className="text-sm text-gray-500">
                  In the meantime, check out our other sports sections
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add some floating elements for visual interest */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-orange-500/10 to-pink-500/10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: 'translate(-50%, -50%)',
              filter: 'blur(40px)',
              opacity: 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add the glass effect styles to the global styles
const style = document.createElement('style');
style.textContent = `
  .glass-card {
    background: rgba(17, 24, 39, 0.5);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .glass-card:hover {
    background: rgba(17, 24, 39, 0.6);
  }
`;
document.head.appendChild(style);

export default Handball;
