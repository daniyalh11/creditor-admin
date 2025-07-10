import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

/**
 * @typedef {object} TabSection
 * @property {string} id - Unique identifier for the tab.
 * @property {string} title - The title displayed on the tab trigger.
 * @property {string} content - The text content inside the tab panel.
 */

/**
 * @typedef {object} TabsContentType
 * @property {TabSection[]} tabs - An array of tab section objects.
 */

/**
 * A component that renders a set of selectable tabs.
 *
 * @param {object} props
 * @param {TabsContentType} props.content - The data for the tabs.
 */
export const TabsComponent = ({ content }) => {
  if (!content || !content.tabs || content.tabs.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
        <p>No tabs added yet. Click edit to add tabs.</p>
      </div>
    );
  }

  // Ensure there's at least one tab before accessing it for defaultValue
  const defaultValue = content.tabs[0]?.id;

  return (
    <Tabs defaultValue={defaultValue} className="w-full">
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
