
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PageHeader } from '@/components/shared/PageHeader';
import { Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AccountsSettings = () => {
  const handleSave = () => {
    toast({
      title: "Account settings saved",
      description: "Your account settings have been updated successfully."
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Accounts Settings" 
        description="Configure user account settings and authentication"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Authentication Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="allowSelfRegistration">Self Registration</Label>
              <p className="text-sm text-muted-foreground">Allow users to create their own accounts</p>
            </div>
            <Switch id="allowSelfRegistration" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="requireEmailVerification">Email Verification</Label>
              <p className="text-sm text-muted-foreground">Require email verification for new accounts</p>
            </div>
            <Switch id="requireEmailVerification" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="allowPasswordReset">Password Reset</Label>
              <p className="text-sm text-muted-foreground">Allow users to reset their passwords</p>
            </div>
            <Switch id="allowPasswordReset" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passwordPolicy">Password Policy</Label>
            <select
              id="passwordPolicy"
              className="w-full p-2 border rounded-md"
              defaultValue="strong"
            >
              <option value="basic">Basic (8+ characters)</option>
              <option value="medium">Medium (8+ chars with numbers)</option>
              <option value="strong">Strong (8+ chars with numbers and symbols)</option>
            </select>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Single Sign-On (SSO)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ssoProvider">SSO Provider</Label>
            <select
              id="ssoProvider"
              className="w-full p-2 border rounded-md"
            >
              <option value="none">None</option>
              <option value="google">Google</option>
              <option value="microsoft">Microsoft</option>
              <option value="okta">Okta</option>
              <option value="custom">Custom</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ssoClientId">Client ID</Label>
            <Input id="ssoClientId" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ssoClientSecret">Client Secret</Label>
            <Input id="ssoClientSecret" type="password" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="ssoRedirectUri">Redirect URI</Label>
            <Input id="ssoRedirectUri" defaultValue="https://creditoracademy.com/auth/callback" />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>Save SSO Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountsSettings;
