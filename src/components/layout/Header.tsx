import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useTheme } from '@/hooks/use-theme';
import { Gamepad2, Menu, X } from 'lucide-react';
import SportCategories from '../widgets/SportCatergories'; // Note: There's a typo in the filename (Catergories instead of Categories)

interface HeaderProps {
  selectedSport: string;
  onSelectSport: (sport: string) => void;
}

// Navigation links data
const navLinks: Array<{
  to?: string;
  href?: string;
  label: string;
  icon?: React.ReactNode;
  external?: boolean;
}> = [
  { to: "/", label: "Live Scores" },
  { to: "/fixtures", label: "Fixtures" },
  { to: "/results", label: "Results" },
  { to: "/league", label: "League" },
  { 
    href: "https://blog.stadscore.com", 
    label: "Blog", 
    external: true 
  },
];

export const Header: React.FC<HeaderProps> = ({ selectedSport, onSelectSport }) => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if current route matches a nav link
  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur-md bg-background/90">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              {theme === 'dark' ? (
                <img src="/lovable-uploads/facf8c2e-b9ae-4b35-a1db-11ba79454868.png" alt="Stadscore Logo" className="h-8" />
              ) : (
                <img src="/lovable-uploads/14050421-b4c8-49fe-9025-3bbd93a7bf76.png" alt="Stadscore Logo" className="h-8" />
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 mx-6">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium hover:text-stadscore transition-colors flex items-center gap-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon || null}
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium hover:text-stadscore transition-colors ${
                    isActive(link.to) ? 'text-stadscore font-semibold' : 'text-foreground/80'
                  }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-accent focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div 
        className={`fixed inset-0 z-40 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden transition-transform duration-300 ease-in-out`}
      >
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
        <div className="fixed inset-y-0 left-0 w-64 bg-background shadow-lg flex flex-col">
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
              {theme === 'dark' ? (
                <img src="/lovable-uploads/facf8c2e-b9ae-4b35-a1db-11ba79454868.png" alt="Stadscore Logo" className="h-8" />
              ) : (
                <img src="/lovable-uploads/14050421-b4c8-49fe-9025-3bbd93a7bf76.png" alt="Stadscore Logo" className="h-8" />
              )}
            </Link>
          </div>
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-3 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon || null}
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 rounded-md text-sm font-medium hover:bg-accent transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
