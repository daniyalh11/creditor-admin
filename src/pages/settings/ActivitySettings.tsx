
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/shared/PageHeader';
import { Activity } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ActivitySettings = () => {
  const handleSave = () => {
    toast({
      title: "Activity display settings saved",
      description: "Your activity display settings have been saved successfully."
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Activity Display Settings" 
        description="Configure how activities are displayed across the platform"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Activity Feed Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="showDashboard">Show on Dashboard</Label>
              <p className="text-sm text-muted-foreground">Display activity feed on user dashboards</p>
            </div>
            <Switch id="showDashboard" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="showUserActivity">Show User Activity</Label>
              <p className="text-sm text-muted-foreground">Show individual user activities</p>
            </div>
            <Switch id="showUserActivity" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base" htmlFor="showGroupActivity">Show Group Activity</Label>
              <p className="text-sm text-muted-foreground">Show group-related activities</p>
            </div>
            <Switch id="showGroupActivity" defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activityRetention">Activity Retention Period</Label>
            <select
              id="activityRetention"
              className="w-full p-2 border rounded-md"
              defaultValue="30"
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="60">60 days</option>
              <option value="90">90 days</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitySettings;
