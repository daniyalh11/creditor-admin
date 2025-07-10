export const getDefaultContent = (type) => {
  switch (type) {
    case 'paragraph':
      return { paragraph: 'This is a sample paragraph text that would appear in your lesson content.' };
    case 'heading-paragraph':
      return { 
        heading: 'Main Heading', 
        paragraph: 'Content paragraph goes here.' 
      };
    case 'subheading-paragraph':
      return { 
        subheading: 'Subheading', 
        paragraph: 'Content paragraph goes here.' 
      };
    case 'table':
      return {
        tableData: {
          headers: ['Header 1', 'Header 2'],
          rows: [['Data 1', 'Data 2']]
        }
      };
    default:
      return {};
  }
};

export const getDefaultQuoteText = (type) => {
  switch (type) {
    case 'simple':
      return 'This is a simple quote.';
    case 'italic':
      return 'This is an italic quote.';
    case 'bold':
      return 'This is a bold quote.';
    case 'author':
      return 'This quote includes an author image.';
    default:
      return 'This is a quote.';
  }
};

export const getDefaultListItems = (type) => {
  switch (type) {
    case 'bullet':
      return [
        { text: 'List item 1' },
        { text: 'List item 2' },
        { text: 'List item 3' }
      ];
    case 'numbered':
      return [
        { text: 'First item' },
        { text: 'Second item' },
        { text: 'Third item' }
      ];
    case 'checklist':
      return [
        { text: 'Task item 1', checked: false },
        { text: 'Task item 2', checked: true },
        { text: 'Task item 3', checked: false }
      ];
    default:
      return [{ text: 'Default item' }];
  }
};

export const getDefaultGalleryImages = () => {
  return [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      caption: 'Sample image 1'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      caption: 'Sample image 2'
    }
  ];
};

export const getDefaultInteractiveContent = (type) => {
  switch (type) {
    case 'accordion':
      return {
        sections: [
          { id: '1', title: 'Section 1', content: 'Content for section 1' },
          { id: '2', title: 'Section 2', content: 'Content for section 2' }
        ]
      };
    case 'tabs':
      return {
        tabs: [
          { id: '1', title: 'Tab 1', content: 'Content for tab 1' },
          { id: '2', title: 'Tab 2', content: 'Content for tab 2' }
        ]
      };
    case 'labeled-graphic':
      return {
        image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
        hotspots: [
          { id: '1', x: 25, y: 30, label: 'Point 1', description: 'Description for point 1' },
          { id: '2', x: 75, y: 70, label: 'Point 2', description: 'Description for point 2' }
        ]
      };
    case 'process':
      return {
        steps: [
          { id: '1', title: 'Step 1', description: 'First step description' },
          { id: '2', title: 'Step 2', description: 'Second step description' }
        ]
      };
    case 'scenario':
      return {
        question: 'What would you do in this situation?',
        description: 'Choose the best option',
        options: [
          { id: '1', text: 'Option A', feedback: 'Good choice!', isCorrect: true },
          { id: '2', text: 'Option B', feedback: 'Try again', isCorrect: false }
        ]
      };
    case 'flashcard':
      return {
        front: { text: 'Front of the card' },
        back: { text: 'Back of the card' }
      };
    case 'timeline':
      return {
        events: [
          { id: '1', date: '2024', title: 'Event 1', description: 'First event description' },
          { id: '2', date: '2025', title: 'Event 2', description: 'Second event description' }
        ]
      };
    default:
      return {};
  }
};

export const getDefaultDividerContent = (type) => {
  switch (type) {
    case 'continue':
      return { label: 'Continue' };
    case 'number':
      return { number: 1 };
    default:
      return {};
  }
};