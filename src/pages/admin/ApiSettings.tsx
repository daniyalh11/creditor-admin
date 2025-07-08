
import React from 'react';
import { Cpu, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ApiSettings = () => {
  const apiKeys = [
    {
      name: "API 3",
      version: "3.0",
      created: "Mar 24, 2025, 7:33 am",
      expires: "Never",
      calls: 0,
      errors: 0
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="API Settings" 
        description="Manage API keys and integration settings"
      />

      <div className="flex justify-end">
        <Button variant="outline" className="mr-4">API 3.0 reference guide</Button>
      </div>

      <Tabs defaultValue="api-keys" className="w-full">
        <TabsList>
          <TabsTrigger value="api-keys">API keys</TabsTrigger>
          <TabsTrigger value="oauth">OAuth</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="logs">API Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="api-keys" className="space-y-4 pt-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">API Keys</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate New Key
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Name</th>
                    <th className="text-left p-4">Version</th>
                    <th className="text-left p-4">Created</th>
                    <th className="text-left p-4">Expires</th>
                    <th className="text-left p-4">Calls</th>
                    <th className="text-left p-4">Errors</th>
                    <th className="p-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-4">{key.name}</td>
                      <td className="p-4">{key.version}</td>
                      <td className="p-4">{key.created}</td>
                      <td className="p-4">{key.expires}</td>
                      <td className="p-4">{key.calls}</td>
                      <td className="p-4">{key.errors}</td>
                      <td className="p-4 text-right">
                        <Button variant="outline" size="sm">Manage</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="oauth" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>OAuth Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                OAuth settings allow third-party applications to access your Creditor Academy data with user permission.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Configure webhooks to receive notifications when events occur in your Creditor Academy instance.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View and analyze API usage and error logs.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ApiSettings;
