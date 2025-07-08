
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { CalendarViewType } from './types';

interface CalendarHeaderProps {
  currentDate: Date;
  view: CalendarViewType;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
  onViewChange: (view: CalendarViewType) => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  view,
  onPreviousMonth,
  onNextMonth,
  onToday,
  onViewChange
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" onClick={onToday}>
          Today
        </Button>
        <Button variant="outline" size="icon" onClick={onPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="ml-4">
          <Button 
            variant={view === 'week' ? 'default' : 'outline'} 
            onClick={() => onViewChange('week')}
          >
            Week
          </Button>
          <Button 
            variant={view === 'month' ? 'default' : 'outline'} 
            onClick={() => onViewChange('month')}
          >
            Month
          </Button>
        </div>
      </div>
    </div>
  );
};
