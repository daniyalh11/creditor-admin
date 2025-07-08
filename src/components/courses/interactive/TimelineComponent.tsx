
import React from 'react';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
}

interface TimelineContentType {
  events: TimelineEvent[];
}

interface TimelineComponentProps {
  content: TimelineContentType;
}

export const TimelineComponent: React.FC<TimelineComponentProps> = ({ content }) => {
  if (!content || !content.events || content.events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
        <p>No timeline events added yet. Click edit to add events.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-px bg-gray-300"></div>
      
      <div className="space-y-6">
        {content.events.map((event, index) => (
          <div key={event.id} className="relative flex items-start gap-6">
            {/* Timeline dot */}
            <div className="relative z-10 w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg flex-shrink-0 mt-1"></div>
            
            {/* Event content */}
            <div className="flex-1 pb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-medium text-blue-600">{event.date}</span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{event.title}</h4>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
