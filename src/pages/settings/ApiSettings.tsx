import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/shared/PageHeader';
import { TerminalSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ApiSettings = () => {
  const handleSave = () => {
    toast({
      title: "API Settings saved",
      description: "Your API settings have been saved successfully."
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="API Settings" 
        description="Configure your API access and integration"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TerminalSquare className="h-5 w-5" />
            API Configuration
          </CardTitle>
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
            <Label htmlFor="apiEndpoint">API Endpoint URL</Label>
            <Input id="apiEndpoint" defaultValue="https://api.creditoracademy.com/v1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="apiVersion">API Version</Label>
            <select
              id="apiVersion"
              className="w-full p-2 border rounded-md"
              defaultValue="v1"
            >
              <option value="v1">v1 (Current)</option>
              <option value="v2-beta">v2 (Beta)</option>
              <option value="v3-alpha">v3 (Alpha)</option>
            </select>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Documentation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Access our comprehensive API documentation to integrate with Creditor Academy:</p>
          <Button variant="outline" className="w-full sm:w-auto">
            Open API Documentation
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Total Requests (This Month)</span>
              <span className="font-medium">2,345</span>
            </div>
            <div className="flex justify-between">
              <span>Request Limit</span>
              <span className="font-medium">10,000</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '23.45%' }}></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiSettings;
