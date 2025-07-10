import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
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
import { cn } from '@/lib/utils'; // Assuming you have a cn utility

export const RichTextEditor = ({ 
  value, 
  onChange, 
  placeholder = "Enter content...",
  className = ""
}) => {
  const [selectedFormat, setSelectedFormat] = useState('Paragraph');
  const [selectedFont, setSelectedFont] = useState('Poppins');
  const [selectedSize, setSelectedSize] = useState('12pt');
  const [activeButtons, setActiveButtons] = useState(new Set());
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkData, setLinkData] = useState({
    url: '',
    text: '',
    title: '',
    target: 'Current window'
  });
  const [activeMenu, setActiveMenu] = useState(null);
  const editorRef = useRef(null);

  // Sync editor content if the value prop changes from outside
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleFormatClick = (command, value) => {
    document.execCommand(command, false, value);
    
    // Update active button states
    if (editorRef.current) {
      checkActiveStates();
      onChange(editorRef.current.innerHTML);
      editorRef.current.focus();
    }
  };

  const handleMenuClick = (menuType, action) => {
    setActiveMenu(menuType);
    setTimeout(() => setActiveMenu(null), 200);
    
    switch (menuType) {
      case 'File':
        if (action === 'New') {
          if (editorRef.current) {
            editorRef.current.innerHTML = '';
            onChange('');
          }
        } else if (action === 'Print') {
          window.print();
        }
        break;
      case 'Edit':
        if (action) handleFormatClick(action);
        break;
      case 'Insert':
        if (action === 'Image') handleImageInsert();
        else if (action === 'Link') setIsLinkModalOpen(true);
        else if (action) handleFormatClick(action);
        break;
      case 'Tools':
        if (action === 'Word Count') {
          const wordCount = (value.replace(/<[^>]*>/g, ' ').match(/\S+/g) || []).length;
          alert(`Word count: ${wordCount}`);
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
                tableHTML += '<td style="padding: 8px; border: 1px solid #ccc;"> </td>';
              }
              tableHTML += '</tr>';
            }
            tableHTML += '</table>';
            handleFormatClick('insertHTML', tableHTML);
          }
        }
        break;
      default:
        break;
    }
  };

  const handleFormatChange = (format) => {
    setSelectedFormat(format);
    const formatMap = {
      'Heading 1': '<h1>',
      'Heading 2': '<h2>',
      'Paragraph': '<p>',
    };
    handleFormatClick('formatBlock', formatMap[format] || '<p>');
  };

  const handleFontChange = (font) => {
    setSelectedFont(font);
    handleFormatClick('fontName', font);
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const sizeMap = {
      '10pt': '1', '12pt': '2', '14pt': '3', '16pt': '4',
      '18pt': '5', '24pt': '6', '36pt': '7'
    };
    handleFormatClick('fontSize', sizeMap[size] || '2');
  };

  const handleColorChange = (color) => {
    handleFormatClick('foreColor', color);
  };

  const handleImageInsert = () => {
    const url = prompt('Enter image URL:');
    if (url) handleFormatClick('insertImage', url);
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
    const newActiveButtons = new Set();
    if (document.queryCommandState('bold')) newActiveButtons.add('bold');
    if (document.queryCommandState('italic')) newActiveButtons.add('italic');
    if (document.queryCommandState('underline')) newActiveButtons.add('underline');
    setActiveButtons(newActiveButtons);
  };

  return (
    <>
      <div className={cn('border rounded-lg', className)}>
        {/* Toolbar */}
        <div className="border-b p-2 bg-gray-50">
          {/* First Row - Menu Bar */}
          <div className="flex items-center space-x-4 mb-2 text-sm">
            {/* Menu Items */}
            {[
              { name: 'File', items: ['New', 'Open', 'Save', 'Print'] },
              { name: 'Edit', items: ['undo', 'redo', 'cut', 'copy', 'paste'] },
              { name: 'Insert', items: ['Image', 'Link', 'insertHorizontalRule'] },
              { name: 'Tools', items: ['Word Count'] },
              { name: 'Table', items: ['Insert Table'] }
            ].map(menu => (
              <DropdownMenu key={menu.name}>
                <DropdownMenuTrigger asChild>
                  <span className={cn('cursor-pointer hover:bg-gray-200 px-2 py-1 rounded', { 'bg-blue-200': activeMenu === menu.name })}>
                    {menu.name}
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white z-50">
                  {menu.items.map(item => (
                    <DropdownMenuItem key={item} onClick={() => handleMenuClick(menu.name, item)}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>

          {/* Second Row - Formatting Toolbar */}
          <div className="flex items-center space-x-1 flex-wrap gap-1">
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('undo')} className="h-8 w-8 p-0" title="Undo"><Undo className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('redo')} className="h-8 w-8 p-0" title="Redo"><Redo className="h-4 w-4" /></Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Select value={selectedFormat} onValueChange={handleFormatChange}>
              <SelectTrigger className="w-24 h-8 text-xs bg-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Paragraph">Paragraph</SelectItem>
                <SelectItem value="Heading 1">Heading 1</SelectItem>
                <SelectItem value="Heading 2">Heading 2</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedFont} onValueChange={handleFontChange}>
              <SelectTrigger className="w-20 h-8 text-xs bg-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="Poppins">Poppins</SelectItem>
                <SelectItem value="Arial">Arial</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSize} onValueChange={handleSizeChange}>
              <SelectTrigger className="w-16 h-8 text-xs bg-white"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-white z-50">
                <SelectItem value="10pt">10pt</SelectItem>
                <SelectItem value="12pt">12pt</SelectItem>
                <SelectItem value="14pt">14pt</SelectItem>
              </SelectContent>
            </Select>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('bold')} className={cn('h-8 w-8 p-0', { 'bg-blue-100 text-blue-800': activeButtons.has('bold') })} title="Bold"><Bold className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('italic')} className={cn('h-8 w-8 p-0', { 'bg-blue-100 text-blue-800': activeButtons.has('italic') })} title="Italic"><Italic className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('underline')} className={cn('h-8 w-8 p-0', { 'bg-blue-100 text-blue-800': activeButtons.has('underline') })} title="Underline"><Underline className="h-4 w-4" /></Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative" title="Text Color"><span className="text-sm font-bold">A</span><ChevronDown className="h-3 w-3 absolute -bottom-1 -right-1" /></Button></DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                {['black', 'red', 'blue', 'green'].map(color => (
                  <DropdownMenuItem key={color} onClick={() => handleColorChange(color)}><div className="flex items-center gap-2"><div className={`w-4 h-4 bg-${color}-500 rounded`}></div>{color.charAt(0).toUpperCase() + color.slice(1)}</div></DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('justifyLeft')} className="h-8 w-8 p-0" title="Align Left"><AlignLeft className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('justifyCenter')} className="h-8 w-8 p-0" title="Align Center"><AlignCenter className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('justifyRight')} className="h-8 w-8 p-0" title="Align Right"><AlignRight className="h-4 w-4" /></Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('insertUnorderedList')} className="h-8 w-8 p-0" title="Bullet List"><List className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => handleFormatClick('insertOrderedList')} className="h-8 w-8 p-0" title="Numbered List"><ListOrdered className="h-4 w-4" /></Button>
            <Separator orientation="vertical" className="h-6 mx-1" />
            <Button variant="ghost" size="sm" onClick={handleImageInsert} className="h-8 w-8 p-0" title="Insert Image"><Image className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => setIsLinkModalOpen(true)} className="h-8 w-8 p-0" title="Insert Link"><Link className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Editor Content */}
        <div 
          ref={editorRef}
          contentEditable
          className="p-4 min-h-[200px] focus:outline-none"
          dangerouslySetInnerHTML={{ __html: value }}
          onInput={(e) => onChange(e.currentTarget.innerHTML)}
          onBlur={(e) => onChange(e.currentTarget.innerHTML)}
          onMouseUp={checkActiveStates}
          onKeyUp={checkActiveStates}
          suppressContentEditableWarning={true}
          placeholder={placeholder}
        />
        
        <div className="border-t p-2 text-right text-xs text-gray-500">
          {(value.replace(/<[^>]*>/g, ' ').match(/\S+/g) || []).length} WORDS
        </div>
      </div>

      {/* Link Modal */}
      <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">Insert/Edit Link<Button variant="ghost" size="sm" onClick={() => setIsLinkModalOpen(false)} className="h-6 w-6 p-0"><X className="h-4 w-4" /></Button></DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div><Label htmlFor="url">URL</Label><Input id="url" value={linkData.url} onChange={(e) => setLinkData({ ...linkData, url: e.target.value })} placeholder="https://example.com"/></div>
            <div><Label htmlFor="text">Text to display</Label><Input id="text" value={linkData.text} onChange={(e) => setLinkData({ ...linkData, text: e.target.value })} placeholder="Link text"/></div>
            <div><Label htmlFor="title">Title</Label><Input id="title" value={linkData.title} onChange={(e) => setLinkData({ ...linkData, title: e.target.value })} placeholder="Link title (optional)"/></div>
            <div><Label>Open link in...</Label><Select value={linkData.target} onValueChange={(value) => setLinkData({ ...linkData, target: value })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent className="bg-white z-50"><SelectItem value="Current window">Current window</SelectItem><SelectItem value="New window">New window</SelectItem></SelectContent></Select></div>
            <div className="flex justify-end space-x-2"><Button variant="outline" onClick={() => setIsLinkModalOpen(false)}>Cancel</Button><Button onClick={handleLinkInsert} disabled={!linkData.url || !linkData.text}>Save</Button></div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Define prop types for runtime type checking
RichTextEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
};