
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileNavigation from './MobileNavigation';
import Banner from './Banner';

const Layout = () => {
  // Set CSS variable for header height
  useEffect(() => {
    document.documentElement.style.setProperty('--header-height', '112px'); // Adjust this value based on your header height
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* <Banner /> */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto px-2 pt-4">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
