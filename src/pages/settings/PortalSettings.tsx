
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Globe } from 'lucide-react';

const PortalSettings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Portal Settings" 
        description="Configure portal appearance and behavior"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Portal Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Configure portal appearance, behavior and access options.</p>
          <Button>Save Portal Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalSettings;
