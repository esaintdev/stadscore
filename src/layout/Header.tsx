
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/use-theme';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.hamburger-button')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-[#00141E] overflow-visible">
      <div className="bg-[#001a29] py-2 px-4">
        <p className="text-white text-center text-xs sm:text-sm md:text-base font-medium whitespace-nowrap overflow-hidden overflow-ellipsis">
          ⚽ Football Live Scores • Latest Football Results • World Cup 2026 • Live Matches • League Standings • Match Stats
        </p>
      </div>
      <div className="container flex h-20 items-center justify-between">
        
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="/lovable-uploads/facf8c2e-b9ae-4b35-a1db-11ba79454868.png" alt="Stadscore Logo" className="h-8" />
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6 mx-6">
          <Link to="/" className="text-sm font-medium rounded-sm transition-colors text-white"
           style={{ fontWeight: 'bold', backgroundColor: '#1a1e25', padding: '10px' }}>
            Scores
          </Link>
          <Link to="/sports" 
            className="text-sm font-medium rounded-sm transition-colors text-white"
            style={{ fontWeight: 'bold', backgroundColor: '#ff5b00', padding: '10px' }}>
            Sports
          </Link>
          <Link to="/blog"
            className="text-sm font-medium rounded-sm transition-colors text-white"
            style={{ fontWeight: 'bold', backgroundColor: '#ff5b00', padding: '10px' }}>
            News
          </Link>
          {/* <a 
            href="https://games.stadscore.com" 
            className="text-sm font-medium hover:text-stadscore transition-colors flex items-center gap-1" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Gamepad2 className="w-4 h-4" />
            Games
          </a> */}
          <a 
            href="https://blog.stadscore.com" 
            className="text-sm font-medium rounded-sm transition-colors text-white" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontWeight: 'bold', backgroundColor: '#ff5b00', padding: '10px' }}
          >
            News
          </a>  
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-white focus:outline-none hamburger-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-[#00141E] z-[9999] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden mobile-menu`}
        style={{
          top: 'var(--header-height, 0)',
          height: 'calc(100vh - var(--header-height, 0))',
          overflowY: 'auto'
        }}
      >
        <div className="flex flex-col h-full pt-20 px-6 space-y-6">
          <Link 
            to="/" 
            className="text-white text-lg py-3 px-4 rounded-md hover:bg-[#1a1e25] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            ⚽ Live Scores
          </Link>
          <Link
            to="/sports"
            className="text-white text-lg py-3 px-4 rounded-md hover:bg-[#1a1e25] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            🏆 Sports
          </Link>
          <Link
            to="/blog"
            className="text-white text-lg py-3 px-4 rounded-md hover:bg-[#1a1e25] transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            📰 News
          </Link>
          <a 
            href="https://blog.stadscore.com" 
            className="text-white text-lg py-3 px-4 rounded-md hover:bg-[#1a1e25] transition-colors"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
          >
            🔗 Blog
          </a>
          <div className="pt-4 border-t border-gray-700 mt-auto mb-8">
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
