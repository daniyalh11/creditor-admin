
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid3X3, List } from 'lucide-react';

interface CourseViewToggleProps {
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export const CourseViewToggle: React.FC<CourseViewToggleProps> = ({ view, onViewChange }) => {
  return (
    <div className="flex border rounded-lg overflow-hidden">
      <Button
        variant={view === 'grid' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('grid')}
        className="rounded-none border-none"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant={view === 'list' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onViewChange('list')}
        className="rounded-none border-none"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
};
