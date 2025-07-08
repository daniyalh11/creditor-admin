
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, BookOpen } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

type AddCourseToCatalogDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  catalogId: string;
};

export const AddCourseToCatalogDialog = ({ open, onOpenChange, catalogId }: AddCourseToCatalogDialogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // Mock available courses
  const availableCourses = [
    {
      id: '4',
      title: 'Personal Sovereignty Basics',
      category: 'SOVEREIGNTY 101',
      status: 'Published' as const,
      students: 28
    },
    {
      id: '5',
      title: 'Advanced Constitutional Law',
      category: 'Constitutional',
      status: 'Published' as const,
      students: 22
    },
    {
      id: '6',
      title: 'Commercial Law Fundamentals',
      category: 'Commercial',
      status: 'Draft' as const,
      students: 0
    },
    {
      id: '7',
      title: 'Banking and Finance Law',
      category: 'Financial',
      status: 'Published' as const,
      students: 18
    }
  ];

  const filteredCourses = availableCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCourseToggle = (courseId: string) => {
    setSelectedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleSubmit = () => {
    console.log('Adding courses to catalog:', { catalogId, courseIds: selectedCourses });
    // Here you would typically call an API to add courses to catalog
    onOpenChange(false);
    setSelectedCourses([]);
    setSearchTerm('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>Add Courses to Catalog</DialogTitle>
          <DialogDescription>
            Select courses to add to this catalog. You can search by course name or category.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 flex-1 min-h-0">
          <div className="relative flex-shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <ScrollArea className="flex-1 border rounded-md">
            <div className="p-4 space-y-2">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="mx-auto h-8 w-8 mb-2" />
                  <p>No courses found</p>
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <Checkbox
                      id={course.id}
                      checked={selectedCourses.includes(course.id)}
                      onCheckedChange={() => handleCourseToggle(course.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={course.id}
                        className="text-sm font-medium cursor-pointer"
                      >
                        {course.title}
                      </Label>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground truncate">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0 ml-2">
                          <span className={course.status === 'Published' ? 'text-green-600' : 'text-yellow-600'}>
                            {course.status}
                          </span>
                          <span>•</span>
                          <span>{course.students} students</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          {selectedCourses.length > 0 && (
            <div className="text-sm text-muted-foreground flex-shrink-0">
              {selectedCourses.length} course{selectedCourses.length === 1 ? '' : 's'} selected
            </div>
          )}
        </div>

        <DialogFooter className="flex-shrink-0">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={selectedCourses.length === 0}
          >
            Add {selectedCourses.length} Course{selectedCourses.length === 1 ? '' : 's'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
