
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the supported languages
export type Language = 'en' | 'ar';

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Create a hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Define props type for the provider
interface LanguageProviderProps {
  children: React.ReactNode;
}

// Create the language provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Get initial language from localStorage or use browser language preference
  const getInitialLanguage = (): Language => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && ['en', 'ar'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    return browserLanguage === 'ar' ? 'ar' : 'en';
  };

  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [translations, setTranslations] = useState<Record<string, string>>({});

  // Apply RTL direction for Arabic language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('language', language);

    // Load translations for the selected language
    import(`../translations/${language}.ts`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => {
        console.error('Failed to load translations:', error);
      });
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
