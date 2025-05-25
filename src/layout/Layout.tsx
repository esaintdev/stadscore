
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
      <main className="flex-1 mx-2 pb-16 md:pb-0 pt-4">
        <Outlet />
      </main>
      <Footer />
      <MobileNavigation />
    </div>
  );
};

export default Layout;
