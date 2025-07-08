
import React from 'react';
import type { StatementBlock } from '../types/blocks';

const getStatementStyle = (style: string) => {
  switch (style) {
    case 'italic':
      // Statement A: Center-aligned with boxed layout, light grey background
      return 'text-center bg-gray-50 border border-gray-200 rounded-lg p-6 mx-auto max-w-md';
    case 'bold':
      // Statement B: Left-aligned with colored line above
      return 'text-left relative pl-0';
    case 'caps':
      // Statement C: Left-aligned normal text with bold highlights
      return 'text-left';
    case 'highlighted':
      // Statement D: Left-aligned with colored line above
      return 'text-left relative pl-0';
    default:
      return 'text-lg text-gray-800';
  }
};

const getTextStyle = (style: string) => {
  switch (style) {
    case 'italic':
      // Statement A: Normal paragraph style
      return 'text-gray-800 leading-relaxed';
    case 'bold':
      // Statement B: Normal paragraph style
      return 'text-gray-700 leading-relaxed';
    case 'caps':
      // Statement C: Normal paragraph style with selective bold
      return 'text-gray-800 leading-relaxed';
    case 'highlighted':
      // Statement D: Normal paragraph style
      return 'text-gray-800 leading-relaxed';
    default:
      return 'text-lg text-gray-800';
  }
};

interface StatementBlockRendererProps {
  block: StatementBlock;
}

export const StatementBlockRenderer: React.FC<StatementBlockRendererProps> = ({ block }) => {
  const renderStatement = () => {
    const text = block.content.text;
    
    if (block.style === 'italic') {
      // Statement A: Center-aligned boxed layout
      return (
        <div className={getStatementStyle(block.style)}>
          <div className="border-t border-gray-300 w-12 mx-auto mb-4"></div>
          <p className={getTextStyle(block.style)}>
            {text}
          </p>
          <div className="border-b border-gray-300 w-12 mx-auto mt-4"></div>
        </div>
      );
    }
    
    if (block.style === 'bold') {
      // Statement B: Left-aligned with colored line above
      return (
        <div className={getStatementStyle(block.style)}>
          <div className="w-8 h-0.5 bg-orange-500 mb-4"></div>
          <p className={getTextStyle(block.style)}>
            {text}
          </p>
        </div>
      );
    }

    if (block.style === 'caps') {
      // Statement C: Left-aligned with selective bold text
      return (
        <div className={getStatementStyle(block.style)}>
          <p className={getTextStyle(block.style)}>
            {text}
          </p>
        </div>
      );
    }

    if (block.style === 'highlighted') {
      // Statement D: Left-aligned with colored line above
      return (
        <div className={getStatementStyle(block.style)}>
          <div className="w-8 h-0.5 bg-orange-500 mb-4"></div>
          <p className={getTextStyle(block.style)}>
            {text}
          </p>
        </div>
      );
    }
    
    // Default fallback
    return (
      <div className="prose max-w-none text-center">
        <p className={getStatementStyle(block.style) + ' ' + getTextStyle(block.style)}>{text}</p>
      </div>
    );
  };

  return renderStatement();
};
