
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronRight, Plus, Clock, Target, BookOpen, Eye, Users, BarChart3 } from 'lucide-react';
import { AssessmentCategory } from './types';

interface AssessmentCategorySectionProps {
  category: AssessmentCategory;
  onToggleCategory: (categoryId: string) => void;
  onCreateFirstAssessment: (categoryId: string) => void;
  onViewQuiz?: (quizId: string) => void;
  onViewDebate?: (debateId: string) => void;
  onViewAssignment?: (assignmentId: string) => void;
  onViewEssay?: (essayId: string) => void;
  onViewSurvey?: (surveyId: string) => void;
  onViewContent?: (assessment: any) => void;
}

export const AssessmentCategorySection: React.FC<AssessmentCategorySectionProps> = ({
  category,
  onToggleCategory,
  onCreateFirstAssessment,
  onViewQuiz,
  onViewDebate,
  onViewAssignment,
  onViewEssay,
  onViewSurvey,
  onViewContent
}) => {
  const handleViewClick = (assessment: any) => {
    switch (assessment.type) {
      case 'Quiz':
        onViewQuiz?.(assessment.id);
        break;
      case 'Debate':
        onViewDebate?.(assessment.id);
        break;
      case 'Assignment':
        onViewAssignment?.(assessment.id);
        break;
      case 'Essay':
        onViewEssay?.(assessment.id);
        break;
      case 'Survey':
        onViewSurvey?.(assessment.id);
        break;
      default:
        onViewContent?.(assessment);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (categoryId: string) => {
    switch (categoryId) {
      case 'quiz':
        return 'bg-blue-50 border-blue-200';
      case 'assignment':
        return 'bg-green-50 border-green-200';
      case 'essay':
        return 'bg-purple-50 border-purple-200';
      case 'survey':
        return 'bg-yellow-50 border-yellow-200';
      case 'debate':
        return 'bg-pink-50 border-pink-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const renderSurveyCard = (assessment: any) => (
    <Card key={assessment.id} className="border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <CardTitle className="text-lg font-semibold text-gray-900">{assessment.title}</CardTitle>
              <Badge className="bg-blue-100 text-blue-800 text-xs">
                {assessment.surveyType || 'General Survey'}
              </Badge>
            </div>
            <p className="text-gray-600 text-sm mb-3">{assessment.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{assessment.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>{assessment.questions} questions</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{assessment.responseLimit} responses</span>
              </div>
              <Badge className={getDifficultyColor(assessment.difficulty)}>
                {assessment.difficulty}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-green-600 border-green-200">
            {assessment.status}
          </Badge>
          <Button
            size="sm"
            onClick={() => handleViewClick(assessment)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Survey
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderAssessmentCard = (assessment: any) => {
    if (assessment.type === 'Survey') {
      return renderSurveyCard(assessment);
    }

    return (
      <Card key={assessment.id} className="border border-gray-200 hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <CardTitle className="text-lg font-semibold text-gray-900">{assessment.title}</CardTitle>
                <Badge className="bg-blue-100 text-blue-800 text-xs">
                  {assessment.type}
                </Badge>
              </div>
              <p className="text-gray-600 text-sm mb-3">{assessment.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {assessment.duration > 0 && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{assessment.duration} min</span>
                  </div>
                )}
                {assessment.questions && (
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{assessment.questions} questions</span>
                  </div>
                )}
                {assessment.attempts && (
                  <div className="flex items-center gap-1">
                    <Target className="h-4 w-4" />
                    <span>{assessment.attempts} attempts</span>
                  </div>
                )}
                {assessment.difficulty && (
                  <Badge className={getDifficultyColor(assessment.difficulty)}>
                    {assessment.difficulty}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="text-green-600 border-green-200">
              {assessment.status}
            </Badge>
            <Button
              size="sm"
              onClick={() => handleViewClick(assessment)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Eye className="h-4 w-4 mr-2" />
              View {assessment.type}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <Card className={`border ${getCategoryColor(category.id)}`}>
      <CardHeader 
        className="cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => onToggleCategory(category.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{category.icon}</span>
            <div>
              <CardTitle className="text-lg font-semibold text-gray-900">{category.title}</CardTitle>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {category.assessments.length > 0 && (
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                {category.assessments.length} {category.assessments.length === 1 ? 'item' : 'items'}
              </Badge>
            )}
            {category.expanded ? (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronRight className="h-5 w-5 text-gray-400" />
            )}
          </div>
        </div>
      </CardHeader>

      {category.expanded && (
        <CardContent>
          {category.assessments.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <span className="text-4xl">{category.icon}</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No {category.title.toLowerCase()} yet</h3>
              <p className="text-gray-600 mb-4">Create your first {category.title.toLowerCase().replace(' section', '')} to get started</p>
              <Button 
                onClick={() => onCreateFirstAssessment(category.id)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First {category.title.replace(' Section', '')}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.assessments.map(renderAssessmentCard)}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
};
