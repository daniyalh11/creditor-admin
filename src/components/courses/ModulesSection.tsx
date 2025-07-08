
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, BookOpen, Users, BarChart3 } from 'lucide-react';
import { ModuleEditDialog } from './modules/ModuleEditDialog';

interface Module {
  id: string;
  topic: string;
  description: string;
  createdAt?: string;
}

interface ModulesSectionProps {
  modules: Module[];
  courseId: string | undefined;
  onAddModule: () => void;
  onEditModule: (moduleId: string) => void;
  onDeleteModule: (moduleId: string) => void;
  onCreateUnits: (moduleId: string) => void;
  onCreateAssessments: (moduleId: string) => void;
  getModuleStats: (moduleId: string) => { units: number; assessments: number; hours: number };
}

export const ModulesSection: React.FC<ModulesSectionProps> = ({
  modules,
  courseId,
  onAddModule,
  onEditModule,
  onDeleteModule,
  onCreateUnits,
  onCreateAssessments,
  getModuleStats
}) => {
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleEditClick = (module: Module) => {
    setEditingModule(module);
    setShowEditDialog(true);
  };

  const handleSaveModule = (updatedModule: any) => {
    console.log('Saving module changes:', updatedModule);
    // Here you would typically update the module in your state management
    // For now, we'll just close the dialog
    setShowEditDialog(false);
    setEditingModule(null);
    
    // Call the parent's onEditModule function if needed
    if (updatedModule.id) {
      onEditModule(updatedModule.id);
    }
  };

  console.log('ModulesSection rendering with modules:', modules);

  return (
    <>
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">Course Modules</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                {modules.length} module{modules.length !== 1 ? 's' : ''} created
              </p>
            </div>
            <Button onClick={onAddModule} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Module
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {modules.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No modules yet</h3>
              <p className="text-gray-600 mb-6">Create your first module to start building your course content</p>
              <Button onClick={onAddModule} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create First Module
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {modules.map((module, index) => {
                const stats = getModuleStats(module.id);
                return (
                  <div key={module.id} className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">{module.topic}</h3>
                            {module.createdAt && (
                              <p className="text-xs text-gray-500">
                                Created: {new Date(module.createdAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4">{module.description}</p>
                        
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {stats.units} Units
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1">
                            <BarChart3 className="h-3 w-3" />
                            {stats.assessments} Assessments
                          </Badge>
                          <Badge variant="outline">
                            {stats.hours}h estimated
                          </Badge>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button 
                            onClick={() => onCreateUnits(module.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            View Lessons
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => onCreateAssessments(module.id)}
                            className="border-purple-300 text-purple-600 hover:bg-purple-50"
                          >
                            <Users className="h-4 w-4 mr-2" />
                            Create Assessments
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditClick(module)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => onDeleteModule(module.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Module Edit Dialog */}
      <ModuleEditDialog
        open={showEditDialog}
        onOpenChange={setShowEditDialog}
        module={editingModule}
        onSave={handleSaveModule}
      />
    </>
  );
};
