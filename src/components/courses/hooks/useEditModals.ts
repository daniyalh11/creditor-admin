
import { useState } from 'react';

export const useEditModals = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatementEditModal, setShowStatementEditModal] = useState(false);
  const [showQuoteEditModal, setShowQuoteEditModal] = useState(false);
  const [showListEditModal, setShowListEditModal] = useState(false);
  const [showGalleryEditModal, setShowGalleryEditModal] = useState(false);
  const [showInteractiveEditModal, setShowInteractiveEditModal] = useState(false);
  const [showSortingEditModal, setShowSortingEditModal] = useState(false);
  const [showFlashcardEditModal, setShowFlashcardEditModal] = useState(false);
  const [showMediaEditModal, setShowMediaEditModal] = useState(false);
  const [showChartsEditModal, setShowChartsEditModal] = useState(false);
  const [showDividerEditModal, setShowDividerEditModal] = useState(false);

  return {
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
    showFlashcardEditModal,
    setShowFlashcardEditModal,
    showMediaEditModal,
    setShowMediaEditModal,
    showChartsEditModal,
    setShowChartsEditModal,
    showDividerEditModal,
    setShowDividerEditModal,
  };
};
