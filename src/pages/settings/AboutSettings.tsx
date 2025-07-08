
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Info } from 'lucide-react';

const AboutSettings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="About" 
        description="Information about the Creditor Academy platform"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Platform Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Version</p>
            <p className="font-medium">Creditor Academy v3.2.1</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Last Updated</p>
            <p className="font-medium">April 28, 2025</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">License</p>
            <p className="font-medium">Enterprise License</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Support</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Get help with Creditor Academy:</p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1">Documentation</Button>
            <Button variant="outline" className="flex-1">Contact Support</Button>
            <Button variant="outline" className="flex-1">Report a Bug</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Server Environment</p>
              <p className="font-medium">Production</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Database</p>
              <p className="font-medium">PostgreSQL 14.3</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Storage</p>
              <p className="font-medium">S3 Compatible</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Uptime</p>
              <p className="font-medium">99.98%</p>
            </div>
          </div>
          <div className="mt-4">
            <Button variant="outline">System Health Check</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutSettings;
