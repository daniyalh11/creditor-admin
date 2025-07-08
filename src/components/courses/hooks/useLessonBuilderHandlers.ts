
import type { Block, TextBlock, StatementBlock, QuoteBlock, ListBlock, GalleryBlock, InteractiveBlock, MediaBlock, ChartsBlock, DividerBlock } from '../types/blocks';
import { getDefaultContent, getDefaultQuoteText, getDefaultListItems, getDefaultGalleryImages, getDefaultInteractiveContent, getDefaultDividerContent } from '../utils/defaultContent';
import { getTemplateBlocks } from '../utils/templateBlocks';

interface UseLessonBuilderHandlersProps {
  addedBlocks: Block[];
  setAddedBlocks: (blocks: Block[]) => void;
  setEditingBlock: (block: Block | null) => void;
  setShowTextBlockModal: (show: boolean) => void;
  setShowStatementBlockModal: (show: boolean) => void;
  setShowQuoteBlockModal: (show: boolean) => void;
  setShowListBlockModal: (show: boolean) => void;
  setShowGalleryBlockModal: (show: boolean) => void;
  setShowInteractiveBlockModal: (show: boolean) => void;
  setShowMediaBlockModal: (show: boolean) => void;
  setShowChartsBlockModal: (show: boolean) => void;
  setShowDividerBlockModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
  setShowStatementEditModal: (show: boolean) => void;
  setShowQuoteEditModal: (show: boolean) => void;
  setShowListEditModal: (show: boolean) => void;
  setShowGalleryEditModal: (show: boolean) => void;
  setShowInteractiveEditModal: (show: boolean) => void;
  setShowSortingEditModal: (show: boolean) => void;
  setShowScenarioEditModal: (show: boolean) => void;
  setShowFlashcardEditModal: (show: boolean) => void;
  setShowMediaEditModal: (show: boolean) => void;
  setShowChartsEditModal: (show: boolean) => void;
  setShowDividerEditModal: (show: boolean) => void;
}

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
}: UseLessonBuilderHandlersProps) => {

  const handleAddTemplate = (templateType: string) => {
    const templateBlocks = getTemplateBlocks(templateType);
    setAddedBlocks([...addedBlocks, ...templateBlocks]);
  };

  const handleTextBlockSelect = (blockType: 'paragraph' | 'heading-paragraph' | 'subheading-paragraph' | 'table') => {
    const newBlock: TextBlock = {
      id: Date.now().toString(),
      type: blockType,
      content: getDefaultContent(blockType)
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleStatementBlockSelect = (statementType: 'italic' | 'bold' | 'caps' | 'highlighted') => {
    const newBlock: StatementBlock = {
      id: Date.now().toString(),
      type: 'statement',
      style: statementType,
      content: { 
        title: 'Important Statement',
        description: 'This is an important statement.',
        style: 'info' as const
      }
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleQuoteBlockSelect = (quoteType: 'simple' | 'italic' | 'bold' | 'author' | 'circular-centerpiece' | 'vertical-spotlight' | 'side-by-side' | 'gray-panel' | 'visual-highlight') => {
    const getDefaultQuoteContent = (style: string) => {
      switch (style) {
        case 'circular-centerpiece':
          return {
            text: 'This is an inspiring quote that motivates everyone to achieve their dreams.',
            author: 'John Doe'
          };
        case 'vertical-spotlight':
          return {
            text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.',
            author: 'Winston Churchill'
          };
        case 'side-by-side':
          return {
            text: 'The only way to do great work is to love what you do.',
            author: 'Steve Jobs'
          };
        case 'gray-panel':
          return {
            text: 'Innovation distinguishes between a leader and a follower.',
            author: 'Steve Jobs'
          };
        case 'visual-highlight':
          return {
            text: 'The future belongs to those who believe in the beauty of their dreams.',
            author: 'Eleanor Roosevelt'
          };
        default:
          return {
            text: getDefaultQuoteText(quoteType),
            author: 'Author Name'
          };
      }
    };

    const defaultContent = getDefaultQuoteContent(quoteType);
    const newBlock: QuoteBlock = {
      id: Date.now().toString(),
      type: 'quote',
      style: quoteType,
      content: defaultContent
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleListBlockSelect = (listType: 'bullet' | 'numbered' | 'checklist') => {
    const newBlock: ListBlock = {
      id: Date.now().toString(),
      type: 'list',
      style: listType,
      content: {
        items: getDefaultListItems(listType)
      }
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleGalleryBlockSelect = (galleryType: 'carousel' | '2-column' | '3-column' | '4-column') => {
    const newBlock: GalleryBlock = {
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

  const handleInteractiveBlockSelect = (interactiveType: 'accordion' | 'tabs' | 'labeled-graphic' | 'process' | 'flashcard' | 'timeline' | 'sorting' | 'scenario') => {
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
      displayMode: 'grid' as const,
      cards: [
        {
          id: '1',
          front: { text: 'What is the capital of France?' },
          back: { text: 'Paris' }
        },
        {
          id: '2',
          front: { text: 'What is 2 + 2?' },
          back: { text: '4' }
        }
      ]
    });

    const getDefaultScenarioContent = () => ({
      scenes: [
        {
          id: '1',
          heading: 'Add text to explain the situation your scenario will address.',
          backgroundImage: '/lovable-uploads/a639cc57-1a53-4752-85af-b586193d4582.png',
          characterImage: '/lovable-uploads/3dfe0883-8aec-47eb-b199-f69148c0d059.png',
          contents: [
            {
              id: '1-content-1',
              heading: 'Add text to explain the situation your scenario will address.',
              avatarExpression: 'happy',
              contentType: 'dialog-bubble',
              responses: [
                { id: '1', text: 'Continue', avatarReaction: 'happy' }
              ]
            }
          ]
        }
      ],
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

    const newBlock: InteractiveBlock = {
      id: Date.now().toString(),
      type: 'interactive',
      style: interactiveType,
      content
    };
    setAddedBlocks([...addedBlocks, newBlock]);
  };

  const handleMediaBlockSelect = (mediaType: 'image' | 'multimedia', multimediaType?: 'audio' | 'video' | 'embedded' | 'attachment') => {
    const newBlock: MediaBlock = {
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

  const handleChartsBlockSelect = (chartType: 'bar' | 'pie' | 'line') => {
    const newBlock: ChartsBlock = {
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

  const handleDividerBlockSelect = (dividerType: 'continue' | 'divider' | 'number' | 'space') => {
    const newBlock: DividerBlock = {
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

  const handleUpdateBlock = (updatedBlock: Block) => {
    const updatedBlocks = addedBlocks.map(block => 
      block.id === updatedBlock.id ? updatedBlock : block
    );
    setAddedBlocks(updatedBlocks);
  };

  const handleDeleteBlock = (blockId: string) => {
    setAddedBlocks(addedBlocks.filter(block => block.id !== blockId));
  };

  const handleEditBlock = (block: Block) => {
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

  const handleMoveBlockUp = (blockId: string) => {
    const blockIndex = addedBlocks.findIndex(block => block.id === blockId);
    if (blockIndex > 0) {
      const newBlocks = [...addedBlocks];
      [newBlocks[blockIndex - 1], newBlocks[blockIndex]] = [newBlocks[blockIndex], newBlocks[blockIndex - 1]];
      setAddedBlocks(newBlocks);
    }
  };

  const handleMoveBlockDown = (blockId: string) => {
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
