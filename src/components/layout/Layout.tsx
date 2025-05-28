
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';

const Layout = () => {
  const [selectedSport, setSelectedSport] = useState('football');

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        selectedSport={selectedSport} 
        onSelectSport={setSelectedSport} 
      />
      <main className="flex-1 container px-4 sm:px-4 pb-16 md:pb-0 pt-4">
        <Outlet context={{ selectedSport }} />
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
