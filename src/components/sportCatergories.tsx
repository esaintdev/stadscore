import { Circle, CircleDot, CircleX } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = [
    { id: 'football', name: 'Football', icon: Circle, href: '/' },
    { id: 'basketball', name: 'Basketball', icon: CircleDot, href: '/basketball' },
    { id: 'tennis', name: 'Tennis', icon: Circle, href: '/tennis' },
    { id: 'handball', name: 'Handball', icon: CircleX, href: '/handball' },
    { id: 'volleyball', name: 'Volleyball', icon: Circle, href: '/volleyball' },
    { id: 'baseball', name: 'Baseball', icon: CircleDot, href: '/baseball' },
    { id: 'cricket', name: 'Cricket', icon: CircleX, href: '/cricket' },
  ];


const sportCategories = (selectedSport: string, setSelectedSport: (sport: string) => void) => {
    return (
        <div className="overflow-x-auto pb-2">
            <div className="flex gap-3 min-w-max">
              {Categories.map((sport) => (
                <button 
                  key={sport.id}
                  onClick={() => setSelectedSport(sport.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedSport === sport.id 
                      ? 'bg-stadscore text-white shadow-lg hover:shadow-stadscore/20' 
                      : 'bg-secondary text-foreground hover:bg-secondary/80 hover:shadow-md'
                  }`}
                >
                  {sport.icon && <sport.icon className="w-4 h-4" />}
                  <Link to={sport.href} className="ml-2">{sport.name}</Link>
                </button>
              ))}
            </div>
    </div>
    );
};

export default sportCategories;