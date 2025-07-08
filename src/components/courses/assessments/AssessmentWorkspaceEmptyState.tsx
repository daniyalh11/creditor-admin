
import React from 'react';

export const AssessmentWorkspaceEmptyState: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Assessment Builder</h2>
        <p className="text-gray-600">Select an assessment type from the sidebar to get started</p>
      </div>
    </div>
  );
};
