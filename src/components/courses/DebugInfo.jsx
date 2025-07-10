import React from 'react';
import PropTypes from 'prop-types';

export const DebugInfo = ({ courseId, modules }) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
      <p className="text-sm text-yellow-800">
        Debug: Course ID: {courseId || 'N/A'} | Modules count: {modules.length} | Modules: {JSON.stringify(modules.map(m => m.topic))}
      </p>
    </div>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
DebugInfo.propTypes = {
  courseId: PropTypes.string, // courseId is optional (string or undefined)
  modules: PropTypes.arrayOf(
    PropTypes.shape({
      topic: PropTypes.string.isRequired,
    })
  ).isRequired,
};