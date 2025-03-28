
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { User, Settings, LogOut, Pencil, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userUsername, setUserUsername] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [editUsernameOpen, setEditUsernameOpen] = useState(false);
  const [editEmailOpen, setEditEmailOpen] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    
    // Get user info from localStorage
    const email = localStorage.getItem('userEmail');
    const username = localStorage.getItem('userUsername');
    const profilePic = localStorage.getItem('profilePicture');
    
    setUserEmail(email);
    setUserUsername(username);
    setProfilePicture(profilePic);
  }, [navigate]);

  const handleSignOut = () => {
    // Clear authentication state
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userUsername');
    localStorage.removeItem('profilePicture');
    
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    });
    
    // Trigger a storage event to update UI components
    window.dispatchEvent(new Event('storage'));
    
    // Navigate to home page
    navigate('/');
  };

  // Function to handle profile picture upload
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePicture(result);
        localStorage.setItem('profilePicture', result);
        
        toast({
          title: t('profile.picture.updated'),
          description: t('profile.picture.success'),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to get initials from username or email
  const getInitials = () => {
    if (userUsername) return userUsername.charAt(0).toUpperCase();
    if (userEmail) {
      const parts = userEmail.split('@');
      return parts[0].charAt(0).toUpperCase();
    }
    return 'U';
  };

  // Form for updating username
  const updateUsername = (data: { username: string }) => {
    setUserUsername(data.username);
    localStorage.setItem('userUsername', data.username);
    setEditUsernameOpen(false);
    
    toast({
      title: t('profile.username.updated'),
      description: t('profile.username.success'),
    });
  };

  // Form for updating email
  const updateEmail = (data: { email: string }) => {
    setUserEmail(data.email);
    localStorage.setItem('userEmail', data.email);
    setEditEmailOpen(false);
    
    toast({
      title: t('profile.email.updated'),
      description: t('profile.email.success'),
    });
  };

  // Username edit form
  const usernameForm = useForm({
    defaultValues: {
      username: userUsername || '',
    },
  });

  // Email edit form
  const emailForm = useForm({
    defaultValues: {
      email: userEmail || '',
    },
  });

  return (
    <div className="container max-w-4xl mx-auto pt-28 pb-16 px-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4 relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profilePicture || ""} alt="Profile" />
              <AvatarFallback className="text-2xl font-medium bg-accent text-accent-foreground">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-1/2 translate-x-12 translate-y-2">
              <label htmlFor="profile-picture" className="cursor-pointer">
                <div className="bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors">
                  <Upload className="h-4 w-4" />
                </div>
                <input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
          </div>
          <CardTitle className="text-2xl">{userUsername || userEmail || 'User'}</CardTitle>
          <CardDescription>
            {userUsername ? `@${userUsername}` : 'Account Settings'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{t('profile.info')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userUsername && (
                <div className="space-y-1 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">{t('profile.username')}</p>
                    <p className="font-medium">@{userUsername}</p>
                  </div>
                  <Dialog open={editUsernameOpen} onOpenChange={setEditUsernameOpen}>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{t('profile.edit.username')}</DialogTitle>
                        <DialogDescription>
                          {t('profile.edit.username.desc')}
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...usernameForm}>
                        <form onSubmit={usernameForm.handleSubmit(updateUsername)} className="space-y-4">
                          <FormField
                            control={usernameForm.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{t('profile.username')}</FormLabel>
                                <FormControl>
                                  <Input placeholder="username" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <DialogFooter>
                            <Button type="submit">{t('profile.save')}</Button>
                          </DialogFooter>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              )}
              <div className="space-y-1 flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{t('profile.email')}</p>
                  <p className="font-medium">{userEmail || 'Not available'}</p>
                </div>
                <Dialog open={editEmailOpen} onOpenChange={setEditEmailOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{t('profile.edit.email')}</DialogTitle>
                      <DialogDescription>
                        {t('profile.edit.email.desc')}
                      </DialogDescription>
                    </DialogHeader>
                    <Form {...emailForm}>
                      <form onSubmit={emailForm.handleSubmit(updateEmail)} className="space-y-4">
                        <FormField
                          control={emailForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t('profile.email')}</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <DialogFooter>
                          <Button type="submit">{t('profile.save')}</Button>
                        </DialogFooter>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
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
