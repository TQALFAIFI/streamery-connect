
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Cast, Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

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

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();

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
          <NavLink to="/dashboard">{t('nav.dashboard')}</NavLink>
          <NavLink to="/settings">{t('nav.settings')}</NavLink>
          <LanguageSwitcher />
          <Button size="sm" className="ml-4">
            {t('nav.get-started')}
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <LanguageSwitcher />
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
            <Button className="mt-2">
              {t('nav.get-started')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
