
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t py-10 mt-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
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
            <div className="flex space-x-3">
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

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Live Scores</span>
                </Link>
              </li>
              <li>
                <Link to="/fixtures" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Fixtures</span>
                </Link>
              </li>
              <li>
                <Link to="/results" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Results</span>
                </Link>
              </li>
              <li>
                <Link to="/tables" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Tables</span>
                </Link>
              </li>
              <li>
                <Link to="/odds" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Odds</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">More Sports</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/?sport=football" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Football</span>
                </Link>
              </li>
              <li>
                <Link to="/?sport=basketball" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Basketball</span>
                </Link>
              </li>
              <li>
                <Link to="/?sport=tennis" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Tennis</span>
                </Link>
              </li>
              <li>
                <Link to="/?sport=cricket" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Cricket</span>
                </Link>
              </li>
              <li>
                <a href="https://games.stadscore.com" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors" target="_blank" rel="noopener noreferrer">
                  <ArrowRight size={14} />
                  <span>Games</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <a href="https://blog.stadscore.com" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors" target="_blank" rel="noopener noreferrer">
                  <ArrowRight size={14} />
                  <span>Blog</span>
                </a>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-stadscore flex items-center gap-1 transition-colors">
                  <ArrowRight size={14} />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Stadscore. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-stadscore transition-colors">Privacy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-stadscore transition-colors">Terms</Link>
            <a href="#" className="text-sm text-muted-foreground hover:text-stadscore transition-colors">Cookies</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-stadscore transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
