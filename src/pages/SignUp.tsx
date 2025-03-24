
import React from 'react';
import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { Monitor } from 'lucide-react';

// CSS لإخفاء شريط Clerk وتوسيط النص
const clerkFooterStyle = `
  .cl-footer {
    display: none !important;
  }
  
  .cl-cardBox {
    display: flex !important;
    justify-content: center !important;
    text-align: center !important;
  }
`;

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-background to-background via-accent/5">
      <div className="absolute inset-0 bg-noise-pattern opacity-25 pointer-events-none" />
      
      {/* إضافة أسلوب CSS لإخفاء شريط Clerk وتوسيط النص */}
      <style>{clerkFooterStyle}</style>
      
      <div className="container max-w-md mx-auto flex-1 flex flex-col justify-center items-center py-12 px-4">
        <div className="w-full bg-background/50 backdrop-blur-md rounded-xl p-8 shadow-lg border border-border/40 animate-fade-in">
          <div className="mb-6 flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
              <Monitor className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-center">{t('auth.signUp')}</h1>
            <CardDescription className="text-center mt-2">{t('auth.createAccount')}</CardDescription>
          </div>
          
          <ClerkSignUp 
            signInUrl="/sign-in"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-background hover:bg-accent/10 flex items-center justify-center py-2 border border-border",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground text-sm",
                formFieldLabel: "text-foreground font-medium",
                formFieldInput: "bg-background border-border focus:border-accent focus:ring-accent h-10 rounded-md px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                formButtonPrimary: "bg-accent hover:bg-accent/90 text-accent-foreground h-10 w-full rounded-md px-4 py-2",
                footerActionLink: "text-accent hover:text-accent/90 font-medium",
                footerActionText: "text-muted-foreground",
                identityPreviewText: "text-foreground",
                identityPreviewEditButton: "text-accent hover:text-accent/90",
                footer: "hidden", // إخفاء الشريط السفلي
              }
            }}
          />
          
          <div className="mt-6 flex justify-between items-center">
            <Button 
              onClick={() => navigate('/')}
              variant="ghost"
              className="text-accent hover:text-accent/90 hover:bg-background"
            >
              {t('auth.backToHome')}
            </Button>
            
            <Button 
              onClick={() => navigate('/sign-in')}
              variant="ghost"
              className="text-accent hover:text-accent/90 hover:bg-background"
            >
              {t('auth.haveAccount')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
