import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FolderOpen, Search, Plus, BookOpen, X, Edit, Trash2,
  Users, Clock, MoreHorizontal, Archive, Image
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared/PageHeader';
import { AddCourseToCatalogDialog } from '@/components/catalog/AddCourseToCatalogDialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const CatalogDetail = () => {
  const { catalogId } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const getCatalogData = (id) => {
    const catalogs = {
      '1': {
        name: 'Web Development',
        description: 'Frontend and backend web development courses',
        courses: [
          {
            id: '1',
            title: 'React Fundamentals',
            description: 'Learn the basics of React development',
            category: 'Frontend',
            status: 'Published',
            students: 120,
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=200&fit=crop',
            duration: '4 weeks',
            difficulty: 'Beginner',
            isActive: true
          },
          {
            id: '2',
            title: 'Node.js Backend Development',
            description: 'Build scalable backend applications with Node.js',
            category: 'Backend',
            status: 'Published',
            students: 85,
            thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop',
            duration: '6 weeks',
            difficulty: 'Intermediate',
            isActive: true
          },
          {
            id: '3',
            title: 'Full Stack Web App',
            description: 'Complete web application development course',
            category: 'Full Stack',
            status: 'Draft',
            students: 0,
            thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
            duration: '12 weeks',
            difficulty: 'Advanced',
            isActive: false
          }
        ]
      },
      '2': {
        name: 'Data Science',
        description: 'Data analysis, machine learning, and AI courses',
        courses: [
          {
            id: '4',
            title: 'Python for Data Science',
            description: 'Learn Python programming for data analysis',
            category: 'Programming',
            status: 'Published' ,
            students: 200,
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=200&fit=crop',
            duration: '8 weeks',
            difficulty: 'Beginner',
            isActive: true
          },
          {
            id: '5',
            title: 'Machine Learning Basics',
            description: 'Introduction to machine learning concepts',
            category: 'AI/ML',
            status: 'Published' ,
            students: 150,
            thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop',
            duration: '10 weeks',
            difficulty: 'Intermediate',
            isActive: true
          }
        ]
      },
      '3': {
        name: 'Mobile Development',
        description: 'iOS and Android app development',
        courses: [
          {
            id: '6',
            title: 'React Native Development',
            description: 'Build cross-platform mobile apps',
            category: 'Mobile',
            status: 'Published',
            students: 95,
            thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=200&fit=crop',
            duration: '8 weeks',
            difficulty: 'Intermediate',
            isActive: true
          }
        ]
      },
      '4': {
        name: 'DevOps',
        description: 'Cloud computing, deployment, and infrastructure',
        courses: [
          {
            id: '7',
            title: 'Docker & Kubernetes',
            description: 'Container orchestration and deployment',
            category: 'Infrastructure',
            status: 'Published' ,
            students: 75,
            thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
            duration: '6 weeks',
            difficulty: 'Advanced',
            isActive: true
          }
        ]
      }
    };
    return catalogs[id] || catalogs['1'];
  };

  const catalog = getCatalogData(catalogId || '1');

  const filteredCourses = catalog.courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveCourse = (courseId) => {
    console.log('Removing course from catalog:', courseId);
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const handleCourseAction = (action, courseId) => {
    console.log(`${action} course:`, courseId);
    switch (action) {
      case 'edit':
        navigate(`/courses/edit/${courseId}`);
        break;
      case 'view':
        navigate(`/courses/view/${courseId}`);
        break;
      case 'updateImage':
        break;
      case 'archive':
        break;
      case 'delete':
        break;
      default:
        break;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Advanced': return 'bg-red-100 text-red-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Beginner': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full max-h-screen overflow-hidden">
      <div className="flex-shrink-0 p-4 space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate('/catalog')} className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Back to Catalogs
          </Button>
        </div>
        <PageHeader title={catalog.name} description={catalog.description} />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative flex-1 max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setDialogOpen(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 pb-4">
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
            {filteredCourses.map(course => (
              <Card
                key={course.id}
                className="overflow-hidden flex flex-col border-gray-200 transition-all hover:shadow-lg group relative cursor-pointer"
                onClick={() => handleCourseClick(course.id)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
                      {course.status}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white/80 hover:bg-white text-gray-700 h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border shadow-lg">
                        <DropdownMenuItem onClick={() => handleCourseAction('view', course.id)}>
                          <BookOpen className="h-4 w-4 mr-2" /> View Course
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCourseAction('edit', course.id)}>
                          <Edit className="h-4 w-4 mr-2" /> Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCourseAction('updateImage', course.id)}>
                          <Image className="h-4 w-4 mr-2" /> Update Image
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRemoveCourse(course.id)}>
                          <X className="h-4 w-4 mr-2" /> Remove from Catalog
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCourseAction('archive', course.id)}>
                          <Archive className="h-4 w-4 mr-2" /> Archive Course
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCourseAction('delete', course.id)} className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <CardContent className="flex flex-col flex-grow p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-3">{course.description}</p>
                    <div className="flex gap-2 mb-3">
                      <Badge variant="outline" className="text-xs">{course.category}</Badge>
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(course.difficulty)}`}>{course.difficulty}</Badge>
                    </div>
                  </div>
                  <div className="mt-auto space-y-3">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" /> {course.students} students
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" /> {course.duration}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <div className={`w-2 h-2 rounded-full mr-2 ${course.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                        <span className={course.isActive ? 'text-green-600' : 'text-red-600'}>
                          {course.isActive ? 'Active' : 'Archived'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No courses found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms.' : 'Get started by adding a course to this catalog.'}
            </p>
            <div className="mt-6">
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add Course
              </Button>
            </div>
          </div>
        )}
      </ScrollArea>

      <AddCourseToCatalogDialog open={dialogOpen} onOpenChange={setDialogOpen} catalogId={catalogId || ''} />
    </div>
  );
};

export default CatalogDetail;
