import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FolderOpen, Search, Plus, BookOpen, X, Edit, Trash2,
  Users, Clock, MoreHorizontal, Archive, Image, X as CloseIcon
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
import { useRef } from 'react';

const CatalogDetail = () => {
  const { catalogId } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Move catalog data to state so we can update it
  const [catalog, setCatalog] = useState(() => {
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
            status: 'Published',
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
            status: 'Published',
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
            status: 'Published',
            students: 75,
            thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop',
            duration: '6 weeks',
            difficulty: 'Advanced',
            isActive: true
          }
        ]
      }
    };
    return catalogs[catalogId] || catalogs['1'];
  });

  // Available courses that can be added to the catalog
  const [availableCourses, setAvailableCourses] = useState([
    {
      id: '8',
      title: 'Personal Sovereignty Basics',
      description: 'Fundamentals of personal sovereignty',
      category: 'SOVEREIGNTY 101',
      status: 'Published',
      students: 28,
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop',
      duration: '4 weeks',
      difficulty: 'Beginner',
      isActive: true
    },
    {
      id: '9',
      title: 'Advanced Constitutional Law',
      description: 'Deep dive into constitutional law',
      category: 'Constitutional',
      status: 'Published',
      students: 22,
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
      duration: '8 weeks',
      difficulty: 'Advanced',
      isActive: true
    },
    {
      id: '10',
      title: 'Commercial Law Fundamentals',
      description: 'Introduction to commercial law',
      category: 'Commercial',
      status: 'Draft',
      students: 0,
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=200&fit=crop',
      duration: '6 weeks',
      difficulty: 'Intermediate',
      isActive: false
    },
    {
      id: '11',
      title: 'Banking and Finance Law',
      description: 'Legal aspects of banking and finance',
      category: 'Financial',
      status: 'Published',
      students: 18,
      thumbnail: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=400&h=200&fit=crop',
      duration: '5 weeks',
      difficulty: 'Intermediate',
      isActive: true
    }
  ]);

  // Add state for edit and image dialogs
  const [editCourse, setEditCourse] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '', duration: '', difficulty: '' });
  const [updateImageCourseId, setUpdateImageCourseId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [deleteCourseId, setDeleteCourseId] = useState(null);
  const fileInputRef = useRef();

  // Add validation state for edit dialog
  const [editErrors, setEditErrors] = useState({});

  // Example categories and difficulties for dropdowns
  const courseCategories = ['Frontend', 'Backend', 'Full Stack', 'Mobile', 'AI/ML', 'Programming', 'Infrastructure', 'SOVEREIGNTY 101', 'Constitutional', 'Commercial', 'Financial'];
  const courseDifficulties = ['Beginner', 'Intermediate', 'Advanced'];

  // Filter courses by searchQuery for both active and archived
  const filteredActiveCourses = catalog.courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (course.description || '').toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredArchivedCourses = catalog.courses.filter(course => course.isActive === false);

  // Edit course handlers
  const openEditDialog = (course) => {
    setEditCourse(course);
    setEditForm({
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration,
      difficulty: course.difficulty,
    });
    setEditErrors({});
  };
  const closeEditDialog = () => {
    setEditCourse(null);
    setEditErrors({});
  };
  const validateEditForm = () => {
    const errors = {};
    if (!editForm.title.trim()) errors.title = 'Title is required.';
    if (!editForm.category.trim()) errors.category = 'Category is required.';
    if (!editForm.duration.trim()) errors.duration = 'Duration is required.';
    return errors;
  };
  const handleEditFormChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setEditErrors({ ...editErrors, [e.target.name]: undefined });
  };
  const saveEditCourse = () => {
    const errors = validateEditForm();
    if (Object.keys(errors).length > 0) {
      setEditErrors(errors);
      return;
    }
    setCatalog(prev => ({
      ...prev,
      courses: prev.courses.map(course =>
        course.id === editCourse.id ? { ...course, ...editForm } : course
      )
    }));
    setEditCourse(null);
    setEditErrors({});
  };

  // Image upload handlers
  const openImageDialog = (courseId) => {
    setUpdateImageCourseId(courseId);
    setImageFile(null);
    setImageError('');
  };
  const closeUpdateImageDialog = () => {
    setUpdateImageCourseId(null);
    setImageFile(null);
    setImageError('');
  };
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setImageError('Please select a valid image file.');
        setImageFile(null);
        return;
      }
      setImageFile(file);
      setImageError('');
    }
  };
  const saveImage = () => {
    if (imageFile && updateImageCourseId) {
      const imageUrl = URL.createObjectURL(imageFile);
      setCatalog(prev => ({
        ...prev,
        courses: prev.courses.map(course =>
          course.id === updateImageCourseId ? { ...course, thumbnail: imageUrl } : course
        )
      }));
      setUpdateImageCourseId(null);
      setImageFile(null);
    }
  };

  // Remove from catalog
  const handleRemoveCourse = (courseId) => {
    setCatalog(prev => ({
      ...prev,
      courses: prev.courses.filter(course => course.id !== courseId)
    }));
  };

  // Archive course
  const handleArchiveCourse = (courseId) => {
    setCatalog(prev => ({
      ...prev,
      courses: prev.courses.map(course =>
        course.id === courseId ? { ...course, isActive: false } : course
      )
    }));
  };

  // Delete course
  const handleCourseAction = (action, courseId) => {
    switch (action) {
      case 'edit':
        openEditDialog(catalog.courses.find(c => c.id === courseId));
        break;
      case 'view':
        navigate(`/courses/view/${courseId}`);
        break;
      case 'updateImage':
        openImageDialog(courseId);
        break;
      case 'archive':
        handleArchiveCourse(courseId);
        break;
      case 'delete':
        setDeleteCourseId(courseId);
        break;
      default:
        break;
    }
  };
  const confirmDeleteCourse = () => {
    if (deleteCourseId) {
      setCatalog(prev => ({
        ...prev,
        courses: prev.courses.filter(course => course.id !== deleteCourseId)
      }));
      setDeleteCourseId(null);
    }
  };

  // Split courses into active and archived
  const activeCourses = catalog.courses.filter(course => course.isActive !== false);
  const archivedCourses = catalog.courses.filter(course => course.isActive === false);

  const handleAddCourses = (courseIds) => {
    const coursesToAdd = availableCourses.filter(course => 
      courseIds.includes(course.id) && 
      !catalog.courses.some(existing => existing.id === course.id)
    );
    
    if (coursesToAdd.length > 0) {
      setCatalog(prev => ({
        ...prev,
        courses: [...prev.courses, ...coursesToAdd]
      }));
      
      // Remove added courses from available courses
      setAvailableCourses(prev => 
        prev.filter(course => !courseIds.includes(course.id))
      );
    }
  };

  const handleCourseClick = (courseId) => {
    navigate(`/courses/view/${courseId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Advanced': return 'bg-red-100 text-red-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Beginner': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Keyboard accessibility for dialogs
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (editCourse) closeEditDialog();
        if (updateImageCourseId) closeUpdateImageDialog();
        if (deleteCourseId) setDeleteCourseId(null);
      }
    };
    if (editCourse || updateImageCourseId || deleteCourseId) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [editCourse, updateImageCourseId, deleteCourseId]);

  return (
    <div className="flex flex-col h-full">
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

      {/* Set a fixed height for ScrollArea so it scrolls when content overflows */}
      <ScrollArea className="flex-1 px-4 pb-4 h-[calc(100vh-180px)]">
        {filteredActiveCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
            {filteredActiveCourses.map(course => (
              <Card
                key={course.id}
                className="overflow-hidden flex flex-col border-gray-200 transition-all hover:shadow-lg group relative cursor-pointer"
                // Remove onClick from Card
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
                    onClick={() => handleCourseClick(course.id)}
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
                          onClick={e => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border shadow-lg" onClick={e => e.stopPropagation()}>
                        <DropdownMenuItem onClick={() => handleCourseAction('edit', course.id)}>
                          <Edit className="h-4 w-4 mr-2" /> Edit Course
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleCourseAction('updateImage', course.id)}>
                          <Image className="h-4 w-4 mr-2" /> Update Image
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleRemoveCourse(course.id)}>
                          <X className="h-4 w-4 mr-2" /> Remove from Catalog
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <CardContent className="flex flex-col flex-grow p-4 cursor-pointer" onClick={() => handleCourseClick(course.id)}>
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
        {/* Archived Courses Section */}
        {filteredArchivedCourses.length > 0 && (
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Archived Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-fade-in">
              {filteredArchivedCourses.map(course => (
                <Card
                  key={course.id}
                  className="overflow-hidden flex flex-col border-gray-200 transition-all hover:shadow-lg group relative cursor-pointer opacity-70"
                  onClick={() => handleCourseClick(course.id)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary">Archived</Badge>
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>

      <AddCourseToCatalogDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        catalogId={catalogId || ''}
        availableCourses={availableCourses}
        onAddCourses={handleAddCourses}
      />
      {/* Edit Course Dialog */}
      {editCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md sm:max-w-lg relative mx-2">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={closeEditDialog} aria-label="Close"><CloseIcon className="h-5 w-5" /></button>
            <h2 className="text-lg font-semibold mb-4">Edit Course</h2>
            <form className="space-y-3" onSubmit={e => { e.preventDefault(); saveEditCourse(); }}>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="edit-title">Title *</label>
                <input
                  id="edit-title"
                  className={`w-full border rounded px-3 py-2 ${editErrors.title ? 'border-red-500' : ''}`}
                  name="title"
                  value={editForm.title}
                  onChange={handleEditFormChange}
                  placeholder="Course Title"
                  autoFocus
                />
                {editErrors.title && <div className="text-xs text-red-500 mt-1">{editErrors.title}</div>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="edit-description">Description</label>
                <textarea
                  id="edit-description"
                  className="w-full border rounded px-3 py-2"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  placeholder="Description"
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="edit-category">Category *</label>
                <select
                  id="edit-category"
                  className={`w-full border rounded px-3 py-2 ${editErrors.category ? 'border-red-500' : ''}`}
                  name="category"
                  value={editForm.category}
                  onChange={handleEditFormChange}
                  required
                >
                  <option value="">Select category</option>
                  {courseCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {editErrors.category && <div className="text-xs text-red-500 mt-1">{editErrors.category}</div>}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="edit-duration">Duration *</label>
                  <input
                    id="edit-duration"
                    className={`w-full border rounded px-3 py-2 ${editErrors.duration ? 'border-red-500' : ''}`}
                    name="duration"
                    value={editForm.duration}
                    onChange={handleEditFormChange}
                    placeholder="Duration"
                  />
                  {editErrors.duration && <div className="text-xs text-red-500 mt-1">{editErrors.duration}</div>}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1" htmlFor="edit-difficulty">Difficulty</label>
                  <select
                    id="edit-difficulty"
                    className="w-full border rounded px-3 py-2"
                    name="difficulty"
                    value={editForm.difficulty}
                    onChange={handleEditFormChange}
                  >
                    <option value="">Select difficulty</option>
                    {courseDifficulties.map(diff => (
                      <option key={diff} value={diff}>{diff}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" type="button" onClick={closeEditDialog}>Cancel</Button>
                <Button type="submit" disabled={Object.keys(validateEditForm()).length > 0}>Save</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Update Image Dialog */}
      {updateImageCourseId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700" onClick={closeUpdateImageDialog} aria-label="Close"><CloseIcon className="h-5 w-5" /></button>
            <h2 className="text-lg font-semibold mb-4">Update Course Image</h2>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="mb-4"
            />
            {imageError && <div className="text-xs text-red-500 mb-2">{imageError}</div>}
            {imageFile && (
              <img src={URL.createObjectURL(imageFile)} alt="Preview" className="mb-4 w-full h-40 object-cover rounded" />
            )}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={closeUpdateImageDialog}>Cancel</Button>
              <Button onClick={saveImage} disabled={!imageFile || !!imageError}>Save</Button>
            </div>
          </div>
        </div>
      )}
      {/* Render delete confirmation dialog */}
      {deleteCourseId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Delete Course</h2>
            <p>Are you sure you want to delete this course from the catalog?</p>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setDeleteCourseId(null)}>Cancel</Button>
              <Button variant="destructive" onClick={confirmDeleteCourse}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogDetail;