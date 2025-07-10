import { useState } from 'react';

/**
 * Custom React hook to manage the open/close state of various editing modals.
 *
 * This hook centralizes the state management for multiple modal dialogs
 * across the application, making it easier to control their visibility.
 * Each modal gets its own boolean state and a corresponding setter function.
 *
 * @returns {{
 *   showEditModal: boolean,
 *   setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showStatementEditModal: boolean,
 *   setShowStatementEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showQuoteEditModal: boolean,
 *   setShowQuoteEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showListEditModal: boolean,
 *   setShowListEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showGalleryEditModal: boolean,
 *   setShowGalleryEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showInteractiveEditModal: boolean,
 *   setShowInteractiveEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showSortingEditModal: boolean,
 *   setShowSortingEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showFlashcardEditModal: boolean,
 *   setShowFlashcardEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showMediaEditModal: boolean,
 *   setShowMediaEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showChartsEditModal: boolean,
 *   setShowChartsEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 *   showDividerEditModal: boolean,
 *   setShowDividerEditModal: React.Dispatch<React.SetStateAction<boolean>>,
 * }} An object containing all modal state variables and their setters.
 */
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