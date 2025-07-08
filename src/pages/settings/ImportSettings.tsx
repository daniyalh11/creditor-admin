
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Upload } from 'lucide-react';

const ImportSettings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Import Settings" 
        description="Configure data import options and formats"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Import Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Configure data import options and formats.</p>
          <Button>Import Data</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportSettings;
