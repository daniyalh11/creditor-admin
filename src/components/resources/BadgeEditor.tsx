
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Award, Star, Trophy, Medal, Crown, Target, Upload, Palette, Type, Image as ImageIcon } from 'lucide-react';

interface TextElement {
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  fontWeight: string;
}

interface BadgeDesign {
  backgroundColor: string;
  backgroundImage?: string;
  centerIcon?: string;
  textElements: TextElement[];
}

interface BadgeEditorProps {
  onDesignChange: (design: BadgeDesign) => void;
  initialDesign?: BadgeDesign;
}

const presetIcons = [
  { id: 'award', icon: Award, name: 'Award' },
  { id: 'star', icon: Star, name: 'Star' },
  { id: 'trophy', icon: Trophy, name: 'Trophy' },
  { id: 'medal', icon: Medal, name: 'Medal' },
  { id: 'crown', icon: Crown, name: 'Crown' },
  { id: 'target', icon: Target, name: 'Target' }
];

const fontFamilies = [
  'Arial, sans-serif',
  'Georgia, serif',
  'Times New Roman, serif',
  'Helvetica, sans-serif',
  'Verdana, sans-serif'
];

const placeholderSuggestions = [
  '{Name}',
  '{Course}',
  '{Date}',
  '{Achievement}',
  '{Score}',
  '{Grade}'
];

export const BadgeEditor: React.FC<BadgeEditorProps> = ({ onDesignChange, initialDesign }) => {
  const [design, setDesign] = useState<BadgeDesign>(initialDesign || {
    backgroundColor: '#3B82F6',
    textElements: [],
    centerIcon: 'award'
  });
  
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [newText, setNewText] = useState('');

  const updateDesign = (updates: Partial<BadgeDesign>) => {
    const newDesign = { ...design, ...updates };
    setDesign(newDesign);
    onDesignChange(newDesign);
  };

  const addTextElement = () => {
    if (!newText.trim()) return;
    
    const newElement: TextElement = {
      id: Date.now().toString(),
      text: newText,
      x: 50,
      y: 50,
      fontSize: 16,
      color: '#FFFFFF',
      fontFamily: 'Arial, sans-serif',
      fontWeight: 'normal'
    };
    
    updateDesign({
      textElements: [...design.textElements, newElement]
    });
    setNewText('');
  };

  const updateTextElement = (id: string, updates: Partial<TextElement>) => {
    updateDesign({
      textElements: design.textElements.map(el => 
        el.id === id ? { ...el, ...updates } : el
      )
    });
  };

  const removeTextElement = (id: string) => {
    updateDesign({
      textElements: design.textElements.filter(el => el.id !== id)
    });
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const handleBackgroundImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateDesign({ backgroundImage: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const selectedElementData = selectedElement 
    ? design.textElements.find(el => el.id === selectedElement)
    : null;

  const getIconComponent = (iconId: string) => {
    const iconData = presetIcons.find(icon => icon.id === iconId);
    return iconData ? iconData.icon : Award;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Live Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Badge Preview</h3>
        <div className="flex justify-center">
          <div 
            className="relative w-48 h-48 rounded-full border-4 border-gray-200 overflow-hidden"
            style={{ 
              backgroundColor: design.backgroundColor,
              backgroundImage: design.backgroundImage ? `url(${design.backgroundImage})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {/* Center Icon */}
            {design.centerIcon && (
              <div className="absolute inset-0 flex items-center justify-center">
                {React.createElement(getIconComponent(design.centerIcon), {
                  size: 64,
                  className: "text-white/80"
                })}
              </div>
            )}
            
            {/* Text Elements */}
            {design.textElements.map((element) => (
              <div
                key={element.id}
                className={`absolute cursor-pointer select-none ${
                  selectedElement === element.id ? 'ring-2 ring-yellow-400' : ''
                }`}
                style={{
                  left: `${element.x}%`,
                  top: `${element.y}%`,
                  transform: 'translate(-50%, -50%)',
                  fontSize: `${element.fontSize}px`,
                  color: element.color,
                  fontFamily: element.fontFamily,
                  fontWeight: element.fontWeight
                }}
                onClick={() => setSelectedElement(element.id)}
              >
                {element.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Badge Editor</h3>
        
        <Tabs defaultValue="background" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="icon">Icon</TabsTrigger>
            <TabsTrigger value="text">Text</TabsTrigger>
          </TabsList>
          
          <TabsContent value="background" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={design.backgroundColor}
                      onChange={(e) => updateDesign({ backgroundColor: e.target.value })}
                      className="w-12 h-8 rounded border cursor-pointer"
                    />
                    <Input
                      value={design.backgroundColor}
                      onChange={(e) => updateDesign({ backgroundColor: e.target.value })}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Background Image (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundImageUpload}
                      className="flex-1"
                    />
                    {design.backgroundImage && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateDesign({ backgroundImage: undefined })}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="icon" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <Label>Center Icon</Label>
                <div className="grid grid-cols-3 gap-2">
                  {presetIcons.map((icon) => {
                    const IconComponent = icon.icon;
                    return (
                      <Button
                        key={icon.id}
                        variant={design.centerIcon === icon.id ? "default" : "outline"}
                        className="h-16 flex flex-col items-center"
                        onClick={() => updateDesign({ centerIcon: icon.id })}
                      >
                        <IconComponent size={24} />
                        <span className="text-xs mt-1">{icon.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="text" className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label>Add Text Element</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter text..."
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTextElement()}
                    />
                    <Button onClick={addTextElement} disabled={!newText.trim()}>
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {placeholderSuggestions.map((placeholder) => (
                      <Button
                        key={placeholder}
                        variant="outline"
                        size="sm"
                        onClick={() => setNewText(placeholder)}
                      >
                        {placeholder}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {design.textElements.length > 0 && (
                  <div className="space-y-2">
                    <Label>Text Elements</Label>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {design.textElements.map((element) => (
                        <div
                          key={element.id}
                          className={`flex items-center justify-between p-2 border rounded cursor-pointer ${
                            selectedElement === element.id ? 'bg-blue-50 border-blue-300' : ''
                          }`}
                          onClick={() => setSelectedElement(element.id)}
                        >
                          <span className="text-sm truncate">{element.text}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeTextElement(element.id);
                            }}
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {selectedElementData && (
                  <Card className="border-blue-200">
                    <CardContent className="p-4 space-y-3">
                      <Label className="text-sm font-medium text-blue-700">
                        Editing: {selectedElementData.text}
                      </Label>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs">X Position</Label>
                          <Slider
                            value={[selectedElementData.x]}
                            onValueChange={([value]) => updateTextElement(selectedElement!, { x: value })}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                        
                        <div className="space-y-1">
                          <Label className="text-xs">Y Position</Label>
                          <Slider
                            value={[selectedElementData.y]}
                            onValueChange={([value]) => updateTextElement(selectedElement!, { y: value })}
                            max={100}
                            step={1}
                            className="w-full"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Font Size</Label>
                        <Slider
                          value={[selectedElementData.fontSize]}
                          onValueChange={([value]) => updateTextElement(selectedElement!, { fontSize: value })}
                          min={8}
                          max={32}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Text Color</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={selectedElementData.color}
                            onChange={(e) => updateTextElement(selectedElement!, { color: e.target.value })}
                            className="w-8 h-6 rounded border cursor-pointer"
                          />
                          <Input
                            value={selectedElementData.color}
                            onChange={(e) => updateTextElement(selectedElement!, { color: e.target.value })}
                            className="flex-1 text-xs"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Font Family</Label>
                        <Select
                          value={selectedElementData.fontFamily}
                          onValueChange={(value) => updateTextElement(selectedElement!, { fontFamily: value })}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontFamilies.map((font) => (
                              <SelectItem key={font} value={font}>
                                <span style={{ fontFamily: font }}>{font.split(',')[0]}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-xs">Font Weight</Label>
                        <Select
                          value={selectedElementData.fontWeight}
                          onValueChange={(value) => updateTextElement(selectedElement!, { fontWeight: value })}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="bold">Bold</SelectItem>
                            <SelectItem value="lighter">Light</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
