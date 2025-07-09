import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Users, Target, RotateCcw, FileText, CheckCircle } from 'lucide-react';

export const AssessmentViewModal = ({
  assessment,
  isOpen,
  onClose
}) => {
  const getAssessmentTypeLabel = (type) => {
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

  const getBackgroundColorValue = (color) => {
    switch (color) {
      case 'Blue':
        return '#3b82f6';
      case 'Green':
        return '#10b981';
      case 'Yellow':
        return '#f59e0b';
      case 'Red':
        return '#ef4444';
      case 'Purple':
        return '#8b5cf6';
      case 'Orange':
        return '#f97316';
      case 'Neutral':
        return '#6b7280';
      default:
        return '#3b82f6';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {assessment.title} - Preview
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Assessment Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {getAssessmentTypeLabel(assessment.type)}
                </span>
                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Published
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">{assessment.title}</h3>
                <p className="text-gray-600 mt-1">{assessment.description || 'No description provided'}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{assessment.settings.timeLimit}m</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Target className="h-4 w-4" />
                  <span>{assessment.settings.passingScore}%</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RotateCcw className="h-4 w-4" />
                  <span>{assessment.settings.attemptsAllowed} attempt{assessment.settings.attemptsAllowed !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FileText className="h-4 w-4" />
                  <span>{assessment.questions.length} question{assessment.questions.length !== 1 ? 's' : ''}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          {assessment.instructions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessment.instructions.map((instruction, index) => (
                  <div key={index} className="p-4 rounded-lg border" style={{ backgroundColor: `${getBackgroundColorValue(instruction.backgroundColor)}15` }}>
                    <h4 className="font-semibold text-gray-900 mb-2">{instruction.title}</h4>
                    <ul className="space-y-1">
                      {instruction.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-gray-400">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Questions Preview */}
          {assessment.questions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Questions ({assessment.questions.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {assessment.questions.map((question, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">Question {index + 1}</h4>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                        {question.type?.toUpperCase() || 'QUESTION'}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{question.question || question.title}</p>
                    
                    {/* Show options for MCQ/SCQ */}
                    {(question.type === 'mcq' || question.type === 'scq') && question.options && (
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="flex items-center gap-2 text-sm">
                            <span className="w-6 h-6 rounded border flex items-center justify-center text-xs bg-gray-50">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className={option.isCorrect ? 'text-green-600 font-medium' : 'text-gray-600'}>
                              {option.text}
                            </span>
                            {option.isCorrect && <span className="text-green-600 text-xs">(Correct)</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Show correct answer for True/False */}
                    {question.type === 'truefalse' && (
                      <div className="text-sm text-green-600 font-medium">
                        Correct answer: {question.correctAnswer ? 'True' : 'False'}
                      </div>
                    )}

                    {/* Show points if available */}
                    {question.points && (
                      <div className="text-xs text-gray-500 mt-2">
                        Points: {question.points}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};