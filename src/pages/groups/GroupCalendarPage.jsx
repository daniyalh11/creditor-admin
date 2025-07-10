import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { addMonths } from 'date-fns';
import { CalendarHeader } from './calendar/CalendarHeader';
import { MonthCalendarView } from './calendar/MonthCalendarView';
import { WeekCalendarView } from './calendar/WeekCalendarView';
import { EventModal } from './calendar/EventModal';
import { EventListModal } from './calendar/EventListModal';
import { DeleteConfirmDialog } from './calendar/DeleteConfirmDialog';
import { useCalendarEvents } from './calendar/hooks/useCalendarEvents';

const GroupCalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalMode, setModalMode] = useState('create');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [eventsForSelectedDay, setEventsForSelectedDay] = useState([]);

  const { events, addEvent, updateEvent, deleteEvent } = useCalendarEvents();

  const handlePreviousMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prevDate => addMonths(prevDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const handleDayClick = (day, dayEvents) => {
    setSelectedDate(day);
    setEventsForSelectedDay(dayEvents);

    if (dayEvents.length === 0) {
      setModalMode('create');
      setIsEventModalOpen(true);
    } else if (dayEvents.length === 1) {
      setSelectedEvent(dayEvents[0]);
      setModalMode('view');
      setIsEventModalOpen(true);
    } else {
      setModalMode('event-list');
      setIsEventModalOpen(true);
    }
  };

  const handleSelectEventFromList = (event) => {
    setSelectedEvent(event);
    setModalMode('view');
  };

  const handleCreateNewFromList = () => {
    setSelectedEvent(null);
    setModalMode('create');
  };

  const handleEditEvent = () => {
    setModalMode('edit');
  };

  const handleDeleteEvent = () => {
    setConfirmDeleteOpen(true);
  };

  const confirmDeleteEvent = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);
      setConfirmDeleteOpen(false);
      setIsEventModalOpen(false);
      setSelectedEvent(null);
    }
  };

  const handleEventClick = (event, e) => {
    e.stopPropagation();
    setSelectedEvent(event);
    setModalMode('view');
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (eventData) => {
    if (modalMode === 'edit' && selectedEvent) {
      updateEvent(eventData);
    } else {
      addEvent(eventData);
    }
    setSelectedEvent(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <CalendarHeader
        currentDate={currentDate}
        view={view}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
        onViewChange={handleViewChange}
      />

      <div className="border rounded-md bg-white shadow">
        {view === 'month' ? (
          <MonthCalendarView
            currentDate={currentDate}
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
          />
        ) : (
          <WeekCalendarView
            currentDate={currentDate}
            events={events}
            onDayClick={handleDayClick}
            onEventClick={handleEventClick}
          />
        )}
      </div>

      {/* Event Modal */}
      {modalMode !== 'event-list' && (
        <EventModal
          isOpen={isEventModalOpen}
          onClose={() => setIsEventModalOpen(false)}
          mode={modalMode}
          selectedEvent={selectedEvent}
          selectedDate={selectedDate}
          onSave={handleSaveEvent}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
        />
      )}

      {/* Event List Modal */}
      {modalMode === 'event-list' && (
        <Dialog open={isEventModalOpen} onOpenChange={() => setIsEventModalOpen(false)}>
          <DialogContent className="max-w-lg p-6">
            <DialogHeader>
              <DialogTitle className="text-xl">Events</DialogTitle>
            </DialogHeader>
            <EventListModal
              selectedDate={selectedDate}
              eventsForSelectedDay={eventsForSelectedDay}
              onSelectEvent={handleSelectEventFromList}
              onCreateNew={handleCreateNewFromList}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog
        isOpen={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={confirmDeleteEvent}
      />
    </div>
  );
};

export default GroupCalendarPage;
