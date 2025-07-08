
import React from 'react';
import { useParams } from 'react-router-dom';
import { LessonBuilderSidebar } from '@/components/courses/LessonBuilderSidebar';
import { LessonBuilderHeader } from '@/components/courses/LessonBuilderHeader';
import { LessonBuilderContent } from '@/components/courses/LessonBuilderContent';
import { LessonBuilderModals } from '@/components/courses/LessonBuilderModals';
import { LessonPreviewModal } from '@/components/courses/LessonPreviewModal';
import { useLessonBuilderState } from '@/components/courses/hooks/useLessonBuilderState';
import { useLessonBuilderHandlers } from '@/components/courses/hooks/useLessonBuilderHandlers';

const LessonBuilder = () => {
  const { id } = useParams();
  const state = useLessonBuilderState();
  
  const handlers = useLessonBuilderHandlers({
    addedBlocks: state.addedBlocks,
    setAddedBlocks: state.setAddedBlocks,
    setEditingBlock: state.setEditingBlock,
    setShowTextBlockModal: state.setShowTextBlockModal,
    setShowStatementBlockModal: state.setShowStatementBlockModal,
    setShowQuoteBlockModal: state.setShowQuoteBlockModal,
    setShowListBlockModal: state.setShowListBlockModal,
    setShowGalleryBlockModal: state.setShowGalleryBlockModal,
    setShowInteractiveBlockModal: state.setShowInteractiveBlockModal,
    setShowMediaBlockModal: state.setShowMediaBlockModal,
    setShowChartsBlockModal: state.setShowChartsBlockModal,
    setShowDividerBlockModal: state.setShowDividerBlockModal,
    setShowEditModal: state.setShowEditModal,
    setShowStatementEditModal: state.setShowStatementEditModal,
    setShowQuoteEditModal: state.setShowQuoteEditModal,
    setShowListEditModal: state.setShowListEditModal,
    setShowGalleryEditModal: state.setShowGalleryEditModal,
    setShowInteractiveEditModal: state.setShowInteractiveEditModal,
    setShowSortingEditModal: state.setShowSortingEditModal,
    setShowScenarioEditModal: state.setShowScenarioEditModal,
    setShowFlashcardEditModal: state.setShowFlashcardEditModal,
    setShowMediaEditModal: state.setShowMediaEditModal,
    setShowChartsEditModal: state.setShowChartsEditModal,
    setShowDividerEditModal: state.setShowDividerEditModal
  });

  const handleSaveDraft = () => {
    console.log('Save as draft clicked');
  };

  const handlePreview = () => {
    console.log('Preview clicked');
    state.setShowPreviewModal(true);
  };

  const handlePublish = (lessonData: any) => {
    // Save to localStorage and pass to UnitsBuilder
    const courseUnits = JSON.parse(localStorage.getItem(`course-${id}-units`) || '[]');
    const updatedUnits = [...courseUnits, lessonData];
    localStorage.setItem(`course-${id}-units`, JSON.stringify(updatedUnits));
    
    console.log('Lesson published:', lessonData);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <LessonBuilderHeader
        courseId={id || ''}
        onSaveDraft={handleSaveDraft}
        onPreview={handlePreview}
        onPublish={handlePublish}
        addedBlocks={state.addedBlocks}
        lessonTitle={state.lessonTitle}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        {/* Fixed Sidebar */}
        <LessonBuilderSidebar
          activeTab={state.activeTab}
          setActiveTab={state.setActiveTab}
          onAddTextBlock={handlers.handleAddTextBlock}
          onAddStatementBlock={handlers.handleAddStatementBlock}
          onAddQuoteBlock={handlers.handleAddQuoteBlock}
          onAddListBlock={handlers.handleAddListBlock}
          onAddGalleryBlock={handlers.handleAddGalleryBlock}
          onAddInteractiveBlock={handlers.handleAddInteractiveBlock}
          onAddMediaBlock={handlers.handleAddMediaBlock}
          onAddChartsBlock={handlers.handleAddChartsBlock}
          onAddDividerBlock={handlers.handleAddDividerBlock}
          onAddTemplate={handlers.handleAddTemplate}
        />

        {/* Scrollable Content Area */}
        <LessonBuilderContent
          addedBlocks={state.addedBlocks}
          onUpdateBlock={handlers.handleUpdateBlock}
          onDeleteBlock={handlers.handleDeleteBlock}
          onEditBlock={handlers.handleEditBlock}
          onMoveBlockUp={handlers.handleMoveBlockUp}
          onMoveBlockDown={handlers.handleMoveBlockDown}
        />
      </div>

      <LessonBuilderModals
        showTextBlockModal={state.showTextBlockModal}
        setShowTextBlockModal={state.setShowTextBlockModal}
        showStatementBlockModal={state.showStatementBlockModal}
        setShowStatementBlockModal={state.setShowStatementBlockModal}
        showQuoteBlockModal={state.showQuoteBlockModal}
        setShowQuoteBlockModal={state.setShowQuoteBlockModal}
        showListBlockModal={state.showListBlockModal}
        setShowListBlockModal={state.setShowListBlockModal}
        showGalleryBlockModal={state.showGalleryBlockModal}
        setShowGalleryBlockModal={state.setShowGalleryBlockModal}
        showInteractiveBlockModal={state.showInteractiveBlockModal}
        setShowInteractiveBlockModal={state.setShowInteractiveBlockModal}
        showMediaBlockModal={state.showMediaBlockModal}
        setShowMediaBlockModal={state.setShowMediaBlockModal}
        showChartsBlockModal={state.showChartsBlockModal}
        setShowChartsBlockModal={state.setShowChartsBlockModal}
        showDividerBlockModal={state.showDividerBlockModal}
        setShowDividerBlockModal={state.setShowDividerBlockModal}
        showDividerEditModal={state.showDividerEditModal}
        setShowDividerEditModal={state.setShowDividerEditModal}
        showEditModal={state.showEditModal}
        setShowEditModal={state.setShowEditModal}
        showStatementEditModal={state.showStatementEditModal}
        setShowStatementEditModal={state.setShowStatementEditModal}
        showQuoteEditModal={state.showQuoteEditModal}
        setShowQuoteEditModal={state.setShowQuoteEditModal}
        showListEditModal={state.showListEditModal}
        setShowListEditModal={state.setShowListEditModal}
        showGalleryEditModal={state.showGalleryEditModal}
        setShowGalleryEditModal={state.setShowGalleryEditModal}
        showInteractiveEditModal={state.showInteractiveEditModal}
        setShowInteractiveEditModal={state.setShowInteractiveEditModal}
        showMediaEditModal={state.showMediaEditModal}
        setShowMediaEditModal={state.setShowMediaEditModal}
        showChartsEditModal={state.showChartsEditModal}
        setShowChartsEditModal={state.setShowChartsEditModal}
        showSortingEditModal={state.showSortingEditModal}
        setShowSortingEditModal={state.setShowSortingEditModal}
        showScenarioEditModal={state.showScenarioEditModal}
        setShowScenarioEditModal={state.setShowScenarioEditModal}
        showFlashcardEditModal={state.showFlashcardEditModal}
        setShowFlashcardEditModal={state.setShowFlashcardEditModal}
        editingBlock={state.editingBlock}
        onTextBlockSelect={handlers.handleTextBlockSelect}
        onStatementBlockSelect={handlers.handleStatementBlockSelect}
        onQuoteBlockSelect={handlers.handleQuoteBlockSelect}
        onListBlockSelect={handlers.handleListBlockSelect}
        onGalleryBlockSelect={handlers.handleGalleryBlockSelect}
        onInteractiveBlockSelect={handlers.handleInteractiveBlockSelect}
        onMediaBlockSelect={handlers.handleMediaBlockSelect}
        onChartsBlockSelect={handlers.handleChartsBlockSelect}
        onDividerBlockSelect={handlers.handleDividerBlockSelect}
        onUpdateBlock={handlers.handleUpdateBlock}
      />

      <LessonPreviewModal
        open={state.showPreviewModal}
        onOpenChange={state.setShowPreviewModal}
        blocks={state.addedBlocks}
        lessonTitle="New Lesson"
      />
    </div>
  );
};

export default LessonBuilder;
