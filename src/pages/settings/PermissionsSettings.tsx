
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Lock } from 'lucide-react';

const PermissionsSettings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Permissions Settings" 
        description="Configure user roles and permissions"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Permissions Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Configure user roles and permissions across the platform.</p>
          <Button>Save Permission Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PermissionsSettings;
