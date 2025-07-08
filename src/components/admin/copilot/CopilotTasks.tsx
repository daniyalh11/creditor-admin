
import React from 'react';

export const CopilotTasks = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-6">Tasks</h2>
      
      <div className="bg-gray-50 rounded-md shadow-sm">
        <div className="grid grid-cols-4 border-b">
          <div className="font-medium p-4">Task</div>
          <div className="font-medium p-4">Count</div>
          <div className="font-medium p-4">Users</div>
          <div className="font-medium p-4">Credits</div>
        </div>
        
        <div className="grid grid-cols-4">
          <div className="p-4">Add a course</div>
          <div className="p-4">23</div>
          <div className="p-4">2</div>
          <div className="p-4">19473</div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 flex justify-between items-center mt-6">
        <div>Contact</div>
        <div>Powered by CYPHER Learning</div>
      </div>
    </div>
  );
};
