import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Layout, BookOpen, Save, FileCheck, Settings } from 'lucide-react';
import { UnitsList } from '@/components/courses/modules/UnitsList';
import { RichTextEditor } from '@/components/courses/RichTextEditor';
import { ImageUpload } from '@/components/courses/ImageUpload';
import { useToast } from '@/hooks/use-toast';

const ModuleBuilder = () => {
  const { id, courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [module, setModule] = useState(null);

  const [activeTab, setActiveTab] = useState('content');

  // Load module from course in localStorage
  useEffect(() => {
    if (id && courseId) {
      const courseData = localStorage.getItem(`course-${courseId}`);
      if (courseData) {
        const parsedCourse = JSON.parse(courseData);
        const foundModule = parsedCourse.modules?.find(m => m.id === id);
        if (foundModule) {
          setModule(foundModule);
        }
      }
    }
  }, [id, courseId]);

  const handleSave = () => {
    if (!module || !courseId) return;
    // Update the module in the course's modules array
    const courseData = localStorage.getItem(`course-${courseId}`);
    if (courseData) {
      const parsedCourse = JSON.parse(courseData);
      const updatedModules = (parsedCourse.modules || []).map(m =>
        m.id === module.id ? { ...m, ...module, id: m.id } : m
      );
      const updatedCourse = { ...parsedCourse, modules: updatedModules };
      localStorage.setItem(`course-${courseId}`, JSON.stringify(updatedCourse));
      toast({
        title: "Module saved",
        description: "Module has been successfully saved."
      });
      navigate(`/courses/${courseId}`);
    }
  };

  const handlePublish = () => {
    toast({
      title: "Module published",
      description: "Module is now available to students."
    });
  };

  const handleBackToContent = () => {
    setActiveTab('content');
  };

  if (!module) {
    return <div className="container mx-auto py-12 text-center text-lg">Module not found</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <Card className="border-gray-200">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 px-6 pt-6">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="content" className="flex items-center gap-1.5">
                  <Layout className="h-3.5 w-3.5" />
                  Module Info
                </TabsTrigger>
                <TabsTrigger value="units" className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  Units & Lessons
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center gap-1.5">
                  <Settings className="h-3.5 w-3.5" />
                  Settings
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="content" className="space-y-6 mt-0">
                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module Title
                    </label>
                    <Input
                      value={module.title}
                      onChange={(e) => setModule({ ...module, title: e.target.value, topic: e.target.value })}
                      className="text-lg font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <RichTextEditor
                      value={module.description}
                      onChange={(value) => setModule({ ...module, description: value })}
                      placeholder="Enter module description..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Module Cover Image
                    </label>
                    <ImageUpload
                      currentImage={module.image}
                      onImageChange={(image) => setModule({ ...module, image: image || '' })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="units" className="mt-0">
                <UnitsList
                  moduleId={module.id}
                  units={module.units}
                  onBack={handleBackToContent}
                />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Module Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">
                        Additional settings for this module will be displayed here.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleBuilder;
