
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Monitor } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

// Form validation schema
const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address."
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters."
  }),
});

type FormValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      // Here you would implement your actual authentication logic
      // For example, sending a request to your backend API
      console.log('Sign in attempt:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll consider these credentials valid
      // In a real app, you would validate against your database
      const isValidCredentials = true; // Replace with actual validation
      
      if (isValidCredentials) {
        // Store auth state in localStorage for demo purposes
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', data.email);
        
        toast.success(t('auth.signInSuccess') || 'Sign in successful!');
        
        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        toast.error(t('auth.invalidCredentials') || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      toast.error(t('auth.signInError') || 'Failed to sign in. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-background to-background via-accent/5">
      <div className="absolute inset-0 bg-noise-pattern opacity-25 pointer-events-none" />
      
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        <section className="pt-32 pb-20 px-4 flex-1 flex justify-center items-center">
          <div className="container max-w-md mx-auto">
            <div className="w-full bg-background/50 backdrop-blur-md rounded-xl p-8 shadow-lg border border-border/40 animate-fade-in">
              <div className="mb-6 flex flex-col items-center">
                <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Monitor className="h-6 w-6 text-accent" />
                </div>
                <h1 className="text-2xl font-bold text-center">{t('auth.signIn')}</h1>
                <CardDescription className="text-center mt-2">{t('auth.welcomeBack')}</CardDescription>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input 
                            type="password" 
                            placeholder="••••••••" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : t('auth.signIn')}
                  </Button>
                </form>
              </Form>
              
              <div className="mt-6 flex justify-between items-center">
                <Button 
                  onClick={() => navigate('/')}
                  variant="ghost"
                  className="text-accent hover:text-accent/90 hover:bg-background"
                >
                  {t('auth.backToHome')}
                </Button>
                
                <Button 
                  onClick={() => navigate('/sign-up')}
                  variant="ghost"
                  className="text-accent hover:text-accent/90 hover:bg-background"
                >
                  {t('auth.noAccount')}
                </Button>
              </div>
            </div>
          </div>
        </section>
        
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
      </main>
    </div>
  );
};

export default SignIn;
