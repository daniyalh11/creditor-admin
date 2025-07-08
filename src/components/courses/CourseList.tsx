import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, File, Users, Edit, Image, BookOpen, Archive, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Course {
  id: string;
  title: string;
  description?: string;
  category: string;
  students: number;
  status: 'Published' | 'Draft';
  courseType: 'Open' | 'Sequential';
  lastUpdated: string;
  thumbnail?: string;
  isActive?: boolean;
}

interface CourseListProps {
  courses: Course[];
  onCourseClick: (courseId: string) => void;
  onCourseAction: (action: string, courseId: string) => void;
}

const CourseList = ({ courses, onCourseClick, onCourseAction }: CourseListProps) => {
  const navigate = useNavigate();

  const handleEditCourse = (courseId: string) => {
    navigate(`/courses/create?edit=true&courseId=${courseId}`);
  };

  const getCourseTypeBadge = (courseType: string) => {
    switch (courseType) {
      case 'Open':
        return <Badge className="bg-blue-500 text-white">Open</Badge>;
      case 'Sequential':
        return <Badge className="bg-purple-500 text-white">Sequential</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
    }
  };

  const getActiveStatus = (isActive: boolean) => {
    return isActive ? (
      <div className="flex items-center text-green-600 text-sm">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
        Active
      </div>
    ) : (
      <div className="flex items-center text-red-600 text-sm">
        <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
        Archived
      </div>
    );
  };

  return (
    <div className="w-full overflow-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50">
            <TableHead className="font-semibold text-slate-700">Course</TableHead>
            <TableHead className="font-semibold text-slate-700">Category</TableHead>
            <TableHead className="font-semibold text-slate-700">Course Type</TableHead>
            <TableHead className="font-semibold text-slate-700">Active Status</TableHead>
            <TableHead className="font-semibold text-slate-700">Students</TableHead>
            <TableHead className="font-semibold text-slate-700">Last Updated</TableHead>
            <TableHead className="w-[100px] font-semibold text-slate-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courses.map((course) => (
            <TableRow 
              key={course.id} 
              className="cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => onCourseClick(course.id)}
            >
              <TableCell className="font-medium">
                <div className="flex items-center">
                  {course.thumbnail ? (
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="h-10 w-10 rounded mr-3 object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded mr-3 bg-gradient-to-br from-blue-200 to-purple-200 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {course.title.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <div className="font-medium text-gray-900">{course.title}</div>
                    {course.description && (
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {course.description}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-slate-700">{course.category}</TableCell>
              <TableCell>
                {getCourseTypeBadge(course.courseType)}
              </TableCell>
              <TableCell>
                {getActiveStatus(course.isActive ?? true)}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-ca-primary" />
                  {course.students}
                </div>
              </TableCell>
              <TableCell className="text-slate-600">{course.lastUpdated}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-slate-500 hover:text-slate-800"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border shadow-lg">
                    <DropdownMenuItem onClick={() => handleEditCourse(course.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Course
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCourseAction('updateImage', course.id)}>
                      <Image className="h-4 w-4 mr-2" />
                      Update Image
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCourseAction('addToCatalog', course.id)}>
                      <BookOpen className="h-4 w-4 mr-2" />
                      Add to Catalog
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCourseAction('archive', course.id)}>
                      <Archive className="h-4 w-4 mr-2" />
                      Archive Course
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onCourseAction('delete', course.id)} className="text-red-600">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Course
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CourseList;
