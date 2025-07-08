
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Italic, Bold, Type, Highlighter } from 'lucide-react';

interface StatementBlock {
  id: string;
  type: 'statement';
  style: 'italic' | 'bold' | 'caps' | 'highlighted';
  content: {
    text: string;
  };
}

interface StatementEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block: StatementBlock | null;
  onSave: (block: StatementBlock) => void;
}

export const StatementEditModal: React.FC<StatementEditModalProps> = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editText, setEditText] = useState(block?.content.text || '');
  const [editStyle, setEditStyle] = useState<'italic' | 'bold' | 'caps' | 'highlighted'>(block?.style || 'italic');

  React.useEffect(() => {
    if (block) {
      setEditText(block.content.text);
      setEditStyle(block.style);
    }
  }, [block]);

  const handleSave = () => {
    if (block) {
      onSave({
        ...block,
        style: editStyle,
        content: { text: editText }
      });
      onOpenChange(false);
    }
  };

  const statementOptions = [
    {
      id: 'italic' as const,
      icon: Italic,
      title: 'Statement A',
      subtitle: 'Center-aligned with boxed layout',
      preview: (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center max-w-xs mx-auto">
          <div className="border-t border-gray-300 w-8 mx-auto mb-3"></div>
          <p className="text-gray-800 text-xs leading-relaxed">
            {editText || 'You\'re the master of your life, the captain of your ship. Steer it with intention. Will you skirt the coast from one safe harbor to the next? Or will you sail into the vast open blue? Every day you get to decide anew what course to chart.'}
          </p>
          <div className="border-b border-gray-300 w-8 mx-auto mt-3"></div>
        </div>
      )
    },
    {
      id: 'bold' as const,
      icon: Bold,
      title: 'Statement B',
      subtitle: 'Left-aligned with colored line above',
      preview: (
        <div className="text-left p-3 bg-white border rounded">
          <div className="w-6 h-0.5 bg-orange-500 mb-3"></div>
          <p className="text-gray-700 text-xs leading-relaxed">
            {editText || 'You\'re the master of your life, the captain of your ship. Steer it with intention. Will you skirt the coast from one safe harbor to the next? Or will you sail into the vast open blue? Every day you get to decide anew what course to chart.'}
          </p>
        </div>
      )
    },
    {
      id: 'caps' as const,
      icon: Type,
      title: 'Statement C',
      subtitle: 'Mixed bold text style',
      preview: (
        <div className="text-left p-3 bg-white">
          <p className="text-gray-800 text-xs leading-relaxed">
            {editText ? (
              <span>{editText}</span>
            ) : (
              <>
                Stop chasing <span className="font-bold">your thoughts</span> in circles. <span className="font-bold">Open your eyes</span>, breathe deeply, and then <span className="font-bold">pay attention</span>. The air is sweet. <span className="font-bold">The sun is warm</span>. There's a path ahead.
              </>
            )}
          </p>
        </div>
      )
    },
    {
      id: 'highlighted' as const,
      icon: Highlighter,
      title: 'Statement D',
      subtitle: 'Highlighted statement with line',
      preview: (
        <div className="p-3 bg-white border rounded">
          <div className="w-6 h-0.5 bg-orange-500 mb-3"></div>
          <p className="text-gray-800 text-xs leading-relaxed">
            {editText || 'You\'re the master of your life, the captain of your ship. Steer it with intention. Will you skirt the coast from one safe harbor to the next? Or will you sail into the vast open blue? Every day you get to decide anew.'}
          </p>
        </div>
      )
    }
  ];

  if (!block) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Statement</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Statement Text</label>
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              placeholder="Enter your statement text"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Statement Style</label>
            <RadioGroup value={editStyle} onValueChange={(value) => setEditStyle(value as any)} className="space-y-3">
              {statementOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <label 
                    key={option.id}
                    htmlFor={`edit-${option.id}`}
                    className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={option.id} id={`edit-${option.id}`} className="mt-1" />
                    <IconComponent className="h-4 w-4 text-blue-600 mt-1 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{option.title}</div>
                        <div className="text-sm text-gray-500">{option.subtitle}</div>
                      </div>
                      <div className="w-full">
                        {option.preview}
                      </div>
                    </div>
                  </label>
                );
              })}
            </RadioGroup>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
