
import React from 'react';

interface DebugInfoProps {
  courseId: string | undefined;
  modules: Array<{ topic: string }>;
}

export const DebugInfo: React.FC<DebugInfoProps> = ({ courseId, modules }) => {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
      <p className="text-sm text-yellow-800">
        Debug: Course ID: {courseId} | Modules count: {modules.length} | Modules: {JSON.stringify(modules.map(m => m.topic))}
      </p>
    </div>
  );
};
