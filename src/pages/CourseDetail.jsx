import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Search, FileText, Edit, Play, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [editingModule, setEditingModule] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    if (id) {
      let courseData = localStorage.getItem(`course-${id}`);
      if (courseData) {
        const parsedCourse = JSON.parse(courseData);
        setCourse(parsedCourse);
        if (parsedCourse.modules && parsedCourse.modules.length > 0) {
          setModules(parsedCourse.modules);
        }
      } else {
        const publishedCourses = JSON.parse(localStorage.getItem('published-courses') || '[]');
        const foundCourse = publishedCourses.find(c => c.id === id);
        if (foundCourse) {
          setCourse(foundCourse);
          setModules(foundCourse.modules || []);
        }
      }
    }
  }, [id]);

  const filteredModules = modules.filter(module =>
    module.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddModule = () => {
    navigate(`/courses/builder/${id}`);
  };

  const handleViewModule = (moduleId) => {
    navigate(`/modules/view/${moduleId}?courseId=${id}`);
  };

  const handleEditModule = (moduleId) => {
    navigate(`/modules/edit/${moduleId}?courseId=${id}`);
  };

  // Add a function to update a module in state and localStorage
  const handleUpdateModule = (updatedModule) => {
    setModules((prev) => {
      const newModules = prev.map((m) => m.id === updatedModule.id ? { ...m, ...updatedModule } : m);
      // Also update in localStorage
      if (course) {
        const updatedCourse = { ...course, modules: newModules };
        setCourse(updatedCourse);
        localStorage.setItem(`course-${course.id}`, JSON.stringify(updatedCourse));
        // Also update in published-courses if present
        const publishedCourses = JSON.parse(localStorage.getItem('published-courses') || '[]');
        const idx = publishedCourses.findIndex(c => c.id === course.id);
        if (idx !== -1) {
          publishedCourses[idx] = updatedCourse;
          localStorage.setItem('published-courses', JSON.stringify(publishedCourses));
        }
      }
      return newModules;
    });
    setShowEditDialog(false);
    setEditingModule(null);
  };

  // Module Edit Dialog UI
  const renderEditDialog = () => {
    if (!editingModule) return null;
    const [form, setForm] = React.useState({ ...editingModule });
    const [errors, setErrors] = React.useState({});
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
    const handleSave = () => {
      const errs = {};
      if (!form.topic?.trim()) errs.topic = 'Module title is required';
      if (!form.description?.trim()) errs.description = 'Description is required';
      setErrors(errs);
      if (Object.keys(errs).length === 0) {
        handleUpdateModule(form);
      }
    };
    return (
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Module</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Module Title</label>
              <input
                name="topic"
                value={form.topic || ''}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                autoFocus
              />
              {errors.topic && <div className="text-xs text-red-500 mt-1">{errors.topic}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={form.description || ''}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                rows={3}
              />
              {errors.description && <div className="text-xs text-red-500 mt-1">{errors.description}</div>}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>Cancel</Button>
              <Button onClick={handleSave} className="bg-blue-600 text-white">Update</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  if (!course) {
    return (
      <div className="container mx-auto p-6 animate-fade-in">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Course not found</h3>
          <Button onClick={() => navigate('/courses')} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/courses')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <PageHeader
            title={course.title}
            description={course.description}
          />
        </div>
        <Badge variant={course.status === 'Published' ? 'default' : 'secondary'}>
          {course.status}
        </Badge>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleAddModule} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      {filteredModules.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No modules yet</h3>
          <p className="text-muted-foreground mb-4">
            Start building your course by adding modules
          </p>
          <Button onClick={handleAddModule} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create First Module
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredModules.map((module, index) => (
            <Card key={module.id} className="hover:shadow-md transition-shadow relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Module {index + 1}: {module.topic || module.title}</span>
                  </CardTitle>
                  <Badge variant="default">Published</Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => { setEditingModule(module); setShowEditDialog(true); }}>
                        <Edit className="h-4 w-4 mr-2" /> Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Units:</span>
                    <span className="font-medium ml-2">0</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Assessments:</span>
                    <span className="font-medium ml-2">0</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium ml-2">0 Hours</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewModule(module.id)}
                  >
                    <Play className="h-4 w-4 mr-1" />
                    View Module
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEditModule(module.id)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Module
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      {renderEditDialog()}
    </div>
  );
};

export default CourseDetail;
