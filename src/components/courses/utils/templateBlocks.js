export const getTemplateBlocks = (templateType) => {
  const baseId = Date.now();
  
  switch (templateType) {
    case 'welcome':
      return [
        {
          id: (baseId + 1).toString(),
          type: 'heading-paragraph',
          content: {
            heading: 'Welcome to Our Course',
            paragraph: 'We are excited to have you join us on this learning journey. This course will provide you with essential knowledge and skills.'
          }
        },
        {
          id: (baseId + 2).toString(),
          type: 'list',
          style: 'bullet',
          content: {
            items: [
              { text: 'Course objectives and learning outcomes' },
              { text: 'Required materials and resources' },
              { text: 'Assessment criteria and deadlines' },
              { text: 'Support resources and contact information' }
            ]
          }
        },
        {
          id: (baseId + 3).toString(),
          type: 'quote',
          style: 'author',
          content: {
            text: 'Education is the most powerful weapon which you can use to change the world.',
            author: 'Nelson Mandela'
          }
        },
        {
          id: (baseId + 4).toString(),
          type: 'statement',
          style: 'highlighted',
          content: {
            text: 'Let\'s begin this exciting learning adventure together!'
          }
        }
      ];
      
    case 'compliance':
      return [
        {
          id: (baseId + 1).toString(),
          type: 'heading-paragraph',
          content: {
            heading: 'Compliance Training Overview',
            paragraph: 'This training module covers essential compliance requirements and safety protocols that all employees must understand and follow.'
          }
        },
        {
          id: (baseId + 2).toString(),
          type: 'statement',
          style: 'caps',
          content: {
            text: 'COMPLIANCE IS EVERYONE\'S RESPONSIBILITY'
          }
        },
        {
          id: (baseId + 3).toString(),
          type: 'list',
          style: 'checklist',
          content: {
            items: [
              { text: 'Read and understand company policies', checked: false },
              { text: 'Complete mandatory training modules', checked: false },
              { text: 'Pass the compliance assessment', checked: false },
              { text: 'Acknowledge receipt of training materials', checked: false }
            ]
          }
        },
        {
          id: (baseId + 4).toString(),
          type: 'divider',
          style: 'continue',
          content: {
            label: 'Continue to Next Section'
          }
        }
      ];
      
    case 'product':
      return [
        {
          id: (baseId + 1).toString(),
          type: 'heading-paragraph',
          content: {
            heading: 'Product Training Module',
            paragraph: 'Learn about our product features, benefits, and how to effectively communicate value to customers.'
          }
        },
        {
          id: (baseId + 2).toString(),
          type: 'gallery',
          style: '3-column',
          content: {
            images: [
              {
                id: '1',
                src: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
                caption: 'Product Overview'
              },
              {
                id: '2',
                src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
                caption: 'Key Features'
              },
              {
                id: '3',
                src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop',
                caption: 'Customer Benefits'
              }
            ]
          }
        }
      ];
      
    default:
      return [];
  }
};