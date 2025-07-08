
import React from 'react';
import { CheckSquare, FileText, ToggleLeft, Type, Link, PenTool, AlignLeft, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { EssayTopicsTab } from './EssayTopicsTab';
import { DebateTopicsTab } from './DebateTopicsTab';
import { useToast } from '@/hooks/use-toast';

interface QuestionType {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface QuestionTypesTabProps {
  selectedAssessmentType: string;
}

export const QuestionTypesTab: React.FC<QuestionTypesTabProps> = ({
  selectedAssessmentType
}) => {
  const { toast } = useToast();

  // If essay section is selected, show essay topics instead
  if (selectedAssessmentType === 'essay') {
    return <EssayTopicsTab selectedAssessmentType={selectedAssessmentType} />;
  }

  // If debate section is selected, show debate topics instead
  if (selectedAssessmentType === 'debate') {
    return <DebateTopicsTab selectedAssessmentType={selectedAssessmentType} />;
  }

  const allQuestionTypes: QuestionType[] = [
    {
      id: 'mcq',
      title: 'Multiple Choice Questions (MCQ)',
      description: 'Select best answer from options',
      icon: CheckSquare,
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'scq',
      title: 'Single Choice Questions (SCQ)',
      description: 'Choose only one correct answer',
      icon: FileText,
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'truefalse',
      title: 'True/False Questions',
      description: 'Mark statements as true or false',
      icon: ToggleLeft,
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'fillup',
      title: 'Fill-up Questions',
      description: 'Fill in the blanks',
      icon: Type,
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 'matching',
      title: 'Matching Questions',
      description: 'Match pairs from two columns',
      icon: Link,
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 'oneword',
      title: 'One Word Questions',
      description: 'Enter a single word answer',
      icon: PenTool,
      color: 'bg-pink-50 border-pink-200'
    },
    {
      id: 'descriptive',
      title: 'Descriptive Questions',
      description: 'Provide detailed written answers',
      icon: AlignLeft,
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 'question',
      title: 'Question',
      description: 'Add a question with optional instructions',
      icon: FileText,
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      id: 'submission',
      title: 'Submission',
      description: 'Add submission field with drive link',
      icon: Upload,
      color: 'bg-teal-50 border-teal-200'
    }
  ];

  // Filter question types based on assessment type
  let questionTypes = allQuestionTypes;
  
  if (selectedAssessmentType === 'survey') {
    questionTypes = allQuestionTypes.filter(type => type.id === 'mcq' || type.id === 'descriptive');
  } else if (selectedAssessmentType === 'assignment') {
    questionTypes = allQuestionTypes.filter(type => type.id === 'question' || type.id === 'submission');
  } else if (selectedAssessmentType === 'quiz') {
    // For quiz, exclude 'question' and 'submission' types
    questionTypes = allQuestionTypes.filter(type => type.id !== 'question' && type.id !== 'submission');
  }

  const handleQuestionTypeClick = (questionType: string) => {
    if (questionType === 'mcq') {
      const event = new CustomEvent('addMCQQuestion', { 
        detail: { isSurvey: selectedAssessmentType === 'survey' } 
      });
      window.dispatchEvent(event);
    } else if (questionType === 'scq') {
      const event = new CustomEvent('addSCQQuestion');
      window.dispatchEvent(event);
    } else if (questionType === 'truefalse') {
      const event = new CustomEvent('addTrueFalseQuestion');
      window.dispatchEvent(event);
    } else if (questionType === 'fillup') {
      const event = new CustomEvent('addFillUpQuestion');
      window.dispatchEvent(event);
    } else if (questionType === 'matching') {
      const event = new CustomEvent('addMatchingQuestion');
      window.dispatchEvent(event);
    } else if (questionType === 'oneword') {
      const event = new CustomEvent('addOneWordQuestion');
      window.dispatchEvent(event);
    } else if (questionType === 'descriptive') {
      const event = new CustomEvent('addDescriptiveQuestion', { 
        detail: { isSurvey: selectedAssessmentType === 'survey' } 
      });
      window.dispatchEvent(event);
    } else if (questionType === 'question') {
      const event = new CustomEvent('addAssessmentQuestion');
      window.dispatchEvent(event);
    } else if (questionType === 'submission') {
      const event = new CustomEvent('addSubmissionQuestion');
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Question Types</h3>
        <p className="text-xs text-gray-600 mb-4">Click to add questions to your {selectedAssessmentType}</p>
      </div>
      
      <div className="space-y-3">
        {questionTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => handleQuestionTypeClick(type.id)}
              className={cn(
                "w-full p-3 rounded-lg border-2 text-left transition-all hover:shadow-sm hover:border-blue-300",
                type.color
              )}
            >
              <div className="flex items-start space-x-3">
                <Icon className="h-5 w-5 mt-0.5 text-gray-600" />
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900">{type.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
