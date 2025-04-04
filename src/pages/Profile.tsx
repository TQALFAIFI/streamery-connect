
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, Pencil, Upload, CreditCard } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import PlanDialog from '@/components/ui/PlanDialog';

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userUsername, setUserUsername] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [editUsernameOpen, setEditUsernameOpen] = useState(false);
  const [editEmailOpen, setEditEmailOpen] = useState(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<'free' | 'pro' | 'premium'>('free');
  const [planStatus, setPlanStatus] = useState<'active' | 'expired' | 'trial'>('active');
  const [planDialogOpen, setPlanDialogOpen] = useState(false);
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/sign-in');
      return;
    }
    
    const email = localStorage.getItem('userEmail');
    const username = localStorage.getItem('userUsername');
    const profilePic = localStorage.getItem('profilePicture');
    const plan = localStorage.getItem('subscriptionPlan') as 'free' | 'pro' | 'premium' || 'free';
    const status = localStorage.getItem('planStatus') as 'active' | 'expired' | 'trial' || 'active';
    
    setUserEmail(email);
    setUserUsername(username);
    setProfilePicture(profilePic);
    setSubscriptionPlan(plan);
    setPlanStatus(status);
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userUsername');
    localStorage.removeItem('profilePicture');
    
    toast({
      title: "Signed out successfully",
      description: "You have been signed out of your account",
    });
    
    window.dispatchEvent(new Event('storage'));
    
    navigate('/');
  };

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

  const getInitials = () => {
    if (userUsername) return userUsername.charAt(0).toUpperCase();
    if (userEmail) {
      const parts = userEmail.split('@');
      return parts[0].charAt(0).toUpperCase();
    }
    return 'U';
  };

  const updateUsername = (data: { username: string }) => {
    setUserUsername(data.username);
    localStorage.setItem('userUsername', data.username);
    setEditUsernameOpen(false);
    
    toast({
      title: t('profile.username.updated'),
      description: t('profile.username.success'),
    });
  };

  const updateEmail = (data: { email: string }) => {
    setUserEmail(data.email);
    localStorage.setItem('userEmail', data.email);
    setEditEmailOpen(false);
    
    toast({
      title: t('profile.email.updated'),
      description: t('profile.email.success'),
    });
  };

  const usernameForm = useForm({
    defaultValues: {
      username: userUsername || '',
    },
  });

  const emailForm = useForm({
    defaultValues: {
      email: userEmail || '',
    },
  });

  const getPlanBadgeColor = () => {
    switch (subscriptionPlan) {
      case 'premium':
        return 'bg-purple-600 hover:bg-purple-700';
      case 'pro':
        return 'bg-blue-600 hover:bg-blue-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const getStatusBadgeColor = () => {
    switch (planStatus) {
      case 'active':
        return 'bg-green-600 hover:bg-green-700';
      case 'trial':
        return 'bg-yellow-600 hover:bg-yellow-700';
      default:
        return 'bg-red-600 hover:bg-red-700';
    }
  };

  return (
    <>
      <Navbar />
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

            <div className="space-y-2 pt-4">
              <h3 className="text-lg font-medium flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                {t('profile.subscription')}
              </h3>
              <div className="bg-muted rounded-lg p-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <h4 className="font-semibold text-base mr-2">
                        {t(`profile.plan.${subscriptionPlan}`)}
                      </h4>
                      <Badge className={getPlanBadgeColor()}>
                        {subscriptionPlan.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {t(`profile.plan.${subscriptionPlan}.desc`)}
                    </p>
                  </div>
                  <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
                    <div className="flex items-center mb-2">
                      <span className="text-sm text-muted-foreground mr-2">{t('profile.plan.status')}:</span>
                      <Badge className={getStatusBadgeColor()}>
                        {t(`profile.plan.${planStatus}`)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  {subscriptionPlan !== 'premium' && (
                    <Button size="sm" onClick={() => setPlanDialogOpen(true)}>
                      {t('profile.plan.upgrade')}
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    {t('profile.plan.manage')}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
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

        {/* Plan Selection Dialog */}
        <PlanDialog 
          open={planDialogOpen} 
          onOpenChange={setPlanDialogOpen} 
        />
      </div>
    </>
  );
};

export default Profile;
