
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Home, Calendar, Trophy, BarChart3, BookText, Gamepad2 } from 'lucide-react';
import { cn } from "@/lib/utils";

const MobileNavigation = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Score', path: '/', icon: Home },
    { name: 'Fixtures', path: '/fixtures', icon: Calendar },
    { name: 'Results', path: '/results', icon: Trophy },
    { name: 'Leagues', path: '/league-tables', icon: BarChart3 },

  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around">
        {navItems.map(item => (
          item ? (
            <Link
              key={item.path}
              to={item.path}
              rel="noopener noreferrer"
              className={cn(
                "flex flex-col items-center py-3 px-2",
                "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.name}</span>
            </Link>
          ) : (
            <Link 
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center py-3 px-2",
                location.pathname === item.path 
                  ? "text-stadscore" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.name}</span>
            </Link>
          )
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
