
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { ClipboardList, Check, Star, Zap } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const PlansSettings = () => {
  const [currentPlan, setCurrentPlan] = useState('pro');

  const handlePlanChange = (planId: string) => {
    setCurrentPlan(planId);
    toast({
      title: "Plan Updated",
      description: `Successfully switched to ${planId} plan.`
    });
  };

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '$29/month',
      icon: ClipboardList,
      features: [
        'Up to 100 users',
        '10 courses',
        'Basic reporting',
        'Email support',
        '5GB storage'
      ],
      current: currentPlan === 'basic'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$79/month',
      icon: Star,
      features: [
        'Up to 500 users',
        'Unlimited courses',
        'Advanced reporting',
        'Priority support',
        '50GB storage',
        'Custom branding'
      ],
      popular: true,
      current: currentPlan === 'pro'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199/month',
      icon: Zap,
      features: [
        'Unlimited users',
        'Unlimited courses',
        'Custom integrations',
        'Dedicated support',
        '200GB storage',
        'Advanced analytics',
        'API access'
      ],
      current: currentPlan === 'enterprise'
    }
  ];

  const usageStats = {
    users: { current: 245, limit: 500 },
    courses: { current: 23, limit: 'Unlimited' },
    storage: { current: '18.5GB', limit: '50GB' }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Plans Settings" 
        description="Manage subscription plans and billing"
        icon={<ClipboardList className="h-6 w-6 text-primary" />}
      />

      <Card>
        <CardHeader>
          <CardTitle>Current Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <h3 className="font-medium">Users</h3>
              <p className="text-2xl font-bold text-primary">{usageStats.users.current}</p>
              <p className="text-sm text-muted-foreground">of {usageStats.users.limit}</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium">Courses</h3>
              <p className="text-2xl font-bold text-primary">{usageStats.courses.current}</p>
              <p className="text-sm text-muted-foreground">{usageStats.courses.limit}</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium">Storage</h3>
              <p className="text-2xl font-bold text-primary">{usageStats.storage.current}</p>
              <p className="text-sm text-muted-foreground">of {usageStats.storage.limit}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.current ? 'ring-2 ring-primary' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}
            {plan.current && (
              <div className="absolute -top-3 right-4">
                <Badge variant="secondary">Current Plan</Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <plan.icon className="h-8 w-8 mx-auto text-primary mb-2" />
              <CardTitle>{plan.name}</CardTitle>
              <p className="text-2xl font-bold text-primary">{plan.price}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button 
                variant={plan.current ? "secondary" : "default"}
                className="w-full"
                onClick={() => handlePlanChange(plan.id)}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Next Billing Date</label>
              <p className="text-sm text-muted-foreground">January 15, 2024</p>
            </div>
            <div>
              <label className="text-sm font-medium">Payment Method</label>
              <p className="text-sm text-muted-foreground">**** **** **** 4532</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Update Payment Method</Button>
            <Button variant="outline">Download Invoice</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlansSettings;
