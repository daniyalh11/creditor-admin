
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

interface CreateBlockModalsProps {
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
  onTextBlockSelect: (blockType: 'paragraph' | 'heading-paragraph' | 'subheading-paragraph' | 'table') => void;
  onStatementBlockSelect: (statementType: 'italic' | 'bold' | 'caps' | 'highlighted') => void;
  onQuoteBlockSelect: (quoteType: 'simple' | 'italic' | 'bold' | 'author' | 'circular-centerpiece' | 'vertical-spotlight' | 'side-by-side' | 'gray-panel' | 'visual-highlight') => void;
  onListBlockSelect: (listType: 'bullet' | 'numbered' | 'checklist') => void;
  onGalleryBlockSelect: (galleryType: 'carousel' | '2-column' | '3-column' | '4-column') => void;
  onInteractiveBlockSelect: (interactiveType: 'accordion' | 'tabs' | 'labeled-graphic' | 'process' | 'scenario' | 'flashcard' | 'timeline' | 'sorting') => void;
  onMediaBlockSelect: (mediaType: 'image' | 'multimedia', multimediaType?: 'audio' | 'video' | 'embedded' | 'attachment') => void;
  onChartsBlockSelect: (chartType: 'bar' | 'pie' | 'line') => void;
  onDividerBlockSelect: (dividerType: 'continue' | 'divider' | 'number' | 'space') => void;
}

export const CreateBlockModals: React.FC<CreateBlockModalsProps> = ({
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
