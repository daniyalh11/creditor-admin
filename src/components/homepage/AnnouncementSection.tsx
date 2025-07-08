
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

// Sample announcements data
const announcements = [
  {
    id: 1,
    title: 'New Course Available',
    description: 'Constitutional Law Advanced Topics is now available',
    date: 'Today',
    color: 'bg-red-100 border-l-4 border-red-500',
    dotColor: 'bg-red-500'
  },
  {
    id: 2,
    title: 'System Maintenance',
    description: 'Platform will be down for maintenance this weekend',
    date: 'Yesterday',
    color: 'bg-orange-100 border-l-4 border-orange-500',
    dotColor: 'bg-orange-500'
  },
  {
    id: 3,
    title: 'Holiday Schedule',
    description: 'Check updated course schedule for the holidays',
    date: '3 days ago',
    color: 'bg-blue-100 border-l-4 border-blue-500',
    dotColor: 'bg-blue-500'
  },
  {
    id: 4,
    title: 'Mock Trial Results',
    description: 'Results from the latest mock trial competition',
    date: '1 week ago',
    color: 'bg-green-100 border-l-4 border-green-500',
    dotColor: 'bg-green-500'
  },
  {
    id: 5,
    title: 'New Research Materials',
    description: 'Updated legal databases and research materials',
    date: '1 week ago',
    color: 'bg-purple-100 border-l-4 border-purple-500',
    dotColor: 'bg-purple-500'
  }
];

export function AnnouncementSection() {
  const [open, setOpen] = useState(false);
  
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Announcements</CardTitle>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="text-ca-primary flex items-center">
                View All <span className="ml-1">→</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>All Announcements</SheetTitle>
              </SheetHeader>
              <div className="mt-6 space-y-4">
                {announcements.map(announcement => (
                  <div 
                    key={announcement.id} 
                    className={`p-4 rounded-md ${announcement.color}`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${announcement.dotColor}`}></div>
                        <h3 className="font-medium">{announcement.title}</h3>
                      </div>
                      <span className="text-xs text-gray-500">{announcement.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 ml-4">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {announcements.slice(0, 3).map(announcement => (
            <div 
              key={announcement.id} 
              className={`p-4 rounded-md ${announcement.color}`}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${announcement.dotColor}`}></div>
                  <h3 className="font-medium">{announcement.title}</h3>
                </div>
                <span className="text-xs text-gray-500">{announcement.date}</span>
              </div>
              <p className="text-sm text-gray-700 ml-4">{announcement.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
