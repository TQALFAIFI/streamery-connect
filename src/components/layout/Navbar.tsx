
import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Cast, Menu, User, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink = ({ to, children, className }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        'px-4 py-2 rounded-md transition-colors duration-200 relative group',
        isActive 
          ? 'text-accent font-medium' 
          : 'text-foreground/70 hover:text-foreground',
        className
      )}
    >
      {children}
      <span 
        className={cn(
          'absolute bottom-0 left-0 w-full h-0.5 rounded-full bg-accent scale-x-0 transition-transform duration-200 origin-left',
          isActive && 'scale-x-100'
        )}
      />
    </Link>
  );
};

// Check if user is authenticated
const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(localStorage.getItem('isAuthenticated') === 'true');
    };
    
    // Check on mount
    checkAuth();
    
    // Listen for storage events to update UI when authentication state changes
    window.addEventListener('storage', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);
  
  return isLoggedIn;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isLoggedIn = useIsLoggedIn();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Get user email from localStorage
    if (isLoggedIn) {
      setUserEmail(localStorage.getItem('userEmail'));
    } else {
      setUserEmail(null);
    }
  }, [isLoggedIn]);

  const handleSignOut = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    
    // Trigger a storage event to update UI components
    window.dispatchEvent(new Event('storage'));
    
    // Navigate to home page
    navigate('/');
  };

  // Function to get initials from email
  const getInitials = (email: string | null) => {
    if (!email) return 'U';
    const parts = email.split('@');
    return parts[0].charAt(0).toUpperCase();
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled 
          ? 'py-3 bg-background/80 backdrop-blur-lg shadow-sm' 
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container max-w-7xl mx-auto flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-2 font-semibold text-xl"
        >
          <Cast className="w-6 h-6 text-accent" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-accent/70">
            {t('app.name')}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/">{t('nav.home')}</NavLink>
          
          {isLoggedIn && (
            <>
              <NavLink to="/dashboard">{t('nav.dashboard')}</NavLink>
              <NavLink to="/settings">{t('nav.settings')}</NavLink>
            </>
          )}
          
          <LanguageSwitcher />
          
          {isLoggedIn ? (
            <div className="ml-4 flex items-center">
              <Button 
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs font-medium">
                    {getInitials(userEmail)}
                  </AvatarFallback>
                </Avatar>
              </Button>
              <Button 
                variant="ghost"
                className="ml-2"
                onClick={handleSignOut}
              >
                {t('nav.sign-out')}
              </Button>
            </div>
          ) : (
            <Button 
              size="sm" 
              className="ml-4"
              onClick={() => navigate('/sign-in')}
            >
              {t('nav.get-started')}
            </Button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
          
          {isLoggedIn && (
            <Button 
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8"
              onClick={() => navigate('/profile')}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs font-medium">
                  {getInitials(userEmail)}
                </AvatarFallback>
              </Avatar>
            </Button>
          )}
          
          <button
            className="p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg md:hidden animate-fade-in">
          <div className="container py-4 flex flex-col space-y-3">
            <NavLink 
              to="/" 
              className="w-full flex justify-center"
            >
              {t('nav.home')}
            </NavLink>
            
            {isLoggedIn && (
              <>
                <NavLink 
                  to="/dashboard" 
                  className="w-full flex justify-center"
                >
                  {t('nav.dashboard')}
                </NavLink>
                <NavLink 
                  to="/settings" 
                  className="w-full flex justify-center"
                >
                  {t('nav.settings')}
                </NavLink>
                <NavLink 
                  to="/profile" 
                  className="w-full flex justify-center"
                >
                  Profile
                </NavLink>
                <Button 
                  className="mt-2"
                  onClick={handleSignOut}
                >
                  {t('nav.sign-out')}
                </Button>
              </>
            )}
            
            {!isLoggedIn && (
              <Button 
                className="mt-2"
                onClick={() => navigate('/sign-in')}
              >
                {t('nav.get-started')}
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
