
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Eye, Edit, Trash2, Calendar } from 'lucide-react';
import { AssessmentViewModal } from './AssessmentViewModal';
import { AssessmentPreviewModal } from './AssessmentPreviewModal';
import { useNavigate } from 'react-router-dom';

interface Assessment {
  id: string;
  type: 'quiz' | 'survey' | 'assignment' | 'essay' | 'debate' | 'resources';
  title: string;
  description: string;
  settings: {
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    attemptsAllowed: number;
  };
  instructions: any[];
  questions: any[];
  status: 'draft' | 'published';
  createdAt: string;
  publishedAt: string;
}

interface AssessmentsListProps {
  courseId: string;
  assessments: Assessment[];
}

export const AssessmentsList: React.FC<AssessmentsListProps> = ({
  courseId,
  assessments
}) => {
  const [viewingAssessment, setViewingAssessment] = React.useState<Assessment | null>(null);
  const navigate = useNavigate();

  const getAssessmentTypeLabel = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'Quiz Section';
      case 'survey':
        return 'Survey Section';
      case 'assignment':
        return 'Assignment Section';
      case 'essay':
        return 'Essay Section';
      case 'debate':
        return 'Debate Section';
      default:
        return `${type.charAt(0).toUpperCase() + type.slice(1)} Section`;
    }
  };

  const getAssessmentTypeColor = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'bg-blue-100 text-blue-800';
      case 'survey':
        return 'bg-green-100 text-green-800';
      case 'assignment':
        return 'bg-purple-100 text-purple-800';
      case 'essay':
        return 'bg-orange-100 text-orange-800';
      case 'debate':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryTitle = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'Quiz';
      case 'survey':
        return 'Survey';
      case 'assignment':
        return 'Assignment';
      case 'essay':
        return 'Essay';
      case 'debate':
        return 'Debate';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const handleView = (assessment: Assessment) => {
    setViewingAssessment(assessment);
  };

  const handleEdit = (assessment: Assessment) => {
    // Store assessment data in localStorage for the builder to load
    localStorage.setItem('editingAssessment', JSON.stringify(assessment));
    
    // Navigate to the correct assessment builder based on type
    if (assessment.type === 'survey') {
      navigate('/surveys');
    } else {
      navigate(`/courses/builder/${courseId}/assessment-builder?edit=${assessment.id}`);
    }
  };

  const handleDelete = (assessmentId: string) => {
    // Remove from localStorage
    const existingAssessments = JSON.parse(localStorage.getItem('publishedAssessments') || '[]');
    const updatedAssessments = existingAssessments.filter((a: Assessment) => a.id !== assessmentId);
    localStorage.setItem('publishedAssessments', JSON.stringify(updatedAssessments));
    
    // Reload the page to reflect changes
    window.location.reload();
  };

  // Group assessments by type
  const groupedAssessments = assessments.reduce((groups, assessment) => {
    const type = assessment.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(assessment);
    return groups;
  }, {} as Record<string, Assessment[]>);

  // Define the order of categories
  const categoryOrder = ['quiz', 'essay', 'survey', 'assignment', 'debate', 'resources'];

  const renderAssessmentCard = (assessment: Assessment) => (
    <Card key={assessment.id} className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{assessment.settings.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAssessmentTypeColor(assessment.type)}`}>
                  {getAssessmentTypeLabel(assessment.type)}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                  {assessment.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          </div>
          
          {assessment.settings.description && (
            <p className="text-gray-600 mb-3">{assessment.settings.description}</p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Created: {assessment.createdAt}</span>
            </div>
            <span>•</span>
            <span>{assessment.questions.length} Questions</span>
            <span>•</span>
            <span>{assessment.settings.timeLimit} mins</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleView(assessment)}
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            View
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEdit(assessment)}
            className="flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDelete(assessment.id)}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="space-y-8">
      {categoryOrder.map(type => {
        const categoryAssessments = groupedAssessments[type];
        if (!categoryAssessments || categoryAssessments.length === 0) {
          return null;
        }

        return (
          <div key={type} className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold text-gray-900">
                ✅ {getCategoryTitle(type)}
              </h2>
              <span className="text-sm text-gray-500">
                ({categoryAssessments.length} assessment{categoryAssessments.length !== 1 ? 's' : ''})
              </span>
            </div>
            <div className="space-y-4">
              {categoryAssessments.map(renderAssessmentCard)}
            </div>
          </div>
        );
      })}

      {/* Preview Modal for View */}
      {viewingAssessment && (
        <AssessmentPreviewModal
          isOpen={true}
          onClose={() => setViewingAssessment(null)}
          assessmentSettings={viewingAssessment.settings}
          questions={viewingAssessment.questions}
          instructions={viewingAssessment.instructions}
        />
      )}
    </div>
  );
};
