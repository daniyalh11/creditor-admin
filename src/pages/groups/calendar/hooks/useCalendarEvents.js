import { useState } from 'react';
import { toast } from 'sonner';

export const useCalendarEvents = () => {
  const [events, setEvents] = useState([
    {
      id: 'event-1',
      title: 'Sovereignty 101',
      startDate: new Date(2025, 4, 19, 14, 0), // 2pm
      endDate: new Date(2025, 4, 19, 15, 30),
      allDay: false,
      description: 'Learn about sovereignty principles and applications'
    },
    {
      id: 'event-2',
      title: 'Credit Workshop',
      startDate: new Date(2025, 4, 21, 10, 0), // 10am
      endDate: new Date(2025, 4, 21, 12, 0),
      allDay: false,
      webConferencing: 'zoom'
    }
  ]);

  const addEvent = (eventData) => {
    setEvents(prev => [...prev, eventData]);
    toast.success("Event added successfully!");
  };

  const updateEvent = (eventData) => {
    setEvents(prev => prev.map(e => e.id === eventData.id ? eventData : e));
    toast.success("Event updated successfully!");
  };

  const deleteEvent = (eventId) => {
    setEvents(prev => prev.filter(e => e.id !== eventId));
    toast.success("Event deleted successfully");
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent
  };
};
