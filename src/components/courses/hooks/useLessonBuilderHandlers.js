import { getDefaultContent, getDefaultQuoteText, getDefaultListItems, getDefaultGalleryImages, getDefaultInteractiveContent, getDefaultDividerContent } from '../utils/defaultContent';
import { getTemplateBlocks } from '../utils/templateBlocks';

/**
 * A custom hook that provides all the handler functions for a lesson builder UI.
 * It encapsulates the logic for adding, updating, deleting, and reordering content blocks.
 *
 * @param {object} props - The props for the hook.
 * @param {Array<object>} props.addedBlocks - The current array of content blocks.
 * @param {(blocks: Array<object>) => void} props.setAddedBlocks - State setter for the blocks array.
 * @param {(block: object | null) => void} props.setEditingBlock - State setter for the block currently being edited.
 * @param {(show: boolean) => void} props.setShowTextBlockModal - State setter for the Text Block modal.
 * @param {(show: boolean) => void} props.setShowStatementBlockModal - State setter for the Statement Block modal.
 * @param {(show: boolean) => void} props.setShowQuoteBlockModal - State setter for the Quote Block modal.
 * @param {(show: boolean) => void} props.setShowListBlockModal - State setter for the List Block modal.
 * @param {(show: boolean) => void} props.setShowGalleryBlockModal - State setter for the Gallery Block modal.
 * @param {(show: boolean) => void} props.setShowInteractiveBlockModal - State setter for the Interactive Block modal.
 * @param {(show: boolean) => void} props.setShowMediaBlockModal - State setter for the Media Block modal.
 * @param {(show: boolean) => void} props.setShowChartsBlockModal - State setter for the Charts Block modal.
 * @param {(show: boolean) => void} props.setShowDividerBlockModal - State setter for the Divider Block modal.
 * @param {(show: boolean) => void} props.setShowEditModal - State setter for the generic edit modal.
 * @param {(show: boolean) => void} props.setShowStatementEditModal - State setter for the statement edit modal.
 * @param {(show: boolean) => void} props.setShowQuoteEditModal - State setter for the quote edit modal.
 * @param {(show: boolean) => void} props.setShowListEditModal - State setter for the list edit modal.
 * @param {(show: boolean) => void} props.setShowGalleryEditModal - State setter for the gallery edit modal.
 * @param {(show: boolean) => void} props.setShowInteractiveEditModal - State setter for the interactive edit modal.
 * @param {(show: boolean) => void} props.setShowSortingEditModal - State setter for the sorting edit modal.
 * @param {(show: boolean) => void} props.setShowScenarioEditModal - State setter for the scenario edit modal.
 * @param {(show: boolean) => void} props.setShowFlashcardEditModal - State setter for the flashcard edit modal.
 * @param {(show: boolean) => void} props.setShowMediaEditModal - State setter for the media edit modal.
 * @param {(show: boolean) => void} props.setShowChartsEditModal - State setter for the charts edit modal.
 * @param {(show: boolean) => void} props.setShowDividerEditModal - State setter for the divider edit modal.
 * @returns {object} An object containing all the handler functions for the lesson builder.
 */
export const useLessonBuilderHandlers = ({
  addedBlocks,
  setAddedBlocks,
  setEditingBlock,
  setShowTextBlockModal,
  setShowStatementBlockModal,
  setShowQuoteBlockModal,
  setShowListBlockModal,
  setShowGalleryBlockModal,
  setShowInteractiveBlockModal,
  setShowMediaBlockModal,
  setShowChartsBlockModal,
  setShowDividerBlockModal,
  setShowEditModal,
  setShowStatementEditModal,
  setShowQuoteEditModal,
  setShowListEditModal,
  setShowGalleryEditModal,
  setShowInteractiveEditModal,
  setShowSortingEditModal,
  setShowScenarioEditModal,
  setShowFlashcardEditModal,
  setShowMediaEditModal,
  setShowChartsEditModal,
  setShowDividerEditModal
}) => {

  const handleAddTemplate = (templateType) => {
    const templateBlocks = getTemplateBlocks(templateType);
    setAddedBlocks([...addedBlocks, ...templateBlocks]);
  };

  const handleTextBlockSelect = (blockType) => {
    const newBlock = {
      id: Date.now().toString(),
      type: blockType,
      content: getDefaultContent(blockType)
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleStatementBlockSelect = (statementType) => {
    const newBlock = {
      id: Date.now().toString(),
      type: 'statement',
      style: statementType,
      content: { 
        title: 'Important Statement',
        description: 'This is an important statement.',
        style: 'info'
      }
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleQuoteBlockSelect = (quoteType) => {
    const getDefaultQuoteContent = (style) => {
      switch (style) {
        case 'circular-centerpiece':
          return { text: 'This is an inspiring quote that motivates everyone to achieve their dreams.', author: 'John Doe' };
        case 'vertical-spotlight':
          return { text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' };
        case 'side-by-side':
          return { text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' };
        case 'gray-panel':
          return { text: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' };
        case 'visual-highlight':
          return { text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt' };
        default:
          return { text: getDefaultQuoteText(quoteType), author: 'Author Name' };
      }
    };

    const defaultContent = getDefaultQuoteContent(quoteType);
    const newBlock = {
      id: Date.now().toString(),
      type: 'quote',
      style: quoteType,
      content: defaultContent
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleListBlockSelect = (listType) => {
    const newBlock = {
      id: Date.now().toString(),
      type: 'list',
      style: listType,
      content: {
        items: getDefaultListItems(listType)
      }
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleGalleryBlockSelect = (galleryType) => {
    const newBlock = {
      id: Date.now().toString(),
      type: 'gallery',
      style: galleryType,
      content: {
        images: getDefaultGalleryImages(),
        layout: galleryType === 'carousel' ? 'carousel' : 'grid'
      }
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleInteractiveBlockSelect = (interactiveType) => {
    const getDefaultSortingContent = () => ({
      title: 'Sorting Activity',
      instructions: 'Drag and drop the cards to arrange them in the correct order.',
      items: [
        { id: '1', text: 'First step in the process', correctPosition: 1 },
        { id: '2', text: 'Second step in the process', correctPosition: 2 },
        { id: '3', text: 'Third step in the process', correctPosition: 3 },
        { id: '4', text: 'Final step in the process', correctPosition: 4 }
      ],
      correctFeedback: 'Excellent! You arranged the items in the correct order.',
      incorrectFeedback: 'Not quite right. Review the items and try again.',
      allowRetry: true,
      showCorrectOrder: true
    });

    const getDefaultFlashcardContent = () => ({
      displayMode: 'grid',
      cards: [
        { id: '1', front: { text: 'What is the capital of France?' }, back: { text: 'Paris' } },
        { id: '2', front: { text: 'What is 2 + 2?' }, back: { text: '4' } }
      ]
    });

    const getDefaultScenarioContent = () => ({
      scenes: [{
        id: '1',
        heading: 'Add text to explain the situation your scenario will address.',
        backgroundImage: '/lovable-uploads/a639cc57-1a53-4752-85af-b586193d4582.png',
        characterImage: '/lovable-uploads/3dfe0883-8aec-47eb-b199-f69148c0d059.png',
        contents: [{
          id: '1-content-1',
          heading: 'Add text to explain the situation your scenario will address.',
          avatarExpression: 'happy',
          contentType: 'dialog-bubble',
          responses: [{ id: '1', text: 'Continue', avatarReaction: 'happy' }]
        }]
      }],
      currentSceneIndex: 0,
      currentContentIndex: 0
    });

    let content;
    if (interactiveType === 'sorting') {
      content = getDefaultSortingContent();
    } else if (interactiveType === 'flashcard') {
      content = getDefaultFlashcardContent();
    } else if (interactiveType === 'scenario') {
      content = getDefaultScenarioContent();
    } else {
      content = getDefaultInteractiveContent(interactiveType);
    }

    const newBlock = {
      id: Date.now().toString(),
      type: 'interactive',
      style: interactiveType,
      content
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleMediaBlockSelect = (mediaType, multimediaType) => {
    const newBlock = {
      id: Date.now().toString(),
      type: 'media',
      style: mediaType,
      content: {
        url: '',
        mediaType: 'image',
        caption: '',
        title: mediaType === 'multimedia' ? '' : undefined,
        multimediaType: mediaType === 'multimedia' ? multimediaType : undefined,
        fileType: mediaType === 'multimedia' ? multimediaType : 'image',
        imageStyle: mediaType === 'image' ? 'centered' : undefined,
        text: undefined
      }
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleChartsBlockSelect = (chartType) => {
    const newBlock = {
      id: Date.now().toString(),
      type: 'charts',
      style: chartType,
      content: {
        chartType: chartType,
        data: [
          { label: 'Sample 1', value: 10 },
          { label: 'Sample 2', value: 20 }
        ]
      }
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleDividerBlockSelect = (dividerType) => {
    const newBlock = {
      id: Date.now().toString(),
      type: 'divider',
      style: dividerType,
      content: {
        style: 'line',
        ...getDefaultDividerContent(dividerType)
      }
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleUpdateBlock = (updatedBlock) => {
    const updatedBlocks = addedBlocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    );
    setAddedBlocks(updatedBlocks);
  };

  const handleDeleteBlock = (blockId) => {
    setAddedBlocks(addedBlocks.filter(block => block.id !== blockId));
  };

  const handleEditBlock = (block) => {
    setEditingBlock(block);
    if (block.type === 'statement') {
      setShowStatementEditModal(true);
    } else if (block.type === 'quote') {
      setShowQuoteEditModal(true);
    } else if (block.type === 'list') {
      setShowListEditModal(true);
    } else if (block.type === 'gallery') {
      setShowGalleryEditModal(true);
    } else if (block.type === 'interactive') {
      if (block.style === 'sorting') {
        setShowSortingEditModal(true);
      } else if (block.style === 'flashcard') {
        setShowFlashcardEditModal(true);
      } else if (block.style === 'scenario') {
        setShowScenarioEditModal(true);
      } else {
        setShowInteractiveEditModal(true);
      }
    } else if (block.type === 'media') {
      setShowMediaEditModal(true);
    } else if (block.type === 'charts') {
      setShowChartsEditModal(true);
    } else if (block.type === 'divider') {
      setShowDividerEditModal(true);
    } else {
      setShowEditModal(true);
    }
  };

  const handleMoveBlockUp = (blockId) => {
    const blockIndex = addedBlocks.findIndex(block => block.id === blockId);
    if (blockIndex > 0) {
      const newBlocks = [...addedBlocks];
      [newBlocks[blockIndex - 1], newBlocks[blockIndex]] = [newBlocks[blockIndex], newBlocks[blockIndex - 1]];
      setAddedBlocks(newBlocks);
    }
  };

  const handleMoveBlockDown = (blockId) => {
    const blockIndex = addedBlocks.findIndex(block => block.id === blockId);
    if (blockIndex < addedBlocks.length - 1) {
      const newBlocks = [...addedBlocks];
      [newBlocks[blockIndex], newBlocks[blockIndex + 1]] = [newBlocks[blockIndex + 1], newBlocks[blockIndex]];
      setAddedBlocks(newBlocks);
    }
  };

  return {
    handleAddTemplate,
    handleTextBlockSelect,
    handleStatementBlockSelect,
    handleQuoteBlockSelect,
    handleListBlockSelect,
    handleGalleryBlockSelect,
    handleInteractiveBlockSelect,
    handleMediaBlockSelect,
    handleChartsBlockSelect,
    handleDividerBlockSelect,
    handleUpdateBlock,
    handleDeleteBlock,
    handleEditBlock,
    handleMoveBlockUp,
    handleMoveBlockDown,
    handleAddTextBlock: () => setShowTextBlockModal(true),
    handleAddStatementBlock: () => setShowStatementBlockModal(true),
    handleAddQuoteBlock: () => setShowQuoteBlockModal(true),
    handleAddListBlock: () => setShowListBlockModal(true),
    handleAddGalleryBlock: () => setShowGalleryBlockModal(true),
    handleAddInteractiveBlock: () => setShowInteractiveBlockModal(true),
    handleAddMediaBlock: () => setShowMediaBlockModal(true),
    handleAddChartsBlock: () => setShowChartsBlockModal(true),
    handleAddDividerBlock: () => setShowDividerBlockModal(true)
  };
};