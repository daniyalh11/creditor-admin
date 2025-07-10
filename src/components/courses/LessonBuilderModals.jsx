import React from 'react';
import PropTypes from 'prop-types';
import { CreateBlockModals } from './modals/CreateBlockModals';
import { EditBlockModals } from './modals/EditBlockModals';

export const LessonBuilderModals = (props) => {
  return (
    <>
      <CreateBlockModals
        showTextBlockModal={props.showTextBlockModal}
        setShowTextBlockModal={props.setShowTextBlockModal}
        showStatementBlockModal={props.showStatementBlockModal}
        setShowStatementBlockModal={props.setShowStatementBlockModal}
        showQuoteBlockModal={props.showQuoteBlockModal}
        setShowQuoteBlockModal={props.setShowQuoteBlockModal}
        showListBlockModal={props.showListBlockModal}
        setShowListBlockModal={props.setShowListBlockModal}
        showGalleryBlockModal={props.showGalleryBlockModal}
        setShowGalleryBlockModal={props.setShowGalleryBlockModal}
        showInteractiveBlockModal={props.showInteractiveBlockModal}
        setShowInteractiveBlockModal={props.setShowInteractiveBlockModal}
        showMediaBlockModal={props.showMediaBlockModal}
        setShowMediaBlockModal={props.setShowMediaBlockModal}
        showChartsBlockModal={props.showChartsBlockModal}
        setShowChartsBlockModal={props.setShowChartsBlockModal}
        showDividerBlockModal={props.showDividerBlockModal}
        setShowDividerBlockModal={props.setShowDividerBlockModal}
        onTextBlockSelect={props.onTextBlockSelect}
        onStatementBlockSelect={props.onStatementBlockSelect}
        onQuoteBlockSelect={props.onQuoteBlockSelect}
        onListBlockSelect={props.onListBlockSelect}
        onGalleryBlockSelect={props.onGalleryBlockSelect}
        onInteractiveBlockSelect={props.onInteractiveBlockSelect}
        onMediaBlockSelect={props.onMediaBlockSelect}
        onChartsBlockSelect={props.onChartsBlockSelect}
        onDividerBlockSelect={props.onDividerBlockSelect}
      />

      <EditBlockModals
        showEditModal={props.showEditModal}
        setShowEditModal={props.setShowEditModal}
        showStatementEditModal={props.showStatementEditModal}
        setShowStatementEditModal={props.setShowStatementEditModal}
        showQuoteEditModal={props.showQuoteEditModal}
        setShowQuoteEditModal={props.setShowQuoteEditModal}
        showListEditModal={props.showListEditModal}
        setShowListEditModal={props.setShowListEditModal}
        showGalleryEditModal={props.showGalleryEditModal}
        setShowGalleryEditModal={props.setShowGalleryEditModal}
        showInteractiveEditModal={props.showInteractiveEditModal}
        setShowInteractiveEditModal={props.setShowInteractiveEditModal}
        showSortingEditModal={props.showSortingEditModal}
        setShowSortingEditModal={props.setShowSortingEditModal}
        showScenarioEditModal={props.showScenarioEditModal}
        setShowScenarioEditModal={props.setShowScenarioEditModal}
        showFlashcardEditModal={props.showFlashcardEditModal}
        setShowFlashcardEditModal={props.setShowFlashcardEditModal}
        showMediaEditModal={props.showMediaEditModal}
        setShowMediaEditModal={props.setShowMediaEditModal}
        showChartsEditModal={props.showChartsEditModal}
        setShowChartsEditModal={props.setShowChartsEditModal}
        showDividerEditModal={props.showDividerEditModal}
        setShowDividerEditModal={props.setShowDividerEditModal}
        editingBlock={props.editingBlock}
        onUpdateBlock={props.onUpdateBlock}
      />
    </>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
LessonBuilderModals.propTypes = {
  // Create Modals: Visibility Flags
  showTextBlockModal: PropTypes.bool.isRequired,
  showStatementBlockModal: PropTypes.bool.isRequired,
  showQuoteBlockModal: PropTypes.bool.isRequired,
  showListBlockModal: PropTypes.bool.isRequired,
  showGalleryBlockModal: PropTypes.bool.isRequired,
  showInteractiveBlockModal: PropTypes.bool.isRequired,
  showMediaBlockModal: PropTypes.bool.isRequired,
  showChartsBlockModal: PropTypes.bool.isRequired,
  showDividerBlockModal: PropTypes.bool.isRequired,

  // Create Modals: Setter Functions
  setShowTextBlockModal: PropTypes.func.isRequired,
  setShowStatementBlockModal: PropTypes.func.isRequired,
  setShowQuoteBlockModal: PropTypes.func.isRequired,
  setShowListBlockModal: PropTypes.func.isRequired,
  setShowGalleryBlockModal: PropTypes.func.isRequired,
  setShowInteractiveBlockModal: PropTypes.func.isRequired,
  setShowMediaBlockModal: PropTypes.func.isRequired,
  setShowChartsBlockModal: PropTypes.func.isRequired,
  setShowDividerBlockModal: PropTypes.func.isRequired,

  // Edit Modals: Visibility Flags
  showEditModal: PropTypes.bool.isRequired,
  showStatementEditModal: PropTypes.bool.isRequired,
  showQuoteEditModal: PropTypes.bool.isRequired,
  showListEditModal: PropTypes.bool.isRequired,
  showGalleryEditModal: PropTypes.bool.isRequired,
  showInteractiveEditModal: PropTypes.bool.isRequired,
  showSortingEditModal: PropTypes.bool.isRequired,
  showScenarioEditModal: PropTypes.bool.isRequired,
  showMediaEditModal: PropTypes.bool.isRequired,
  showChartsEditModal: PropTypes.bool.isRequired,
  showDividerEditModal: PropTypes.bool.isRequired,
  showFlashcardEditModal: PropTypes.bool.isRequired,

  // Edit Modals: Setter Functions
  setShowEditModal: PropTypes.func.isRequired,
  setShowStatementEditModal: PropTypes.func.isRequired,
  setShowQuoteEditModal: PropTypes.func.isRequired,
  setShowListEditModal: PropTypes.func.isRequired,
  setShowGalleryEditModal: PropTypes.func.isRequired,
  setShowInteractiveEditModal: PropTypes.func.isRequired,
  setShowSortingEditModal: PropTypes.func.isRequired,
  setShowScenarioEditModal: PropTypes.func.isRequired,
  setShowMediaEditModal: PropTypes.func.isRequired,
  setShowChartsEditModal: PropTypes.func.isRequired,
  setShowDividerEditModal: PropTypes.func.isRequired,
  setShowFlashcardEditModal: PropTypes.func.isRequired,
  
  // Data for Edit Modals
  editingBlock: PropTypes.object, // Can be null, so not .isRequired

  // Selection Callbacks
  onTextBlockSelect: PropTypes.func.isRequired,
  onStatementBlockSelect: PropTypes.func.isRequired,
  onQuoteBlockSelect: PropTypes.func.isRequired,
  onListBlockSelect: PropTypes.func.isRequired,
  onGalleryBlockSelect: PropTypes.func.isRequired,
  onInteractiveBlockSelect: PropTypes.func.isRequired,
  onMediaBlockSelect: PropTypes.func.isRequired,
  onChartsBlockSelect: PropTypes.func.isRequired,
  onDividerBlockSelect: PropTypes.func.isRequired,
  
  // Update Callback
  onUpdateBlock: PropTypes.func.isRequired,
};