import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bold, Italic } from 'lucide-react';

/**
 * A simple input component with minimal formatting controls (bold, italic).
 *
 * @param {object} props
 * @param {string} props.value - The current value of the input field.
 * @param {(value: string) => void} props.onChange - Callback function to handle value changes.
 * @param {number} props.index - The index of the instruction item.
 */
export const SimpleInstructionInput = ({ value, onChange, index }) => {
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);

  const toggleFormat = (format) => {
    switch (format) {
      case 'bold':
        setIsBold(!isBold);
        break;
      case 'italic':
        setIsItalic(!isItalic);
        break;
      default:
        break;
    }
  };

  const getTextStyle = () => {
    return {
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
    };
  };

  return (
    <div className="space-y-2">
      {/* Minimal Formatting Controls */}
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant={isBold ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFormat('bold')}
          className="h-7 w-7 p-0"
        >
          <Bold className="h-3 w-3" />
        </Button>
        <Button
          type="button"
          variant={isItalic ? "default" : "outline"}
          size="sm"
          onClick={() => toggleFormat('italic')}
          className="h-7 w-7 p-0"
        >
          <Italic className="h-3 w-3" />
        </Button>
        <span className="text-xs text-gray-500 ml-2">Emojis supported via keyboard</span>
      </div>

      {/* Simple Text Input */}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter instruction point... (emojis supported 📌)"
        className="text-base"
        style={getTextStyle()}
      />
    </div>
  );
};

