import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';

const CourseSettings = () => {
  const [activeTab, setActiveTab] = useState('settings');

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Course Settings" 
        description="Configure course defaults and display options"
      />
      
      <div className="bg-white border-b">
        <Tabs value={activeTab} className="p-1" onValueChange={setActiveTab}>
          <TabsList className="h-12 p-0 bg-transparent w-full justify-start gap-1 overflow-x-auto">
            <TabsTrigger 
              value="settings"
              className={cn(
                "px-6 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium",
              )}
            >
              Settings
            </TabsTrigger>
            <TabsTrigger 
              value="fields"
              className={cn(
                "px-6 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium",
              )}
            >
              Fields
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="p-4 bg-white rounded-lg border">
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Default course settings</h2>
              <p className="mb-2">Every course starts with a foundation — make it count! 🌱</p>
              <p className="mb-4">You're currently using: <span className="font-medium text-primary">Sovereignty, Law, and Personal Freedom in the United States</span> as the default.</p>
              <p className="mb-6">Want a fresh start? Tap Edit to make changes or Clear to reset. Let's build something meaningful! 💡💙</p>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center border-blue-600 text-blue-600 hover:bg-blue-50">
                  <Pencil className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-50">Clear</Button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'fields' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium mb-4">Custom fields</h2>
              <p className="mb-2">No custom fields yet — it's a blank canvas! 🎨</p>
              <p className="mb-4">Add unique attributes to your courses by clicking ➕ Add.</p>
              <p className="mb-6">Whether it's a custom tag, difficulty level, or theme — you're in control of the magic. ✨🚀</p>
              
              <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4" /> Add
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseSettings;