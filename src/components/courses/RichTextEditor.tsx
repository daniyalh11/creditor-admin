
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  List, 
  ListOrdered,
  Image,
  Link,
  Undo,
  Redo,
  ChevronDown,
  X
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Enter content...",
  className = ""
}) => {
  const [selectedFormat, setSelectedFormat] = useState('Paragraph');
  const [selectedFont, setSelectedFont] = useState('Poppins');
  const [selectedSize, setSelectedSize] = useState('12pt');
  const [activeButtons, setActiveButtons] = useState<Set<string>>(new Set());
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkData, setLinkData] = useState({
    url: '',
    text: '',
    title: '',
    target: 'Current window'
  });
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  const handleFormatClick = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    
    // Update active button states
    const newActiveButtons = new Set(activeButtons);
    if (['bold', 'italic', 'underline'].includes(command)) {
      if (document.queryCommandState(command)) {
        newActiveButtons.add(command);
      } else {
        newActiveButtons.delete(command);
      }
      setActiveButtons(newActiveButtons);
    }
    
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleMenuClick = (menuType: string, action?: string) => {
    console.log(`${menuType} ${action || 'menu'} clicked`);
    setActiveMenu(menuType);
    setTimeout(() => setActiveMenu(null), 200);
    
    switch (menuType) {
      case 'File':
        if (action === 'New') {
          if (editorRef.current) {
            editorRef.current.innerHTML = '';
            onChange('');
          }
        } else if (action === 'Save') {
          console.log('Saving content:', value);
        } else if (action === 'Print') {
          window.print();
        }
        break;
      case 'Edit':
        if (action) {
          handleFormatClick(action);
        }
        break;
      case 'View':
        if (action === 'Zoom In') {
          if (editorRef.current) {
            const currentSize = window.getComputedStyle(editorRef.current).fontSize;
            const newSize = parseInt(currentSize) + 2;
            editorRef.current.style.fontSize = newSize + 'px';
          }
        } else if (action === 'Zoom Out') {
          if (editorRef.current) {
            const currentSize = window.getComputedStyle(editorRef.current).fontSize;
            const newSize = Math.max(parseInt(currentSize) - 2, 10);
            editorRef.current.style.fontSize = newSize + 'px';
          }
        }
        break;
      case 'Insert':
        if (action === 'Image') {
          handleImageInsert();
        } else if (action === 'Link') {
          setIsLinkModalOpen(true);
        } else if (action) {
          handleFormatClick(action);
        }
        break;
      case 'Format':
        if (action) {
          handleFormatClick(action);
        }
        break;
      case 'Tools':
        if (action === 'Word Count') {
          const wordCount = value.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length;
          alert(`Word count: ${wordCount}`);
        } else if (action === 'Find & Replace') {
          const searchTerm = prompt('Enter text to find:');
          if (searchTerm && editorRef.current) {
            const content = editorRef.current.innerHTML;
            const replaceTerm = prompt('Enter replacement text:');
            if (replaceTerm) {
              const newContent = content.replace(new RegExp(searchTerm, 'gi'), replaceTerm);
              editorRef.current.innerHTML = newContent;
              onChange(newContent);
            }
          }
        }
        break;
      case 'Table':
        if (action === 'Insert Table') {
          const rows = prompt('Enter number of rows:', '3');
          const cols = prompt('Enter number of columns:', '3');
          if (rows && cols) {
            let tableHTML = '<table border="1" style="border-collapse: collapse; width: 100%;">';
            for (let i = 0; i < parseInt(rows); i++) {
              tableHTML += '<tr>';
              for (let j = 0; j < parseInt(cols); j++) {
                tableHTML += '<td style="padding: 8px; border: 1px solid #ccc;">&nbsp;</td>';
              }
              tableHTML += '</tr>';
            }
            tableHTML += '</table>';
            handleFormatClick('insertHTML', tableHTML);
          }
        }
        break;
    }
  };

  const handleFormatChange = (format: string) => {
    setSelectedFormat(format);
    switch (format) {
      case 'Heading 1':
        handleFormatClick('formatBlock', '<h1>');
        break;
      case 'Heading 2':
        handleFormatClick('formatBlock', '<h2>');
        break;
      case 'Paragraph':
        handleFormatClick('formatBlock', '<p>');
        break;
    }
  };

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
    handleFormatClick('fontName', font);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const sizeMap: { [key: string]: string } = {
      '10pt': '1',
      '12pt': '2',
      '14pt': '3',
      '16pt': '4',
      '18pt': '5',
      '24pt': '6',
      '36pt': '7'
    };
    handleFormatClick('fontSize', sizeMap[size] || '2');
  };

  const handleColorChange = (color: string) => {
    handleFormatClick('foreColor', color);
  };

  const handleImageInsert = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      handleFormatClick('insertImage', url);
    }
  };

  const handleLinkInsert = () => {
    if (linkData.url && linkData.text) {
      const linkHTML = `<a href="${linkData.url}" title="${linkData.title}" ${linkData.target === 'New window' ? 'target="_blank"' : ''}>${linkData.text}</a>`;
      handleFormatClick('insertHTML', linkHTML);
      setLinkData({ url: '', text: '', title: '', target: 'Current window' });
      setIsLinkModalOpen(false);
    }
  };

  const checkActiveStates = () => {
    const newActiveButtons = new Set<string>();
    if (document.queryCommandState('bold')) newActiveButtons.add('bold');
    if (document.queryCommandState('italic')) newActiveButtons.add('italic');
    if (document.queryCommandState('underline')) newActiveButtons.add('underline');
    setActiveButtons(newActiveButtons);
  };

  return (
    <>
      <div className={`border rounded-lg ${className}`}>
        {/* Toolbar */}
        <div className="border-b p-2 bg-gray-50">
          {/* First Row - Menu Bar */}
          <div className="flex items-center space-x-4 mb-2 text-sm">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={`cursor-pointer hover:bg-gray-200 px-2 py-1 rounded ${activeMenu === 'File' ? 'bg-blue-200' : ''}`}>File</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem onClick={() => handleMenuClick('File', 'New')}>New</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('File', 'Open')}>Open</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('File', 'Save')}>Save</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('File', 'Print')}>Print</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={`cursor-pointer hover:bg-gray-200 px-2 py-1 rounded ${activeMenu === 'Edit' ? 'bg-blue-200' : ''}`}>Edit</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem onClick={() => handleMenuClick('Edit', 'undo')}>Undo</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Edit', 'redo')}>Redo</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Edit', 'cut')}>Cut</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Edit', 'copy')}>Copy</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Edit', 'paste')}>Paste</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={`cursor-pointer hover:bg-gray-200 px-2 py-1 rounded ${activeMenu === 'View' ? 'bg-blue-200' : ''}`}>View</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem onClick={() => handleMenuClick('View', 'Zoom In')}>Zoom In</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('View', 'Zoom Out')}>Zoom Out</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('View', 'Full Screen')}>Full Screen</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={`cursor-pointer hover:bg-gray-200 px-2 py-1 rounded ${activeMenu === 'Insert' ? 'bg-blue-200' : ''}`}>Insert</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem onClick={() => handleMenuClick('Insert', 'Image')}>Image</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Insert', 'Link')}>Link</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Insert', 'insertHorizontalRule')}>Horizontal Rule</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Insert', 'insertUnorderedList')}>Bullet List</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Insert', 'insertOrderedList')}>Numbered List</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={`cursor-pointer hover:bg-gray-200 px-2 py-1 rounded ${activeMenu === 'Format' ? 'bg-blue-200' : ''}`}>Format</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem onClick={() => handleMenuClick('Format', 'bold')}>Bold</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Format', 'italic')}>Italic</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Format', 'underline')}>Underline</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Format', 'strikeThrough')}>Strikethrough</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={`cursor-pointer hover:bg-gray-200 px-2 py-1 rounded ${activeMenu === 'Tools' ? 'bg-blue-200' : ''}`}>Tools</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem onClick={() => handleMenuClick('Tools', 'Spell Check')}>Spell Check</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Tools', 'Word Count')}>Word Count</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Tools', 'Find & Replace')}>Find & Replace</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <span className={`cursor-pointer hover:bg-gray-200 px-2 py-1 rounded ${activeMenu === 'Table' ? 'bg-blue-200' : ''}`}>Table</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem onClick={() => handleMenuClick('Table', 'Insert Table')}>Insert Table</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Table', 'Table Properties')}>Table Properties</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick('Table', 'Delete Table')}>Delete Table</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Second Row - Formatting Toolbar */}
          <div className="flex items-center space-x-1 flex-wrap gap-1">
            {/* Undo/Redo */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('undo')}
              className="h-8 w-8 p-0"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('redo')}
              className="h-8 w-8 p-0"
            >
              <Redo className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Format Dropdown */}
            <Select value={selectedFormat} onValueChange={handleFormatChange}>
              <SelectTrigger className="w-24 h-8 text-xs bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Paragraph">Paragraph</SelectItem>
                <SelectItem value="Heading 1">Heading 1</SelectItem>
                <SelectItem value="Heading 2">Heading 2</SelectItem>
              </SelectContent>
            </Select>

            {/* Font Dropdown */}
            <Select value={selectedFont} onValueChange={handleFontChange}>
              <SelectTrigger className="w-20 h-8 text-xs bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Poppins">Poppins</SelectItem>
                <SelectItem value="Arial">Arial</SelectItem>
                <SelectItem value="Times">Times</SelectItem>
                <SelectItem value="Helvetica">Helvetica</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
              </SelectContent>
            </Select>

            {/* Font Size */}
            <Select value={selectedSize} onValueChange={handleSizeChange}>
              <SelectTrigger className="w-16 h-8 text-xs bg-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="10pt">10pt</SelectItem>
                <SelectItem value="12pt">12pt</SelectItem>
                <SelectItem value="14pt">14pt</SelectItem>
                <SelectItem value="16pt">16pt</SelectItem>
                <SelectItem value="18pt">18pt</SelectItem>
                <SelectItem value="24pt">24pt</SelectItem>
                <SelectItem value="36pt">36pt</SelectItem>
              </SelectContent>
            </Select>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Text Formatting */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('bold')}
              className={`h-8 w-8 p-0 ${activeButtons.has('bold') ? 'bg-blue-200 text-blue-800' : ''}`}
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('italic')}
              className={`h-8 w-8 p-0 ${activeButtons.has('italic') ? 'bg-blue-200 text-blue-800' : ''}`}
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('underline')}
              className={`h-8 w-8 p-0 ${activeButtons.has('underline') ? 'bg-blue-200 text-blue-800' : ''}`}
            >
              <Underline className="h-4 w-4" />
            </Button>

            {/* Text Color */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 relative"
                >
                  <span className="text-sm font-bold">A</span>
                  <ChevronDown className="h-3 w-3 absolute -bottom-1 -right-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem onClick={() => handleColorChange('black')}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-black rounded"></div>
                    Black
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleColorChange('red')}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    Red
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleColorChange('blue')}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    Blue
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleColorChange('green')}>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    Green
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Alignment */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('justifyLeft')}
              className="h-8 w-8 p-0"
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('justifyCenter')}
              className="h-8 w-8 p-0"
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('justifyRight')}
              className="h-8 w-8 p-0"
            >
              <AlignRight className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Lists */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('insertUnorderedList')}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFormatClick('insertOrderedList')}
              className="h-8 w-8 p-0"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Insert Options */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleImageInsert}
              className="h-8 w-8 p-0"
            >
              <Image className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLinkModalOpen(true)}
              className="h-8 w-8 p-0"
            >
              <Link className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Editor Content */}
        <div 
          ref={editorRef}
          contentEditable
          className="p-4 min-h-[200px] focus:outline-none"
          style={{ 
            minHeight: '200px',
            direction: 'ltr',
            textAlign: 'left'
          }}
          dangerouslySetInnerHTML={{ __html: value }}
          onInput={(e) => {
            const target = e.target as HTMLDivElement;
            onChange(target.innerHTML);
            checkActiveStates();
          }}
          onBlur={(e) => {
            const target = e.target as HTMLDivElement;
            onChange(target.innerHTML);
            checkActiveStates();
          }}
          onMouseUp={checkActiveStates}
          onKeyUp={checkActiveStates}
          suppressContentEditableWarning={true}
        />
        
        {/* Word Count */}
        <div className="border-t p-2 text-right text-xs text-gray-500">
          {value.replace(/<[^>]*>/g, '').split(' ').filter(word => word.length > 0).length} WORDS
        </div>
      </div>

      {/* Link Modal */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Insert/Edit Link
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLinkModalOpen(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                value={linkData.url}
                onChange={(e) => setLinkData({ ...linkData, url: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div>
              <Label htmlFor="text">Text to display</Label>
              <Input
                id="text"
                value={linkData.text}
                onChange={(e) => setLinkData({ ...linkData, text: e.target.value })}
                placeholder="Link text"
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={linkData.title}
                onChange={(e) => setLinkData({ ...linkData, title: e.target.value })}
                placeholder="Link title (optional)"
              />
            </div>
            <div>
              <Label>Open link in...</Label>
              <Select 
                value={linkData.target} 
                onValueChange={(value) => setLinkData({ ...linkData, target: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="Current window">Current window</SelectItem>
                  <SelectItem value="New window">New window</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsLinkModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleLinkInsert}
                disabled={!linkData.url || !linkData.text}
              >
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
