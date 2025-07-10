import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Grid3X3, List } from 'lucide-react';

export const CourseViewToggle = ({ view, onViewChange }) => {
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

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
CourseViewToggle.propTypes = {
  view: PropTypes.oneOf(['grid', 'list']).isRequired,
  onViewChange: PropTypes.func.isRequired,
};