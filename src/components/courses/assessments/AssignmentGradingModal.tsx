
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save, X, User, Calendar, FileText, ExternalLink } from 'lucide-react';

interface AssignmentGradingModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentData: any;
  onSave: (gradeData: any) => void;
}

export const AssignmentGradingModal: React.FC<AssignmentGradingModalProps> = ({
  isOpen,
  onClose,
  studentData,
  onSave
}) => {
  const [gradeData, setGradeData] = useState({
    score: studentData?.score || '',
    feedback: studentData?.feedback || ''
  });

  // Mock student submission link
  const studentSubmissionLink = 'https://docs.google.com/document/d/1234567890/edit';

  const handleSave = () => {
    if (gradeData.score === '' || isNaN(Number(gradeData.score))) return;
    onSave(gradeData);
    onClose();
  };

  const handleCancel = () => {
    setGradeData({
      score: studentData?.score || '',
      feedback: studentData?.feedback || ''
    });
    onClose();
  };

  const handleOpenLink = () => {
    window.open(studentSubmissionLink, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-100 rounded flex items-center justify-center">
                <FileText className="h-4 w-4 text-green-600" />
              </div>
              Grade Assignment Submission
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancel}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Student Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{studentData.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Submitted: {studentData.submittedAt}</span>
                    </div>
                    <Badge variant={studentData.status === 'Submitted' ? 'default' : 'destructive'}>
                      {studentData.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Student Submission Link */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Student Submission</Label>
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-700 break-all">{studentSubmissionLink}</p>
                </div>
                <Button
                  onClick={handleOpenLink}
                  className="ml-4 bg-blue-600 hover:bg-blue-700 text-white"
                  size="sm"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Link
                </Button>
              </div>
            </div>
          </div>

          {/* Grading Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="score">Score (out of 100) *</Label>
              <Input
                id="score"
                type="number"
                value={gradeData.score}
                onChange={(e) => setGradeData(prev => ({ ...prev, score: e.target.value }))}
                placeholder="Enter score..."
                min="0"
                max="100"
              />
            </div>

            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <p>Grade Range:</p>
                <p>A: 90-100 | B: 80-89 | C: 70-79 | D: 60-69 | F: Below 60</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="feedback">Feedback (Optional)</Label>
            <Textarea
              id="feedback"
              value={gradeData.feedback}
              onChange={(e) => setGradeData(prev => ({ ...prev, feedback: e.target.value }))}
              placeholder="Provide detailed feedback for the student..."
              rows={6}
              className="resize-none w-full"
            />
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-700 text-sm">
              <strong>Note:</strong> Once you save the grade, the student will be notified via email and can view 
              their score and feedback in their dashboard.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={!gradeData.score || isNaN(Number(gradeData.score))}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Grade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
