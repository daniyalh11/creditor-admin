import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

/**
 * @typedef {'drive-link' | 'text-submission' | 'file-upload'} SubmissionType
 */

/**
 * @typedef {object} SubmissionQuestion
 * @property {string} id
 * @property {'submission'} type
 * @property {string} question
 * @property {SubmissionType} [submissionType]
 * @property {string} [driveLink]
 * @property {string} [notes]
 */

/**
 * A modal component for editing a Submission Question block.
 *
 * @param {object} props
 * @param {SubmissionQuestion} props.question - The question object to be edited.
 * @param {(question: SubmissionQuestion) => void} props.onSave - Callback function to save the edited question.
 * @param {() => void} props.onCancel - Callback function to cancel the edit.
 */
export const SubmissionQuestionEditModal = ({
  question,
  onSave,
  onCancel,
}) => {
  const [editedQuestion, setEditedQuestion] = useState({
    ...question,
    submissionType: question.submissionType || 'drive-link',
  });

  useEffect(() => {
    setEditedQuestion({
      ...question,
      submissionType: question.submissionType || 'drive-link',
    });
  }, [question]);

  const handleQuestionChange = (newQuestion) => {
    setEditedQuestion({
      ...editedQuestion,
      question: newQuestion,
    });
  };

  const handleSubmissionTypeChange = (submissionType) => {
    setEditedQuestion({
      ...editedQuestion,
      submissionType,
      // Clear drive link when switching away from drive-link type
      driveLink: submissionType === 'drive-link' ? editedQuestion.driveLink : undefined,
    });
  };

  const handleDriveLinkChange = (driveLink) => {
    setEditedQuestion({
      ...editedQuestion,
      driveLink,
    });
  };

  const handleNotesChange = (notes) => {
    setEditedQuestion({
      ...editedQuestion,
      notes,
    });
  };

  const handleSave = () => {
    // Validate that question text is not empty
    if (!editedQuestion.question.trim()) {
      alert('Please enter a question.');
      return;
    }

    onSave(editedQuestion);
  };

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Submission Block</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Question Text */}
          <div className="space-y-2">
            <Label htmlFor="question">Question *</Label>
            <Textarea
              id="question"
              value={editedQuestion.question}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Enter your submission question here..."
              rows={3}
              className="resize-none"
            />
          </div>

          {/* Submission Type */}
          <div className="space-y-3">
            <Label>Submission Type</Label>
            <RadioGroup
              value={editedQuestion.submissionType}
              onValueChange={(value) => handleSubmissionTypeChange(value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="drive-link" id="drive-link" />
                <Label htmlFor="drive-link" className="cursor-pointer">
                  🔗 Drive Link (students provide Google Drive link)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="text-submission" id="text-submission" />
                <Label htmlFor="text-submission" className="cursor-pointer">
                  📝 Text Submission (students type their response)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="file-upload" id="file-upload" />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  📎 File Upload (coming soon)
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Drive Link - only show for drive-link type */}
          {editedQuestion.submissionType === 'drive-link' && (
            <div className="space-y-2">
              <Label htmlFor="driveLink">Example Drive Link (Optional)</Label>
              <Input
                id="driveLink"
                value={editedQuestion.driveLink || ''}
                onChange={(e) => handleDriveLinkChange(e.target.value)}
                placeholder="https://drive.google.com/... (example for students)"
              />
              <p className="text-xs text-gray-500">
                This is an example link to show students the expected format
              </p>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes/Instructions (Optional)</Label>
            <Textarea
              id="notes"
              value={editedQuestion.notes || ''}
              onChange={(e) => handleNotesChange(e.target.value)}
              placeholder="Add any additional notes or instructions for students..."
              rows={3}
              className="resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Submission Block
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};