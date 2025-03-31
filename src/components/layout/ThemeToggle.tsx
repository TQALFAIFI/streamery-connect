
import React from 'react';
import { Toggle } from '@/components/ui/toggle';
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
    <Toggle
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      className={`h-10 w-10 p-0 rounded-full ${className}`}
      title={theme === 'dark' ? sunTitle : moonTitle}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:opacity-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 opacity-0 transition-all dark:scale-100 dark:opacity-100" />
      <span className="sr-only">
        {theme === 'dark' ? sunTitle : moonTitle}
      </span>
    </Toggle>
  );
};

export default ThemeToggle;
