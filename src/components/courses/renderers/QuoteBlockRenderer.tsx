
import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { QuoteBlock } from '../types/blocks';

const getQuoteStyle = (style: string) => {
  switch (style) {
    case 'simple':
      return 'border-l-4 border-gray-300 pl-6 text-gray-700';
    case 'italic':
      return 'border-l-4 border-blue-400 pl-6 italic text-gray-700';
    case 'bold':
      return 'border-l-4 border-blue-500 pl-6 font-semibold text-gray-800';
    case 'author':
      return 'bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500';
    default:
      return 'border-l-4 border-gray-300 pl-6 text-gray-700';
  }
};

interface QuoteBlockRendererProps {
  block: QuoteBlock;
}

export const QuoteBlockRenderer: React.FC<QuoteBlockRendererProps> = ({ block }) => {
  const { text, author, authorImage, backgroundImage } = block.content;

  const renderEnhancedQuote = () => {
    switch (block.style) {
      case 'circular-centerpiece':
        return (
          <div className="text-center p-8 bg-white">
            <div className="text-6xl text-blue-200 mb-6">"</div>
            <p className="text-2xl text-gray-700 mb-6 font-medium max-w-2xl mx-auto leading-relaxed">
              {text}
            </p>
            <Avatar className="mx-auto mb-4 h-20 w-20">
              {authorImage ? <AvatarImage src={authorImage} alt={author} /> : <AvatarFallback className="text-lg">{author?.slice(0, 2)}</AvatarFallback>}
            </Avatar>
            <p className="text-lg text-gray-600 font-medium">{author}</p>
          </div>
        );

      case 'vertical-spotlight':
        return (
          <div className="text-center p-8 bg-white">
            <Avatar className="mx-auto mb-6 h-24 w-24">
              {authorImage ? <AvatarImage src={authorImage} alt={author} /> : <AvatarFallback className="text-lg">{author?.slice(0, 2)}</AvatarFallback>}
            </Avatar>
            <p className="text-2xl font-bold text-gray-800 mb-4 uppercase tracking-wide max-w-2xl mx-auto">
              {text}
            </p>
            <p className="text-lg text-gray-600">{author}</p>
          </div>
        );

      case 'side-by-side':
        return (
          <div className="flex items-center gap-6 p-8 bg-white border rounded-lg max-w-4xl mx-auto">
            <div className="w-32 h-32 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
              {authorImage ? (
                <img src={authorImage} alt={author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 font-semibold text-2xl">
                  {author?.slice(0, 2)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-2xl text-gray-700 mb-4 font-medium leading-relaxed">
                "{text}"
              </p>
              <p className="text-lg text-gray-600">— {author}</p>
            </div>
          </div>
        );

      case 'gray-panel':
        return (
          <div className="flex items-center justify-between p-8 bg-gray-100 rounded-lg border max-w-4xl mx-auto">
            <div className="flex-1">
              <p className="text-2xl text-gray-700 mb-4 font-medium leading-relaxed">
                "{text}"
              </p>
              <p className="text-lg text-gray-600">— {author}</p>
            </div>
            <Avatar className="ml-6 h-20 w-20">
              {authorImage ? <AvatarImage src={authorImage} alt={author} /> : <AvatarFallback className="text-lg">{author?.slice(0, 2)}</AvatarFallback>}
            </Avatar>
          </div>
        );

      case 'visual-highlight':
        return (
          <div 
            className="relative p-12 rounded-lg text-white text-center min-h-80 flex flex-col justify-center"
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
            <div className="relative z-10">
              <div className="text-8xl mb-6 opacity-80">"</div>
              <p className="text-3xl mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
                {text}
              </p>
              <p className="text-xl opacity-90">— {author}</p>
            </div>
            <Avatar className="absolute bottom-6 right-6 h-16 w-16 border-2 border-white z-10">
              {authorImage ? <AvatarImage src={authorImage} alt={author} /> : <AvatarFallback className="text-gray-800 text-lg">{author?.slice(0, 2)}</AvatarFallback>}
            </Avatar>
          </div>
        );

      default:
        return null;
    }
  };

  // Enhanced quote styles
  if (['circular-centerpiece', 'vertical-spotlight', 'side-by-side', 'gray-panel', 'visual-highlight'].includes(block.style)) {
    return (
      <div className="prose max-w-none my-8">
        {renderEnhancedQuote()}
      </div>
    );
  }

  // Basic quote styles
  return (
    <div className="prose max-w-none">
      <blockquote className={getQuoteStyle(block.style)}>
        <p className="text-lg mb-2">"{text}"</p>
        {block.style === 'author' && authorImage ? (
          <div className="flex items-center gap-2 mt-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={authorImage} alt={author} />
              <AvatarFallback>{author?.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <cite className="text-sm text-gray-600 font-medium">— {author}</cite>
          </div>
        ) : (
          <cite className="text-sm text-gray-600 font-medium">— {author}</cite>
        )}
      </blockquote>
    </div>
  );
};
