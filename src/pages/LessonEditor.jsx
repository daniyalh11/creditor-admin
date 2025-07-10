import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, PencilRuler, Save, FileCheck, Settings } from 'lucide-react';
import { ContentSectionsList } from '@/components/courses/modules/ContentSectionsList';
import { RichTextEditor } from '@/components/courses/RichTextEditor';
import { ImageUpload } from '@/components/courses/ImageUpload';
import { useToast } from '@/hooks/use-toast';

const LessonEditor = () => {
  const { id, unitId, moduleId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [lesson, setLesson] = useState({
    id: id || '1',
    title: 'Legal Terminology',
    description: 'Understanding common legal terms and concepts',
    unitId: unitId || '1',
    unitTitle: 'Introduction to Legal Concepts',
    moduleId: moduleId || '1',
    moduleTitle: 'Legal System Basics',
    courseId: '1',
    courseTitle: 'Introduction to Legal Studies',
    image: '',
    estimatedTime: 15,
    theme: 'default',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
    sections: [
      {
        id: 'section-1',
        type: 'text',
        title: 'Common Legal Terms',
        content: 'This section covers common legal terminology used in the field.'
      }
    ]
  });

  const [activeTab, setActiveTab] = useState('content');

  const updateLesson = (updates) => {
    setLesson((prevLesson) => ({
      ...prevLesson,
      ...updates
    }));
  };

  const handleSave = () => {
    console.log('Saving lesson data:', lesson);
    toast({
      title: 'Lesson saved',
      description: 'Lesson has been successfully saved.'
    });
  };

  const handleSaveSettings = () => {
    console.log('Saving lesson settings:', {
      title: lesson.title,
      description: lesson.description,
      estimatedTime: lesson.estimatedTime,
      theme: lesson.theme,
      fontFamily: lesson.fontFamily,
      primaryColor: lesson.primaryColor
    });
    toast({
      title: 'Settings saved',
      description: 'Lesson settings have been successfully updated.'
    });
  };

  const handlePublish = () => {
    console.log('Publishing lesson data:', lesson);
    toast({
      title: 'Lesson published',
      description: 'Lesson is now available to students.'
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate(`/modules/edit/${lesson.moduleId}`)}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Module
          </Button>
          <div>
            <div className="text-sm text-gray-500 mb-1">
              {lesson.courseTitle} → {lesson.moduleTitle} → {lesson.unitTitle}
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700">
            <FileCheck className="h-4 w-4 mr-2" />
            Publish
          </Button>
        </div>
      </div>

      <Card className="border-gray-200">
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-gray-200 px-6 pt-6">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="content" className="flex items-center gap-1.5">
                  <PencilRuler className="h-3.5 w-3.5" />
                  Lesson Info
                </TabsTrigger>
                <TabsTrigger value="sections" className="flex items-center gap-1.5">
                  <PencilRuler className="h-3.5 w-3.5" />
                  Content Sections
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
                      Lesson Title
                    </label>
                    <Input
                      value={lesson.title}
                      onChange={(e) => updateLesson({ title: e.target.value })}
                      className="text-lg font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <RichTextEditor
                      value={lesson.description}
                      onChange={(value) => updateLesson({ description: value })}
                      placeholder="Enter lesson description..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Estimated Time (minutes)
                      </label>
                      <Input
                        type="number"
                        value={lesson.estimatedTime}
                        onChange={(e) =>
                          updateLesson({ estimatedTime: parseInt(e.target.value) || 0 })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lesson Cover Image
                    </label>
                    <ImageUpload
                      currentImage={lesson.image}
                      onImageChange={(image) => updateLesson({ image: image || '' })}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sections" className="mt-0">
                <ContentSectionsList lessonId={lesson.id} sections={lesson.sections} />
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">Lesson Settings</h2>
                      <p className="text-gray-600 text-sm mb-6">
                        Customize your lesson appearance and details
                      </p>
                    </div>
                    <Button onClick={handleSaveSettings} className="bg-blue-600 hover:bg-blue-700">
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>

                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="settings-lesson-title">Lesson Title</Label>
                        <Input
                          id="settings-lesson-title"
                          value={lesson.title}
                          onChange={(e) => updateLesson({ title: e.target.value })}
                          placeholder="New Lesson"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="settings-description">Description</Label>
                        <Input
                          id="settings-description"
                          value={lesson.description}
                          onChange={(e) => updateLesson({ description: e.target.value })}
                          placeholder="Course description"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="settings-estimated-time">Estimated Time (minutes)</Label>
                        <Input
                          id="settings-estimated-time"
                          type="number"
                          value={lesson.estimatedTime}
                          onChange={(e) =>
                            updateLesson({ estimatedTime: parseInt(e.target.value) || 0 })
                          }
                          className="mt-1"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Appearance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="theme-select">Theme</Label>
                        <Select
                          value={lesson.theme}
                          onValueChange={(value) => updateLesson({ theme: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">Default</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="classic">Classic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="font-family-select">Font Family</Label>
                        <Select
                          value={lesson.fontFamily}
                          onValueChange={(value) => updateLesson({ fontFamily: value })}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select font family" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Lato">Lato</SelectItem>
                            <SelectItem value="Poppins">Poppins</SelectItem>
                            <SelectItem value="Nunito">Nunito</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="primary-color">Primary Color</Label>
                        <div className="flex items-center gap-3 mt-1">
                          <input
                            id="primary-color"
                            type="color"
                            value={lesson.primaryColor}
                            onChange={(e) => updateLesson({ primaryColor: e.target.value })}
                            className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                          />
                          <Input
                            value={lesson.primaryColor}
                            onChange={(e) => updateLesson({ primaryColor: e.target.value })}
                            placeholder="#3b82f6"
                            className="flex-1"
                          />
                        </div>
                      </div>
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

export default LessonEditor;
