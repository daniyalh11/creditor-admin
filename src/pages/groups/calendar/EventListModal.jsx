import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const EventListModal = ({
  selectedDate,
  eventsForSelectedDay,
  onSelectEvent,
  onCreateNew
}) => {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-2">
        {selectedDate && `Events for ${format(selectedDate, 'MMMM d, yyyy')}`}
      </div>

      {eventsForSelectedDay.map((event) => (
        <div 
          key={event.id} 
          className={cn(
            "p-3 border rounded-md cursor-pointer hover:bg-gray-50",
            event.webConferencing === 'zoom' 
              ? "border-l-4 border-blue-500" 
              : "border-l-4 border-green-500"
          )}
          onClick={() => onSelectEvent(event)}
        >
          <div className="font-medium">{event.title}</div>
          <div className="text-sm text-muted-foreground">
            {format(event.startDate, 'h:mm a')} - {format(event.endDate, 'h:mm a')}
          </div>
        </div>
      ))}

      <Button 
        className="w-full mt-4 flex items-center gap-2" 
        onClick={onCreateNew}
      >
        <Plus className="h-4 w-4" />
        Add New Event
      </Button>
    </div>
  );
};
