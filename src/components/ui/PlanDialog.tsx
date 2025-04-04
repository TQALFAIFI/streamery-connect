
import React from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Check, Sparkles, Globe, Zap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import GlassCard from '@/components/ui/GlassCard';

interface PlanOption {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  recommended?: boolean;
}

interface PlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PlanDialog = ({ open, onOpenChange }: PlanDialogProps) => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = React.useState('pro');

  const plans: PlanOption[] = [
    {
      id: 'basic',
      name: t('plan.basic.name') || 'Basic',
      price: '$9.99',
      description: t('plan.basic.description') || 'For personal use',
      icon: <Globe className="h-5 w-5" />,
      features: [
        t('plan.basic.feature1') || 'Basic features',
        t('plan.basic.feature2') || '720p streaming quality',
        t('plan.basic.feature3') || 'Email support',
      ],
    },
    {
      id: 'pro',
      name: t('plan.pro.name') || 'Pro',
      price: '$19.99',
      description: t('plan.pro.description') || 'For professionals',
      icon: <Zap className="h-5 w-5" />,
      features: [
        t('plan.pro.feature1') || 'All Basic features',
        t('plan.pro.feature2') || '1080p streaming quality',
        t('plan.pro.feature3') || 'Priority support',
        t('plan.pro.feature4') || 'Advanced analytics',
      ],
      recommended: true,
    },
    {
      id: 'premium',
      name: t('plan.premium.name') || 'Premium',
      price: '$39.99',
      description: t('plan.premium.description') || 'For enterprises',
      icon: <Sparkles className="h-5 w-5" />,
      features: [
        t('plan.premium.feature1') || 'All Pro features',
        t('plan.premium.feature2') || '4K streaming quality',
        t('plan.premium.feature3') || '24/7 dedicated support',
        t('plan.premium.feature4') || 'Custom branding',
        t('plan.premium.feature5') || 'Unlimited destinations',
      ],
    },
  ];

  const handleSubscribe = () => {
    console.log(`Subscribing to ${selectedPlan} plan`);
    onOpenChange(false);
    // Here you would typically integrate with a payment provider like Stripe
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t('upgrade.title') || 'Choose Your Plan'}</DialogTitle>
          <DialogDescription>
            {t('upgrade.description') || 'Select the plan that best fits your needs.'}
          </DialogDescription>
        </DialogHeader>
        <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="gap-4">
          {plans.map((plan) => (
            <div key={plan.id} className="relative">
              {plan.recommended && (
                <Badge className="absolute -top-2 -right-2 bg-primary z-10" variant="default">
                  {t('plan.recommended') || 'Recommended'}
                </Badge>
              )}
              <Label
                htmlFor={plan.id}
                className="cursor-pointer"
              >
                <GlassCard
                  className={`p-6 h-full ${
                    selectedPlan === plan.id
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                      : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 text-primary rounded-full p-2">
                        {plan.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground">{plan.description}</p>
                      </div>
                    </div>
                    <RadioGroupItem value={plan.id} id={plan.id} className="sr-only" />
                    <div className={`flex h-6 w-6 items-center justify-center rounded-full ${
                      selectedPlan === plan.id
                        ? 'bg-primary text-primary-foreground'
                        : 'border border-primary/20'
                    }`}>
                      {selectedPlan === plan.id && <Check className="h-4 w-4" />}
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/{t('plan.month') || 'month'}</span>
                  </div>
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </Label>
            </div>
          ))}
        </RadioGroup>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="sm:mr-auto">
            {t('upgrade.cancel') || 'Cancel'}
          </Button>
          <Button onClick={handleSubscribe}>
            {t('upgrade.subscribe') || 'Subscribe Now'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PlanDialog;
