import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Plus, ChevronDown, ChevronUp, FileText, HelpCircle, FileCheck, Globe, Settings, MessageSquare, Users } from 'lucide-react';
import { AddSectionDialog } from './AddSectionDialog';
import type { CheckedState } from '@radix-ui/react-checkbox';

interface Section {
  id: string;
  type: 'page' | 'file' | 'quiz' | 'assignment' | 'web-resource' | 'tool' | 'library' | 'scorm' | 'essay' | 'offline-assessment' | 'survey' | 'discussion' | 'debate' | 'checkbox' | 'web-conferencing';
  title: string;
  description?: string;
  status: 'completed' | 'in-progress' | 'not-started';
}

interface Module {
  id: string;
  title: string;
  description: string;
  expanded: boolean;
  sections: Section[];
}

const CourseBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectAll, setSelectAll] = useState(false);
  const [showAddSection, setShowAddSection] = useState<string | null>(null);
  
  const [course] = useState({
    id: id,
    title: 'Introduction to Legal Studies',
    description: 'Basic legal concepts and principles for beginners'
  });

  const [modules, setModules] = useState<Module[]>([
    {
      id: '1',
      title: 'Module 1: Introduction to Credit Analysis',
      description: 'Learn the basics of credit analysis and financial assessment',
      expanded: true,
      sections: [
        {
          id: '1',
          type: 'page',
          title: 'Lesson: Fundamentals of Credit',
          status: 'completed'
        },
        {
          id: '2',
          type: 'quiz',
          title: 'Quiz: Credit Basics',
          status: 'completed'
        },
        {
          id: '3',
          type: 'assignment',
          title: 'Assignment: Financial Statement Review',
          status: 'in-progress'
        }
      ]
    },
    {
      id: '2',
      title: 'Module 2: Financial Statement Analysis',
      description: 'Deep dive into financial statements and ratio analysis',
      expanded: false,
      sections: []
    }
  ]);

  const toggleModule = (moduleId: string) => {
    setModules(modules.map(module => 
      module.id === moduleId 
        ? { ...module, expanded: !module.expanded }
        : module
    ));
  };

  const getSectionIcon = (type: Section['type']) => {
    switch (type) {
      case 'page': return <FileText className="h-4 w-4" />;
      case 'quiz': return <HelpCircle className="h-4 w-4" />;
      case 'assignment': return <FileCheck className="h-4 w-4" />;
      case 'web-resource': return <Globe className="h-4 w-4" />;
      case 'tool': return <Settings className="h-4 w-4" />;
      case 'discussion': return <MessageSquare className="h-4 w-4" />;
      case 'debate': return <Users className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: Section['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const addSectionToModule = (moduleId: string, section: Omit<Section, 'id'>) => {
    console.log('Adding section to module:', moduleId, section);
    
    setModules(prevModules => 
      prevModules.map(module => 
        module.id === moduleId 
          ? { 
              ...module, 
              sections: [...module.sections, { ...section, id: Date.now().toString() }]
            }
          : module
      )
    );
    
    setShowAddSection(null);
  };

  const handleSelectAllChange = (checked: CheckedState) => {
    setSelectAll(checked === true);
  };

  return (
    <div className="container mx-auto p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="outline" size="icon" onClick={() => navigate('/courses')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground">{course.description}</p>
        </div>
      </div>

      {/* Course Builder Header */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Checkbox
                checked={selectAll}
                onCheckedChange={handleSelectAllChange}
              />
              <span className="text-sm font-medium">Select All</span>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Delete
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Pin
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Add section
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>

        {/* Modules List */}
        <div className="p-4 space-y-4">
          {modules.map((module) => (
            <div key={module.id} className="border rounded-lg">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <Checkbox />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{module.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleModule(module.id)}
                      >
                        {module.expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </div>
                </div>

                {module.expanded && (
                  <div className="mt-4 ml-6 space-y-2">
                    {module.sections.map((section) => (
                      <div key={section.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="text-blue-600">
                          {getSectionIcon(section.type)}
                        </div>
                        <div className="flex-1">
                          <span className="font-medium">{section.title}</span>
                        </div>
                        <Badge className={getStatusColor(section.status)}>
                          {section.status === 'completed' ? 'Completed' : 
                           section.status === 'in-progress' ? 'In Progress' : 'Not Started'}
                        </Badge>
                      </div>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-3 mt-2"
                      onClick={() => setShowAddSection(module.id)}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add section
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Section Dialog */}
      {showAddSection && (
        <AddSectionDialog
          isOpen={true}
          onClose={() => setShowAddSection(null)}
          onAdd={(section) => addSectionToModule(showAddSection, section)}
        />
      )}
    </div>
  );
};

export default CourseBuilder;
