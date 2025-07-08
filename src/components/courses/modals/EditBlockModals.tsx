
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
import type { Block } from '../types/blocks';

interface EditBlockModalsProps {
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
  showFlashcardEditModal: boolean;
  setShowFlashcardEditModal: (show: boolean) => void;
  showMediaEditModal: boolean;
  setShowMediaEditModal: (show: boolean) => void;
  showChartsEditModal: boolean;
  setShowChartsEditModal: (show: boolean) => void;
  showDividerEditModal: boolean;
  setShowDividerEditModal: (show: boolean) => void;
  editingBlock: Block | null;
  onUpdateBlock: (block: Block) => void;
}

export const EditBlockModals: React.FC<EditBlockModalsProps> = ({
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
        block={editingBlock as any}
        onSave={onUpdateBlock}
      />

      <StatementEditModal
        open={showStatementEditModal}
        onOpenChange={setShowStatementEditModal}
        block={editingBlock as any}
        onSave={onUpdateBlock}
      />

      <QuoteEditModal
        open={showQuoteEditModal}
        onOpenChange={setShowQuoteEditModal}
        block={editingBlock as any}
        onSave={onUpdateBlock}
      />

      <ListEditModal
        open={showListEditModal}
        onOpenChange={setShowListEditModal}
        block={editingBlock as any}
        onSave={onUpdateBlock}
      />

      <GalleryEditModal
        open={showGalleryEditModal}
        onOpenChange={setShowGalleryEditModal}
        block={editingBlock as any}
        onSave={onUpdateBlock}
      />

      <InteractiveEditModal
        open={showInteractiveEditModal}
        onOpenChange={setShowInteractiveEditModal}
        block={editingBlock as any}
        onSave={onUpdateBlock}
      />

      <SortingEditModal
        open={showSortingEditModal}
        onOpenChange={setShowSortingEditModal}
        block={editingBlock && editingBlock.type === 'interactive' && (editingBlock as any).style === 'sorting' ? editingBlock as any : null}
        onSave={onUpdateBlock}
      />

      <ScenarioEditModal
        open={showScenarioEditModal}
        onOpenChange={setShowScenarioEditModal}
        block={editingBlock && editingBlock.type === 'interactive' && (editingBlock as any).style === 'scenario' ? editingBlock as any : null}
        onSave={onUpdateBlock}
      />

      <FlashcardEditModal
        open={showFlashcardEditModal}
        onOpenChange={setShowFlashcardEditModal}
        block={editingBlock && editingBlock.type === 'interactive' && (editingBlock as any).style === 'flashcard' ? editingBlock as any : null}
        onSave={onUpdateBlock}
      />

      <MediaEditModal
        open={showMediaEditModal}
        onOpenChange={setShowMediaEditModal}
        block={editingBlock as any}
        onSave={onUpdateBlock}
      />

      <ChartsEditModal
        open={showChartsEditModal}
        onOpenChange={setShowChartsEditModal}
        block={editingBlock as any}
        onSave={onUpdateBlock}
      />

      <DividerEditModal
        open={showDividerEditModal}
        onOpenChange={setShowDividerEditModal}
        block={editingBlock as any}
        onSave={onUpdateBlock}
      />
    </>
  );
};
