import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';

export const CourseCategoryTabs = ({
  activeCategory,
  onCategoryChange,
  openCount,
  sequentialCount
}) => {
  return (
    <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
      <Button
        variant={activeCategory === 'open' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onCategoryChange('open')}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          activeCategory === 'open' 
            ? 'bg-cyan-500 text-white shadow-sm hover:bg-cyan-600' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
        }`}
      >
        Courses {openCount}
      </Button>
      <Button
        variant={activeCategory === 'sequential' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => onCategoryChange('sequential')}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
          activeCategory === 'sequential' 
            ? 'bg-gray-700 text-white shadow-sm hover:bg-gray-800' 
            : 'text-gray-600 hover:text-gray-900 hover:bg-white'
        }`}
      >
        Templates {sequentialCount}
      </Button>
    </div>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
CourseCategoryTabs.propTypes = {
  activeCategory: PropTypes.oneOf(['open', 'sequential']).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  openCount: PropTypes.number.isRequired,
  sequentialCount: PropTypes.number.isRequired,
};