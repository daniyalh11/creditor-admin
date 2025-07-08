
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CalendarSettings = () => {
  const navigate = useNavigate();

  const handleGoToAdminCalendar = () => {
    navigate('/admin/calendar');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Calendar Settings" 
        description="Configure calendar and scheduling options"
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Calendar Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Configure calendar and scheduling options for your platform.</p>
          <div className="flex gap-2">
            <Button onClick={handleGoToAdminCalendar}>Go to Calendar Admin</Button>
            <Button variant="outline">Save Calendar Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarSettings;
