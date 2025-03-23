
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { Monitor, Zap, Link2, Shield } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SignedIn, SignedOut } from '@clerk/clerk-react';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-background to-background via-accent/5">
      <div className="absolute inset-0 bg-noise-pattern opacity-25 pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-32">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-accent/10 border border-accent/20 animate-fade-in">
                <span className="text-xs font-medium text-accent">{t('app.tagline')}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-fade-up" style={{animationDelay: '100ms'}}>
                {t('app.slogan').split(' ').slice(0, -1).join(' ')} 
                <span className="text-accent"> {t('app.slogan').split(' ').slice(-1)}</span>
              </h1>
              
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl animate-fade-up" style={{animationDelay: '200ms'}}>
                {t('app.description')}
              </p>
              
              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{animationDelay: '300ms'}}>
                <SignedIn>
                  <Button size="lg" onClick={() => navigate('/dashboard')}>
                    {t('nav.dashboard')}
                  </Button>
                </SignedIn>
                <SignedOut>
                  <Button size="lg" onClick={() => navigate('/sign-in')}>
                    {t('nav.get-started')}
                  </Button>
                </SignedOut>
                <Button size="lg" variant="outline">
                  {t('nav.learn-more')}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold">{t('home.features.title')}</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                {t('home.features.subtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-300 hover:shadow-md hover:border-border/80">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t('home.feature1.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.feature1.description')}
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-300 hover:shadow-md hover:border-border/80">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t('home.feature2.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.feature2.description')}
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-300 hover:shadow-md hover:border-border/80">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Link2 className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t('home.feature3.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.feature3.description')}
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className="bg-background rounded-xl p-6 shadow-sm border border-border/40 transition-all duration-300 hover:shadow-md hover:border-border/80">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-medium mb-2">{t('home.feature4.title')}</h3>
                <p className="text-muted-foreground">
                  {t('home.feature4.description')}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="container max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-accent to-accent/70 rounded-2xl p-8 md:p-12 shadow-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-noise-pattern opacity-10" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{t('home.cta.title')}</h2>
                  <p className="mt-3 text-white/80 max-w-xl">
                    {t('home.cta.description')}
                  </p>
                </div>
                
                <SignedIn>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="whitespace-nowrap"
                    onClick={() => navigate('/dashboard')}
                  >
                    {t('home.cta.button')}
                  </Button>
                </SignedIn>
                <SignedOut>
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="whitespace-nowrap"
                    onClick={() => navigate('/sign-in')}
                  >
                    {t('home.cta.button')}
                  </Button>
                </SignedOut>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/60">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Monitor className="w-5 h-5 text-accent" />
              <span className="font-semibold">{t('app.name')}</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} {t('app.name')}. {t('home.footer.rights')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
