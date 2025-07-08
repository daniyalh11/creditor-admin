
import React from 'react';
import { CreateBlockModals } from './modals/CreateBlockModals';
import { EditBlockModals } from './modals/EditBlockModals';
import type { Block } from './types/blocks';

interface LessonBuilderModalsProps {
  showTextBlockModal: boolean;
  setShowTextBlockModal: (show: boolean) => void;
  showStatementBlockModal: boolean;
  setShowStatementBlockModal: (show: boolean) => void;
  showQuoteBlockModal: boolean;
  setShowQuoteBlockModal: (show: boolean) => void;
  showListBlockModal: boolean;
  setShowListBlockModal: (show: boolean) => void;
  showGalleryBlockModal: boolean;
  setShowGalleryBlockModal: (show: boolean) => void;
  showInteractiveBlockModal: boolean;
  setShowInteractiveBlockModal: (show: boolean) => void;
  showMediaBlockModal: boolean;
  setShowMediaBlockModal: (show: boolean) => void;
  showChartsBlockModal: boolean;
  setShowChartsBlockModal: (show: boolean) => void;
  showDividerBlockModal: boolean;
  setShowDividerBlockModal: (show: boolean) => void;
  showDividerEditModal: boolean;
  setShowDividerEditModal: (show: boolean) => void;
  showEditModal: boolean;
  setShowEditModal: (show: boolean) => void;
  showStatementEditModal: boolean;
  setShowStatementEditModal: (show: boolean) => void;
  showQuoteEditModal: boolean;
  setShowQuoteEditModal: (show: boolean) => void;
  showListEditModal: boolean;
  setShowListEditModal: (show: boolean) => void;
  showGalleryEditModal: boolean;
  setShowGalleryEditModal: (show: boolean) => void;
  showInteractiveEditModal: boolean;
  setShowInteractiveEditModal: (show: boolean) => void;
  showSortingEditModal: boolean;
  setShowSortingEditModal: (show: boolean) => void;
  showScenarioEditModal: boolean;
  setShowScenarioEditModal: (show: boolean) => void;
  showMediaEditModal: boolean;
  setShowMediaEditModal: (show: boolean) => void;
  showChartsEditModal: boolean;
  setShowChartsEditModal: (show: boolean) => void;
  showFlashcardEditModal: boolean;
  setShowFlashcardEditModal: (show: boolean) => void;
  editingBlock: Block | null;
  onTextBlockSelect: (blockType: 'paragraph' | 'heading-paragraph' | 'subheading-paragraph' | 'table') => void;
  onStatementBlockSelect: (statementType: 'italic' | 'bold' | 'caps' | 'highlighted') => void;
  onQuoteBlockSelect: (quoteType: 'simple' | 'italic' | 'bold' | 'author' | 'circular-centerpiece' | 'vertical-spotlight' | 'side-by-side' | 'gray-panel' | 'visual-highlight') => void;
  onListBlockSelect: (listType: 'bullet' | 'numbered' | 'checklist') => void;
  onGalleryBlockSelect: (galleryType: 'carousel' | '2-column' | '3-column' | '4-column') => void;
  onInteractiveBlockSelect: (interactiveType: 'accordion' | 'tabs' | 'labeled-graphic' | 'process' | 'flashcard' | 'timeline' | 'sorting' | 'scenario') => void;
  onMediaBlockSelect: (mediaType: 'image' | 'multimedia', multimediaType?: 'audio' | 'video' | 'embedded' | 'attachment') => void;
  onChartsBlockSelect: (chartType: 'bar' | 'pie' | 'line') => void;
  onDividerBlockSelect: (dividerType: 'continue' | 'divider' | 'number' | 'space') => void;
  onUpdateBlock: (block: Block) => void;
}

export const LessonBuilderModals: React.FC<LessonBuilderModalsProps> = (props) => {
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
