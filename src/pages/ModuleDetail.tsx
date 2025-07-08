
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Plus, Search, Video, Edit, Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';

const ModuleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [searchQuery, setSearchQuery] = useState('');
  const [module, setModule] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [units, setUnits] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  
  // Load module and related data from localStorage
  useEffect(() => {
    if (id && courseId) {
      // Load course data
      const courseData = localStorage.getItem(`course-${courseId}`);
      if (courseData) {
        const parsedCourse = JSON.parse(courseData);
        setCourse(parsedCourse);
        
        // Find the specific module
        const foundModule = parsedCourse.modules?.find((m: any) => m.id === id);
        if (foundModule) {
          setModule(foundModule);
        }
      }
      
      // Load units for this module
      const courseUnits = JSON.parse(localStorage.getItem(`course-${courseId}-units`) || '[]');
      const moduleUnits = courseUnits.filter((unit: any) => unit.moduleId === id);
      setUnits(moduleUnits);
      
      // Load assessments for this module
      const courseAssessments = JSON.parse(localStorage.getItem(`course-${courseId}-assessments`) || '[]');
      const moduleAssessments = courseAssessments.filter((assessment: any) => assessment.moduleId === id);
      setAssessments(moduleAssessments);
    }
  }, [id, courseId]);

  const allContent = [...units, ...assessments];
  const filteredContent = allContent.filter(item =>
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddContent = () => {
    navigate(`/courses/builder/${courseId}/units`);
  };

  const handleBackToCourse = () => {
    navigate(`/courses/edit/${courseId}`);
  };

  if (!module || !course) {
    return (
      <div className="container mx-auto p-6 animate-fade-in">
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Module not found</h3>
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
        <Button variant="outline" size="icon" onClick={handleBackToCourse}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <div className="text-sm text-muted-foreground mb-1">
            {course.title} → Module
          </div>
          <PageHeader
            title={module.topic || module.title}
            description={module.description}
          />
        </div>
        <Badge variant="default">
          Published
        </Badge>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={handleAddContent} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      {filteredContent.length === 0 ? (
        <div className="text-center py-12">
          <Video className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No content yet</h3>
          <p className="text-muted-foreground mb-4">
            Start building your module by adding units or assessments
          </p>
          <Button onClick={handleAddContent} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Create First Content
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredContent.map((item, index) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Video className="h-5 w-5 text-blue-600" />
                    <span>{item.title || item.name}</span>
                  </CardTitle>
                  <Badge variant="default">
                    {item.type === 'assessment' ? 'Assessment' : 'Unit'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium ml-2 capitalize">{item.type || 'Unit'}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-medium ml-2">{item.estimatedTime || 0} minutes</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium ml-2">Published</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    View Content
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModuleDetail;
