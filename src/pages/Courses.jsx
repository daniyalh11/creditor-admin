import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Users, Grid3X3, List, FolderOpen } from "lucide-react";
import { EnrollModal } from "@/components/courses/EnrollModal";
import CourseGrid from "@/components/courses/CourseGrid";
import CourseList from "@/components/courses/CourseList";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const Courses = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [courseTab, setCourseTab] = useState('courses');
  const [courseTypeFilter, setCourseTypeFilter] = useState('open');
  const [levelFilter, setLevelFilter] = useState('all-levels');
  const [statusFilter, setStatusFilter] = useState('all-status');
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [publishedCourses, setPublishedCourses] = useState([]);
  const [editCourse, setEditCourse] = useState(null);
  const [editCourseType, setEditCourseType] = useState(null);
  const isEditModalOpen = !!editCourse;
  
  // Convert the hardcoded arrays to state
  const [openCourses, setOpenCourses] = useState([
    {
      id: "1",
      title: "Advanced JavaScript",
      description: "Master modern JavaScript concepts and ES6+ features",
      category: "Web Development",
      status: "Published",
      courseType: "Open",
      students: 45,
      moduleCount: 3,
      createdAt: "May 10, 2025",
      lastUpdated: "May 15, 2025",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      difficulty: "Advanced",
      duration: "8 weeks",
      isActive: true
    },
    {
      id: "2",
      title: "React Development",
      description: "Build modern web applications with React",
      category: "Web Development",
      status: "Published",
      courseType: "Open",
      students: 62,
      moduleCount: 2,
      createdAt: "May 5, 2025",
      lastUpdated: "May 12, 2025",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
      difficulty: "Intermediate",
      duration: "10 weeks",
      isActive: true
    },
    {
      id: "3",
      title: "Node.js Backend",
      description: "Server-side development with Node.js and Express",
      category: "Web Development",
      status: "Published",
      courseType: "Open",
      students: 38,
      moduleCount: 1,
      createdAt: "May 12, 2025",
      lastUpdated: "May 18, 2025",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
      difficulty: "Intermediate",
      duration: "6 weeks",
      isActive: false
    },
    {
      id: "4",
      title: "CSS Grid & Flexbox",
      description: "Master modern CSS layout techniques",
      category: "Web Development",
      status: "Published",
      courseType: "Open",
      students: 89,
      moduleCount: 4,
      createdAt: "May 8, 2025",
      lastUpdated: "May 20, 2025",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
      difficulty: "Beginner",
      duration: "4 weeks",
      isActive: true
    },
    {
      id: "5",
      title: "TypeScript Fundamentals",
      description: "Learn TypeScript for scalable JavaScript development",
      category: "Web Development",
      status: "Published",
      courseType: "Open",
      students: 156,
      moduleCount: 5,
      createdAt: "May 1, 2025",
      lastUpdated: "May 22, 2025",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      difficulty: "Intermediate",
      duration: "6 weeks",
      isActive: true
    },
    {
      id: "6",
      title: "Vue.js Complete Guide",
      description: "Build interactive web applications with Vue.js",
      category: "Web Development",
      status: "Published",
      courseType: "Open",
      students: 73,
      moduleCount: 3,
      createdAt: "May 3, 2025",
      lastUpdated: "May 25, 2025",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
      difficulty: "Intermediate",
      duration: "8 weeks",
      isActive: true
    }
  ]);

  const [sequentialCourses, setSequentialCourses] = useState([
    {
      id: "7",
      title: "Python for Data Science",
      description: "Data analysis and machine learning with Python",
      category: "Data Science",
      status: "Published",
      courseType: "Sequential",
      students: 234,
      moduleCount: 8,
      createdAt: "May 14, 2025",
      lastUpdated: "May 20, 2025",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop",
      difficulty: "Beginner",
      duration: "12 weeks",
      isActive: true
    },
    {
      id: "8",
      title: "Machine Learning Fundamentals",
      description: "Introduction to machine learning algorithms and techniques",
      category: "Data Science",
      status: "Published",
      courseType: "Sequential",
      students: 187,
      moduleCount: 6,
      createdAt: "May 16, 2025",
      lastUpdated: "May 22, 2025",
      thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop",
      difficulty: "Intermediate",
      duration: "8 weeks",
      isActive: true
    },
    {
      id: "9",
      title: "React Native Development",
      description: "Build cross-platform mobile apps with React Native",
      category: "Mobile Development",
      status: "Published",
      courseType: "Sequential",
      students: 145,
      moduleCount: 7,
      createdAt: "May 18, 2025",
      lastUpdated: "May 24, 2025",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=200&fit=crop",
      difficulty: "Advanced",
      duration: "10 weeks",
      isActive: false
    },
    {
      id: "10",
      title: "Full Stack Development Path",
      description: "Complete journey from frontend to backend development",
      category: "Web Development",
      status: "Published",
      courseType: "Sequential",
      students: 312,
      moduleCount: 12,
      createdAt: "May 11, 2025",
      lastUpdated: "May 26, 2025",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop",
      difficulty: "Intermediate",
      duration: "16 weeks",
      isActive: true
    },
    {
      id: "11",
      title: "DevOps Mastery Track",
      description: "Learn CI/CD, Docker, Kubernetes, and cloud deployment",
      category: "DevOps",
      status: "Published",
      courseType: "Sequential",
      students: 198,
      moduleCount: 9,
      createdAt: "May 7, 2025",
      lastUpdated: "May 28, 2025",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop",
      difficulty: "Advanced",
      duration: "14 weeks",
      isActive: true
    },
    {
      id: "12",
      title: "UI/UX Design Journey",
      description: "From user research to high-fidelity prototypes",
      category: "Design",
      status: "Published",
      courseType: "Sequential",
      students: 267,
      moduleCount: 10,
      createdAt: "May 9, 2025",
      lastUpdated: "May 30, 2025",
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop",
      difficulty: "Beginner",
      duration: "12 weeks",
      isActive: true
    }
  ]);

  // Load published courses from localStorage and refresh when component mounts or route changes
  useEffect(() => {
    const loadPublishedCourses = () => {
      const savedCourses = localStorage.getItem('published-courses');
      if (savedCourses) {
        const courses = JSON.parse(savedCourses);
        
        // Enhance each course with actual module data
        const enhancedCourses = courses.map((course) => {
          // Load actual course data including modules
          const courseData = localStorage.getItem(`course-${course.id}`);
          if (courseData) {
            const parsedCourseData = JSON.parse(courseData);
            return {
              ...course,
              modules: parsedCourseData.modules || [],
              moduleCount: parsedCourseData.modules?.length || 0
            };
          }
          return course;
        });
        
        console.log('Loaded published courses with modules:', enhancedCourses);
        setPublishedCourses(enhancedCourses);
      }
    };

    loadPublishedCourses();

    // Set up interval to check for new courses every 2 seconds
    const interval = setInterval(loadPublishedCourses, 2000);

    return () => clearInterval(interval);
  }, []);

  // Also listen for storage events to update in real-time
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'published-courses' || e.key?.startsWith('course-')) {
        const savedCourses = localStorage.getItem('published-courses');
        if (savedCourses) {
          const courses = JSON.parse(savedCourses);
          
          // Enhance each course with actual module data
          const enhancedCourses = courses.map((course) => {
            const courseData = localStorage.getItem(`course-${course.id}`);
            if (courseData) {
              const parsedCourseData = JSON.parse(courseData);
              return {
                ...course,
                modules: parsedCourseData.modules || [],
                moduleCount: parsedCourseData.modules?.length || 0
              };
            }
            return course;
          });
          
          console.log('Storage updated with courses:', enhancedCourses);
          setPublishedCourses(enhancedCourses);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getCurrentCourses = () => {
    let allCourses = [...openCourses, ...sequentialCourses, ...publishedCourses];
    
    // Filter by course type
    const typeFilteredCourses = allCourses.filter(course => 
      course.courseType.toLowerCase() === courseTypeFilter
    );

    // Then filter by tab
    switch (courseTab) {
      case 'courses':
        return typeFilteredCourses.filter(course => course.isActive);
      case 'archived':
        return typeFilteredCourses.filter(course => !course.isActive);
      case 'deleted':
        return [];
      default:
        return typeFilteredCourses;
    }
  };

  const currentCourses = getCurrentCourses();
  
  const filteredCourses = currentCourses.filter(course => {
    // Search filter
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    // Level filter
    const matchesLevel = levelFilter === 'all-levels' || 
      course.difficulty?.toLowerCase() === levelFilter.toLowerCase();

    // Status filter
    const matchesStatus = statusFilter === 'all-status' || 
      course.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesLevel && matchesStatus;
  });

  const handleCourseClick = (courseId) => {
    navigate(`/courses/edit/${courseId}`);
  };

  const handleCourseAction = (action, courseId) => {
    console.log(`${action} for course ${courseId}`);
    let course = openCourses.find(c => c.id === courseId) || sequentialCourses.find(c => c.id === courseId) || publishedCourses.find(c => c.id === courseId);
    let type = openCourses.find(c => c.id === courseId) ? 'open' : sequentialCourses.find(c => c.id === courseId) ? 'sequential' : 'published';

    switch (action) {
      case 'view':
        navigate(`/courses/view/${courseId}`);
        break;
      case 'edit':
        setEditCourse(course);
        setEditCourseType(type);
        break;
      case 'archive':
        setOpenCourses(prev => prev.map(course => course.id === courseId ? { ...course, isActive: !course.isActive } : course));
        setSequentialCourses(prev => prev.map(course => course.id === courseId ? { ...course, isActive: !course.isActive } : course));
        setPublishedCourses(prev => prev.map(course => course.id === courseId ? { ...course, isActive: !course.isActive } : course));
        break;
      case 'delete':
        if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
          setOpenCourses(prev => prev.filter(course => course.id !== courseId));
          setSequentialCourses(prev => prev.filter(course => course.id !== courseId));
          setPublishedCourses(prev => prev.filter(course => course.id !== courseId));
          console.log(`Deleted course ${courseId}`);
          alert('Course deleted successfully!');
        }
        break;
      default:
        console.warn(`Unknown action: ${action}`);
    }
  };

  const handleEditCourseSave = (updatedCourse) => {
    if (editCourseType === 'open') {
      setOpenCourses(prev => prev.map(course => course.id === updatedCourse.id ? updatedCourse : course));
    } else if (editCourseType === 'sequential') {
      setSequentialCourses(prev => prev.map(course => course.id === updatedCourse.id ? updatedCourse : course));
    } else if (editCourseType === 'published') {
      setPublishedCourses(prev => prev.map(course => course.id === updatedCourse.id ? updatedCourse : course));
    }
    setEditCourse(null);
    setEditCourseType(null);
  };

  const handleCatalogClick = () => {
    navigate('/catalog');
  };

  const getTabCount = (tab) => {
    let allCourses = [...openCourses, ...sequentialCourses, ...publishedCourses];
    const typeFilteredCourses = allCourses.filter(course => 
      course.courseType.toLowerCase() === courseTypeFilter
    );

    switch (tab) {
      case 'courses':
        return typeFilteredCourses.filter(course => course.isActive).length;
      case 'archived':
        return typeFilteredCourses.filter(course => !course.isActive).length;
      case 'deleted':
        return 0;
      default:
        return 0;
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">Courses</h1>
          <p className="text-gray-600 mt-1">Manage your course catalog and create new learning experiences</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button 
            variant="outline"
            onClick={() => setIsEnrollModalOpen(true)}
            className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            <Users className="h-4 w-4 mr-2" />
            Enroll
          </Button>
          <Button 
            onClick={() => navigate('/courses/create')} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Course
          </Button>
        </div>
      </div>

      {/* Course Status Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <Button
          variant={courseTab === 'courses' ? 'default' : 'outline'}
          onClick={() => setCourseTab('courses')}
          className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
            courseTab === 'courses' 
              ? 'bg-cyan-500 text-white hover:bg-cyan-600' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Courses {getTabCount('courses')}
        </Button>
        <Button
          variant={courseTab === 'archived' ? 'default' : 'outline'}
          onClick={() => setCourseTab('archived')}
          className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
            courseTab === 'archived' 
              ? 'bg-gray-500 text-white hover:bg-gray-600' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Archived {getTabCount('archived')}
        </Button>
        <Button
          variant={courseTab === 'deleted' ? 'default' : 'outline'}
          onClick={() => setCourseTab('deleted')}
          className={`rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap ${
            courseTab === 'deleted' 
              ? 'bg-gray-500 text-white hover:bg-gray-600' 
              : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          Deleted {getTabCount('deleted')}
        </Button>
      </div>

      {/* Controls Bar */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-4 gap-4">
          {/* Left Side - Search */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-gray-300 focus-visible:ring-blue-500 w-full lg:w-64"
              />
            </div>
          </div>

          {/* Right Side - Filters and Views */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-28 border-gray-300">
                <SelectValue placeholder="All levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-levels">All levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-28 border-gray-300">
                <SelectValue placeholder="All status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-status">All status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline"
              onClick={handleCatalogClick}
              className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap"
            >
              <FolderOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Catalog</span>
            </Button>

            <Button
              variant={courseTypeFilter === 'open' ? 'default' : 'outline'}
              onClick={() => setCourseTypeFilter('open')}
              className={`whitespace-nowrap ${courseTypeFilter === 'open' ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-600" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}
            >
              Open
            </Button>

            <Button
              variant={courseTypeFilter === 'sequential' ? 'default' : 'outline'}
              onClick={() => setCourseTypeFilter('sequential')}
              className={`whitespace-nowrap ${courseTypeFilter === 'sequential' ? "bg-gray-600 text-white hover:bg-gray-700 border-gray-600" : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"}`}
            >
              Sequential
            </Button>

            {/* View Toggle */}
            <div className="flex border rounded-lg overflow-hidden">
              <Button
                variant={view === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('grid')}
                className="rounded-none border-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={view === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setView('list')}
                className="rounded-none border-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first course to get started'}
            </p>
            {!searchQuery && (
              <Button 
                onClick={() => navigate('/courses/create')} 
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Course
              </Button>
            )}
          </div>
        ) : (
          <div className="p-6">
            {view === 'grid' ? (
              <CourseGrid 
                courses={filteredCourses} 
                onCourseClick={handleCourseClick}
                onCourseAction={handleCourseAction}
              />
            ) : (
              <CourseList 
                courses={filteredCourses} 
                onCourseClick={handleCourseClick}
                onCourseAction={handleCourseAction}
              />
            )}
          </div>
        )}
      </div>

      {/* Enrollment Modal */}
      <EnrollModal
        open={isEnrollModalOpen}
        onOpenChange={setIsEnrollModalOpen}
      />
      {/* Edit Course Modal - always mounted for Radix Dialog stability */}
      <Dialog 
        open={isEditModalOpen} 
        onOpenChange={(open) => { if (!open) { setEditCourse(null); setEditCourseType(null); } }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          {editCourse && (
            <form onSubmit={e => {
              e.preventDefault();
              const form = e.target;
              const updated = {
                ...editCourse,
                title: form.title.value,
                description: form.description.value,
                difficulty: form.difficulty.value,
                duration: form.duration.value
              };
              handleEditCourseSave(updated);
              // Do NOT call setEditCourse(null) or setEditCourseType(null) here
            }} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" name="title" defaultValue={editCourse.title} required />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input id="description" name="description" defaultValue={editCourse.description} required />
              </div>
              <div>
                <Label htmlFor="difficulty">Difficulty</Label>
                <Select name="difficulty" defaultValue={editCourse.difficulty}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input id="duration" name="duration" defaultValue={editCourse.duration} required />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setEditCourse(null); setEditCourseType(null); }}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Courses;