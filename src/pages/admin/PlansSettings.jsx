import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ClipboardList, Link as LinkIcon } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from '@/components/ui/table';

const PlansSettings = () => {
  const [activeTab, setActiveTab] = useState('status');

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader
        title="Plans"
        description="Manage subscription plans and monitor active users"
        icon={<ClipboardList className="h-6 w-6 text-primary" />}
      />

      <div className="grid grid-cols-1 gap-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <div className="border-b">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center px-4 bg-white">
                <TabsList className="bg-transparent h-12 p-0 w-full justify-start">
                  <TabsTrigger
                    value="status"
                    className="px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
                  >
                    Status
                  </TabsTrigger>
                  <TabsTrigger
                    value="active-learners"
                    className="px-6 py-3 rounded-full data-[state=active]:bg-primary data-[state=active]:text-white font-medium"
                  >
                    Active learners
                  </TabsTrigger>
                </TabsList>
              </div>
            </Tabs>
          </div>

          {activeTab === 'status' && (
            <div className="p-6 space-y-6">
              {/* Content for Status Tab (omitted for brevity, same as original) */}
              {/* Paste the full JSX of the status tab here if needed */}
            </div>
          )}

          {activeTab === 'active-learners' && (
            <div className="p-6 space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/3">Period</TableHead>
                    <TableHead className="w-1/3 text-center">Count</TableHead>
                    <TableHead className="w-1/3 text-right">Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Current</TableCell>
                    <TableCell className="text-center">290</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="icon">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          )}

          <div className="text-sm text-gray-500 flex justify-between items-center p-4 border-t">
            <div>Contact</div>
            <div>Powered by CYPHER Learning</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansSettings;
