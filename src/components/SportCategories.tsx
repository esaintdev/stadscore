import { Circle, CircleDot, CircleX, Volleyball } from 'lucide-react';
import { Link } from 'react-router-dom';

const Categories = [
    { id: 'football', name: 'Football', icon: Volleyball, href: '/' },
    { id: 'basketball', name: 'Basketball', icon: CircleDot, href: '/basketball' },
    { id: 'tennis', name: 'Tennis', icon: Circle, href: '/tennis' },
    { id: 'handball', name: 'Handball', icon: CircleX, href: '/handball' },
    { id: 'volleyball', name: 'Volleyball', icon: Circle, href: '/volleyball' },
    { id: 'baseball', name: 'Baseball', icon: CircleDot, href: '/baseball' },
    { id: 'cricket', name: 'Cricket', icon: CircleX, href: '/cricket' },
];

interface SportCategoriesProps {
    selectedSport: string;
    onSelectSport: (sport: string) => void;
}

const SportCategories = ({ selectedSport, onSelectSport }: SportCategoriesProps) => {
    return (
        <div className="w-full overflow-x-auto py-2">
            <div className="flex justify-center gap-2">
                {Categories.map((sport) => (
                    <Link
                        key={sport.id}
                        to={sport.href}
                        onClick={() => onSelectSport(sport.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                            selectedSport === sport.id 
                                ? 'bg-[#ff5b00] text-white shadow-lg' 
                                : 'bg-[#001a29] text-gray-300 hover:bg-[#00253a]'
                        }`}
                    >
                        {sport.icon && <sport.icon className="w-4 h-4" />}
                        <span>{sport.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SportCategories;
