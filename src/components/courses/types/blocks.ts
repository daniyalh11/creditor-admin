
// Base block interface
export interface Block {
  id: string;
  type: string;
  style?: string;
  content: any;
}

// Text block types
export interface TextBlock extends Block {
  type: 'paragraph' | 'heading-paragraph' | 'subheading-paragraph' | 'table';
  content: string | {
    paragraph?: string;
    heading?: string;
    subheading?: string;
    tableData?: any[];
  };
}

// Statement block
export interface StatementBlock extends Block {
  type: 'statement';
  style: 'italic' | 'bold' | 'caps' | 'highlighted';
  content: {
    title: string;
    description: string;
    style: 'info' | 'warning' | 'success' | 'error';
  };
}

// Quote block
export interface QuoteBlock extends Block {
  type: 'quote';
  style: 'simple' | 'italic' | 'bold' | 'author' | 'circular-centerpiece' | 'vertical-spotlight' | 'side-by-side' | 'gray-panel' | 'visual-highlight';
  content: {
    text: string;
    author?: string;
    source?: string;
  };
}

// List block
export interface ListBlock extends Block {
  type: 'list';
  style: 'bullet' | 'numbered' | 'checklist';
  content: {
    items: { text: string; checked?: boolean }[];
  };
}

// Gallery block
export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  caption?: string;
}

export interface GalleryBlock extends Block {
  type: 'gallery';
  style: 'carousel' | '2-column' | '3-column' | '4-column';
  content: {
    images: GalleryImage[];
    layout: 'grid' | 'carousel';
  };
}

// Interactive block
export interface InteractiveBlock extends Block {
  type: 'interactive';
  style: 'tabs' | 'accordion' | 'labeled-graphic' | 'process' | 'flashcard' | 'timeline' | 'scenario' | 'sorting';
  content: any;
}

// Media block
export interface MediaBlock extends Block {
  type: 'media';
  style: 'image' | 'multimedia';
  content: {
    url: string;
    mediaType: 'video' | 'audio' | 'image';
    title?: string;
    description?: string;
    caption?: string;
    src?: string;
    fileType?: 'image' | 'video' | 'audio' | 'embedded' | 'attachment';
    multimediaType?: 'audio' | 'video' | 'embedded' | 'attachment';
    imageStyle?: 'centered' | 'full-width' | 'image-and-text' | 'text-on-image';
    text?: string;
    embedCode?: string;
    fileName?: string;
    fileSize?: string;
    mimeType?: string;
    recordedAudio?: boolean;
  };
}

// Charts block
export interface ChartsBlock extends Block {
  type: 'charts';
  style: 'bar' | 'line' | 'pie';
  content: {
    chartType: 'bar' | 'line' | 'pie' | 'area';
    data: any[];
    title?: string;
    description?: string;
  };
}

// Divider block
export interface DividerBlock extends Block {
  type: 'divider';
  style: 'continue' | 'divider' | 'number' | 'space';
  content: {
    style: 'line' | 'space' | 'dots';
    thickness?: 'thin' | 'medium' | 'thick';
    label?: string;
    number?: number;
  };
}
