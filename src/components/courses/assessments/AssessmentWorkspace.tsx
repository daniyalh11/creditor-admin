
import React, { useState, useEffect } from 'react';
import { InstructionsBuilder } from './InstructionsBuilder';
import { AssessmentPreviewModal } from './AssessmentPreviewModal';
import { AssessmentWorkspaceHeader } from './AssessmentWorkspaceHeader';
import { AssessmentWorkspaceEmptyState } from './AssessmentWorkspaceEmptyState';
import { AssessmentWorkspaceContent } from './AssessmentWorkspaceContent';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AssessmentWorkspaceProps {
  selectedAssessmentType: string | null;
  assessmentSettings: {
    title: string;
    description: string;
    timeLimit: number;
    passingScore: number;
    attemptsAllowed: number;
  };
  onBack: () => void;
  showInstructions?: boolean;
  onInstructionsToggle?: () => void;
  onQuestionsChange?: (questions: any[]) => void;
  onInstructionsChange?: (instructions: string) => void;
  onSavedInstructionsUpdate?: (savedInstructions: any[]) => void;
  onResetWorkspace?: () => void;
}

export const AssessmentWorkspace: React.FC<AssessmentWorkspaceProps> = ({
  selectedAssessmentType,
  assessmentSettings,
  onBack,
  showInstructions = false,
  onInstructionsToggle,
  onQuestionsChange,
  onInstructionsChange,
  onSavedInstructionsUpdate,
  onResetWorkspace
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [savedInstructions, setSavedInstructions] = useState<any[]>([]);
  const [hasCompletedInstructions, setHasCompletedInstructions] = useState(false);
  const [currentAssessmentType, setCurrentAssessmentType] = useState<string | null>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { toast } = useToast();

  // Reset workspace when assessment type changes
  useEffect(() => {
    if (selectedAssessmentType !== currentAssessmentType) {
      console.log('Assessment type changed from', currentAssessmentType, 'to', selectedAssessmentType);
      
      // Only reset if not in edit mode
      if (!editId) {
        // Reset all state when switching types
        setQuestions([]);
        setInstructions('');
        setSavedInstructions([]);
        setHasCompletedInstructions(false);
        setShowPreviewModal(false);
        
        // Call parent reset function
        if (onResetWorkspace) {
          onResetWorkspace();
        }
      }
      
      // Update current type
      setCurrentAssessmentType(selectedAssessmentType);
    }
  }, [selectedAssessmentType, currentAssessmentType, onResetWorkspace, editId]);

  const handleQuestionsChange = (newQuestions: any[]) => {
    setQuestions(newQuestions);
    onQuestionsChange?.(newQuestions);
  };

  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  const handleInstructionsContinue = () => {
    setHasCompletedInstructions(true);
    if (onInstructionsToggle) {
      onInstructionsToggle();
    }
  };

  const handleInstructionsChange = (newInstructions: string) => {
    setInstructions(newInstructions);
    onInstructionsChange?.(newInstructions);
  };

  const handleSavedInstructionsUpdate = (newSavedInstructions: any[]) => {
    setSavedInstructions(newSavedInstructions);
    onSavedInstructionsUpdate?.(newSavedInstructions);
  };

  const resetWorkspace = () => {
    setQuestions([]);
    setInstructions('');
    setSavedInstructions([]);
    setHasCompletedInstructions(false);
    setShowPreviewModal(false);
    if (onResetWorkspace) {
      onResetWorkspace();
    }
  };

  const handlePublish = () => {
    if (!selectedAssessmentType) {
      toast({
        title: "Error",
        description: "Please select an assessment type before publishing.",
        variant: "destructive"
      });
      return;
    }

    if (savedInstructions.length === 0) {
      toast({
        title: "Error", 
        description: "Please add instructions before publishing the assessment.",
        variant: "destructive"
      });
      return;
    }

    if (questions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question before publishing the assessment.",
        variant: "destructive"
      });
      return;
    }

    // Create the assessment object
    const assessment = {
      id: editId || Date.now().toString(),
      type: selectedAssessmentType,
      title: assessmentSettings.title,
      description: assessmentSettings.description,
      settings: assessmentSettings,
      instructions: savedInstructions,
      questions: questions,
      status: 'published',
      createdAt: editId ? undefined : new Date().toISOString().split('T')[0],
      publishedAt: new Date().toISOString()
    };

    // Save to localStorage for persistence
    const existingAssessments = JSON.parse(localStorage.getItem('publishedAssessments') || '[]');
    
    if (editId) {
      // Update existing assessment
      const updatedAssessments = existingAssessments.map((a: any) => 
        a.id === editId ? { ...a, ...assessment } : a
      );
      localStorage.setItem('publishedAssessments', JSON.stringify(updatedAssessments));
      
      toast({
        title: "✅ Assessment updated successfully",
        description: `Your ${selectedAssessmentType} has been updated.`,
      });
    } else {
      // Add new assessment
      existingAssessments.push(assessment);
      localStorage.setItem('publishedAssessments', JSON.stringify(existingAssessments));
      
      toast({
        title: "✅ Assessment published successfully",
        description: `Your ${selectedAssessmentType} has been published and is now available.`,
      });
    }

    // Reset workspace after publishing
    resetWorkspace();

    // Navigate back to assessments page
    navigate(`/courses/builder/new-1750419669645/assessments`);
  };

  // Show instructions interface for quiz, survey, assignment, essay, and debate types
  if (showInstructions || (!hasCompletedInstructions && selectedAssessmentType && (selectedAssessmentType === 'quiz' || selectedAssessmentType === 'survey' || selectedAssessmentType === 'assignment' || selectedAssessmentType === 'essay' || selectedAssessmentType === 'debate'))) {
    return (
      <InstructionsBuilder
        onBack={onBack}
        onContinue={handleInstructionsContinue}
        instructions={instructions}
        onInstructionsChange={handleInstructionsChange}
        onSavedInstructionsUpdate={handleSavedInstructionsUpdate}
      />
    );
  }

  return (
    <div className="h-full flex flex-col">
      <AssessmentWorkspaceHeader
        selectedAssessmentType={selectedAssessmentType}
        assessmentSettings={assessmentSettings}
        onBack={onBack}
        onPreview={handlePreview}
        onPublish={handlePublish}
      />

      <div className="flex-1 overflow-hidden">
        {selectedAssessmentType ? (
          <AssessmentWorkspaceContent
            selectedAssessmentType={selectedAssessmentType}
            assessmentSettings={assessmentSettings}
            onQuestionsChange={handleQuestionsChange}
          />
        ) : (
          <AssessmentWorkspaceEmptyState />
        )}
      </div>

      <AssessmentPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        assessmentSettings={assessmentSettings}
        questions={questions}
        instructions={savedInstructions}
      />
    </div>
  );
};
