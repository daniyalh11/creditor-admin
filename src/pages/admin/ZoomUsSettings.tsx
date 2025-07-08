
import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Video, X, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

const ZoomUsSettings = () => {
  const [activeTab, setActiveTab] = useState("summary");
  const [isConfigured, setIsConfigured] = useState(false);
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [accountId, setAccountId] = useState('');

  const handleConfigure = () => {
    setActiveTab("settings");
    toast({
      title: "Opening configuration",
      description: "Please fill in your Zoom API credentials."
    });
  };

  const handleSave = () => {
    if (!clientId.trim() || !clientSecret.trim() || !accountId.trim()) {
      toast({
        title: "Missing credentials",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setIsConfigured(true);
      setActiveTab("summary");
      toast({
        title: "Configuration saved",
        description: "ZoomUS API has been configured successfully!"
      });
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConfigured(false);
    setClientId('');
    setClientSecret('');
    setAccountId('');
    toast({
      title: "Disconnected",
      description: "ZoomUS API has been disconnected."
    });
  };

  const handleDismissAlert = () => {
    // Handle alert dismissal
    toast({
      title: "Alert dismissed",
      description: "Configuration reminder dismissed."
    });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="ZoomUS API" 
        description="Configure Zoom meeting integration settings"
        icon={<Video className="h-6 w-6 text-primary" />}
      />
      
      <Card className="border-t-0 rounded-t-none">
        <CardContent className="p-0">
          <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
            <div className="flex border-b">
              <TabsList className="h-12 p-0 bg-transparent w-full justify-start">
                {[
                  { value: 'summary', label: 'Summary' },
                  { value: 'settings', label: 'Settings' },
                ].map((tab) => (
                  <TabsTrigger 
                    key={tab.value} 
                    value={tab.value}
                    className="px-8 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary font-medium"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="summary" className="space-y-6 mt-0">
                <h2 className="text-xl font-medium">Status</h2>
                
                {isConfigured ? (
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <CheckCircle className="h-4 w-4" />
                    <div className="flex justify-between items-center w-full">
                      <AlertDescription className="text-base">
                        ZoomUS API is configured and ready to use
                      </AlertDescription>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={handleDisconnect}
                        className="text-green-800 hover:text-green-900"
                      >
                        Disconnect
                      </Button>
                    </div>
                  </Alert>
                ) : (
                  <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                    <div className="flex justify-between items-center w-full">
                      <AlertDescription className="text-base">
                        ZoomUS API is not currently configured
                      </AlertDescription>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={handleDismissAlert}
                        className="text-red-800 hover:text-red-900"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </Alert>
                )}
                
                <Button onClick={handleConfigure} className="flex items-center gap-2">
                  {isConfigured ? 'Reconfigure' : 'Configure'}
                </Button>
              </TabsContent>
              
              <TabsContent value="settings" className="space-y-6 mt-0">
                <h2 className="text-xl font-medium">ZoomUS API</h2>
                <p className="text-muted-foreground">Please enter the Client ID, Client secret and Account ID for Zoom.</p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientId">Client ID</Label>
                    <Input 
                      id="clientId" 
                      placeholder="Enter your Zoom Client ID"
                      value={clientId}
                      onChange={(e) => setClientId(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="clientSecret">Client secret</Label>
                    <Input 
                      id="clientSecret" 
                      type="password" 
                      placeholder="Enter your Client secret"
                      value={clientSecret}
                      onChange={(e) => setClientSecret(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="accountId">Account ID</Label>
                    <Input 
                      id="accountId" 
                      placeholder="Enter your Account ID"
                      value={accountId}
                      onChange={(e) => setAccountId(e.target.value)}
                    />
                  </div>
                  
                  <Button onClick={handleSave} className="mt-4">
                    Save
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZoomUsSettings;
