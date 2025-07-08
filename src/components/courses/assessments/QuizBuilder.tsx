import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { MCQEditModal } from './MCQEditModal';
import { SCQEditModal } from './SCQEditModal';
import { TrueFalseEditModal } from './TrueFalseEditModal';
import { FillUpEditModal } from './FillUpEditModal';
import { MatchingEditModal } from './MatchingEditModal';
import { OneWordEditModal } from './OneWordEditModal';
import { DescriptiveEditModal } from './DescriptiveEditModal';
import { SurveyMCQEditModal } from './SurveyMCQEditModal';
import { AssessmentQuestionEditModal } from './AssessmentQuestionEditModal';
import { SubmissionQuestionEditModal } from './SubmissionQuestionEditModal';
import { EssayTopicEditModal } from './EssayTopicEditModal';
import { DebateTopicEditModal } from './DebateTopicEditModal';
import { useToast } from '@/hooks/use-toast';

interface QuizBuilderProps {
  assessmentSettings: {
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    attemptsAllowed: number;
  };
  onQuestionsChange?: (questions: any[]) => void;
  assessmentType: string;
}

export const QuizBuilder: React.FC<QuizBuilderProps> = ({
  assessmentSettings,
  onQuestionsChange,
  assessmentType
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [editModalType, setEditModalType] = useState<string | null>(null);
  const { toast } = useToast();

  // Check if submission block already exists
  const hasSubmissionBlock = questions.some(q => q.type === 'submission');

  useEffect(() => {
    const handleAddMCQQuestion = (event: any) => {
      const isSurvey = event.detail?.isSurvey || false;
      const newQuestion = {
        id: Date.now().toString(),
        type: isSurvey ? 'survey-mcq' : 'mcq',
        question: 'What is your question?',
        options: [
          { id: '1', text: 'Option A', isCorrect: false },
          { id: '2', text: 'Option B', isCorrect: false },
          { id: '3', text: 'Option C', isCorrect: false },
          { id: '4', text: 'Option D', isCorrect: false }
        ],
        points: isSurvey ? undefined : 1
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddSCQQuestion = () => {
      const newQuestion = {
        id: Date.now().toString(),
        type: 'scq',
        question: 'What is your question?',
        options: [
          { id: '1', text: 'Option A', isCorrect: false },
          { id: '2', text: 'Option B', isCorrect: false },
          { id: '3', text: 'Option C', isCorrect: false },
          { id: '4', text: 'Option D', isCorrect: false }
        ],
        points: 1
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddTrueFalseQuestion = () => {
      const newQuestion = {
        id: Date.now().toString(),
        type: 'truefalse',
        question: 'True or False: Your statement here',
        correctAnswer: true,
        points: 1
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddFillUpQuestion = () => {
      const newQuestion = {
        id: Date.now().toString(),
        type: 'fillup',
        question: 'Complete this sentence: The capital of France is ____.',
        correctAnswer: 'Paris',
        points: 1
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddMatchingQuestion = () => {
      const newQuestion = {
        id: Date.now().toString(),
        type: 'matching',
        question: 'Match the following items:',
        pairs: [
          { id: '1', term: 'Term 1', match: 'Match 1' },
          { id: '2', text: 'Term 2', match: 'Match 2' },
          { id: '3', text: 'Term 3', match: 'Match 3' }
        ],
        points: 3
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddOneWordQuestion = () => {
      const newQuestion = {
        id: Date.now().toString(),
        type: 'oneword',
        question: 'What is the capital of France?',
        correctAnswer: 'Paris',
        points: 1
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddDescriptiveQuestion = (event: any) => {
      const isSurvey = event.detail?.isSurvey || false;
      const newQuestion = {
        id: Date.now().toString(),
        type: 'descriptive',
        question: 'Describe your thoughts on...',
        expectedLength: isSurvey ? undefined : 100,
        points: isSurvey ? undefined : 5,
        isSurvey
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddAssessmentQuestion = () => {
      const newQuestion = {
        id: Date.now().toString(),
        type: 'assessment-question',
        question: 'Enter your assessment question here...',
        description: '',
        points: 1
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddSubmissionQuestion = () => {
      // Check if submission block already exists
      if (hasSubmissionBlock) {
        toast({
          title: "Submission block already added",
          description: "Only one submission block is allowed per assessment.",
          variant: "destructive"
        });
        return;
      }

      const newQuestion = {
        id: Date.now().toString(),
        type: 'submission',
        question: 'Please submit your work using the link below:',
        submissionType: 'drive-link',
        driveLink: '',
        notes: ''
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddEssayTopic = () => {
      const newQuestion = {
        id: Date.now().toString(),
        type: 'essay-question',
        question: 'Essay Topic: The Impact of Technology on Modern Education',
        answer: 'Provide context or background information for the essay topic...',
        instructions: 'Write a comprehensive essay discussing the impact of technology on modern education. Include specific examples, analyze both positive and negative effects, and provide your own perspective on future developments.',
        wordLimit: 1000,
        points: 10
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    const handleAddDebateTopic = () => {
      const newQuestion = {
        id: Date.now().toString(),
        type: 'debate-question',
        question: 'Climate Change Discussion',
        statement: 'Climate change is primarily caused by human activities. Discuss both sides of this argument with supporting evidence.',
        instructions: 'Provide specific instructions for the debate format, time limits, or evaluation criteria...',
        points: 15
      };
      const updatedQuestions = [...questions, newQuestion];
      setQuestions(updatedQuestions);
      onQuestionsChange?.(updatedQuestions);
    };

    window.addEventListener('addMCQQuestion', handleAddMCQQuestion);
    window.addEventListener('addSCQQuestion', handleAddSCQQuestion);
    window.addEventListener('addTrueFalseQuestion', handleAddTrueFalseQuestion);
    window.addEventListener('addFillUpQuestion', handleAddFillUpQuestion);
    window.addEventListener('addMatchingQuestion', handleAddMatchingQuestion);
    window.addEventListener('addOneWordQuestion', handleAddOneWordQuestion);
    window.addEventListener('addDescriptiveQuestion', handleAddDescriptiveQuestion);
    window.addEventListener('addAssessmentQuestion', handleAddAssessmentQuestion);
    window.addEventListener('addSubmissionQuestion', handleAddSubmissionQuestion);
    window.addEventListener('addEssayTopic', handleAddEssayTopic);
    window.addEventListener('addDebateTopic', handleAddDebateTopic);

    return () => {
      window.removeEventListener('addMCQQuestion', handleAddMCQQuestion);
      window.removeEventListener('addSCQQuestion', handleAddSCQQuestion);
      window.removeEventListener('addTrueFalseQuestion', handleAddTrueFalseQuestion);
      window.removeEventListener('addFillUpQuestion', handleAddFillUpQuestion);
      window.removeEventListener('addMatchingQuestion', handleAddMatchingQuestion);
      window.removeEventListener('addOneWordQuestion', handleAddOneWordQuestion);
      window.removeEventListener('addDescriptiveQuestion', handleAddDescriptiveQuestion);
      window.removeEventListener('addAssessmentQuestion', handleAddAssessmentQuestion);
      window.removeEventListener('addSubmissionQuestion', handleAddSubmissionQuestion);
      window.removeEventListener('addEssayTopic', handleAddEssayTopic);
      window.removeEventListener('addDebateTopic', handleAddDebateTopic);
    };
  }, [questions, onQuestionsChange, hasSubmissionBlock, toast]);

  const handleEditQuestion = (question: any) => {
    setEditingQuestion(question);
    setEditModalType(question.type);
  };

  const handleSaveQuestion = (updatedQuestion: any) => {
    const updatedQuestions = questions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    setQuestions(updatedQuestions);
    onQuestionsChange?.(updatedQuestions);
    setEditingQuestion(null);
    setEditModalType(null);
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(updatedQuestions);
    onQuestionsChange?.(updatedQuestions);
  };

  const getQuestionLabel = (question: any, index: number) => {
    if (question.type === 'submission') {
      return 'Submission Block';
    }
    
    // Count only non-submission questions for numbering
    const nonSubmissionQuestions = questions.filter(q => q.type !== 'submission');
    const questionIndex = nonSubmissionQuestions.findIndex(q => q.id === question.id);
    return `Question ${questionIndex + 1}`;
  };

  const renderQuestionPreview = (question: any) => {
    switch (question.type) {
      case 'mcq':
      case 'survey-mcq':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            {question.options.map((option: any, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <input type={question.type === 'mcq' && question.options.filter((o: any) => o.isCorrect).length > 1 ? "checkbox" : "radio"} disabled className="text-blue-600" />
                <span className="text-sm">{option.text}</span>
              </div>
            ))}
          </div>
        );
      
      case 'scq':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            {question.options.map((option: any, idx: number) => (
              <div key={idx} className="flex items-center space-x-2">
                <input type="radio" disabled className="text-blue-600" />
                <span className="text-sm">{option.text}</span>
              </div>
            ))}
          </div>
        );
      
      case 'truefalse':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input type="radio" disabled />
                <span>True</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" disabled />
                <span>False</span>
              </label>
            </div>
          </div>
        );
      
      case 'fillup':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            <input 
              type="text" 
              disabled 
              className="w-full p-2 border border-gray-300 rounded" 
              placeholder="Type your answer here..."
            />
          </div>
        );
      
      case 'matching':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-sm mb-2">Terms</h4>
                {question.pairs?.map((pair: any, idx: number) => (
                  <div key={idx} className="p-2 bg-gray-50 border rounded mb-1 text-sm">
                    {pair.term}
                  </div>
                ))}
              </div>
              <div>
                <h4 className="font-medium text-sm mb-2">Matches</h4>
                {question.pairs?.map((pair: any, idx: number) => (
                  <div key={idx} className="p-2 bg-gray-50 border rounded mb-1 text-sm">
                    {pair.match}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'oneword':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            <input 
              type="text" 
              disabled 
              className="w-32 p-2 border border-gray-300 rounded" 
              placeholder="One word"
            />
          </div>
        );
      
      case 'descriptive':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            <textarea 
              disabled 
              className="w-full p-2 border border-gray-300 rounded" 
              rows={4}
              placeholder="Write your detailed answer here..."
            />
          </div>
        );
      
      case 'assessment-question':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            {question.description && (
              <p className="text-sm text-gray-600">{question.description}</p>
            )}
            <div className="text-xs text-gray-500">Points: {question.points || 0}</div>
          </div>
        );
      
      case 'submission':
        return (
          <div className="space-y-2">
            <p className="font-medium">{question.question}</p>
            {question.submissionType === 'drive-link' && (
              <input 
                type="url" 
                disabled 
                className="w-full p-2 border border-gray-300 rounded" 
                placeholder="Enter your Google Drive link here..."
              />
            )}
            {question.submissionType === 'text-submission' && (
              <textarea 
                disabled 
                className="w-full p-2 border border-gray-300 rounded" 
                rows={4}
                placeholder="Enter your text submission here..."
              />
            )}
            {question.notes && (
              <p className="text-sm text-gray-600 italic">{question.notes}</p>
            )}
          </div>
        );
      
      case 'essay-question':
        return (
          <div className="space-y-2">
            <p className="font-medium">Essay Topic: {question.question}</p>
            {question.answer && (
              <p className="text-sm text-gray-600">{question.answer}</p>
            )}
            {question.instructions && (
              <p className="text-sm text-gray-500 italic">{question.instructions}</p>
            )}
            <div className="text-xs text-gray-500">
              Word limit: {question.wordLimit} | Points: {question.points}
            </div>
          </div>
        );

      case 'debate-question':
        return (
          <div className="space-y-2">
            <p className="font-medium">Debate Topic: {question.question}</p>
            <p className="text-sm text-gray-600">{question.statement}</p>
            {question.instructions && (
              <p className="text-sm text-gray-500 italic">{question.instructions}</p>
            )}
            <div className="text-xs text-gray-500">Points: {question.points}</div>
          </div>
        );
      
      default:
        return <p className="font-medium">{question.question || 'Question preview'}</p>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {questions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No questions added yet</h3>
            <p className="text-gray-600">Start building your {assessmentType} by adding questions from the sidebar</p>
          </div>
        ) : (
          questions.map((question, index) => (
            <Card key={question.id} className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {getQuestionLabel(question, index)}
                  </h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditQuestion(question)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteQuestion(question.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  {renderQuestionPreview(question)}
                </div>
                
                {question.points !== undefined && question.type !== 'submission' && (
                  <div className="text-right mt-2">
                    <span className="text-sm text-gray-500">Points: {question.points}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Modals */}
      {editModalType === 'mcq' && editingQuestion && (
        <MCQEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'survey-mcq' && editingQuestion && (
        <SurveyMCQEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'scq' && editingQuestion && (
        <SCQEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'truefalse' && editingQuestion && (
        <TrueFalseEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'fillup' && editingQuestion && (
        <FillUpEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'matching' && editingQuestion && (
        <MatchingEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'oneword' && editingQuestion && (
        <OneWordEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'descriptive' && editingQuestion && (
        <DescriptiveEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'assessment-question' && editingQuestion && (
        <AssessmentQuestionEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'submission' && editingQuestion && (
        <SubmissionQuestionEditModal
          question={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'essay-question' && editingQuestion && (
        <EssayTopicEditModal
          topic={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}

      {editModalType === 'debate-question' && editingQuestion && (
        <DebateTopicEditModal
          topic={editingQuestion}
          onSave={handleSaveQuestion}
          onCancel={() => {
            setEditingQuestion(null);
            setEditModalType(null);
          }}
        />
      )}
    </div>
  );
};
