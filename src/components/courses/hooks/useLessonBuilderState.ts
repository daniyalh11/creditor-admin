
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import type { Block } from '../types/blocks';

export const useLessonBuilderState = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('blocks');
  const [addedBlocks, setAddedBlocks] = useState<Block[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showTextBlockModal, setShowTextBlockModal] = useState(false);
  const [showStatementBlockModal, setShowStatementBlockModal] = useState(false);
  const [showQuoteBlockModal, setShowQuoteBlockModal] = useState(false);
  const [showListBlockModal, setShowListBlockModal] = useState(false);
  const [showGalleryBlockModal, setShowGalleryBlockModal] = useState(false);
  const [showInteractiveBlockModal, setShowInteractiveBlockModal] = useState(false);
  const [showMediaBlockModal, setShowMediaBlockModal] = useState(false);
  const [showChartsBlockModal, setShowChartsBlockModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showStatementEditModal, setShowStatementEditModal] = useState(false);
  const [showQuoteEditModal, setShowQuoteEditModal] = useState(false);
  const [showListEditModal, setShowListEditModal] = useState(false);
  const [showGalleryEditModal, setShowGalleryEditModal] = useState(false);
  const [showInteractiveEditModal, setShowInteractiveEditModal] = useState(false);
  const [showSortingEditModal, setShowSortingEditModal] = useState(false);
  const [showScenarioEditModal, setShowScenarioEditModal] = useState(false);
  const [showFlashcardEditModal, setShowFlashcardEditModal] = useState(false);
  const [showMediaEditModal, setShowMediaEditModal] = useState(false);
  const [showChartsEditModal, setShowChartsEditModal] = useState(false);
  const [showDividerBlockModal, setShowDividerBlockModal] = useState(false);
  const [showDividerEditModal, setShowDividerEditModal] = useState(false);
  const [editingBlock, setEditingBlock] = useState<Block | null>(null);

  // Check if we're editing an existing unit
  const editingUnit = location.state?.editingUnit;
  const [lessonTitle, setLessonTitle] = useState(editingUnit?.title || "New Lesson");

  // Load existing blocks if editing
  useEffect(() => {
    if (editingUnit?.blocks) {
      setAddedBlocks(editingUnit.blocks);
    }
  }, [editingUnit]);

  return {
    activeTab,
    setActiveTab,
    addedBlocks,
    setAddedBlocks,
    showPreviewModal,
    setShowPreviewModal,
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
    showDividerBlockModal,
    setShowDividerBlockModal,
    showDividerEditModal,
    setShowDividerEditModal,
    editingBlock,
    setEditingBlock,
    editingUnit,
    lessonTitle,
    setLessonTitle
  };
};
