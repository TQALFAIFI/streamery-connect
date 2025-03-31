
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const { language } = useLanguage();
  
  const moonTitle = language === 'ar' ? 'الوضع الداكن' : 'Dark mode';
  const sunTitle = language === 'ar' ? 'الوضع الفاتح' : 'Light mode';

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className={className}
      title={theme === 'dark' ? sunTitle : moonTitle}
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
      <span className="sr-only">
        {theme === 'dark' ? sunTitle : moonTitle}
      </span>
    </Button>
  );
};

export default ThemeToggle;
