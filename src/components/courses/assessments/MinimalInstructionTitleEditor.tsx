
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bold, Italic, Underline } from 'lucide-react';

interface MinimalInstructionTitleEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const MinimalInstructionTitleEditor: React.FC<MinimalInstructionTitleEditorProps> = ({ value, onChange }) => {
  const [isBold, setIsBold] = React.useState(false);
  const [isItalic, setIsItalic] = React.useState(false);
  const [isUnderline, setIsUnderline] = React.useState(false);
  const [selectedFont, setSelectedFont] = React.useState('Arial');

  const allowedEmojis = ['🔥', '📘', '🕒', '✅', '❌', '⚠️', '📌', '💡', '🎯', '📝'];
  const fontOptions = [
    'Arial',
    'Poppins', 
    'Roboto',
    'Georgia',
    'Times New Roman',
    'Helvetica',
    'Verdana',
    'Calibri',
    'Trebuchet MS',
    'Open Sans'
  ];

  const insertEmoji = (emoji: string) => {
    onChange(value + emoji);
  };

  const toggleFormat = (format: string) => {
    switch (format) {
      case 'bold':
        setIsBold(!isBold);
        break;
      case 'italic':
        setIsItalic(!isItalic);
        break;
      case 'underline':
        setIsUnderline(!isUnderline);
        break;
    }
  };

  const getTextStyle = () => {
    return {
      fontFamily: selectedFont,
      fontWeight: isBold ? 'bold' : 'normal',
      fontStyle: isItalic ? 'italic' : 'normal',
      textDecoration: isUnderline ? 'underline' : 'none'
    };
  };

  return (
    <div className="space-y-3">
      {/* Minimal Formatting Controls */}
      <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-50 rounded-md border">
        {/* Font Style Dropdown */}
        <Select value={selectedFont} onValueChange={setSelectedFont}>
          <SelectTrigger className="w-32 h-8 text-sm bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white z-50">
            {fontOptions.map((font) => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Formatting Buttons */}
        <div className="flex items-center border-l pl-2 ml-2">
          <Button
            type="button"
            variant={isBold ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFormat('bold')}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant={isItalic ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFormat('italic')}
            className="h-8 w-8 p-0 ml-1"
          >
            <Italic className="h-3 w-3" />
          </Button>
          <Button
            type="button"
            variant={isUnderline ? "default" : "outline"}
            size="sm"
            onClick={() => toggleFormat('underline')}
            className="h-8 w-8 p-0 ml-1"
          >
            <Underline className="h-3 w-3" />
          </Button>
        </div>

        {/* Emoji Buttons */}
        <div className="flex items-center border-l pl-2 ml-2">
          <div className="flex items-center space-x-1">
            {allowedEmojis.map((emoji, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => insertEmoji(emoji)}
                className="text-sm hover:bg-gray-200 rounded px-1 py-0.5 transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Text Input */}
      <div style={getTextStyle()}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="e.g., Assignment Requirements, Submission Format, Guidelines"
          className="min-h-[60px] text-base"
          style={getTextStyle()}
        />
      </div>
    </div>
  );
};
