import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Underline, Link } from 'lucide-react';
import { LinkDialog } from './LinkDialog';

export const SimpleRichTextEditor = ({
  value,
  onChange,
  disabled = false,
  placeholder = 'Enter description...'
}) => {
  const editorRef = useRef(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState(null);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const executeCommand = (command, value) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleLinkClick = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const text = selection.toString();
      setSelectedText(text);
      setSelectionRange(range.cloneRange());
    } else {
      setSelectedText('');
      setSelectionRange(null);
    }
    setIsLinkDialogOpen(true);
  };

  const handleLinkSave = (linkData) => {
    const linkText = linkData.text || selectedText || linkData.url;
    const linkHtml = `<a href="${linkData.url}" ${linkData.title ? `title="${linkData.title}"` : ''} ${linkData.target === 'new' ? 'target="_blank" rel="noopener noreferrer"' : ''}>${linkText}</a>`;

    if (editorRef.current) {
      if (selectionRange) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(selectionRange);

          selectionRange.deleteContents();
          const linkElement = document.createElement('div');
          linkElement.innerHTML = linkHtml;
          selectionRange.insertNode(linkElement.firstChild);
          selection.removeAllRanges();
        }
      } else {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const linkElement = document.createElement('div');
          linkElement.innerHTML = linkHtml;
          range.insertNode(linkElement.firstChild);
          selection.removeAllRanges();
        } else {
          editorRef.current.innerHTML += linkHtml;
        }
      }
      onChange(editorRef.current.innerHTML);
    }

    setSelectedText('');
    setSelectionRange(null);
  };

  return (
    <>
      <style>
        {`
          .rich-text-editor [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
          }
        `}
      </style>
      <div className="border rounded-md rich-text-editor">
        {/* Toolbar */}
        <div className="flex items-center gap-1 p-2 border-b bg-gray-50">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('bold')}
            disabled={disabled}
            className="h-8 w-8 p-0"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('italic')}
            disabled={disabled}
            className="h-8 w-8 p-0"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => executeCommand('underline')}
            disabled={disabled}
            className="h-8 w-8 p-0"
          >
            <Underline className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleLinkClick}
            disabled={disabled}
            className="h-8 w-8 p-0"
          >
            <Link className="h-4 w-4" />
          </Button>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable={!disabled}
          onInput={handleInput}
          className="min-h-[120px] p-3 focus:outline-none"
          style={{
            direction: 'ltr',
            textAlign: 'left',
            lineHeight: '1.5'
          }}
          suppressContentEditableWarning={true}
          data-placeholder={placeholder}
        />
      </div>

      <LinkDialog
        isOpen={isLinkDialogOpen}
        onClose={() => setIsLinkDialogOpen(false)}
        onSave={handleLinkSave}
        initialData={{ url: '', text: selectedText, title: '', target: 'current' }}
      />
    </>
  );
};
