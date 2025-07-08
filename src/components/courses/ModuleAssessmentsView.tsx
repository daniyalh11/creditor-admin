import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Plus, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { AssessmentCategory } from './assessments/types';
import { AssessmentCategorySection } from './assessments/AssessmentCategorySection';

interface ModuleAssessmentsViewProps {
  moduleTitle: string;
  onBack: () => void;
}

export const ModuleAssessmentsView: React.FC<ModuleAssessmentsViewProps> = ({
  moduleTitle,
  onBack
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { id: courseId } = useParams();

  const [assessmentCategories, setAssessmentCategories] = useState<AssessmentCategory[]>([
    {
      id: 'quiz',
      title: 'Quiz Section',
      description: 'Test your knowledge with various question formats',
      icon: '📝',
      expanded: true,
      assessments: [
        {
          id: 'quiz-1',
          title: 'Quiz 1',
          description: 'Assessment Quiz - 10 questions covering various topics',
          type: 'Quiz',
          duration: 30,
          status: 'published',
          difficulty: 'Medium',
          questions: 10,
          attempts: 'unlimited'
        },
        {
          id: 'quiz-2',
          title: 'Quiz 2',
          description: 'Assessment Quiz - 10 questions covering various topics',
          type: 'Quiz',
          duration: 25,
          status: 'published',
          difficulty: 'Medium',
          questions: 10,
          attempts: '3'
        },
        {
          id: 'quiz-3',
          title: 'Quiz 3',
          description: 'Assessment Quiz - 10 questions covering various topics',
          type: 'Quiz',
          duration: 45,
          status: 'published',
          difficulty: 'Hard',
          questions: 15,
          attempts: '1'
        }
      ]
    },
    {
      id: 'assignment',
      title: 'Assignment Section',
      description: 'Submit projects and practical assignments',
      icon: '📁',
      expanded: false,
      assessments: [
        {
          id: 'assignment-1',
          title: 'Assignment 1',
          description: 'Legal Research Assignment - Research and present findings on a legal topic',
          type: 'Assignment',
          duration: 120,
          status: 'published',
          difficulty: 'Medium',
          maxScore: 100,
          wordLimit: 1500
        },
        {
          id: 'assignment-2',
          title: 'Assignment 2',
          description: 'Case Study Analysis - Analyze a complex legal case and provide recommendations',
          type: 'Assignment',
          duration: 180,
          status: 'published',
          difficulty: 'Hard',
          maxScore: 150,
          wordLimit: 2000
        },
        {
          id: 'assignment-3',
          title: 'Assignment 3',
          description: 'Contract Review - Review and analyze business contract terms and conditions',
          type: 'Assignment',
          duration: 90,
          status: 'published',
          difficulty: 'Medium',
          maxScore: 80,
          wordLimit: 1200
        }
      ]
    },
    {
      id: 'essay',
      title: 'Essay Section',
      description: 'Write detailed essays and analytical pieces',
      icon: '✍️',
      expanded: false,
      assessments: [
        {
          id: 'essay-1',
          title: 'Technology and Society',
          description: 'Analyze how technology has transformed the way we communicate, work, and interact in the 21st century.',
          type: 'Essay',
          duration: 120,
          status: 'published',
          difficulty: 'Medium',
          topic: 'Analyze how technology has transformed the way we communicate, work, and interact in the 21st century.',
          maxScore: 100,
          wordLimit: 1000
        },
        {
          id: 'essay-2',
          title: 'Climate Change Solutions',
          description: 'Examine the role of government policies vs individual actions in combating climate change.',
          type: 'Essay',
          duration: 150,
          status: 'published',
          difficulty: 'Hard',
          topic: 'Examine the role of government policies vs individual actions in combating climate change.',
          maxScore: 120,
          wordLimit: 1200
        },
        {
          id: 'essay-3',
          title: 'Economic Inequality',
          description: 'Discuss the factors contributing to economic inequality and potential solutions.',
          type: 'Essay',
          duration: 135,
          status: 'published',
          difficulty: 'Medium',
          topic: 'Discuss the factors contributing to economic inequality and potential solutions.',
          maxScore: 110,
          wordLimit: 1100
        }
      ]
    },
    {
      id: 'survey',
      title: 'Survey Section',
      description: 'Participate in course feedback and surveys',
      icon: '📊',
      expanded: false,
      assessments: [
        {
          id: 'survey-1',
          title: 'Course Feedback Survey',
          description: 'Share your thoughts about the course content and delivery methods.',
          type: 'Survey',
          duration: 15,
          status: 'published',
          difficulty: 'Easy',
          questions: 8,
          surveyType: 'Feedback Survey',
          responseLimit: 'unlimited'
        },
        {
          id: 'survey-2',
          title: 'Learning Preferences Survey',
          description: 'Help us understand your learning style and preferences for future courses.',
          type: 'Survey',
          duration: 10,
          status: 'published',
          difficulty: 'Easy',
          questions: 6,
          surveyType: 'General Survey',
          responseLimit: '1'
        },
        {
          id: 'survey-3',
          title: 'Module Assessment Survey',
          description: 'Evaluate the effectiveness of this module and suggest improvements.',
          type: 'Survey',
          duration: 12,
          status: 'published',
          difficulty: 'Easy',
          questions: 7,
          surveyType: 'Assessment Survey',
          responseLimit: 'unlimited'
        }
      ]
    },
    {
      id: 'debate',
      title: 'Debate Section',
      description: 'Engage in structured debates and discussions',
      icon: '💬',
      expanded: true,
      assessments: [
        {
          id: 'debate-1',
          title: 'Debate 1: Technology\'s Impact on Society',
          description: 'Discuss whether technology has done more harm than good to modern society.',
          type: 'Debate',
          duration: 0,
          status: 'published',
          maxScore: 50,
          format: 'Class discussion',
          difficulty: 'Medium',
          topic: 'Technology has done more harm than good to society'
        },
        {
          id: 'debate-2',
          title: 'Debate 2: Climate Change Solutions',
          description: 'Debate the effectiveness of individual vs. governmental action on climate change.',
          type: 'Debate',
          duration: 0,
          status: 'published',
          maxScore: 60,
          format: 'Open forum',
          difficulty: 'Hard',
          topic: 'Individual actions are more important than government policies for climate change'
        }
      ]
    }
  ]);

  const toggleCategory = (categoryId: string) => {
    setAssessmentCategories(prev =>
      prev.map(category =>
        category.id === categoryId
          ? { ...category, expanded: !category.expanded }
          : category
      )
    );
  };

  const handleAddNewAssessment = () => {
    console.log('Navigating to assessments builder for course:', courseId);
    navigate(`/courses/builder/${courseId}/assessments`);
  };

  const handleCreateFirstAssessment = (categoryId: string) => {
    toast({
      title: "Create Assessment",
      description: `Creating first assessment for ${categoryId} section.`,
    });
  };

  const handleViewContent = (assessment: any) => {
    toast({
      title: "View Content",
      description: `Opening ${assessment.title} for viewing.`,
    });
  };

  const handleViewQuiz = (quizId: string) => {
    navigate(`/courses/edit/1/quiz/${quizId}`);
  };

  const handleViewAssignment = (assignmentId: string) => {
    navigate(`/courses/edit/1/assignment/${assignmentId}`);
  };

  const handleViewEssay = (essayId: string) => {
    navigate(`/courses/edit/1/essay/${essayId}`);
  };

  const handleViewDebate = (debateId: string) => {
    navigate(`/courses/edit/1/debate/${debateId}`);
  };

  const handleViewSurvey = (surveyId: string) => {
    navigate(`/courses/edit/1/survey/${surveyId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="rounded-full px-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{moduleTitle} - Assessments</h1>
            <p className="text-gray-600">Explore and create assessments for this module</p>
          </div>
        </div>
        <Button 
          onClick={handleAddNewAssessment}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Assessment
        </Button>
      </div>

      {/* Module Info Card */}
      <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-purple-900 mb-2">Introduction to Business Trust</h2>
          <p className="text-purple-700 mb-3">
            Learn the fundamentals of business trusts, their structure, and legal implications in modern business practices.
          </p>
          <div className="flex items-center gap-2 text-purple-600">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">Estimated time: 2 hours 30 minutes</span>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Categories Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Assessment Categories</h2>
        <p className="text-gray-600">Create and manage different types of assessments for your course</p>
      </div>

      {/* Assessment Categories */}
      <div className="space-y-4">
        {assessmentCategories.map((category) => (
          <AssessmentCategorySection
            key={category.id}
            category={category}
            onToggleCategory={toggleCategory}
            onCreateFirstAssessment={handleCreateFirstAssessment}
            onViewQuiz={handleViewQuiz}
            onViewDebate={handleViewDebate}
            onViewAssignment={handleViewAssignment}
            onViewEssay={handleViewEssay}
            onViewSurvey={handleViewSurvey}
            onViewContent={handleViewContent}
          />
        ))}
      </div>
    </div>
  );
};
