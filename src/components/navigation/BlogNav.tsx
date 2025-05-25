import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'All', path: '/blog' },
  { name: 'Football', path: '/blog/category/football' },
  { name: 'Basketball', path: '/blog/category/basketball' },
  { name: 'Tennis', path: '/blog/category/tennis' },
  { name: 'Baseball', path: '/blog/category/baseball' },
  { name: 'Hockey', path: '/blog/category/hockey' },
];

const BlogNav = () => {
  const location = useLocation();

  return (
    <nav className="border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex space-x-6 overflow-x-auto py-4 hide-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'whitespace-nowrap px-3 py-2 text-sm font-medium transition-colors hover:text-stadscore',
                location.pathname === item.path
                  ? 'border-b-2 border-stadscore text-stadscore'
                  : 'text-muted-foreground hover:text-stadscore'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BlogNav;
