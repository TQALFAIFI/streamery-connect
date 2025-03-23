
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface DestinationFormProps {
  onSubmit: (data: DestinationFormData) => void;
}

export interface DestinationFormData {
  name: string;
  url: string;
  platform: string;
  streamKey: string;
}

const DestinationForm = ({ onSubmit }: DestinationFormProps) => {
  const { t } = useLanguage();
  
  const form = useForm<DestinationFormData>({
    defaultValues: {
      name: '',
      url: '',
      platform: 'custom',
      streamKey: ''
    }
  });

  const handleSubmit = (data: DestinationFormData) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('dashboard.destinations.name') || 'Destination Name'}</FormLabel>
                <FormControl>
                  <Input placeholder="My YouTube Channel" {...field} required />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('dashboard.destinations.platform') || 'Platform'}</FormLabel>
                <FormControl>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    {...field}
                  >
                    <option value="youtube">YouTube</option>
                    <option value="twitch">Twitch</option>
                    <option value="facebook">Facebook</option>
                    <option value="custom">Custom</option>
                  </select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('dashboard.destinations.url') || 'RTMP URL'}</FormLabel>
                <FormControl>
                  <Input placeholder="rtmp://live.example.com/app" {...field} required />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="streamKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('dashboard.destinations.streamKey') || 'Stream Key'}</FormLabel>
                <FormControl>
                  <Input 
                    type="password"
                    placeholder="xxxx-xxxx-xxxx-xxxx" 
                    {...field} 
                    required 
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="ml-auto">
          <Plus className="mr-2 h-4 w-4" />
          {t('dashboard.destinations.add') || 'Add Destination'}
        </Button>
      </form>
    </Form>
  );
};

export default DestinationForm;
