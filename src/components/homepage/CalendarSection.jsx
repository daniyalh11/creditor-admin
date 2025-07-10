import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, startOfWeek, endOfWeek } from 'date-fns';

const events = [
  {
    id: 1,
    title: 'Legal Research Workshop',
    date: new Date(2025, 4, 20),
    status: 'ongoing',
  },
  {
    id: 2,
    title: 'Mock Trial Preparation',
    date: new Date(2025, 4, 22),
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Case Study Submission',
    date: new Date(2025, 4, 24),
    status: 'upcoming',
  },
];

export function CalendarSection() {
  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleCalendarAdminClick = () => {
    navigate('/admin/calendar');
    setOpen(false);
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setDate(today);
  };
  
  // Get events for the selected date
  const selectedDateEvents = events.filter(
    event => date && 
    event.date.getDate() === date.getDate() &&
    event.date.getMonth() === date.getMonth() &&
    event.date.getFullYear() === date.getFullYear()
  );

  // Get events for current month to highlight dates
  const monthEvents = events.filter(
    event => event.date.getMonth() === currentMonth.getMonth() &&
    event.date.getFullYear() === currentMonth.getFullYear()
  );

  const eventDates = monthEvents.map(event => event.date);

  // Get calendar days
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const handleDateClick = (clickedDate) => {
    setDate(clickedDate);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-ca-primary" />
            Your Calendar
          </CardTitle>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-ca-primary flex items-center">
                View All <span className="ml-1">→</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Calendar Management</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Events for {date?.toLocaleDateString()}</h3>
                  
                  {selectedDateEvents.length > 0 ? (
                    selectedDateEvents.map(event => (
                      <div key={event.id} className="p-3 border rounded-md">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{event.title}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            event.status === 'ongoing' ? 'bg-green-100 text-green-800' : 
                            event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-500">No events for this date</p>
                  )}
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button onClick={handleCalendarAdminClick}>
                    Open Calendar Admin
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Calendar Header with Navigation */}
          <div className="flex items-center justify-between">
            <h3 className="text-base font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </h3>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePreviousMonth}
                className="h-8 w-8 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToday}
                className="text-xs px-2"
              >
                Today
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNextMonth}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Main Calendar Grid */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Day Headers */}
            <div className="grid grid-cols-7 border-b border-gray-200">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => {
                const dayEvents = getEventsForDate(day);
                const isCurrentMonth = isSameMonth(day, currentMonth);
                const isTodayDate = isToday(day);
                const isSelected = date && day.toDateString() === date.toDateString();
                
                return (
                  <div
                    key={day.toISOString()}
                    className={`min-h-[60px] p-2 border-r border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      !isCurrentMonth ? 'bg-gray-50' : ''
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    <div className={`text-sm mb-1 flex justify-center ${
                      !isCurrentMonth 
                        ? 'text-gray-400' 
                        : isTodayDate 
                        ? 'text-white bg-blue-500 rounded-full w-6 h-6 items-center justify-center font-semibold' 
                        : isSelected
                        ? 'text-blue-600 font-semibold'
                        : 'text-gray-900'
                    }`}>
                      <span className={isTodayDate ? 'flex items-center justify-center w-6 h-6' : ''}>
                        {format(day, 'd')}
                      </span>
                    </div>
                    
                    {/* Events indicators */}
                    {dayEvents.length > 0 && (
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded text-white truncate ${
                              event.status === 'ongoing' ? 'bg-green-500' :
                              event.status === 'upcoming' ? 'bg-blue-500' :
                              'bg-gray-500'
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Events for Selected Date */}
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">
              Events for {date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </h4>
            
            {selectedDateEvents.length > 0 ? (
              <div className="space-y-2">
                {selectedDateEvents.map(event => (
                  <div 
                    key={event.id}
                    className="flex justify-between items-center p-2 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-sm font-medium">{event.title}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      event.status === 'ongoing' ? 'bg-green-100 text-green-800' : 
                      event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No events scheduled for this day</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}