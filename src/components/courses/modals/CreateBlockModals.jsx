import React from 'react';
import { TextBlockModal } from '../TextBlockModal';
import { StatementBlockModal } from '../StatementBlockModal';
import { QuoteBlockModal } from '../QuoteBlockModal';
import { ListBlockModal } from '../ListBlockModal';
import { GalleryBlockModal } from '../GalleryBlockModal';
import { InteractiveBlockModal } from '../InteractiveBlockModal';
import { MediaBlockModal } from '../MediaBlockModal';
import { ChartsBlockModal } from '../ChartsBlockModal';
import { DividerBlockModal } from '../DividerBlockModal';

export const CreateBlockModals = ({
  showTextBlockModal,
  setShowTextBlockModal,
  showStatementBlockModal,
  setShowStatementBlockModal,
  showQuoteBlockModal,
  setShowQuoteBlockModal,
  showListBlockModal,
  setShowListBlockModal,
  showGalleryBlockModal,
  setShowGalleryBlockModal,
  showInteractiveBlockModal,
  setShowInteractiveBlockModal,
  showMediaBlockModal,
  setShowMediaBlockModal,
  showChartsBlockModal,
  setShowChartsBlockModal,
  showDividerBlockModal,
  setShowDividerBlockModal,
  onTextBlockSelect,
  onStatementBlockSelect,
  onQuoteBlockSelect,
  onListBlockSelect,
  onGalleryBlockSelect,
  onInteractiveBlockSelect,
  onMediaBlockSelect,
  onChartsBlockSelect,
  onDividerBlockSelect
}) => {
  return (
    <>
      <TextBlockModal
        open={showTextBlockModal}
        onOpenChange={setShowTextBlockModal}
        onSelect={onTextBlockSelect}
      />

      <StatementBlockModal
        open={showStatementBlockModal}
        onOpenChange={setShowStatementBlockModal}
        onSelect={onStatementBlockSelect}
      />

      <QuoteBlockModal
        open={showQuoteBlockModal}
        onOpenChange={setShowQuoteBlockModal}
        onSelect={onQuoteBlockSelect}
      />

      <ListBlockModal
        open={showListBlockModal}
        onOpenChange={setShowListBlockModal}
        onSelect={onListBlockSelect}
      />

      <GalleryBlockModal
        open={showGalleryBlockModal}
        onOpenChange={setShowGalleryBlockModal}
        onSelect={onGalleryBlockSelect}
      />

      <InteractiveBlockModal
        open={showInteractiveBlockModal}
        onOpenChange={setShowInteractiveBlockModal}
        onSelect={onInteractiveBlockSelect}
      />

      <MediaBlockModal
        open={showMediaBlockModal}
        onOpenChange={setShowMediaBlockModal}
        onSelect={onMediaBlockSelect}
      />

      <ChartsBlockModal
        open={showChartsBlockModal}
        onOpenChange={setShowChartsBlockModal}
        onSelect={onChartsBlockSelect}
      />

      <DividerBlockModal
        open={showDividerBlockModal}
        onOpenChange={setShowDividerBlockModal}
        onSelect={onDividerBlockSelect}
      />
    </>
  );
};