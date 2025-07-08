
import React from 'react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { Event } from './types';

interface WeekCalendarViewProps {
  currentDate: Date;
  events: Event[];
  onDayClick: (day: Date, dayEvents: Event[]) => void;
  onEventClick: (event: Event, e: React.MouseEvent) => void;
}

export const WeekCalendarView: React.FC<WeekCalendarViewProps> = ({
  currentDate,
  events,
  onDayClick,
  onEventClick
}) => {
  const daysInCurrentWeek = eachDayOfInterval({
    start: startOfWeek(currentDate, { weekStartsOn: 0 }),
    end: endOfWeek(currentDate, { weekStartsOn: 0 })
  });

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getEventsForHour = (day: Date, hour: number) => {
    return events.filter(event => {
      const startHour = event.startDate.getHours();
      const endHour = event.endDate.getHours();
      return isSameDay(event.startDate, day) && (startHour <= hour && hour <= endHour);
    });
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-8 border-b bg-muted/30">
        <div className="py-2 px-3 text-sm font-medium border-r">Time</div>
        {daysInCurrentWeek.map((day, i) => (
          <div 
            key={i} 
            className={cn(
              "py-2 text-center text-sm font-medium",
              isSameDay(day, new Date()) && "bg-blue-50"
            )}
          >
            <div className="font-semibold">{format(day, 'EEE')}</div>
            <div className={cn(
              "text-lg mt-1",
              isSameDay(day, new Date()) && "text-blue-600 bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mx-auto"
            )}>
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
      
      <div className="overflow-y-auto h-[500px]">
        {hours.map(hour => (
          <div key={hour} className="grid grid-cols-8 border-b min-h-[60px]">
            <div className="border-r py-1 px-3 text-xs text-muted-foreground">
              {hour === 0 ? '12am' : hour < 12 ? `${hour}am` : hour === 12 ? '12pm' : `${hour-12}pm`}
            </div>
            
            {daysInCurrentWeek.map((day, dayIndex) => {
              const hourEvents = getEventsForHour(day, hour);
              
              return (
                <div 
                  key={dayIndex} 
                  className={cn(
                    "border-r relative",
                    isSameDay(day, new Date()) && "bg-blue-50/50"
                  )}
                  onClick={() => {
                    const dateWithHour = new Date(day);
                    dateWithHour.setHours(hour);
                    onDayClick(dateWithHour, hourEvents);
                  }}
                >
                  {hourEvents.map((event, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "text-xs p-1 rounded truncate absolute z-10 left-0 right-0 mx-1 cursor-pointer",
                        event.startDate.getHours() === hour ? "top-0" : "top-0",
                        event.webConferencing === 'zoom' 
                          ? "bg-blue-100 text-blue-800 border-l-4 border-blue-500" 
                          : "bg-green-100 text-green-800 border-l-4 border-green-500"
                      )}
                      onClick={(e) => onEventClick(event, e)}
                    >
                      {event.startDate.getHours() === hour && (
                        <>
                          <span className="font-semibold">
                            {format(event.startDate, 'h:mma')}
                          </span> - {event.title}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
