import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, Edit2, Trash2 } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export const QuoteBlockEditor = ({
  block,
  onDelete,
  onEdit,
  onMoveUp,
  onMoveDown,
  canMoveUp = false,
  canMoveDown = false
}) => {
  const getStyleName = (style) => {
    switch (style) {
      case 'circular-centerpiece': return 'Quote A - Circular Centerpiece';
      case 'vertical-spotlight': return 'Quote B - Vertical Spotlight';
      case 'side-by-side': return 'Quote C - Side-by-Side';
      case 'gray-panel': return 'Quote D - Gray Panel';
      case 'visual-highlight': return 'Quote E - Visual Highlight';
      case 'simple': return 'Simple Quote';
      case 'italic': return 'Italic Quote';
      case 'bold': return 'Bold Quote';
      case 'author': return 'Quote with Author';
      default: return 'Quote';
    }
  };

  const renderQuote = () => {
    const { text, author, authorImage, backgroundImage } = block.content;
    
    switch (block.style) {
      case 'circular-centerpiece':
        return (
          <div className="text-center p-6 bg-white border rounded-lg">
            <div className="text-6xl text-blue-200 mb-4">"</div>
            <p className="text-lg text-gray-700 mb-4 font-medium max-w-md mx-auto">
              {text || 'This is an inspiring quote that motivates everyone.'}
            </p>
            <Avatar className="mx-auto mb-3 h-16 w-16">
              {authorImage ? <AvatarImage src={authorImage} alt={author} /> : <AvatarFallback>{author?.slice(0, 2) || 'JD'}</AvatarFallback>}
            </Avatar>
            <p className="text-sm text-gray-600 font-medium">{author || 'John Doe'}</p>
          </div>
        );

      case 'vertical-spotlight':
        return (
          <div className="text-center p-6 bg-white border rounded-lg">
            <Avatar className="mx-auto mb-4 h-20 w-20">
              {authorImage ? <AvatarImage src={authorImage} alt={author} /> : <AvatarFallback>{author?.slice(0, 2) || 'JD'}</AvatarFallback>}
            </Avatar>
            <p className="text-xl font-bold text-gray-800 mb-3 uppercase tracking-wide">
              {text || 'INSPIRING WORDS HERE'}
            </p>
            <p className="text-sm text-gray-600">{author || 'John Doe'}</p>
          </div>
        );

      case 'side-by-side':
        return (
          <div className="flex items-center gap-4 p-6 bg-white border rounded-lg">
            <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0 overflow-hidden">
              {authorImage ? (
                <img src={authorImage} alt={author} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600 font-semibold">
                  {author?.slice(0, 2) || 'JD'}
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="text-lg text-gray-700 mb-2 font-medium">
                "{text || 'This is a meaningful quote.'}"
              </p>
              <p className="text-sm text-gray-600">— {author || 'John Doe'}</p>
            </div>
          </div>
        );

      case 'gray-panel':
        return (
          <div className="flex items-center justify-between p-6 bg-gray-100 rounded-lg border">
            <div className="flex-1">
              <p className="text-lg text-gray-700 mb-2 font-medium">
                "{text || 'Panel quote style example.'}"
              </p>
              <p className="text-sm text-gray-600">— {author || 'John Doe'}</p>
            </div>
            <Avatar className="ml-4 h-16 w-16">
              {authorImage ? <AvatarImage src={authorImage} alt={author} /> : <AvatarFallback>{author?.slice(0, 2) || 'JD'}</AvatarFallback>}
            </Avatar>
          </div>
        );

      case 'visual-highlight':
        return (
          <div 
            className="relative p-8 rounded-lg text-white text-center min-h-48 flex flex-col justify-center"
            style={{
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4 opacity-80">"</div>
              <p className="text-xl mb-6 font-medium max-w-md mx-auto">
                {text || 'Hero quote with visual impact.'}
              </p>
              <p className="text-sm opacity-90">— {author || 'John Doe'}</p>
            </div>
            <Avatar className="absolute bottom-4 right-4 h-12 w-12 border-2 border-white z-10">
              {authorImage ? <AvatarImage src={authorImage} alt={author} /> : <AvatarFallback className="text-gray-800">{author?.slice(0, 2) || 'JD'}</AvatarFallback>}
            </Avatar>
          </div>
        );

      case 'simple':
        return (
          <div className="border-l-4 border-purple-400 pl-4">
            <p className="text-gray-700">"{text || 'This is a simple quote.'}"</p>
            <p className="text-sm text-gray-500 mt-1">— {author || 'Author Name'}</p>
          </div>
        );

      case 'italic':
        return (
          <div className="border-l-4 border-purple-400 pl-4">
            <p className="text-gray-700 italic">"{text || 'This is an italic quote.'}"</p>
            <p className="text-sm text-gray-500 mt-1">— {author || 'Author Name'}</p>
          </div>
        );

      case 'bold':
        return (
          <div className="border-l-4 border-purple-400 pl-4">
            <p className="text-gray-700 font-bold">"{text || 'This is a bold quote.'}"</p>
            <p className="text-sm text-gray-500 mt-1">— {author || 'Author Name'}</p>
          </div>
        );

      case 'author':
        return (
          <div className="border-l-4 border-purple-400 pl-4">
            <p className="text-gray-700">"{text || 'This quote includes an author image.'}"</p>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="h-6 w-6">
                {authorImage ? <AvatarImage src={authorImage} alt={author} /> : <AvatarFallback>{author?.slice(0, 2) || 'JD'}</AvatarFallback>}
              </Avatar>
              <p className="text-sm text-gray-500">— {author || 'Author Name'}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-white group hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-purple-600 text-lg font-serif">"</span>
          </div>
          <div className="min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{getStyleName(block.style)}</h3>
            <p className="text-sm text-gray-600 truncate">{block.content.text || 'No quote text'}</p>
          </div>
        </div>
        
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
          {onMoveUp && (
            <Button size="sm" variant="ghost" onClick={onMoveUp} disabled={!canMoveUp} title="Move up">
              <ArrowUp className="h-3 w-3" />
            </Button>
          )}
          {onMoveDown && (
            <Button size="sm" variant="ghost" onClick={onMoveDown} disabled={!canMoveDown} title="Move down">
              <ArrowDown className="h-3 w-3" />
            </Button>
          )}
          <Button size="sm" variant="ghost" onClick={onEdit} title="Edit quote">
            <Edit2 className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" onClick={() => onDelete(block.id)} title="Delete block" className="text-red-600 hover:text-red-700 hover:bg-red-50">
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        {renderQuote()}
      </div>
    </div>
  );
};

// Define prop types for runtime type checking
QuoteBlockEditor.propTypes = {
  block: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['quote']).isRequired,
    style: PropTypes.oneOf([
      'simple', 'italic', 'bold', 'author', 
      'circular-centerpiece', 'vertical-spotlight', 'side-by-side', 
      'gray-panel', 'visual-highlight'
    ]).isRequired,
    content: PropTypes.shape({
      text: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      authorImage: PropTypes.string,
      backgroundImage: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onMoveUp: PropTypes.func,
  onMoveDown: PropTypes.func,
  canMoveUp: PropTypes.bool,
  canMoveDown: PropTypes.bool,
};

// Define default props for optional boolean props
QuoteBlockEditor.defaultProps = {
  canMoveUp: false,
  canMoveDown: false,
};