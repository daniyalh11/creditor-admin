import { useState } from 'react';

export const useBlockModals = () => {
  const [showTextBlockModal, setShowTextBlockModal] = useState(false);
  const [showStatementBlockModal, setShowStatementBlockModal] = useState(false);
  const [showQuoteBlockModal, setShowQuoteBlockModal] = useState(false);
  const [showListBlockModal, setShowListBlockModal] = useState(false);
  const [showGalleryBlockModal, setShowGalleryBlockModal] = useState(false);
  const [showInteractiveBlockModal, setShowInteractiveBlockModal] = useState(false);
  const [showMediaBlockModal, setShowMediaBlockModal] = useState(false);
  const [showChartsBlockModal, setShowChartsBlockModal] = useState(false);
  const [showDividerBlockModal, setShowDividerBlockModal] = useState(false);

  return {
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
  };
};