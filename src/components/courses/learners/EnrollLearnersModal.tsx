
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Mail } from 'lucide-react';

interface EnrollLearnersModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const EnrollLearnersModal: React.FC<EnrollLearnersModalProps> = ({
  open,
  onOpenChange
}) => {
  const enrollmentOptions = [
    {
      title: 'Courses tab',
      description: 'Learners can hover over the Courses tab, click Catalog, then select the course.',
      icon: BookOpen,
      color: 'text-blue-600'
    },
    {
      title: 'People picker',
      description: 'Enroll learners using the people picker',
      icon: Users,
      color: 'text-green-600'
    },
    {
      title: 'Email invitations',
      description: 'Send invitations by email',
      icon: Mail,
      color: 'text-purple-600'
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Enroll learners</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <p className="text-gray-700 mb-6">Here are the ways to enroll learners:</p>
          
          <div className="space-y-4">
            {enrollmentOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-gray-50 ${option.color} flex-shrink-0`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">
                      Option {index + 1}: {option.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
