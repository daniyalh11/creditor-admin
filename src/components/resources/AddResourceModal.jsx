import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Award, FileText, Layout, BookOpen, File, BarChart3, 
  FileCheck, HelpCircle, ClipboardList, Package, Star, MessageSquare 
} from 'lucide-react';
import { AddBadgeModal } from './AddBadgeModal';
import { AddCertificateModal } from './AddCertificateModal';
import { AddContentTemplateModal } from './AddContentTemplateModal';
import { AddCourseTemplateModal } from './AddCourseTemplateModal';
import { AddFileModal } from './AddFileModal';
import { AddGradingScaleModal } from './AddGradingScaleModal';
import { AddPageModal } from './AddPageModal';
import { AddQuestionBankModal } from './AddQuestionBankModal';
import { AddRubricModal } from './AddRubricModal';
import { AddScormModal } from './AddScormModal';
import { AddSkillModal } from './AddSkillModal';
import { AddSurveyQuestionBankModal } from './AddSurveyQuestionBankModal';

const resourceTypes = [
  {
    id: 'badge',
    name: 'Badge',
    description: 'Create achievement badges for learners',
    icon: Award
  },
  {
    id: 'certificate',
    name: 'Certificate',
    description: 'Design completion certificates',
    icon: FileText
  },
  {
    id: 'content-template',
    name: 'Content Template',
    description: 'Reusable content templates',
    icon: Layout
  },
  {
    id: 'course-template',
    name: 'Course Template',
    description: 'Structured course templates',
    icon: BookOpen
  },
  {
    id: 'file',
    name: 'File',
    description: 'Upload documents and files',
    icon: File
  },
  {
    id: 'grading-scale',
    name: 'Grading Scale',
    description: 'Define grading criteria',
    icon: BarChart3
  },
  {
    id: 'page',
    name: 'Page',
    description: 'Create informational pages',
    icon: FileCheck
  },
  {
    id: 'question-bank',
    name: 'Question Bank',
    description: 'Collection of quiz questions',
    icon: HelpCircle
  },
  {
    id: 'rubric',
    name: 'Rubric',
    description: 'Assessment rubrics and criteria',
    icon: ClipboardList
  },
  {
    id: 'scorm-package',
    name: 'SCORM Package',
    description: 'Interactive learning packages',
    icon: Package
  },
  {
    id: 'skills',
    name: 'Skills',
    description: 'Define learner skills and competencies',
    icon: Star
  },
  {
    id: 'survey-question-bank',
    name: 'Survey Question Bank',
    description: 'Survey and feedback questions',
    icon: MessageSquare
  }
];

export const AddResourceModal = ({
  open,
  onOpenChange,
  onResourceAdded
}) => {
  const [selectedResourceType, setSelectedResourceType] = useState(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showContentTemplateModal, setShowContentTemplateModal] = useState(false);
  const [showCourseTemplateModal, setShowCourseTemplateModal] = useState(false);
  const [showFileModal, setShowFileModal] = useState(false);
  const [showGradingScaleModal, setShowGradingScaleModal] = useState(false);
  const [showPageModal, setShowPageModal] = useState(false);
  const [showQuestionBankModal, setShowQuestionBankModal] = useState(false);
  const [showRubricModal, setShowRubricModal] = useState(false);
  const [showScormModal, setShowScormModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [showSurveyQuestionBankModal, setShowSurveyQuestionBankModal] = useState(false);

  const handleResourceTypeClick = (resourceId) => {
    setSelectedResourceType(resourceId);
    
    switch (resourceId) {
      case 'badge':
        setShowBadgeModal(true);
        break;
      case 'certificate':
        setShowCertificateModal(true);
        break;
      case 'content-template':
        setShowContentTemplateModal(true);
        break;
      case 'course-template':
        setShowCourseTemplateModal(true);
        break;
      case 'file':
        setShowFileModal(true);
        break;
      case 'grading-scale':
        setShowGradingScaleModal(true);
        break;
      case 'page':
        setShowPageModal(true);
        break;
      case 'question-bank':
        setShowQuestionBankModal(true);
        break;
      case 'rubric':
        setShowRubricModal(true);
        break;
      case 'scorm-package':
        setShowScormModal(true);
        break;
      case 'skills':
        setShowSkillModal(true);
        break;
      case 'survey-question-bank':
        setShowSurveyQuestionBankModal(true);
        break;
      default:
        console.log(`${resourceId} modal not yet implemented`);
        break;
    }
    
    onOpenChange(false);
  };

  const handleResourceAdded = (resource) => {
    onResourceAdded(resource);
    setSelectedResourceType(null);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Add New Resource</DialogTitle>
            <p className="text-sm text-gray-600">Choose the type of resource you want to create</p>
          </DialogHeader>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {resourceTypes.map((resource) => {
              const IconComponent = resource.icon;
              return (
                <Card 
                  key={resource.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-300"
                  onClick={() => handleResourceTypeClick(resource.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-blue-50 rounded-full">
                        <IconComponent className="h-8 w-8 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{resource.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="flex justify-end mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Individual Resource Modals */}
      <AddBadgeModal
        open={showBadgeModal}
        onOpenChange={setShowBadgeModal}
        onBadgeAdded={handleResourceAdded}
      />
      
      <AddCertificateModal
        open={showCertificateModal}
        onOpenChange={setShowCertificateModal}
        onCertificateAdded={handleResourceAdded}
      />
      
      <AddContentTemplateModal
        open={showContentTemplateModal}
        onOpenChange={setShowContentTemplateModal}
        onTemplateAdded={handleResourceAdded}
      />
      
      <AddCourseTemplateModal
        open={showCourseTemplateModal}
        onOpenChange={setShowCourseTemplateModal}
        onTemplateAdded={handleResourceAdded}
      />
      
      <AddFileModal
        open={showFileModal}
        onOpenChange={setShowFileModal}
        onFileAdded={handleResourceAdded}
      />
      
      <AddGradingScaleModal
        open={showGradingScaleModal}
        onOpenChange={setShowGradingScaleModal}
        onScaleAdded={handleResourceAdded}
      />

      <AddPageModal
        open={showPageModal}
        onOpenChange={setShowPageModal}
        onPageAdded={handleResourceAdded}
      />

      <AddQuestionBankModal
        open={showQuestionBankModal}
        onOpenChange={setShowQuestionBankModal}
        onBankAdded={handleResourceAdded}
      />

      <AddRubricModal
        open={showRubricModal}
        onOpenChange={setShowRubricModal}
        onRubricAdded={handleResourceAdded}
      />

      <AddScormModal
        open={showScormModal}
        onOpenChange={setShowScormModal}
        onScormAdded={handleResourceAdded}
      />

      <AddSkillModal
        open={showSkillModal}
        onOpenChange={setShowSkillModal}
        onSkillAdded={handleResourceAdded}
      />

      <AddSurveyQuestionBankModal
        open={showSurveyQuestionBankModal}
        onOpenChange={setShowSurveyQuestionBankModal}
        onBankAdded={handleResourceAdded}
      />
    </>
  );
};