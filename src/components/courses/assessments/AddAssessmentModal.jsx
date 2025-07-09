import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Users, FileText, Upload, HelpCircle, BarChart3, BookOpen, MessageSquare, Calendar, Users2 } from 'lucide-react';

export const AddAssessmentModal = ({
  open,
  onOpenChange
}) => {
  const [activeTab, setActiveTab] = useState('individual');

  const individualAssessments = [
    {
      icon: Users,
      title: 'Attendance',
      description: 'Award points based on attendance',
      color: 'text-blue-600'
    },
    {
      icon: Upload,
      title: 'Dropbox', 
      description: 'Submit one or more files',
      color: 'text-green-600'
    },
    {
      icon: FileText,
      title: 'Essay',
      description: 'Respond to a question with some text and optional attachments',
      color: 'text-purple-600'
    },
    {
      icon: Calendar,
      title: 'Offline assessment',
      description: 'An offline assessment such as taking a test or reading a book',
      color: 'text-orange-500'
    },
    {
      icon: HelpCircle,
      title: 'Quiz',
      description: 'Take an online quiz',
      color: 'text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'SCORM',
      description: 'Take a SCORM quiz',
      color: 'text-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Survey',
      description: '',
      color: 'text-teal-500'
    }
  ];

  const groupAssessments = [
    {
      icon: MessageSquare,
      title: 'Debate',
      description: 'Structured group debate activity',
      color: 'text-red-600'
    },
    {
      icon: MessageSquare,
      title: 'Discussion',
      description: 'Group discussion forum',
      color: 'text-blue-600'
    },
    {
      icon: Users2,
      title: 'Team',
      description: 'Team-based assessment',
      color: 'text-green-600'
    }
  ];

  const libraryAssessments = [
    {
      icon: BookOpen,
      title: 'Library',
      description: 'Access library resources',
      color: 'text-indigo-600'
    }
  ];

  const renderAssessmentGrid = (assessments) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-6">
      {assessments.map((assessment, index) => {
        const Icon = assessment.icon;
        return (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 cursor-pointer transition-colors bg-white"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-3 rounded-full bg-gray-50 ${assessment.color}`}>
                <Icon className="h-6 w-6 md:h-8 md:w-8" />
              </div>
              <div>
                <h3 className={`font-medium text-sm md:text-base ${assessment.color}`}>
                  {assessment.title}
                </h3>
                {assessment.description && (
                  <p className="text-xs md:text-sm text-gray-600 mt-1 leading-relaxed">
                    {assessment.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-4 md:px-6 py-4 border-b flex-shrink-0 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-lg md:text-xl font-semibold">Add assessment</DialogTitle>
          <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <div className="px-4 md:px-6 pt-4 border-b flex-shrink-0">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger value="individual" className="mr-2">
                  Individual
                </TabsTrigger>
                <TabsTrigger value="group" className="mr-2">
                  Group
                </TabsTrigger>
                <TabsTrigger value="library">
                  Library
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-auto">
              <TabsContent value="individual" className="mt-0 h-full">
                {renderAssessmentGrid(individualAssessments)}
              </TabsContent>

              <TabsContent value="group" className="mt-0 h-full">
                {renderAssessmentGrid(groupAssessments)}
              </TabsContent>

              <TabsContent value="library" className="mt-0 h-full">
                {renderAssessmentGrid(libraryAssessments)}
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="flex justify-end gap-3 p-4 md:p-6 border-t bg-white flex-shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Add
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};