
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Clock, User, Trophy, RotateCcw, ArrowRight, X } from 'lucide-react';

interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface MCQQuestion {
  id: string;
  type: 'mcq';
  question: string;
  options: MCQOption[];
  points: number;
  feedback?: string;
}

interface SCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface SCQQuestion {
  id: string;
  type: 'scq';
  question: string;
  options: SCQOption[];
  points: number;
  feedback?: string;
}

interface TrueFalseQuestion {
  id: string;
  type: 'truefalse';
  question: string;
  correctAnswer: boolean;
  points: number;
  feedback?: string;
}

interface FillUpQuestion {
  id: string;
  type: 'fillup';
  question: string;
  correctAnswers: string[];
  allowMultipleAnswers: boolean;
  points: number;
  feedback?: string;
}

interface MatchingPair {
  id: string;
  term: string;
  match: string;
}

interface MatchingQuestion {
  id: string;
  type: 'matching';
  question: string;
  pairs: MatchingPair[];
  points: number;
  feedback?: string;
}

interface OneWordQuestion {
  id: string;
  type: 'oneword';
  question: string;
  correctAnswer: string;
  caseSensitive: boolean;
  points: number;
  feedback?: string;
}

interface DescriptiveQuestion {
  id: string;
  type: 'descriptive';
  question: string;
  minWordLimit: number;
  maxWordLimit: number;
  points: number;
  feedback?: string;
}

interface SubmissionQuestion {
  id: string;
  type: 'submission';
  question: string;
  driveLink?: string;
  notes?: string;
}

interface AssessmentQuestion {
  id: string;
  type: 'assessment-question';
  question: string;
  description?: string;
  points: number;
}

interface EssayQuestion {
  id: string;
  type: 'essay-question';
  question: string;
  answer?: string;
  points: number;
}

interface DebateQuestion {
  id: string;
  type: 'debate-question';
  question: string;
  description?: string;
  points: number;
}

type Question = MCQQuestion | SCQQuestion | TrueFalseQuestion | FillUpQuestion | MatchingQuestion | OneWordQuestion | DescriptiveQuestion | SubmissionQuestion | AssessmentQuestion | EssayQuestion | DebateQuestion;

interface SavedInstruction {
  id: string;
  title: string;
  points: string[];
  backgroundColor: string;
}

interface AssessmentPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  assessmentSettings: {
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    attemptsAllowed: number;
  };
  questions: Question[];
  instructions?: SavedInstruction[];
}

export const AssessmentPreviewModal: React.FC<AssessmentPreviewModalProps> = ({
  isOpen,
  onClose,
  assessmentSettings,
  questions,
  instructions = []
}) => {
  const [currentStep, setCurrentStep] = useState<'instructions' | 'questions'>('instructions');
  const totalPoints = questions.reduce((sum, question) => {
    if ('points' in question && question.points) {
      return sum + question.points;
    }
    return sum;
  }, 0);

  const getBackgroundColorValue = (color: string) => {
    switch (color) {
      case 'Blue':
        return '#3b82f6';
      case 'Green':
        return '#10b981';
      case 'Red':
        return '#ef4444';
      case 'Purple':
        return '#8b5cf6';
      case 'Orange':
        return '#f97316';
      default:
        return '#3b82f6';
    }
  };

  const handleStartAssessment = () => {
    setCurrentStep('questions');
  };

  const handleClose = () => {
    setCurrentStep('instructions');
    onClose();
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'mcq':
        return 'Multiple Choice';
      case 'scq':
        return 'Single Choice';
      case 'truefalse':
        return 'True/False';
      case 'fillup':
        return 'Fill in the Blank';
      case 'matching':
        return 'Matching';
      case 'oneword':
        return 'One Word';
      case 'descriptive':
        return 'Descriptive';
      case 'submission':
        return 'Submission';
      case 'assessment-question':
        return 'Question';
      case 'essay-question':
        return 'Essay';
      case 'debate-question':
        return 'Debate';
      default:
        return type;
    }
  };

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case 'mcq':
        return 'bg-blue-100 text-blue-800';
      case 'scq':
        return 'bg-green-100 text-green-800';
      case 'truefalse':
        return 'bg-purple-100 text-purple-800';
      case 'fillup':
        return 'bg-yellow-100 text-yellow-800';
      case 'matching':
        return 'bg-orange-100 text-orange-800';
      case 'oneword':
        return 'bg-pink-100 text-pink-800';
      case 'descriptive':
        return 'bg-red-100 text-red-800';
      case 'submission':
        return 'bg-indigo-100 text-indigo-800';
      case 'assessment-question':
        return 'bg-cyan-100 text-cyan-800';
      case 'essay-question':
        return 'bg-teal-100 text-teal-800';
      case 'debate-question':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderQuestionPreview = (question: Question, index: number) => {
    return (
      <div key={question.id} className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </span>
            <div className="flex items-center gap-2">
              <Badge className={getQuestionTypeColor(question.type)}>
                {getQuestionTypeLabel(question.type)}
              </Badge>
              {'points' in question && question.points && (
                <span className="text-sm text-gray-500">{question.points} pts</span>
              )}
            </div>
          </div>
        </div>

        <h3 className="text-lg font-medium text-gray-900 mb-4">{question.question}</h3>

        {/* Question-specific rendering with proper learner input fields */}
        {(question.type === 'mcq' || question.type === 'scq') && (
          <div className="space-y-3">
            {question.options.map((option, optionIndex) => (
              <label key={option.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <input 
                  type={question.type === 'mcq' ? 'checkbox' : 'radio'} 
                  name={`question-${question.id}`}
                  className="w-4 h-4 text-blue-600"
                />
                <div className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center bg-white">
                  <span className="text-sm font-medium text-gray-600">
                    {String.fromCharCode(65 + optionIndex)}
                  </span>
                </div>
                <span className="text-gray-700 flex-1">{option.text}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === 'truefalse' && (
          <div className="space-y-3">
            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="radio" name={`question-${question.id}`} className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">True</span>
            </label>
            <label className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <input type="radio" name={`question-${question.id}`} className="w-4 h-4 text-blue-600" />
              <span className="text-gray-700">False</span>
            </label>
          </div>
        )}

        {question.type === 'fillup' && (
          <div className="space-y-3">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-700 mb-3">Fill in the blank(s):</p>
              <Input
                placeholder="Type your answer here..."
                className="w-full"
              />
            </div>
          </div>
        )}

        {question.type === 'matching' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Terms</h4>
              <div className="space-y-2">
                {question.pairs.map((pair, index) => (
                  <div key={`term-${pair.id}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{pair.term}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Match with</h4>
              <div className="space-y-2">
                {question.pairs.map((pair, index) => (
                  <div key={`match-${pair.id}`} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <select className="w-16 p-1 border border-gray-300 rounded text-sm">
                      <option value="">-</option>
                      {question.pairs.map((_, i) => (
                        <option key={i} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                    <span className="text-gray-700">{pair.match}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {question.type === 'oneword' && (
          <div className="space-y-2">
            <Input
              placeholder="Enter your one word answer..."
              className="w-full max-w-md"
            />
          </div>
        )}

        {question.type === 'descriptive' && (
          <div className="space-y-3">
            <Textarea
              placeholder="Write your detailed answer here..."
              rows={6}
              className="w-full resize-none"
            />
            <div className="flex gap-2 text-xs text-gray-500">
              <span>Min: {question.minWordLimit} words</span>
              <span>•</span>
              <span>Max: {question.maxWordLimit > 0 ? `${question.maxWordLimit} words` : 'No limit'}</span>
            </div>
          </div>
        )}

        {question.type === 'submission' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-3">Submit your work</h4>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-2">
                    Submission Link or File Upload
                  </label>
                  <Input
                    placeholder={question.driveLink || "Paste your Google Drive link or submission URL here..."}
                    className="w-full"
                  />
                </div>
                <div className="text-xs text-blue-700">
                  <p>• You can paste a Google Drive link, Dropbox link, or any file sharing URL</p>
                  <p>• Make sure your file/folder is shared with proper permissions</p>
                  <p>• Accepted formats: Documents, PDFs, Images, Videos, etc.</p>
                </div>
              </div>
            </div>
            {question.notes && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> {question.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {question.type === 'assessment-question' && (
          <div className="space-y-3">
            {'description' in question && question.description && (
              <p className="text-sm text-gray-600 italic">{question.description}</p>
            )}
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-gray-700">This is an informational question section.</p>
            </div>
          </div>
        )}

        {question.type === 'essay-question' && (
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-medium text-green-900 mb-3">Essay Response</h4>
              <Textarea
                placeholder="Write your essay answer here... Be thorough and provide detailed explanations."
                rows={10}
                className="w-full resize-none"
              />
              <div className="flex justify-between items-center mt-3 text-sm text-green-700">
                <span>Word count: 0 / 1000</span>
                <Button size="sm" variant="outline" className="text-green-700 border-green-300">
                  Save Draft
                </Button>
              </div>
            </div>
            {'answer' in question && question.answer && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Guidelines:</strong> {question.answer}
                </p>
              </div>
            )}
          </div>
        )}

        {question.type === 'debate-question' && (
          <div className="space-y-4">
            {'description' in question && question.description && (
              <p className="text-sm text-gray-600 italic mb-4">{question.description}</p>
            )}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-purple-800 mb-4">Share Your Perspective</h4>
              <div className="space-y-4">
                <Textarea
                  placeholder="Present your argument and supporting evidence here. Be clear, structured, and persuasive in your reasoning..."
                  rows={8}
                  className="w-full resize-none"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-purple-700">Express your viewpoint clearly (max 500 words)</span>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    Post Response
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-xs sm:max-w-4xl max-h-[90vh] p-0" hideCloseButton>
        <DialogHeader className="px-4 sm:px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl font-semibold">
              {currentStep === 'instructions' ? 'Assessment Instructions' : `${assessmentSettings.title} - Learner View`}
            </DialogTitle>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto max-h-[calc(90vh-120px)]">
          {currentStep === 'instructions' ? (
            <div className="p-4 sm:p-6">
              {instructions.length > 0 ? (
                <div className="space-y-4">
                  {instructions.map((instruction) => (
                    <Card 
                      key={instruction.id}
                      className="p-4 sm:p-6" 
                      style={{ 
                        borderColor: getBackgroundColorValue(instruction.backgroundColor), 
                        backgroundColor: `${getBackgroundColorValue(instruction.backgroundColor)}10` 
                      }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h2 
                          className="text-lg sm:text-xl font-semibold" 
                          style={{ color: getBackgroundColorValue(instruction.backgroundColor) }}
                        >
                          {instruction.title}
                        </h2>
                      </div>
                      
                      <div className="space-y-2 mb-6">
                        {instruction.points.map((point, index) => (
                          <div key={index} className="flex items-start gap-2 text-gray-700">
                            <span className="font-medium min-w-[20px]">{index + 1}.</span>
                            <span className="text-sm sm:text-base">{point}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="pt-4 border-t border-gray-200">
                        <Button 
                          onClick={handleStartAssessment}
                          style={{ backgroundColor: getBackgroundColorValue(instruction.backgroundColor) }} 
                          className="text-white hover:opacity-90 w-full sm:w-auto"
                        >
                          Start Assessment
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No instructions have been added yet</p>
                  <Button onClick={handleStartAssessment} className="bg-blue-600 hover:bg-blue-700 text-white">
                    Continue to Questions
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-6">
              {/* Assessment Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold text-blue-900 mb-2">Assessment Information</h2>
                {assessmentSettings.description && (
                  <p className="text-blue-800 mb-3">{assessmentSettings.description}</p>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Clock className="h-4 w-4" />
                    <span>Time: {assessmentSettings.timeLimit} minutes</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <Trophy className="h-4 w-4" />
                    <span>Passing: {assessmentSettings.passingScore}%</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <RotateCcw className="h-4 w-4" />
                    <span>Attempts: {assessmentSettings.attemptsAllowed}</span>
                  </div>
                  <div className="flex items-center gap-2 text-blue-700">
                    <User className="h-4 w-4" />
                    <span>Total Points: {totalPoints}</span>
                  </div>
                </div>
              </div>

              {/* Questions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Questions ({questions.length})
                </h2>
                
                {questions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No questions added yet</p>
                  </div>
                ) : (
                  <div>
                    {questions.map((question, index) => renderQuestionPreview(question, index))}
                    
                    {/* Submit Button */}
                    <div className="mt-8 p-6 bg-gray-50 border border-gray-200 rounded-lg text-center">
                      <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
                        Submit Assessment
                      </Button>
                      <p className="text-sm text-gray-600 mt-2">
                        Make sure to review your answers before submitting
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
