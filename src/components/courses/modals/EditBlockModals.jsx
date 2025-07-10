import React from 'react';
import { TextBlockEditModal } from '../TextBlockEditModal';
import { StatementEditModal } from '../StatementEditModal';
import { QuoteEditModal } from '../QuoteEditModal';
import { ListEditModal } from '../ListEditModal';
import { GalleryEditModal } from '../GalleryEditModal';
import { InteractiveEditModal } from '../InteractiveEditModal';
import { SortingEditModal } from '../SortingEditModal';
import { ScenarioEditModal } from '../ScenarioEditModal';
import { FlashcardEditModal } from '../FlashcardEditModal';
import { MediaEditModal } from '../MediaEditModal';
import { ChartsEditModal } from '../ChartsEditModal';
import { DividerEditModal } from '../DividerEditModal';

export const EditBlockModals = ({
  showEditModal,
  setShowEditModal,
  showStatementEditModal,
  setShowStatementEditModal,
  showQuoteEditModal,
  setShowQuoteEditModal,
  showListEditModal,
  setShowListEditModal,
  showGalleryEditModal,
  setShowGalleryEditModal,
  showInteractiveEditModal,
  setShowInteractiveEditModal,
  showSortingEditModal,
  setShowSortingEditModal,
  showScenarioEditModal,
  setShowScenarioEditModal,
  showFlashcardEditModal,
  setShowFlashcardEditModal,
  showMediaEditModal,
  setShowMediaEditModal,
  showChartsEditModal,
  setShowChartsEditModal,
  showDividerEditModal,
  setShowDividerEditModal,
  editingBlock,
  onUpdateBlock
}) => {
  return (
    <>
      <TextBlockEditModal
        open={showEditModal}
        onOpenChange={setShowEditModal}
        block={editingBlock}
        onSave={onUpdateBlock}
      />

      <StatementEditModal
        open={showStatementEditModal}
        onOpenChange={setShowStatementEditModal}
        block={editingBlock}
        onSave={onUpdateBlock}
      />

      <QuoteEditModal
        open={showQuoteEditModal}
        onOpenChange={setShowQuoteEditModal}
        block={editingBlock}
        onSave={onUpdateBlock}
      />

      <ListEditModal
        open={showListEditModal}
        onOpenChange={setShowListEditModal}
        block={editingBlock}
        onSave={onUpdateBlock}
      />

      <GalleryEditModal
        open={showGalleryEditModal}
        onOpenChange={setShowGalleryEditModal}
        block={editingBlock}
        onSave={onUpdateBlock}
      />

      <InteractiveEditModal
        open={showInteractiveEditModal}
        onOpenChange={setShowInteractiveEditModal}
        block={editingBlock}
        onSave={onUpdateBlock}
      />

      <SortingEditModal
        open={showSortingEditModal}
        onOpenChange={setShowSortingEditModal}
        block={editingBlock && editingBlock.type === 'interactive' && editingBlock.style === 'sorting' ? editingBlock : null}
        onSave={onUpdateBlock}
      />

      <ScenarioEditModal
        open={showScenarioEditModal}
        onOpenChange={setShowScenarioEditModal}
        block={editingBlock && editingBlock.type === 'interactive' && editingBlock.style === 'scenario' ? editingBlock : null}
        onSave={onUpdateBlock}
      />

      <FlashcardEditModal
        open={showFlashcardEditModal}
        onOpenChange={setShowFlashcardEditModal}
        block={editingBlock && editingBlock.type === 'interactive' && editingBlock.style === 'flashcard' ? editingBlock : null}
        onSave={onUpdateBlock}
      />

      <MediaEditModal
        open={showMediaEditModal}
        onOpenChange={setShowMediaEditModal}
        block={editingBlock}
        onSave={onUpdateBlock}
      />

      <ChartsEditModal
        open={showChartsEditModal}
        onOpenChange={setShowChartsEditModal}
        block={editingBlock}
        onSave={onUpdateBlock}
      />

      <DividerEditModal
        open={showDividerEditModal}
        onOpenChange={setShowDividerEditModal}
        block={editingBlock}
        onSave={onUpdateBlock}
      />
    </>
  );
};