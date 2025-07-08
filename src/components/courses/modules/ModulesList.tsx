import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, BookOpen, FileCheck, MoreHorizontal, ArrowLeft, Lock, Clock, Eye, FileText, Video, Headphones, Play } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ModuleEditDialog } from './ModuleEditDialog';
import { ModuleLessonsView } from '../ModuleLessonsView';
import { ModuleAssessmentsView } from '../ModuleAssessmentsView';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
  estimatedTime?: number;
  type?: 'text' | 'video' | 'audio';
}

interface Lesson {
  id: string;
  title: string;
  sections: ContentSection[];
}

interface ContentSection {
  id: string;
  type: 'text' | 'video' | 'image' | 'file';
  title: string;
  content: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  units: Unit[];
  sections?: number;
  status?: 'Published' | 'Draft';
}

interface Assessment {
  id: string;
  title: string;
  type: 'Quiz' | 'Debate' | 'Survey' | 'Essay' | 'Resources' | 'Assignment';
  description: string;
  duration?: number;
}

interface ModulesListProps {
  courseId: string;
  modules: Array<{
    id: string;
    title: string;
    description: string;
    units: Unit[];
  }>;
  progressionType?: 'open' | 'sequential';
  onViewAssessments?: (module: any) => void;
}

export const ModulesList: React.FC<ModulesListProps> = ({ 
  courseId, 
  modules: initialModules,
  progressionType = 'open',
  onViewAssessments
}) => {
  const navigate = useNavigate();
  
  const [modules, setModules] = useState<Module[]>(
    initialModules.map((module, index) => ({ 
      ...module, 
      sections: index === 0 ? 3 : index === 1 ? 7 : index === 2 ? 5 : Math.floor(Math.random() * 8) + 3,
      status: index < 3 ? 'Published' : Math.random() > 0.5 ? 'Published' : 'Draft',
      units: module.units.map((unit, unitIndex) => ({
        ...unit,
        estimatedTime: unitIndex === 0 ? 15 : unitIndex === 1 ? 25 : unitIndex === 2 ? 10 : Math.floor(Math.random() * 30) + 5,
        type: unitIndex % 3 === 0 ? 'video' : unitIndex % 3 === 1 ? 'text' : 'audio'
      }))
    }))
  );
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [showModuleDialog, setShowModuleDialog] = useState(false);
  const [showUnitsView, setShowUnitsView] = useState(false);
  const [showAssessmentsView, setShowAssessmentsView] = useState(false);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [showLessonsView, setShowLessonsView] = useState(false);
  const [selectedModuleForLessons, setSelectedModuleForLessons] = useState<Module | null>(null);
  const [selectedModuleForAssessments, setSelectedModuleForAssessments] = useState<Module | null>(null);
  const { toast } = useToast();

  // Mock assessments data
  const assessments: Assessment[] = [
    {
      id: 'assessment-1',
      title: 'Legal Principles Quiz',
      type: 'Quiz',
      description: 'Test your understanding of basic legal concepts',
      duration: 15
    },
    {
      id: 'assessment-2',
      title: 'Case Study Analysis',
      type: 'Essay',
      description: 'Analyze a real-world legal case study',
      duration: 45
    },
    {
      id: 'assessment-3',
      title: 'Legal Research Assignment',
      type: 'Assignment',
      description: 'Research and present findings on a legal topic',
      duration: 120
    },
    {
      id: 'assessment-4',
      title: 'Ethics Discussion',
      type: 'Debate',
      description: 'Participate in ethical legal discussions',
      duration: 30
    }
  ];

  // Module thumbnail images
  const getModuleThumbnail = (index: number) => {
    const thumbnails = [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop'
    ];
    return thumbnails[index % thumbnails.length];
  };

  const addNewModule = () => {
    setEditingModule(null);
    setShowModuleDialog(true);
  };

  const editModule = (module: Module) => {
    navigate(`/courses/edit/${courseId}/modules/${module.id}`);
  };

  const handleSaveModule = (moduleData: any) => {
    if (editingModule) {
      setModules(modules.map(module => 
        module.id === editingModule.id 
          ? { ...module, ...moduleData }
          : module
      ));
      toast({
        title: "Module updated",
        description: "Module has been successfully updated.",
      });
    } else {
      const newModule: Module = {
        ...moduleData,
        units: [],
        sections: 0,
        status: 'Draft'
      };
      setModules([...modules, newModule]);
      toast({
        title: "Module created",
        description: "New module has been successfully created.",
      });
    }
    setShowModuleDialog(false);
    setEditingModule(null);
  };

  const deleteModule = (moduleId: string) => {
    setModules(modules.filter(module => module.id !== moduleId));
    toast({
      title: "Module deleted",
      description: "Module has been successfully deleted.",
    });
  };

  // Mock module completion status - in a real app, this would come from backend
  const getModuleCompletion = (moduleIndex: number) => {
    // For demo purposes, in sequential courses only the first module is unlocked
    if (progressionType === 'sequential') {
      return moduleIndex === 0 ? false : false; // Only first module is unlocked, none completed yet
    }
    // For open courses, modules can be in various states
    const completionData: { [key: number]: boolean } = {
      0: false,
      1: false,
      2: false,
    };
    return completionData[moduleIndex] || false;
  };

  // Determine if a module should be unlocked in sequential courses
  const isModuleUnlocked = (moduleIndex: number) => {
    if (progressionType === 'open') {
      return true; // All modules are unlocked in open progression
    }
    
    // In sequential mode, only the first module is unlocked initially
    if (moduleIndex === 0) {
      return true;
    }
    
    // Check if all previous modules are completed
    for (let i = 0; i < moduleIndex; i++) {
      if (!getModuleCompletion(i)) {
        return false;
      }
    }
    
    return true;
  };

  const handleViewUnits = (module: Module) => {
    setSelectedModuleForLessons(module);
    setShowLessonsView(true);
  };

  const handleViewAssessments = (module: Module) => {
    if (onViewAssessments) {
      onViewAssessments(module);
    } else {
      setSelectedModuleForAssessments(module);
      setShowAssessmentsView(true);
    }
  };

  const handleBackToModules = () => {
    setShowLessonsView(false);
    setSelectedModuleForLessons(null);
    setShowUnitsView(false);
    setShowAssessmentsView(false);
    setSelectedModule(null);
    setSelectedModuleForAssessments(null);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Headphones className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'audio':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const getAssessmentTypeColor = (type: string) => {
    switch (type) {
      case 'Quiz':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Essay':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Assignment':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Debate':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewContent = (unitId: string) => {
    toast({
      title: "Loading content",
      description: "Opening unit content viewer...",
    });
  };

  // Units detailed view
  if (showUnitsView && selectedModule) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleBackToModules}
              className="bg-white/80 backdrop-blur-sm border-white/50 text-gray-700 hover:bg-white/90 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                📦 {selectedModule.title} - Lessons
              </h2>
              <p className="text-gray-600">Manage all units and lessons in this module</p>
            </div>
          </div>
        </div>

        {selectedModule.units.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-700">No units yet</h3>
            <p className="text-gray-600 mb-6">
              This module doesn't have any units yet
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {selectedModule.units.map((unit, index) => (
              <Card key={unit.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white rounded-lg overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-gray-100">
                          {getTypeIcon(unit.type || 'text')}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{unit.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge variant="outline" className={`text-xs ${getTypeBadgeColor(unit.type || 'text')}`}>
                              {(unit.type || 'text').charAt(0).toUpperCase() + (unit.type || 'text').slice(1)}
                            </Badge>
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              {unit.estimatedTime || 15} min
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              {unit.lessons?.length || 0} Lessons
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => handleViewContent(unit.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Content
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Assessments detailed view - now replaced with ModuleAssessmentsView
  if (showAssessmentsView && selectedModuleForAssessments) {
    return (
      <ModuleAssessmentsView
        moduleTitle={selectedModuleForAssessments.title}
        onBack={handleBackToModules}
      />
    );
  }

  // Show lessons view when a module's "View Lessons" is clicked
  if (showLessonsView && selectedModuleForLessons) {
    return (
      <ModuleLessonsView
        moduleTitle={selectedModuleForLessons.title}
        onBack={handleBackToModules}
      />
    );
  }

  // Default modules view
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Modules</h2>
          <p className="text-gray-600 text-sm mt-1">
            {progressionType === 'open' ? 'Access modules in any order' : 'Complete modules sequentially to unlock the next one'}
          </p>
        </div>
        <Button onClick={addNewModule} className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>
      </div>

      {modules.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-gray-700">No modules yet</h3>
          <p className="text-gray-600 mb-6">
            Create your first module to organize course content
          </p>
          <Button onClick={addNewModule} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create First Module
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module, index) => {
            const isUnlocked = isModuleUnlocked(index);
            const isCompleted = getModuleCompletion(index);
            
            return (
              <Card key={module.id} className={`group relative border border-gray-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl overflow-hidden ${
                isUnlocked ? 'bg-white' : 'bg-gray-50 opacity-75'
              }`}>
                {/* Module Thumbnail */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={getModuleThumbnail(index)} 
                    alt={module.title}
                    className={`w-full h-full object-cover transition-transform duration-300 ${
                      isUnlocked ? 'group-hover:scale-105' : 'grayscale'
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Action Menu */}
                  <div className="absolute top-3 right-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white border shadow-lg">
                        <DropdownMenuItem onClick={() => editModule(module)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => deleteModule(module.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {/* Lock overlay for locked modules */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3">
                        <Lock className="h-8 w-8 text-gray-600" />
                      </div>
                    </div>
                  )}
                  
                  {/* Completion checkmark */}
                  {isCompleted && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white rounded-full p-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`text-lg font-semibold line-clamp-1 ${
                          isUnlocked ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {module.title}
                        </h3>
                        {!isUnlocked && (
                          <Lock className="h-4 w-4 text-gray-500 flex-shrink-0 ml-2" />
                        )}
                      </div>
                      <p className={`text-sm line-clamp-2 mb-3 ${
                        isUnlocked ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {module.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {module.sections} sections
                      </Badge>
                      <Badge variant={module.status === 'Published' ? 'default' : 'secondary'} className="text-xs">
                        {module.status || 'Published'}
                      </Badge>
                      {!isUnlocked && (
                        <Badge variant="outline" className="text-xs text-gray-500 border-gray-300">
                          Locked
                        </Badge>
                      )}
                      {isCompleted && (
                        <Badge variant="outline" className="text-xs text-green-600 border-green-300 bg-green-50">
                          Completed
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-gray-700 hover:bg-gray-50 border-gray-200"
                        disabled={!isUnlocked}
                        onClick={() => handleViewUnits(module)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        View Lessons
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-gray-700 hover:bg-gray-50 border-gray-200"
                        disabled={!isUnlocked}
                        onClick={() => handleViewAssessments(module)}
                      >
                        <FileCheck className="h-4 w-4 mr-2" />
                        View Assessments
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Module Edit Dialog */}
      <ModuleEditDialog
        open={showModuleDialog}
        onOpenChange={setShowModuleDialog}
        module={editingModule}
        onSave={handleSaveModule}
      />
    </div>
  );
};
