
import React from 'react';
import { Settings } from 'lucide-react';

export const CopilotUsers = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-6">Users</h2>
      
      <div className="bg-gray-50 rounded-md shadow-sm">
        <div className="grid grid-cols-6 border-b">
          <div className="font-medium p-4">User</div>
          <div className="font-medium p-4">Tasks</div>
          <div className="font-medium p-4">Max credits</div>
          <div className="font-medium p-4">Credits used</div>
          <div className="font-medium p-4">Credits left</div>
          <div className="font-medium p-4">Details</div>
        </div>
        
        <div className="grid grid-cols-6 border-b">
          <div className="p-4 text-primary hover:underline cursor-pointer">PaulMichael Rowland</div>
          <div className="p-4">22</div>
          <div className="p-4">50000</div>
          <div className="p-4">24276</div>
          <div className="p-4">25724</div>
          <div className="p-4">
            <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />
          </div>
        </div>
        
        <div className="grid grid-cols-6">
          <div className="p-4 text-primary hover:underline cursor-pointer">Samir Kumar</div>
          <div className="p-4">1</div>
          <div className="p-4">50000</div>
          <div className="p-4">9821</div>
          <div className="p-4">40179</div>
          <div className="p-4">
            <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500 flex justify-between items-center mt-6">
        <div>Contact</div>
        <div>Powered by CYPHER Learning</div>
      </div>
    </div>
  );
};
