import React from 'react';
import { Activity } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const ActivitySettings = () => {
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Activity display settings updated successfully."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 animate-fade-in">
          <PageHeader 
            title="Activity Display Settings" 
            description="Configure activity indicators and display options"
          />

          <div className="space-y-8">
            <Card className="bg-white shadow-sm border border-gray-200 rounded-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">General Activity Display</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="home-enrolled" className="text-sm font-medium text-gray-700">
                      Display animated activity indicators on tiles in Home/Enrolled
                    </Label>
                    <Switch id="home-enrolled" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="home-teaching" className="text-sm font-medium text-gray-700">
                      Display animated activity indicators on tiles in Home/Teaching
                    </Label>
                    <Switch id="home-teaching" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="home-groups" className="text-sm font-medium text-gray-700">
                      Display animated activity indicators on tiles in Home/Groups
                    </Label>
                    <Switch id="home-groups" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200 rounded-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-gray-600">
                  Note that even if the activity widget is enabled for all courses, they can still be disabled individually.
                </p>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="instructor-view" className="text-sm font-medium text-gray-700">
                      Enable the activity widget in the instructor view of all courses
                    </Label>
                    <Switch id="instructor-view" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="learner-view" className="text-sm font-medium text-gray-700">
                      Enable the activity widget in the learner view of all courses
                    </Label>
                    <Switch id="learner-view" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-sm border border-gray-200 rounded-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-gray-900">Groups</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-gray-600">
                  Note that even if the activity widget is enabled for all groups, they can still be disabled individually.
                </p>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <Label htmlFor="all-groups" className="text-sm font-medium text-gray-700">
                      Enable the activity widget in all groups
                    </Label>
                    <Switch id="all-groups" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySettings;
