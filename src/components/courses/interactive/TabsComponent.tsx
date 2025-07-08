
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TabSection {
  id: string;
  title: string;
  content: string;
}

interface TabsContentType {
  tabs: TabSection[];
}

interface TabsComponentProps {
  content: TabsContentType;
}

export const TabsComponent: React.FC<TabsComponentProps> = ({ content }) => {
  if (!content || !content.tabs || content.tabs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
        <p>No tabs added yet. Click edit to add tabs.</p>
      </div>
    );
  }

  return (
    <Tabs defaultValue={content.tabs[0]?.id} className="w-full">
      <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${content.tabs.length}, 1fr)` }}>
        {content.tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {content.tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id} className="mt-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-gray-700 whitespace-pre-wrap">{tab.content}</div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};
