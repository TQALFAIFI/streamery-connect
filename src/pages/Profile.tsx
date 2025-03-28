
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, LogOut } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userUsername, setUserUsername] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    
    // Get user info from localStorage
    const email = localStorage.getItem('userEmail');
    const name = localStorage.getItem('userName');
    const username = localStorage.getItem('userUsername');
    
    setUserEmail(email);
    setUserName(name);
    setUserUsername(username);
  }, [navigate]);

  const handleSignOut = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userUsername');
    
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    });
    
    // Trigger a storage event to update UI components
    window.dispatchEvent(new Event('storage'));
    
    // Navigate to home page
    navigate('/');
  };

  // Function to get initials from username or email
  const getInitials = () => {
    if (userUsername) return userUsername.charAt(0).toUpperCase();
    if (userName) return userName.charAt(0).toUpperCase();
    if (userEmail) {
      const parts = userEmail.split('@');
      return parts[0].charAt(0).toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="container max-w-4xl mx-auto pt-28 pb-16 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="text-2xl font-medium bg-accent text-accent-foreground">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl">{userName || userUsername || userEmail || 'User'}</CardTitle>
          <CardDescription>
            {userUsername ? `@${userUsername}` : 'Account Settings'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{t('profile.info')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userName && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{userName}</p>
                </div>
              )}
              {userUsername && (
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{t('profile.username')}</p>
                  <p className="font-medium">@{userUsername}</p>
                </div>
              )}
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{t('profile.email')}</p>
                <p className="font-medium">{userEmail || 'Not available'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{t('profile.type')}</p>
                <p className="font-medium">Streamer</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{t('profile.streaming')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('profile.streaming.desc')}
            </p>
            <Button 
              variant="outline" 
              className="mt-2"
              onClick={() => navigate('/dashboard')}
            >
              <Settings className="mr-2 h-4 w-4" />
              {t('profile.goto.dashboard')}
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
          <Button 
            variant="outline"
            onClick={() => navigate('/settings')}
            className="w-full sm:w-auto"
          >
            <Settings className="mr-2 h-4 w-4" />
            {t('profile.goto.settings')}
          </Button>
          <Button 
            variant="destructive"
            onClick={handleSignOut}
            className="w-full sm:w-auto"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t('nav.sign-out')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
