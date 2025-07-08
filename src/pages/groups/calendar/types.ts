
export type CalendarViewType = 'week' | 'month';

export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  description?: string;
  postedToNewsFeed?: boolean;
  rsvp?: boolean;
  webConferencing?: 'none' | 'zoom' | 'teams';
  repeat?: boolean;
  repeatFrequency?: string;
  repeatInterval?: number;
  repeatEndType?: 'never' | 'after' | 'on';
  repeatEndDate?: Date | null;
  repeatEndCount?: number;
};

export type ModalMode = 'create' | 'edit' | 'delete' | 'view' | 'event-list';
