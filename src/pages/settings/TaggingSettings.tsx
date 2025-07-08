
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Plus, FileText, Check, List, Database, Calendar } from 'lucide-react';

const TaggingSettings = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <PageHeader 
          title="Tag Groups" 
          description="Manage tag organization and categorization"
        />
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add tag group
        </Button>
      </div>

      <div className="space-y-5">
        {/* Step 1 */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className="bg-gray-50 p-5 flex items-center justify-center min-w-[150px]">
                <div className="relative">
                  <div className="bg-gray-200 h-32 w-[100px] rounded flex flex-col overflow-hidden">
                    <div className="bg-gray-300 h-7 w-full"></div>
                    <div className="flex-1 p-2">
                      <div className="bg-gray-300 h-2 w-full mb-2 rounded"></div>
                      <div className="bg-gray-300 h-2 w-3/4 mb-2 rounded"></div>
                      <div className="bg-gray-300 h-2 w-5/6 mb-2 rounded"></div>
                      <div className="bg-gray-300 h-2 w-2/3 rounded"></div>
                    </div>
                  </div>
                  <div className="absolute -right-2 -bottom-2 bg-blue-500 p-1 rounded-md text-white">
                    <Plus size={20} />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-5 flex-1">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 font-semibold">
                  1
                </div>
                <div>
                  <p className="text-gray-700">
                    To create a tag group, click <span className="text-blue-500 font-medium">+ Add</span> and follow the directions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 2 */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className="bg-gray-50 p-5 flex items-center justify-center min-w-[150px]">
                <div className="relative">
                  <div className="bg-gray-200 h-32 w-[100px] rounded flex flex-col overflow-hidden">
                    <div className="bg-gray-300 h-7 w-full"></div>
                    <div className="flex-1 p-2">
                      <div className="flex items-end h-full">
                        <div className="bg-green-500 w-4 h-10 rounded-sm mr-1"></div>
                        <div className="bg-blue-500 w-4 h-16 rounded-sm mr-1"></div>
                        <div className="bg-purple-500 w-4 h-14 rounded-sm mr-1"></div>
                        <div className="bg-yellow-500 w-4 h-8 rounded-sm mr-1"></div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-2 -bottom-2 bg-green-500 p-1 rounded-md text-white">
                    <Check size={20} />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-5 flex-1">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 font-semibold">
                  2
                </div>
                <div>
                  <p className="text-gray-700">
                    After setting the name, you can specify the accepted tags.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3 */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className="bg-gray-50 p-5 flex items-center justify-center min-w-[150px]">
                <div className="relative">
                  <div className="bg-gray-200 h-32 w-[100px] rounded flex flex-col overflow-hidden">
                    <div className="bg-gray-300 h-7 w-full"></div>
                    <div className="flex-1 p-2 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full relative overflow-hidden">
                        <div className="absolute inset-0">
                          <div className="absolute w-full h-full">
                            <div className="bg-green-500 absolute inset-0 right-1/2 bottom-1/2 rounded-tl-full"></div>
                            <div className="bg-blue-500 absolute inset-0 left-1/2 bottom-1/2 rounded-tr-full"></div>
                            <div className="bg-yellow-500 absolute inset-0 right-1/2 top-1/2 rounded-bl-full"></div>
                            <div className="bg-red-500 absolute inset-0 left-1/2 top-1/2 rounded-br-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-2 -bottom-2 bg-blue-500 p-1 rounded-md text-white">
                    <Database size={20} />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-5 flex-1">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 font-semibold">
                  3
                </div>
                <div>
                  <p className="text-gray-700">
                    Under "Associated items", you can link various object types to a tag group.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4 */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-stretch">
              <div className="bg-gray-50 p-5 flex items-center justify-center min-w-[150px]">
                <div className="relative">
                  <div className="bg-gray-200 h-32 w-[100px] rounded flex flex-col overflow-hidden">
                    <div className="bg-gray-300 h-7 w-full"></div>
                    <div className="flex-1 p-2 flex flex-col items-center justify-center">
                      <div className="bg-gray-300 h-12 w-full rounded-md mb-2 flex items-center justify-center">
                        <div className="grid grid-cols-4 gap-1 w-10 h-10">
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                          <div className="bg-gray-400 rounded-sm"></div>
                        </div>
                      </div>
                      <div className="bg-blue-500 h-7 w-7 rounded-full text-white flex items-center justify-center">
                        <Calendar size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -right-2 -bottom-2 bg-purple-500 p-1 rounded-md text-white">
                    <Calendar size={20} />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-5 flex-1">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-4 font-semibold">
                  4
                </div>
                <div>
                  <p className="text-gray-700">
                    An associated tag group can be required or not.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TaggingSettings;
