
import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';

const Settings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Settings" 
        description="Manage your application settings"
      />

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-ca-primary" />
              General Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Platform Name</Label>
              <Input id="siteName" defaultValue="Creditor Academy" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteUrl">Platform URL</Label>
              <Input id="siteUrl" defaultValue="https://creditoracademy.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supportEmail">Support Email</Label>
              <Input id="supportEmail" type="email" defaultValue="support@creditoracademy.com" />
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Email Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input id="fromEmail" type="email" defaultValue="no-reply@creditoracademy.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emailFooter">Email Footer Text</Label>
              <Input id="emailFooter" defaultValue="© 2025 Creditor Academy. All rights reserved." />
            </div>
            <Button>Update Email Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
