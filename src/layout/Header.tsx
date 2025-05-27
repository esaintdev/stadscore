
import { Link } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/use-theme';
import { Menu, X, Search, Bell, User, ChevronDown } from 'lucide-react';
import Banner from '@/layout/Banner';
import SportCategories from '@/components/SportCategories';


const Header = () => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedSport, setSelectedSport] = useState<string>('football');
  const [currentDate, setCurrentDate] = useState<string>('');

  // Format date as "Day, DD Month YYYY"
  const formatDate = useCallback((date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  }, []);

  // Update date on mount and set up interval to update at midnight
  useEffect(() => {
    const updateDate = () => {
      setCurrentDate(formatDate(new Date()));
    };
    
    // Initial update
    updateDate();
    
    // Calculate time until next midnight
    const now = new Date();
    const nextMidnight = new Date(now);
    nextMidnight.setDate(now.getDate() + 1);
    nextMidnight.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();
    
    // Set timeout for next midnight
    const timeoutId = setTimeout(() => {
      updateDate();
      // Then update every 24 hours
      const intervalId = setInterval(updateDate, 24 * 60 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, msUntilMidnight);
    
    return () => clearTimeout(timeoutId);
  }, [formatDate]);
  
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
    <header className="sticky top-0 z-50 w-full bg-[#0f1a2e] shadow-md">
      {/* Top Bar with Date and Navigation */}
      <div className="bg-[#0a1423] text-white text-sm py-2.5 px-4 md:px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span>{currentDate || formatDate(new Date())}</span>
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="hover:text-[#ff5b00] transition-colors">Home</Link>
              <Link to="/" className="hover:text-[#ff5b00] transition-colors">Live Scores</Link>
              <Link to="/fixtures" className="hover:text-[#ff5b00] transition-colors">Fixtures</Link>
              <Link to="/results" className="hover:text-[#ff5b00] transition-colors">Results</Link>
              <Link to="/tables" className="hover:text-[#ff5b00] transition-colors">Tables</Link>
              <Link to="/news" className="hover:text-[#ff5b00] transition-colors">News</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="hover:text-[#ff5b00] transition-colors">Sign In</a>
            <a href="#" className="bg-[#1a3e6f] hover:bg-[#2557a7] px-3 py-1 rounded transition-colors">
              Subscribe
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto py-3 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/imagesand/facf8c2e-b9ae-4b35-a1db-11ba79454868.png" 
                alt="Stadscore Logo" 
                className="h-10"
              />
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle - Visible on large screens */}
            <div className="hidden md:flex items-center">
              <ThemeToggle />
            </div>
            
            {/* Favorites Icon */}
            <button className="text-white hover:text-[#ff5b00] transition-colors hidden md:block">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
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
      </div>

      {/* Sport Categories */}
      <div className="bg-[#1a2c47] py-2">
        <div className="container mx-auto px-4">
          <SportCategories 
            selectedSport={selectedSport} 
            onSelectSport={setSelectedSport} 
          />
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-[#0f1a2e] z-[9999] transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden mobile-menu`}
        style={{
          top: 'var(--header-height, 0)',
          height: 'calc(100vh - var(--header-height, 0))',
          overflowY: 'auto'
        }}
      >
        <div className="flex flex-col h-full pt-6 px-4 space-y-1">
          <div className="flex items-center justify-between p-4 border-b border-[#1a2c47]">
            <h3 className="text-white font-medium">Menu</h3>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-400 hover:text-white"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Search in mobile menu */}
          <div className="p-4 border-b border-[#1a2c47]">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-[#1a2c47] text-white rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#3a6ea5]"
              />
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto">
            <Link 
              to="/" 
              className="block py-3 px-4 text-white hover:bg-[#1a2c47] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/sports"
              className="block py-3 px-4 text-white hover:bg-[#1a2c47] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Live Scores
            </Link>
            <Link
              to="/fixtures"
              className="block py-3 px-4 text-white hover:bg-[#1a2c47] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Fixtures
            </Link>
            <Link
              to="/tables"
              className="block py-3 px-4 text-white hover:bg-[#1a2c47] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Tables
            </Link>
            <Link
              to="/news"
              className="block py-3 px-4 text-white hover:bg-[#1a2c47] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              News
            </Link>
            
            <div className="mt-4 pt-4 border-t border-[#1a2c47] px-4">
              <h4 className="text-sm text-gray-400 uppercase font-medium mb-3">Account</h4>
              <button className="w-full text-left py-2 px-4 text-white hover:bg-[#1a2c47] rounded-md transition-colors">
                Sign In
              </button>
              <button className="w-full text-left py-2 px-4 text-white hover:bg-[#1a2c47] rounded-md transition-colors">
                Subscribe
              </button>
            </div>
            
            <div className="p-4 border-t border-[#1a2c47] mt-auto">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Dark Mode</span>
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
