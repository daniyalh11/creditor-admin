import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/shared/PageHeader';
import { Workflow, Settings, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const AutomationSettings = () => {
  const navigate = useNavigate();
  const [automationRules, setAutomationRules] = useState({
    autoEnrollUsers: true,
    sendAlerts: false,
    scheduleExports: true,
    autoGrading: false,
    emailNotifications: true,
    courseReminders: true
  });

  const handleToggle = (rule) => {
    setAutomationRules((prev) => ({
      ...prev,
      [rule]: !prev[rule]
    }));
    toast({
      title: "Automation Updated",
      description: `${rule} has been ${automationRules[rule] ? 'disabled' : 'enabled'}.`
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Automation Settings" 
        description="Configure automated workflows and triggers"
        icon={<Workflow className="h-6 w-6 text-primary" />}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Automation Rules
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-enroll">Auto-enroll users</Label>
                <p className="text-sm text-muted-foreground">Automatically enroll new users in default courses</p>
              </div>
              <Switch
                id="auto-enroll"
                checked={automationRules.autoEnrollUsers}
                onCheckedChange={() => handleToggle('autoEnrollUsers')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="send-alerts">Send alerts</Label>
                <p className="text-sm text-muted-foreground">Send automated alerts for system events</p>
              </div>
              <Switch
                id="send-alerts"
                checked={automationRules.sendAlerts}
                onCheckedChange={() => handleToggle('sendAlerts')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="schedule-exports">Schedule exports</Label>
                <p className="text-sm text-muted-foreground">Automatically export data at scheduled intervals</p>
              </div>
              <Switch
                id="schedule-exports"
                checked={automationRules.scheduleExports}
                onCheckedChange={() => handleToggle('scheduleExports')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-grading">Auto-grading</Label>
                <p className="text-sm text-muted-foreground">Automatically grade assessments when possible</p>
              </div>
              <Switch
                id="auto-grading"
                checked={automationRules.autoGrading}
                onCheckedChange={() => handleToggle('autoGrading')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Email notifications</Label>
                <p className="text-sm text-muted-foreground">Send automated email notifications</p>
              </div>
              <Switch
                id="email-notifications"
                checked={automationRules.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="course-reminders">Course reminders</Label>
                <p className="text-sm text-muted-foreground">Send reminders for upcoming course deadlines</p>
              </div>
              <Switch
                id="course-reminders"
                checked={automationRules.courseReminders}
                onCheckedChange={() => handleToggle('courseReminders')}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button
              onClick={() => navigate('/admin/automation')}
              variant="default"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Rule
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationSettings;
