import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, BookOpen, FileText, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const activities = [
  {
    id: 1,
    type: 'user',
    title: 'New User Registered',
    description: 'John Smith joined as a student',
    time: '5 min ago'
  },
  {
    id: 2,
    type: 'course',
    title: 'Course Updated',
    description: 'Introduction to Finance was updated',
    time: '2 hours ago'
  },
  {
    id: 3,
    type: 'assignment',
    title: 'Assignment Created',
    description: 'Week 3 Quiz added to Financial Analysis',
    time: '4 hours ago'
  },
  {
    id: 4,
    type: 'user',
    title: 'User Role Updated',
    description: 'Sarah Johnson promoted to instructor',
    time: 'Yesterday'
  },
  {
    id: 5,
    type: 'course',
    title: 'New Course Added',
    description: 'Advanced Credit Strategies now available',
    time: 'Yesterday'
  }
];

const getIcon = (type) => {
  switch (type) {
    case 'user':
      return <User className="h-4 w-4" />;
    case 'course':
      return <BookOpen className="h-4 w-4" />;
    case 'assignment':
      return <FileText className="h-4 w-4" />;
    default:
      return null;
  }
};

const getColor = (type) => {
  switch (type) {
    case 'user':
      return 'bg-blue-100 text-blue-600';
    case 'course':
      return 'bg-purple-100 text-purple-600';
    case 'assignment':
      return 'bg-amber-100 text-amber-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export const RecentActivityCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {activities.map((activity) => (
            <div key={activity.id} className="hover:bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <div className={cn("p-2 rounded-full", getColor(activity.type))}>
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">{activity.title}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};