
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { format, addMonths, subMonths, isSameDay, getDay, isToday, addDays } from 'date-fns';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Mock event data with more details for agenda view
const events = [
  {
    id: 1,
    title: "Sovereignty 101",
    time: "2pm",
    color: "blue",
    days: [
      new Date(2025, 4, 5), new Date(2025, 4, 6), new Date(2025, 4, 7),
      new Date(2025, 4, 12), new Date(2025, 4, 13), new Date(2025, 4, 14),
      new Date(2025, 4, 19), new Date(2025, 4, 20), new Date(2025, 4, 21),
      new Date(2025, 4, 26), new Date(2025, 4, 27), new Date(2025, 4, 28),
    ]
  },
  {
    id: 2,
    title: "Sovereignty 101",
    time: "10am",
    color: "red",
    days: [
      new Date(2025, 4, 6), new Date(2025, 4, 7), new Date(2025, 4, 8),
      new Date(2025, 4, 13), new Date(2025, 4, 14), new Date(2025, 4, 15),
      new Date(2025, 4, 20), new Date(2025, 4, 21), new Date(2025, 4, 22),
      new Date(2025, 4, 27), new Date(2025, 4, 28), new Date(2025, 4, 29),
    ]
  }
];

const CalendarSettings = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(today);
  const [view, setView] = useState<'month' | 'week' | 'agenda'>('agenda');
  
  const handlePreviousMonth = () => {
    setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  // Generate days for the month view
  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const startingDayOfWeek = firstDay.getDay(); // 0-6, 0 is Sunday
    const totalDays = lastDay.getDate();
    
    const previousMonthLastDay = new Date(year, month, 0).getDate();
    
    const days = [];
    
    // Add days from previous month
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, previousMonthLastDay - i),
        isCurrentMonth: false,
      });
    }
    
    // Add days from current month
    for (let i = 1; i <= totalDays; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }
    
    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows of 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }
    
    return days;
  };
  
  // Get events for a specific day
  const getEventsForDay = (day: Date) => {
    return events.filter(event => 
      event.days.some(eventDay => isSameDay(eventDay, day))
    );
  };
  
  // Format date for display
  const formatDay = (date: Date) => {
    return format(date, 'd');
  };
  
  const days = getDaysInMonth();

  // Get events for next 7 days for agenda view
  const getAgendaEvents = () => {
    const agendaDates = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(selectedDate || today, i);
      const eventsForDay = getEventsForDay(date);
      if (eventsForDay.length > 0 || i === 0) { // Always include current day
        agendaDates.push({
          date,
          events: eventsForDay
        });
      }
    }
    return agendaDates;
  };

  const agendaDates = getAgendaEvents();

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Admin" 
        description="Calendar"
      />

      <div className="flex gap-6 h-[calc(100vh-220px)]">
        {/* Left sidebar with navigation */}
        <div className="w-64 hidden md:block">
          <Card className="p-4">
            <div className="space-y-2">
              <Button onClick={handleToday} variant="outline" className="w-full">
                Today
              </Button>
              
              <div className="flex gap-2">
                <Button onClick={() => setView('week')} variant={view === 'week' ? "default" : "outline"} className="flex-1">
                  Week
                </Button>
                <Button onClick={() => setView('month')} variant={view === 'month' ? "default" : "outline"} className="flex-1">
                  Month
                </Button>
                <Button onClick={() => setView('agenda')} variant={view === 'agenda' ? "default" : "outline"} className="flex-1">
                  Agenda
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Calendar Panel */}
        <div className="flex-grow bg-white rounded-lg shadow-sm overflow-hidden border">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleToday}>
                Today
              </Button>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={handlePreviousMonth}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              <h2 className="text-lg font-semibold">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
            </div>

            <div className="flex items-center bg-gray-100 rounded-md p-1">
              <Button 
                variant={view === 'week' ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView('week')}
                className="rounded-md"
              >
                Week
              </Button>
              <Button 
                variant={view === 'month' ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView('month')}
                className="rounded-md"
              >
                Month
              </Button>
              <Button 
                variant={view === 'agenda' ? "default" : "ghost"} 
                size="sm" 
                onClick={() => setView('agenda')}
                className="rounded-md"
              >
                Agenda
              </Button>
            </div>
          </div>

          {view === 'month' && (
            <div className="flex-grow">
              <div className="grid grid-cols-7 text-center py-2 border-b">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
                  <div key={day} className="text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 h-[calc(100%-40px)]">
                {days.map((day, index) => {
                  const dayEvents = getEventsForDay(day.date);
                  const isCurrentDay = isToday(day.date);
                  const isSelected = selectedDate && isSameDay(day.date, selectedDate);
                  
                  return (
                    <div 
                      key={index}
                      onClick={() => setSelectedDate(day.date)}
                      className={cn(
                        "border-r border-b p-1 min-h-[100px] relative",
                        !day.isCurrentMonth && "bg-gray-50",
                        isSelected && "ring-2 ring-inset ring-blue-500",
                        (index + 1) % 7 === 0 && "border-r-0" // no right border on last column
                      )}
                    >
                      {/* Day number */}
                      <div 
                        className={cn(
                          "h-7 w-7 flex items-center justify-center text-sm rounded-full mb-1",
                          isCurrentDay && "bg-blue-500 text-white",
                          !day.isCurrentMonth && "text-gray-400"
                        )}
                      >
                        {formatDay(day.date)}
                      </div>
                      
                      {/* Events */}
                      <div className="space-y-1">
                        {dayEvents.map((event, eventIndex) => (
                          <div 
                            key={`${event.id}-${eventIndex}`}
                            className={cn(
                              "text-xs p-1 rounded-sm truncate",
                              event.color === 'red' 
                                ? "border-l-4 border-red-500 bg-red-50" 
                                : "border-l-4 border-blue-500 bg-blue-50"
                            )}
                          >
                            <span className="font-medium">{event.time}</span> {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {view === 'week' && (
            <div className="p-8 text-center">
              <p>Week view is coming soon.</p>
            </div>
          )}
          
          {view === 'agenda' && (
            <div className="overflow-y-auto h-[calc(100%-60px)]">
              {agendaDates.map((agendaItem, index) => {
                const dayName = format(agendaItem.date, 'EEE');
                const dayNumber = format(agendaItem.date, 'd');
                const isCurrentDay = isToday(agendaItem.date);
                
                return (
                  <div key={index} className="border-b last:border-b-0">
                    <div className="p-4">
                      <div className="flex gap-2 items-center mb-2">
                        <h3 className={cn(
                          "text-lg font-semibold",
                          isCurrentDay && "text-blue-600"
                        )}>
                          {dayName} {dayName === 'Sun' ? 'May' : ''} {dayNumber}
                        </h3>
                        {isCurrentDay && <span className="text-sm text-gray-500">today</span>}
                      </div>
                      
                      {/* If no events, show "Nothing going on today" message */}
                      {agendaItem.events.length === 0 ? (
                        <div className="text-gray-500 py-2">Nothing going on today</div>
                      ) : (
                        <div className="space-y-3">
                          {agendaItem.events.map((event, eventIndex) => (
                            <div key={`${event.id}-${eventIndex}`} className="ml-2">
                              <div className="text-gray-500">{event.time}</div>
                              <div 
                                className={cn(
                                  "p-3 rounded-sm border-l-4 my-1",
                                  event.color === 'red' 
                                    ? "border-red-500 bg-red-50" 
                                    : "border-blue-500 bg-blue-50"
                                )}
                              >
                                {event.title}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="w-64 flex flex-col space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium">Calendar</h3>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="h-7 w-7 p-0" onClick={handlePreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h4 className="text-sm font-medium">May 2025</h4>
                <Button variant="ghost" size="icon" className="h-7 w-7 p-0" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Mini calendar */}
            <div className="grid grid-cols-7 text-center gap-1">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                <div key={day} className="text-xs">
                  {day}
                </div>
              ))}
              
              {days.map((day, index) => {
                const hasEvents = getEventsForDay(day.date).length > 0;
                const isCurrentDay = isToday(day.date);
                const isSelected = isSameDay(day.date, selectedDate || new Date());
                
                return (
                  <div 
                    key={index}
                    onClick={() => setSelectedDate(day.date)}
                    className={cn(
                      "text-xs h-6 w-6 flex items-center justify-center rounded-full cursor-pointer",
                      !day.isCurrentMonth && "text-gray-400",
                      isSelected && !isCurrentDay && "bg-gray-200",
                      isCurrentDay && "bg-blue-500 text-white",
                      hasEvents && !isCurrentDay && !isSelected && "font-bold"
                    )}
                  >
                    {formatDay(day.date)}
                  </div>
                );
              })}
            </div>
          </Card>
          
          <Card className="p-4 flex-grow">
            <h3 className="text-lg font-medium mb-2">Upcoming Events</h3>
            <div className="space-y-2">
              {events.slice(0, 3).map((event, index) => (
                <div 
                  key={index}
                  className={cn(
                    "p-2 text-xs rounded-sm", 
                    event.color === 'red' 
                      ? "border-l-4 border-red-500 bg-red-50" 
                      : "border-l-4 border-blue-500 bg-blue-50"
                  )}
                >
                  <div className="font-medium">{event.title}</div>
                  <div className="text-gray-500">{event.time} - {format(event.days[0], 'MMM d, yyyy')}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CalendarSettings;
