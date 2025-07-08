
import React from 'react';
import { Check, Settings } from 'lucide-react';

export const CopilotHistory = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-medium mb-6">History</h2>
      
      <div className="bg-gray-50 rounded-md shadow-sm overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="font-medium p-4 text-left">#</th>
              <th className="font-medium p-4 text-left">Task</th>
              <th className="font-medium p-4 text-left">User</th>
              <th className="font-medium p-4 text-left">Item</th>
              <th className="font-medium p-4 text-left">Status</th>
              <th className="font-medium p-4 text-left">Time spent</th>
              <th className="font-medium p-4 text-left">Credits</th>
              <th className="font-medium p-4 text-left">Cost</th>
              <th className="font-medium p-4 text-left">Options</th>
              <th className="font-medium p-4 text-left">Progress</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="p-4">1</td>
              <td className="p-4">Add a course</td>
              <td className="p-4 text-primary hover:underline cursor-pointer">Samir Kumar</td>
              <td className="p-4 text-primary hover:underline cursor-pointer">Test Course</td>
              <td className="p-4 flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" /> Finished
                <div className="text-gray-600 ml-1">Apr 28, 2025, 11:04 pm</div>
              </td>
              <td className="p-4">
                <div>06m:55s</div>
                <div className="text-sm text-gray-500">estimated: 04m:08s</div>
              </td>
              <td className="p-4">
                <div>684</div>
                <div className="text-sm text-gray-500">estimated: 459</div>
              </td>
              <td className="p-4">
                <div>US$ 6.85</div>
                <div className="text-sm text-gray-500">estimated: US$ 4.59</div>
              </td>
              <td className="p-4">
                <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />
              </td>
              <td className="p-4">100%</td>
            </tr>
            <tr>
              <td className="p-4">2</td>
              <td className="p-4">Add a course</td>
              <td className="p-4 text-primary hover:underline cursor-pointer">PaulMichael Rowland</td>
              <td className="p-4 text-primary hover:underline cursor-pointer">Lesson 20: Hypocrisy, Privilege, and Government Corruption</td>
              <td className="p-4 flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" /> Finished
                <div className="text-gray-600 ml-1">Apr 21, 2025, 7:28 pm</div>
              </td>
              <td className="p-4">
                <div>08m:02s</div>
                <div className="text-sm text-gray-500">estimated: 04m:43s</div>
              </td>
              <td className="p-4">
                <div>971</div>
                <div className="text-sm text-gray-500">estimated: 649</div>
              </td>
              <td className="p-4">
                <div>US$ 9.72</div>
                <div className="text-sm text-gray-500">estimated: US$ 6.49</div>
              </td>
              <td className="p-4">
                <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />
              </td>
              <td className="p-4">100%</td>
            </tr>
            <tr>
              <td className="p-4">3</td>
              <td className="p-4">Add a course</td>
              <td className="p-4 text-primary hover:underline cursor-pointer">PaulMichael Rowland</td>
              <td className="p-4 text-primary hover:underline cursor-pointer">Lesson 19: Equal Protection and Justice in Law and Scripture</td>
              <td className="p-4 flex items-center text-green-600">
                <Check className="h-4 w-4 mr-1" /> Finished
                <div className="text-gray-600 ml-1">Apr 21, 2025, 6:43 am</div>
              </td>
              <td className="p-4">
                <div>05m:37s</div>
                <div className="text-sm text-gray-500">estimated: 05m:33s</div>
              </td>
              <td className="p-4">
                <div>962</div>
                <div className="text-sm text-gray-500">estimated: 704</div>
              </td>
              <td className="p-4">
                <div>US$ 9.63</div>
                <div className="text-sm text-gray-500">estimated: US$ 7.04</div>
              </td>
              <td className="p-4">
                <Settings className="h-5 w-5 text-gray-500 cursor-pointer hover:text-primary" />
              </td>
              <td className="p-4">100%</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="text-sm text-gray-500 flex justify-between items-center mt-6">
        <div>Contact</div>
        <div>Powered by CYPHER Learning</div>
      </div>
    </div>
  );
};
