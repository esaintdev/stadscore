
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-10 mt-10">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          <div className="space-y-4 max-w-md">
            <div className="flex items-center justify-center gap-2">
              <img 
                src={theme === 'dark' 
                  ? "/lovable-uploads/facf8c2e-b9ae-4b35-a1db-11ba79454868.png" 
                  : "/lovable-uploads/14050421-b4c8-49fe-9025-3bbd93a7bf76.png"}
                alt="Stadscore Logo" 
                className="h-10 w-10" 
              />
              <span className="font-bold text-xl text-stadscore">STADSCORE</span>
            </div>
            <p className="text-muted-foreground text-sm">
              The ultimate destination for live sports scores, fixtures, results and betting odds.
            </p>
            <div className="flex justify-center space-x-3">
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-stadscore hover:text-white transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-stadscore hover:text-white transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-stadscore hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 rounded-full bg-secondary hover:bg-stadscore hover:text-white transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t w-full">
            <div className="text-sm text-muted-foreground">
              © {currentYear} Stadscore. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
