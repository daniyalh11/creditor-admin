
import React from 'react';

export const CopilotSummary = () => {
  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-medium">Credits</h2>
      
      <div className="bg-gray-50 rounded-md shadow-sm">
        <div className="grid grid-cols-2 border-b">
          <div className="font-medium p-4 border-r">Description</div>
          <div className="font-medium p-4">Credits</div>
        </div>
        
        <div className="grid grid-cols-2 border-b">
          <div className="p-4 border-r">Purchased</div>
          <div className="p-4">1500000</div>
        </div>
        
        <div className="grid grid-cols-2 border-b">
          <div className="p-4 border-r">Expired</div>
          <div className="p-4">0</div>
        </div>
        
        <div className="grid grid-cols-2">
          <div className="p-4 border-r">Available</div>
          <div className="p-4">1465903</div>
        </div>
      </div>
      
      <h2 className="text-xl font-medium">Purchases</h2>
      
      <div className="bg-gray-50 rounded-md shadow-sm">
        <div className="grid grid-cols-5 border-b">
          <div className="font-medium p-4">Credits</div>
          <div className="font-medium p-4">Added by</div>
          <div className="font-medium p-4">Purchased</div>
          <div className="font-medium p-4">Expired</div>
          <div className="font-medium p-4">Used</div>
        </div>
        
        <div className="grid grid-cols-5 border-b">
          <div className="p-4">1500000</div>
          <div className="p-4 text-primary hover:underline cursor-pointer">Omar Cervantes</div>
          <div className="p-4">Mar 8, 2025</div>
          <div className="p-4">-</div>
          <div className="p-4">34097</div>
        </div>
        
        <div className="grid grid-cols-5 font-medium border-t bg-gray-100">
          <div className="p-4">1500000</div>
          <div className="p-4"></div>
          <div className="p-4"></div>
          <div className="p-4"></div>
          <div className="p-4">34097</div>
        </div>
      </div>
      
      <h2 className="text-xl font-medium">Statistics</h2>
      
      <div className="bg-gray-50 rounded-md shadow-sm">
        <div className="grid grid-cols-2 border-b">
          <div className="font-medium p-4 border-r">Description</div>
          <div className="font-medium p-4">Count</div>
        </div>
        
        <div className="grid grid-cols-2 border-b">
          <div className="p-4 border-r">Total Copilot tasks performed</div>
          <div className="p-4">23</div>
        </div>
        
        <div className="grid grid-cols-2 border-b">
          <div className="p-4 border-r">Number of administrators that have used Copilot</div>
          <div className="p-4">2</div>
        </div>
        
        <div className="grid grid-cols-2">
          <div className="p-4 border-r">Number of instructors that have used Copilot</div>
          <div className="p-4">2</div>
        </div>
      </div>
      
      <h2 className="text-xl font-medium">Savings</h2>
      <p className="text-gray-700">According to our estimates, using Copilot will save you the following:</p>
      
      <div className="bg-gray-50 rounded-md shadow-sm">
        <div className="grid grid-cols-2 border-b">
          <div className="font-medium p-4 border-r">Description</div>
          <div className="font-medium p-4">Savings</div>
        </div>
        
        <div className="grid grid-cols-2 border-b">
          <div className="p-4 border-r">Estimated time savings per course due to Copilot</div>
          <div className="p-4">320 hours</div>
        </div>
        
        <div className="grid grid-cols-2">
          <div className="p-4 border-r">Estimated cost savings per course due to Copilot</div>
          <div className="p-4">$11,200</div>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <h3 className="font-medium">Here are the assumptions and calculations:</h3>
        <p>Each hour of content takes about 40 hours to create. <span className="text-primary">[reference]</span></p>
        <p>A basic course module (3 sections of content and 4 assessments) represents about 1 hour of instructional content.</p>
        <p>A typical course has 10 modules.</p>
        <p>A typical instructional designer in the USA costs around $35/hour. <span className="text-primary">[reference]</span></p>
        <p>Without Copilot, a course with 10 modules would therefore take about 10 x 40 = 400 hours to create, and cost 400 x $35 = $14,000</p>
        <p>With Copilot doing 80% of the work for a few dollars, a course would take about 10 x 40 x 20% = 80 hours to create and cost 400 x $35 x 20% = $2,800</p>
        <p>Copilot thus saves you around 320 hours and $11,200 per course.</p>
      </div>
    </div>
  );
};
