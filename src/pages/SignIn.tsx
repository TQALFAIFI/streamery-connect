
import React from 'react';
import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-background to-background via-accent/5">
      <div className="absolute inset-0 bg-noise-pattern opacity-25 pointer-events-none" />
      
      <div className="container max-w-md mx-auto flex-1 flex flex-col justify-center items-center py-12 px-4">
        <div className="w-full bg-background/50 backdrop-blur-md rounded-xl p-8 shadow-lg border border-border/40">
          <h1 className="text-2xl font-bold text-center mb-6">{t('auth.signIn')}</h1>
          
          <ClerkSignIn 
            signUpUrl="/sign-up"
            redirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "bg-transparent shadow-none p-0",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "bg-background hover:bg-accent/10",
                dividerLine: "bg-border",
                formFieldLabel: "text-foreground",
                formFieldInput: "bg-background border-border",
                formButtonPrimary: "bg-accent hover:bg-accent/90",
                footerActionLink: "text-accent hover:text-accent/90",
              }
            }}
          />
          
          <div className="mt-6 text-center text-sm">
            <button 
              onClick={() => navigate('/')}
              className="text-accent hover:text-accent/90"
            >
              {t('auth.backToHome')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
