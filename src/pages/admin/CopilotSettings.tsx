
import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CopilotSummary } from '@/components/admin/copilot/CopilotSummary';
import { CopilotQuotas } from '@/components/admin/copilot/CopilotQuotas';
import { CopilotTasks } from '@/components/admin/copilot/CopilotTasks';
import { CopilotUsers } from '@/components/admin/copilot/CopilotUsers';
import { CopilotHistory } from '@/components/admin/copilot/CopilotHistory';

const CopilotSettings = () => {
  const [activeTab, setActiveTab] = useState('summary');

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Copilot" 
        description="Configure AI assistant settings and usage"
      />
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
        >
          <div className="border-b border-gray-200">
            <div className="overflow-x-auto">
              <TabsList className="bg-transparent h-auto p-0 flex w-full">
                <TabsTrigger 
                  value="summary" 
                  className="py-4 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none font-medium whitespace-nowrap"
                >
                  Summary
                </TabsTrigger>
                <TabsTrigger 
                  value="quotas" 
                  className="py-4 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none font-medium whitespace-nowrap"
                >
                  Quotas
                </TabsTrigger>
                <TabsTrigger 
                  value="tasks" 
                  className="py-4 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none font-medium whitespace-nowrap"
                >
                  Tasks
                </TabsTrigger>
                <TabsTrigger 
                  value="users" 
                  className="py-4 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none font-medium whitespace-nowrap"
                >
                  Users
                </TabsTrigger>
                <TabsTrigger 
                  value="history" 
                  className="py-4 px-6 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:shadow-none font-medium whitespace-nowrap"
                >
                  History
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div>
            <TabsContent value="summary" className="m-0">
              <CopilotSummary />
            </TabsContent>
            <TabsContent value="quotas" className="m-0">
              <CopilotQuotas />
            </TabsContent>
            <TabsContent value="tasks" className="m-0">
              <CopilotTasks />
            </TabsContent>
            <TabsContent value="users" className="m-0">
              <CopilotUsers />
            </TabsContent>
            <TabsContent value="history" className="m-0">
              <CopilotHistory />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      
      <div className="text-sm text-gray-500 flex justify-between items-center mt-6 px-4">
        <div>Contact</div>
        <div>Powered by CYPHER Learning</div>
      </div>
    </div>
  );
};

export default CopilotSettings;
