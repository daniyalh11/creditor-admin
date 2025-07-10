import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PageHeader } from '@/components/shared/PageHeader';
import { toast } from '@/hooks/use-toast';

const AdminSettings = () => {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully."
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Admin Settings" 
        description="Configure system settings and preferences"
      />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platformName">Platform Name</Label>
                <Input id="platformName" defaultValue="Creditor Academy" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supportEmail">Support Email</Label>
                <Input id="supportEmail" type="email" defaultValue="support@creditoracademy.com" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="maintenanceMode" />
                <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Content Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="enableComments" defaultChecked />
                <Label htmlFor="enableComments">Enable Comments</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="enableRatings" defaultChecked />
                <Label htmlFor="enableRatings">Enable Course Ratings</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="moderateContent" />
                <Label htmlFor="moderateContent">Moderate Content Before Publishing</Label>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <div className="flex items-center space-x-2">
                <Switch id="twoFactorAuth" defaultChecked />
                <Label htmlFor="twoFactorAuth">Require Two-Factor Authentication</Label>
              </div>
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input id="sessionTimeout" type="number" defaultValue="60" />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex gap-2">
                  <Input id="apiKey" type="password" defaultValue="sk_test_12345abcde" />
                  <Button variant="outline">Regenerate</Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input id="webhookUrl" defaultValue="https://api.creditoracademy.com/webhooks" />
              </div>
              <div className="p-3 bg-amber-50 text-amber-800 rounded-md text-sm">
                Warning: Changes to advanced settings may affect system functionality.
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Maintenance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">Clear Cache</Button>
                <Button variant="outline">Rebuild Index</Button>
                <Button variant="outline">Export System Logs</Button>
                <Button variant="outline">Database Backup</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
