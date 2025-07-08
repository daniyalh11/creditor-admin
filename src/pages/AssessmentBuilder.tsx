
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { AssessmentBuilderSidebar } from '@/components/courses/assessments/AssessmentBuilderSidebar';
import { AssessmentWorkspace } from '@/components/courses/assessments/AssessmentWorkspace';
import { SwitchTypeConfirmationModal } from '@/components/courses/assessments/SwitchTypeConfirmationModal';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const AssessmentBuilder = () => {
  const { id } = useParams(); // Course ID
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { toast } = useToast();
  const [selectedAssessmentType, setSelectedAssessmentType] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [assessmentSettings, setAssessmentSettings] = useState({
    title: 'New Assessment',
    description: '',
    timeLimit: 30,
    passingScore: 70,
    attemptsAllowed: 1
  });

  // New state for tracking progress and confirmation modal
  const [hasUnsavedProgress, setHasUnsavedProgress] = useState(false);
  const [showSwitchConfirmModal, setShowSwitchConfirmModal] = useState(false);
  const [pendingAssessmentType, setPendingAssessmentType] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [instructions, setInstructions] = useState('');
  const [savedInstructions, setSavedInstructions] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAssessmentId, setEditingAssessmentId] = useState<string | null>(null);

  // Load existing assessment data if in edit mode
  useEffect(() => {
    if (editId) {
      const editingAssessment = localStorage.getItem('editingAssessment');
      if (editingAssessment) {
        const assessment = JSON.parse(editingAssessment);
        console.log('Loading assessment for editing:', assessment);
        
        setIsEditMode(true);
        setEditingAssessmentId(assessment.id);
        setSelectedAssessmentType(assessment.type);
        setAssessmentSettings(assessment.settings);
        setQuestions(assessment.questions || []);
        setSavedInstructions(assessment.instructions || []);
        setHasUnsavedProgress(false);
        
        // Clear the temporary data
        localStorage.removeItem('editingAssessment');
      }
    }
  }, [editId]);

  const handleBack = () => {
    navigate(`/courses/builder/${id}/assessments`);
  };

  const handleAssessmentTypeSelect = (type: string) => {
    console.log('Selecting assessment type:', type, 'Current type:', selectedAssessmentType, 'Has progress:', hasUnsavedProgress);
    
    // If switching to a different type and there's unsaved progress, show confirmation
    if (selectedAssessmentType && selectedAssessmentType !== type && hasUnsavedProgress) {
      setPendingAssessmentType(type);
      setShowSwitchConfirmModal(true);
      return;
    }

    // Normal switch if no unsaved progress or same type
    setSelectedAssessmentType(type);
    setShowInstructions(false);
    
    // Reset workspace when switching types (but not in edit mode)
    if (!isEditMode) {
      handleResetWorkspace();
    }
  };

  const handleSettingsChange = (newSettings: any) => {
    setAssessmentSettings(newSettings);
    setHasUnsavedProgress(true);
  };

  const handleInstructionsClick = () => {
    setShowInstructions(true);
  };

  const handleInstructionsToggle = () => {
    setShowInstructions(false);
  };

  const handleResetWorkspace = () => {
    console.log('Resetting workspace for type:', selectedAssessmentType);
    setQuestions([]);
    setInstructions('');
    setSavedInstructions([]);
    setHasUnsavedProgress(false);
    setShowInstructions(false);
  };

  // Track progress when questions or instructions change
  const handleQuestionsChange = (newQuestions: any[]) => {
    console.log('Questions changed:', newQuestions.length);
    setQuestions(newQuestions);
    setHasUnsavedProgress(newQuestions.length > 0 || savedInstructions.length > 0);
  };

  const handleInstructionsChange = (newInstructions: string) => {
    setInstructions(newInstructions);
    setHasUnsavedProgress(true);
  };

  const handleSavedInstructionsUpdate = (newSavedInstructions: any[]) => {
    setSavedInstructions(newSavedInstructions);
    setHasUnsavedProgress(newSavedInstructions.length > 0 || questions.length > 0);
  };

  const handlePublishAndSwitch = () => {
    if (!selectedAssessmentType) return;

    // Validation checks
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
      id: isEditMode ? editingAssessmentId : Date.now().toString(),
      type: selectedAssessmentType,
      title: assessmentSettings.title,
      description: assessmentSettings.description,
      settings: assessmentSettings,
      instructions: savedInstructions,
      questions: questions,
      status: 'published',
      createdAt: isEditMode ? undefined : new Date().toISOString().split('T')[0],
      publishedAt: new Date().toISOString()
    };

    // Save to localStorage for persistence
    const existingAssessments = JSON.parse(localStorage.getItem('publishedAssessments') || '[]');
    
    if (isEditMode) {
      // Update existing assessment
      const updatedAssessments = existingAssessments.map((a: any) => 
        a.id === editingAssessmentId ? { ...a, ...assessment } : a
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

    // Reset progress and switch to new type
    setHasUnsavedProgress(false);
    setQuestions([]);
    setSavedInstructions([]);
    setInstructions('');
    setSelectedAssessmentType(pendingAssessmentType);
    setShowInstructions(false);
    setPendingAssessmentType(null);
    setShowSwitchConfirmModal(false);
  };

  const handleCancelSwitch = () => {
    setPendingAssessmentType(null);
    setShowSwitchConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Header */}
      <Header />

      {/* Main Layout Container - starts below fixed header */}
      <div className="flex pt-16">
        {/* Main Sidebar - Collapsed */}
        <SidebarNav />
        
        {/* Assessment Builder Sidebar - Fixed left after main sidebar */}
        <div className="fixed left-16 top-16 bottom-0 w-80 z-40">
          <AssessmentBuilderSidebar
            selectedAssessmentType={selectedAssessmentType}
            onAssessmentTypeSelect={handleAssessmentTypeSelect}
            assessmentSettings={assessmentSettings}
            onSettingsChange={handleSettingsChange}
            onInstructionsClick={handleInstructionsClick}
            showInstructions={showInstructions}
          />
        </div>
        
        {/* Main Content Area - Takes remaining space */}
        <div className="flex-1 ml-96">
          <AssessmentWorkspace
            selectedAssessmentType={selectedAssessmentType}
            assessmentSettings={assessmentSettings}
            onBack={handleBack}
            showInstructions={showInstructions}
            onInstructionsToggle={handleInstructionsToggle}
            onQuestionsChange={handleQuestionsChange}
            onInstructionsChange={handleInstructionsChange}
            onSavedInstructionsUpdate={handleSavedInstructionsUpdate}
            onResetWorkspace={handleResetWorkspace}
          />
        </div>
      </div>

      {/* Switch Type Confirmation Modal */}
      <SwitchTypeConfirmationModal
        isOpen={showSwitchConfirmModal}
        onClose={() => setShowSwitchConfirmModal(false)}
        onCancel={handleCancelSwitch}
        onPublishAndSwitch={handlePublishAndSwitch}
        currentType={selectedAssessmentType || ''}
        targetType={pendingAssessmentType || ''}
      />
    </div>
  );
};

export default AssessmentBuilder;
