import { Circle, CircleDot, CircleX, Volleyball } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

const Categories = [
    { id: 'football', name: 'Football', icon: Volleyball, href: '/' },
    { id: 'basketball', name: 'Basketball', icon: CircleDot, href: '/basketball' },
    { id: 'tennis', name: 'Tennis', icon: Circle, href: '/tennis' },
    { id: 'handball', name: 'Handball', icon: CircleX, href: '/handball' },
    { id: 'volleyball', name: 'Volleyball', icon: Volleyball, href: '/volleyball' },
    { id: 'baseball', name: 'Baseball', icon: CircleDot, href: '/baseball' },
    { id: 'cricket', name: 'Cricket', icon: CircleX, href: '/cricket' },
];

interface SportCategoriesProps {
    selectedSport: string;
    onSelectSport: (sport: string) => void;
}

const SportCategories = ({ selectedSport, onSelectSport }: SportCategoriesProps) => {
    // Create an array that repeats the categories multiple times for infinite scroll on mobile
    const repeatedCategories = [...Categories, ...Categories, ...Categories];
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Touch event handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        if (!scrollContainerRef.current) return;
        const touch = e.touches[0];
        setIsDragging(true);
        setStartX(touch.clientX);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        setIsPaused(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const touch = e.touches[0];
        const x = touch.clientX;
        const walk = (x - startX) * 2; // Adjust scroll speed
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        // Only resume auto-scroll after a delay if not manually scrolling
        setTimeout(() => {
            if (!isDragging) {
                setIsPaused(false);
            }
        }, 2000);
    };

    // Mouse event handlers for desktop
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        e.preventDefault();
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
        setIsPaused(true);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        // Only resume auto-scroll after a delay if not manually scrolling
        setTimeout(() => {
            if (!isDragging) {
                setIsPaused(false);
            }
        }, 2000);
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            setIsPaused(false);
        }
    };
    
    return (
        <div className="w-full">
            {/* Desktop View - Standard Scroll */}
            <div className="hidden md:block overflow-x-auto scrollbar-hide">
                <div className="flex justify-center gap-2 py-2">
                    {Categories.map((sport) => (
                        <Link
                            key={sport.id}
                            to={sport.href}
                            onClick={() => onSelectSport(sport.id)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                                bg-[#00253a] text-gray-300 hover:bg-[#ff5b00] hover:text-white ${selectedSport === sport.id ? 'bg-[#ff5b00] text-white shadow-lg' : ''}`}
                        >
                            {sport.icon && <sport.icon className="w-4 h-4" />}
                            <span>{sport.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
            
            {/* Mobile View - Draggable Scroll */}
            <div className="md:hidden overflow-x-auto py-2 relative scrollbar-hide">
                <div 
                    ref={scrollContainerRef}
                    className={`flex gap-2 whitespace-nowrap ${!isPaused ? 'animate-infinite-scroll-mobile' : ''}`}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    style={{ 
                        cursor: isDragging ? 'grabbing' : 'grab',
                        userSelect: 'none',
                        WebkitOverflowScrolling: 'touch',
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}
                >
                    {repeatedCategories.map((sport, index) => (
                        <Link
                            key={`mobile-${sport.id}-${index}`}
                            to={sport.href}
                            onClick={() => onSelectSport(sport.id)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap flex-shrink-0
                                bg-[#00253a] text-gray-300 hover:bg-[#ff5b00] hover:text-white ${selectedSport === sport.id ? 'bg-[#ff5b00] text-white shadow-lg' : ''}`}
                        >
                            {sport.icon && <sport.icon className="w-4 h-4" />}
                            <span>{sport.name}</span>
                        </Link>
                    ))}
                </div>
                
                {/* Fade effect on the sides - Mobile only */}
                {/* <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#0f1a2e] to-transparent pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#0f1a2e] to-transparent pointer-events-none"></div> */}
                
                {/* Mobile Animation styles */}
                <style jsx global>{`
                    @keyframes scrollMobile {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(calc(-250px * ${Categories.length}));
                        }
                    }
                    .animate-infinite-scroll-mobile {
                        display: inline-flex;
                        animation: scrollMobile 40s linear infinite;
                        animation-play-state: running;
                    }
                    .animate-infinite-scroll-mobile.paused {
                        animation-play-state: paused;
                    }
                    .scrollbar-hide::-webkit-scrollbar {
                        display: none;
                    }
                    .scrollbar-hide {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                    @media (min-width: 768px) {
                        .animate-infinite-scroll-mobile {
                            animation: none;
                        }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default SportCategories;
