
import React from 'react';
import { format, eachDayOfInterval, startOfMonth, endOfMonth, isSameMonth, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Event } from './types';

interface MonthCalendarViewProps {
  currentDate: Date;
  events: Event[];
  onDayClick: (day: Date, dayEvents: Event[]) => void;
  onEventClick: (event: Event, e: React.MouseEvent) => void;
}

export const MonthCalendarView: React.FC<MonthCalendarViewProps> = ({
  currentDate,
  events,
  onDayClick,
  onEventClick
}) => {
  const daysInCurrentMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const getEventsForDay = (day: Date) => {
    return events.filter(event => isSameDay(event.startDate, day));
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="grid grid-cols-7 gap-1">
      {daysOfWeek.map(day => (
        <div key={day} className="text-center py-2 font-medium text-sm border-b">
          {day}
        </div>
      ))}
      
      {daysInCurrentMonth.map((day, index) => {
        const dayEvents = getEventsForDay(day);
        const isToday = isSameDay(day, new Date());
        const isCurrentMonth = isSameMonth(day, currentDate);
        
        return (
          <div 
            key={index} 
            className={cn(
              "min-h-[80px] p-1 border text-sm cursor-pointer",
              isToday ? "bg-blue-50" : "hover:bg-gray-50",
              !isCurrentMonth && "opacity-50"
            )}
            onClick={() => onDayClick(day, dayEvents)}
          >
            <div className={cn(
              "font-medium mb-1", 
              isToday ? "text-blue-600 bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center mx-auto" : ""
            )}>
              {format(day, 'd')}
            </div>
            {dayEvents.length > 0 && (
              <div className="space-y-1">
                {dayEvents.map((event, idx) => (
                  <div 
                    key={idx} 
                    className={cn(
                      "text-xs p-1 rounded truncate group relative",
                      event.webConferencing === 'zoom' 
                        ? "bg-blue-100 text-blue-800 border-l-4 border-blue-500" 
                        : "bg-green-100 text-green-800 border-l-4 border-green-500"
                    )}
                    title={event.title}
                    onClick={(e) => onEventClick(event, e)}
                  >
                    {event.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
