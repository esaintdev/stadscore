
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, ArrowRight, MessageSquare, Clock, Award } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-gradient-to-br from-secondary/50 to-background border-t">
      {/* Top section with gradient separator */}
      <div className="h-1 bg-gradient-to-r from-stadscore via-stadscore/70 to-stadscore/30"></div>
      
      <div className="container py-12">
        {/* Logo and description section */}
        <div className="flex flex-col md:flex-row gap-12 mb-10 pb-10 border-b">
          <div className="md:w-1/3 space-y-6">
            <div>
              <img 
                src={theme === 'dark' 
                  ? "/lovable-uploads/facf8c2e-b9ae-4b35-a1db-11ba79454868.png" 
                  : "/lovable-uploads/fcb9b9df-c30b-4891-abd2-c9d60658f76e.png"} 
                alt="Stadscore Logo" 
                className="h-12" 
              />
            </div>
            <p className="text-muted-foreground">
              Your ultimate destination for live sports scores, fixtures, results and betting odds. Track every score in real-time with Stadscore's comprehensive coverage of global sports events.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 rounded-full bg-stadscore/10 hover:bg-stadscore hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-stadscore/10 hover:bg-stadscore hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-stadscore/10 hover:bg-stadscore hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-stadscore/10 hover:bg-stadscore hover:text-white transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Footer links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:flex-1">
            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="h-5 w-1 bg-stadscore rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>Live Scores</span>
                  </Link>
                </li>
                <li>
                  <Link to="/fixtures" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>Fixtures</span>
                  </Link>
                </li>
                <li>
                  <Link to="/results" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>Results</span>
                  </Link>
                </li>
                <li>
                  <Link to="/tables" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>Tables</span>
                  </Link>
                </li>
                <li>
                  <Link to="/odds" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>Odds</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="h-5 w-1 bg-stadscore rounded-full"></span>
                Popular Leagues
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/leagues/pl" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>Premier League</span>
                  </Link>
                </li>
                <li>
                  <Link to="/leagues/laliga" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>La Liga</span>
                  </Link>
                </li>
                <li>
                  <Link to="/leagues/bundesliga" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>Bundesliga</span>
                  </Link>
                </li>
                <li>
                  <Link to="/leagues/seriea" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>Serie A</span>
                  </Link>
                </li>
                <li>
                  <Link to="/leagues/ligue1" className="text-muted-foreground hover:text-stadscore flex items-center gap-2 transition-colors">
                    <ArrowRight size={14} className="text-stadscore" />
                    <span>Ligue 1</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <span className="h-5 w-1 bg-stadscore rounded-full"></span>
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <MessageSquare size={18} className="mt-0.5 text-stadscore shrink-0" />
                  <span>info@stadscore.com</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Clock size={18} className="mt-0.5 text-stadscore shrink-0" />
                  <span>24/7 Support</span>
                </li>
                <li className="flex items-start gap-3 text-muted-foreground">
                  <Award size={18} className="mt-0.5 text-stadscore shrink-0" />
                  <span>Premium Service</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between">
          <div className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {currentYear} Stadscore. All rights reserved. Track every score.
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-stadscore transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-stadscore transition-colors">Terms of Service</Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-stadscore transition-colors">Contact Us</Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-stadscore transition-colors">About Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
