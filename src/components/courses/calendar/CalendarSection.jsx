import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AddEventDialog } from './AddEventDialog'; // Assuming this is also converted to JSX
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isToday, 
  startOfWeek, 
  endOfWeek 
} from 'date-fns';

/**
 * @typedef {'blue' | 'green' | 'red' | 'yellow' | 'purple'} EventColor
 */

/**
 * @typedef {object} CalendarEvent
 * @property {string} id - Unique identifier for the event.
 * @property {string} title - The title of the event.
 * @property {Date} date - The date of the event.
 * @property {string} time - The time of the event.
 * @property {string} [description] - Optional description of the event.
 * @property {EventColor} color - The color tag for the event.
 * @property {string} [location] - Optional location of the event.
 */

export const CalendarSection = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Course starts',
      date: new Date(2025, 4, 15), // May 15, 2025
      time: '9:00 AM',
      description: 'Beginning of the course semester',
      color: 'blue',
    },
    {
      id: '2',
      title: 'Course ends',
      date: new Date(2025, 4, 21), // May 21, 2025
      time: '5:00 PM',
      description: 'End of the course semester',
      color: 'red',
    }
  ]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  /**
   * Filters and returns events for a specific date.
   * @param {Date} date - The date to find events for.
   * @returns {CalendarEvent[]} An array of events for the given date.
   */
  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  /**
   * Handles clicking on a date in the calendar.
   * @param {Date} date - The date that was clicked.
   */
  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowAddEvent(true);
  };

  /**
   * Adds a new event to the events state.
   * @param {Omit<CalendarEvent, 'id'>} event - The new event data, without an id.
   */
  const handleAddEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    setEvents([...events, newEvent]);
  };

  /**
   * Navigates to the previous or next month.
   * @param {'prev' | 'next'} direction - The direction to navigate.
   */
  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="p-6 bg-white">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            {format(currentDate, 'MMMM yyyy')}
          </h1>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToToday}>
            Today
          </Button>
          <div className="flex bg-gray-100 rounded-lg p-1">
            <Button variant="ghost" size="sm" className="text-gray-600">
              Week
            </Button>
            <Button size="sm" className="bg-blue-600 text-white">
              Month
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-600">
              Agenda
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 border-b border-gray-200">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="p-3 text-center text-sm font-medium text-gray-500 bg-gray-50">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isTodayDate = isToday(day);
            
            return (
              <div
                key={day.toISOString()}
                className={`min-h-[100px] p-2 border-r border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                  !isCurrentMonth ? 'bg-gray-50' : ''
                }`}
                onClick={() => handleDateClick(day)}
              >
                <div className={`text-sm mb-1 ${
                  !isCurrentMonth 
                    ? 'text-gray-400' 
                    : isTodayDate 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-900'
                }`}>
                  {format(day, 'd')}
                </div>
                
                {/* Events */}
                <div className="space-y-1">
                  {dayEvents.map((event) => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded text-white truncate ${
                        event.color === 'blue' ? 'bg-blue-500' :
                        event.color === 'red' ? 'bg-red-500' :
                        event.color === 'green' ? 'bg-green-500' :
                        event.color === 'yellow' ? 'bg-yellow-500' :
                        'bg-purple-500'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AddEventDialog
        isOpen={showAddEvent}
        onClose={() => {
          setShowAddEvent(false);
          setSelectedDate(null);
        }}
        onAdd={handleAddEvent}
        initialDate={selectedDate}
      />
    </div>
  );
};