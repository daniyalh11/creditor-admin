import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Upload, GripVertical, Trash2, ChevronDown, ChevronRight, ArrowLeft, Eye } from 'lucide-react';
import { CharacterLibraryModal } from './modals/CharacterLibraryModal';

export const ScenarioEditModal = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const getDefaultScenario = () => [
    {
      id: '1',
      heading: 'Scene 1',
      backgroundImage: '/lovable-uploads/a639cc57-1a53-4752-85af-b586193d4582.png',
      characterImage: '/lovable-uploads/ee8299a5-0df9-4a94-a29d-062b3cfce40d.png',
      contents: [
        {
          id: '1-content-1',
          heading: 'Add text to explain the situation your scenario will address.',
          avatarExpression: 'happy',
          contentType: 'dialog-bubble',
          responses: [
            { id: '1', text: 'Continue', avatarReaction: 'happy', navigateTo: 'next-content' }
          ]
        }
      ],
      expanded: true
    }
  ];

  const processScenesData = (scenesData) => {
    if (!scenesData || scenesData.length === 0) return getDefaultScenario();
    return scenesData.map((scene) => ({
      ...scene,
      contents: scene.contents?.map((content) => ({
        ...content,
        contentType: content.contentType || 'dialog-bubble',
        responses: content.responses?.map((response) => ({
          ...response,
          navigateTo: response.navigateTo || 'next-content'
        })) || [{ id: '1', text: 'Continue', avatarReaction: 'happy', navigateTo: 'next-content' }]
      })) || [{
        id: `${scene.id}-content-1`,
        heading: 'Content 1',
        avatarExpression: 'happy',
        contentType: 'dialog-bubble',
        responses: [{ id: '1', text: 'Continue', avatarReaction: 'happy', navigateTo: 'next-content' }]
      }],
      expanded: true
    }));
  };
  
  const [scenes, setScenes] = useState(() => processScenesData(block?.content?.scenes));
  const [selectedContentId, setSelectedContentId] = useState(null);
  const [selectedSceneId, setSelectedSceneId] = useState(() => (block?.content?.scenes?.[0]?.id || '1'));
  const [editMode, setEditMode] = useState('scene');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showCharacterLibrary, setShowCharacterLibrary] = useState(false);
  const backgroundFileRef = useRef(null);

  useEffect(() => {
    if (open) {
      const initialScenes = processScenesData(block?.content?.scenes);
      setScenes(initialScenes);
      setSelectedSceneId(initialScenes[0]?.id || '1');
      setSelectedContentId(null);
      setEditMode('scene');
    }
  }, [open, block?.id]);

  const selectedScene = scenes.find(scene => scene.id === selectedSceneId) || scenes[0];
  const selectedContent = selectedContentId ? scenes.flatMap(scene => scene.contents).find(content => content.id === selectedContentId) : null;

  const avatarExpressions = [
    { value: 'happy', label: '😊 Happy' }, { value: 'confused', label: '😕 Confused' },
    { value: 'excited', label: '🤩 Excited' }, { value: 'serious', label: '😐 Serious' },
    { value: 'worried', label: '😟 Worried' }, { value: 'surprised', label: '😲 Surprised' },
    { value: 'angry', label: '😠 Angry' }, { value: 'sad', label: '😢 Sad' },
    { value: 'thinking', label: '🤔 Thinking' }, { value: 'neutral', label: '😶 Neutral' }
  ];
  const contentTypes = [{ value: 'dialog-bubble', label: 'Dialog Bubble' }, { value: 'text-block', label: 'Text Block' }];

  const getAllContentOptions = () => {
    const options = [];
    scenes.forEach((scene, sceneIndex) => {
      scene.contents.forEach((content, contentIndex) => {
        options.push({ value: content.id, label: `Scene ${sceneIndex + 1}.${contentIndex + 1}: ${content.heading}`, sceneId: scene.id });
      });
    });
    return options;
  };

  const handleAddScene = () => {
    const newScene = {
      id: Date.now().toString(),
      heading: `Scene ${scenes.length + 1}`,
      backgroundImage: '/lovable-uploads/a639cc57-1a53-4752-85af-b586193d4582.png',
      characterImage: '/lovable-uploads/ee8299a5-0df9-4a94-a29d-062b3cfce40d.png',
      contents: [{ id: `${Date.now()}-content-1`, heading: 'New content', avatarExpression: 'happy', contentType: 'dialog-bubble', responses: [{ id: '1', text: 'Continue', avatarReaction: 'happy', navigateTo: 'next-content' }] }],
      expanded: true
    };
    setScenes([...scenes, newScene]);
    setSelectedSceneId(newScene.id);
    setSelectedContentId(newScene.contents[0].id);
  };

  const handleDeleteScene = (sceneId) => {
    if (scenes.length <= 1) return;
    const updatedScenes = scenes.filter(scene => scene.id !== sceneId);
    setScenes(updatedScenes);
    if (selectedSceneId === sceneId) {
      const firstScene = updatedScenes[0];
      setSelectedSceneId(firstScene.id);
      setSelectedContentId(firstScene.contents[0].id);
    }
  };

  const handleDeleteContent = (sceneId, contentId) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene || scene.contents.length <= 1) return;
    setScenes(scenes.map(s => s.id === sceneId ? { ...s, contents: s.contents.filter(c => c.id !== contentId) } : s));
    if (selectedContentId === contentId) {
      const remainingContent = scene.contents.filter(c => c.id !== contentId)[0];
      setSelectedContentId(remainingContent.id);
    }
  };

  const handleAddContent = (sceneId) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (!scene) return;
    const newContent = { id: `${sceneId}-content-${scene.contents.length + 1}`, heading: `Content ${scene.contents.length + 1}`, avatarExpression: 'happy', contentType: 'dialog-bubble', responses: [{ id: '1', text: 'Continue', avatarReaction: 'happy', navigateTo: 'next-content' }] };
    setScenes(scenes.map(s => s.id === sceneId ? { ...s, contents: [...s.contents, newContent] } : s));
    setSelectedContentId(newContent.id);
  };

  const handleToggleScene = (sceneId) => setScenes(scenes.map(scene => scene.id === sceneId ? { ...scene, expanded: !scene.expanded } : scene));
  const handleSelectScene = (sceneId) => { setSelectedSceneId(sceneId); setSelectedContentId(null); setEditMode('scene'); };
  const handleSelectContent = (contentId) => {
    setSelectedContentId(contentId);
    setEditMode('content');
    const parentScene = scenes.find(scene => scene.contents.some(content => content.id === contentId));
    if (parentScene) setSelectedSceneId(parentScene.id);
  };
  const handleBackToScene = () => { setSelectedContentId(null); setEditMode('scene'); };
  const handleUpdateScene = (sceneId, updates) => setScenes(scenes.map(scene => scene.id === sceneId ? { ...scene, ...updates } : scene));
  const handleUpdateContent = (updates) => setScenes(scenes.map(scene => ({ ...scene, contents: scene.contents.map(content => content.id === selectedContentId ? { ...content, ...updates } : content) })));
  const handleAddResponse = () => {
    if (!selectedContent) return;
    const newResponse = { id: Date.now().toString(), text: 'New response', avatarReaction: 'happy', navigateTo: 'next-content' };
    handleUpdateContent({ responses: [...selectedContent.responses, newResponse] });
  };
  const handleUpdateResponse = (responseId, updates) => { if (!selectedContent) return; handleUpdateContent({ responses: selectedContent.responses.map(res => res.id === responseId ? { ...res, ...updates } : res) }); };
  const handleDeleteResponse = (responseId) => { if (!selectedContent || selectedContent.responses.length <= 1) return; handleUpdateContent({ responses: selectedContent.responses.filter(res => res.id !== responseId) }); };

  const handleImageUpload = (type) => (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result;
        handleUpdateScene(selectedSceneId, { [type === 'background' ? 'backgroundImage' : 'characterImage']: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectCharacter = (characterUrl) => handleUpdateScene(selectedSceneId, { characterImage: characterUrl });

  const handleSaveAll = () => {
    if (!block) return;
    const updatedBlock = { ...block, content: { scenes, currentSceneIndex: 0, currentContentIndex: 0 } };
    onSave(updatedBlock);
    onOpenChange(false);
  };

  const LivePreview = () => {
    if (!selectedContent || !selectedScene) return null;
    return (
      <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-lg bg-white border">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 bg-cover bg-center" style={{ backgroundImage: selectedScene.backgroundImage ? `url(${selectedScene.backgroundImage})` : undefined }}>
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
        {selectedScene.characterImage && <div className="absolute left-4 bottom-0 w-32 h-56 z-10"><img src={selectedScene.characterImage} alt="Character" className="w-full h-full object-contain object-bottom"/></div>}
        <div className="absolute left-40 top-4 right-4 bottom-4 flex flex-col">
          {selectedContent.contentType === 'dialog-bubble' ? (
            <div className="bg-white rounded-lg p-3 shadow-lg mb-2 relative max-w-md">
              <div className="absolute left-0 top-4 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white transform -translate-x-1"></div>
              <p className="text-gray-800 text-sm font-medium">{selectedContent.heading}</p>
            </div>
          ) : (
            <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg max-w-md">
              <h4 className="font-semibold text-gray-900 mb-2">{selectedScene.heading}</h4>
              <p className="text-gray-800 text-sm">{selectedContent.heading}</p>
            </div>
          )}
        </div>
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs flex items-center gap-1"><Eye className="h-3 w-3" />Preview</div>
      </div>
    );
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-7xl h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0"><DialogTitle>Edit Scenario - Scene Builder</DialogTitle></DialogHeader>
          <div className="flex h-full">
            {/* Left Panel */}
            <div className="w-1/3 border-r bg-gray-50 flex flex-col">
              <div className="p-4 pb-2"><h3 className="font-semibold">Scenes & Content</h3></div>
              <div className="flex-1 px-4 pb-4 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-2 pr-4">
                    {scenes.map((scene, sceneIndex) => (
                      <div key={scene.id}>
                        <Card className={`border-2 cursor-pointer transition-colors ${selectedSceneId === scene.id && editMode === 'scene' ? 'border-blue-500 bg-blue-50' : 'border-blue-200 hover:border-blue-300'}`} onMouseEnter={() => setHoveredItem(`scene-${scene.id}`)} onMouseLeave={() => setHoveredItem(null)} onClick={() => handleSelectScene(scene.id)}>
                          <CardContent className="p-3"><div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleToggleScene(scene.id); }} className="p-0 h-auto">{scene.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</Button>
                            <GripVertical className="h-4 w-4 text-gray-400" /><div className="flex-1"><p className="font-medium text-sm">{scene.heading}</p><p className="text-xs text-gray-500">Scene {sceneIndex + 1}</p></div>
                            {hoveredItem === `scene-${scene.id}` && scenes.length > 1 && <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDeleteScene(scene.id); }} className="p-1 h-auto text-red-500 hover:text-red-700"><Trash2 className="h-3 w-3" /></Button>}
                          </div></CardContent>
                        </Card>
                        {scene.expanded && (
                          <div className="ml-6 mt-2 space-y-1">
                            {scene.contents.map((content, contentIndex) => (
                              <Card key={content.id} className={`cursor-pointer transition-colors ${selectedContentId === content.id ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-100'}`} onMouseEnter={() => setHoveredItem(`content-${content.id}`)} onMouseLeave={() => setHoveredItem(null)} onClick={() => handleSelectContent(content.id)}>
                                <CardContent className="p-2"><div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div><div className="flex-1"><p className="font-medium text-xs">{content.heading}</p><p className="text-xs text-gray-500">Content {sceneIndex + 1}.{contentIndex + 1} • {content.contentType === 'dialog-bubble' ? 'Dialog' : 'Text'}</p></div>
                                  {hoveredItem === `content-${content.id}` && scene.contents.length > 1 && <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); handleDeleteContent(scene.id, content.id); }} className="p-1 h-auto text-red-500 hover:text-red-700"><Trash2 className="h-3 w-3" /></Button>}
                                </div></CardContent>
                              </Card>
                            ))}
                            <Button size="sm" variant="outline" onClick={() => handleAddContent(scene.id)} className="w-full mt-2"><Plus className="h-3 w-3 mr-1" />Add Content</Button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              <div className="p-4 pt-0"><Button size="sm" onClick={handleAddScene} className="w-full"><Plus className="h-4 w-4 mr-1" />Add Scene</Button></div>
            </div>
            {/* Right Panel */}
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1">
                <div className="p-6">
                  {editMode === 'content' && selectedContent ? (
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-6"><Button variant="ghost" size="sm" onClick={handleBackToScene} className="flex items-center gap-1"><ArrowLeft className="h-4 w-4" />Back to Scene</Button><h3 className="font-semibold text-lg">Edit Content</h3></div>
                      <div className="mb-6"><h4 className="font-medium mb-3">Live Preview</h4><LivePreview /></div>
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="contentType">What type of content is this?</Label>
                          <Select value={selectedContent.contentType || 'dialog-bubble'} onValueChange={(value) => handleUpdateContent({ contentType: value })}>
                            <SelectTrigger><SelectValue placeholder="Select content type" /></SelectTrigger>
                            <SelectContent>{contentTypes.map(type => <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>)}</SelectContent>
                          </Select>
                          <p className="text-xs text-gray-500 mt-1">{selectedContent.contentType === 'dialog-bubble' ? 'Appears as a chat bubble next to the avatar' : 'Appears as a basic text block overlay'}</p>
                        </div>
                        <div>
                          <Label htmlFor="contentHeading">{selectedContent.contentType === 'dialog-bubble' ? 'Dialog Text' : 'Content Text'}</Label>
                          <Input id="contentHeading" value={selectedContent.heading} onChange={(e) => handleUpdateContent({ heading: e.target.value })} placeholder={selectedContent.contentType === 'dialog-bubble' ? "Enter dialog text..." : "Enter content text..."} />
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-4"><Label>Responses & Navigation</Label><Button size="sm" onClick={handleAddResponse}><Plus className="h-3 w-3 mr-1" />Add Response</Button></div>
                          <div className="space-y-4">
                            {selectedContent.responses.map((response, index) => (
                              <Card key={response.id} className="p-4"><div className="space-y-3">
                                <div className="flex items-center justify-between"><Label className="text-sm font-medium">Response {index + 1}</Label>{selectedContent.responses.length > 1 && <Button size="sm" variant="ghost" onClick={() => handleDeleteResponse(response.id)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></Button>}</div>
                                <div><Label className="text-xs text-gray-600">Response Text</Label><Input value={response.text} onChange={(e) => handleUpdateResponse(response.id, { text: e.target.value })} placeholder="Response text..." /></div>
                                <div><Label className="text-xs text-gray-600">Avatar Reaction</Label><Select value={response.avatarReaction || 'happy'} onValueChange={(value) => handleUpdateResponse(response.id, { avatarReaction: value })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{avatarExpressions.map(expr => <SelectItem key={expr.value} value={expr.value}>{expr.label}</SelectItem>)}</SelectContent></Select></div>
                                <div><Label className="text-xs text-gray-600">On selecting this response, go to →</Label><Select value={response.navigateTo || 'next-content'} onValueChange={(value) => handleUpdateResponse(response.id, { navigateTo: value })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="next-content">Next Content</SelectItem><SelectItem value="next-scene">Next Scene</SelectItem><SelectItem value="specific-content">Specific Content</SelectItem><SelectItem value="end-scenario">End Scenario</SelectItem></SelectContent></Select></div>
                                {response.navigateTo === 'specific-content' && <div><Label className="text-xs text-gray-600">Select Specific Content</Label><Select value={response.specificContentId || ''} onValueChange={(value) => handleUpdateResponse(response.id, { specificContentId: value })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{getAllContentOptions().map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select></div>}
                              </div></Card>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-6 pt-4 border-t"><Button variant="outline" onClick={handleBackToScene}>Back to Scene</Button><Button onClick={handleSaveAll}>Save Content</Button></div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 bg-cover bg-center" style={{ backgroundImage: selectedScene?.backgroundImage ? `url(${selectedScene.backgroundImage})` : undefined }}><div className="absolute inset-0 bg-black bg-opacity-20"></div></div>
                        {selectedScene?.characterImage && <div className="absolute left-4 bottom-0 w-32 h-44 z-10"><img src={selectedScene.characterImage} alt="Character" className="w-full h-full object-contain"/></div>}
                        <div className="absolute left-40 top-4 right-4 bottom-4 flex flex-col"><div className="bg-white rounded-lg p-2 shadow-lg mb-2 relative"><div className="absolute left-0 top-3 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white transform -translate-x-1"></div><p className="text-gray-800 text-xs">{selectedScene?.heading || 'Scene heading will appear here'}</p></div></div>
                      </div>
                      <div className="border-t pt-4"><h4 className="font-medium mb-3">Scene Settings</h4><div className="space-y-3">
                        <div><Label>Set Background</Label><div className="flex gap-2 mt-1"><Button variant="outline" onClick={() => backgroundFileRef.current?.click()}><Upload className="h-4 w-4 mr-2" />Upload Background</Button>{selectedScene?.backgroundImage && <Button variant="outline" onClick={() => handleUpdateScene(selectedSceneId, { backgroundImage: undefined })}>Remove</Button>}</div><input ref={backgroundFileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload('background')} /></div>
                        <div><Label>Upload Character</Label><div className="flex gap-2 mt-1"><Button variant="outline" onClick={() => setShowCharacterLibrary(true)}>Choose Character</Button>{selectedScene?.characterImage && <Button variant="outline" onClick={() => handleUpdateScene(selectedSceneId, { characterImage: undefined })}>Remove</Button>}</div></div>
                      </div></div>
                      <div className="flex justify-end gap-2 mt-6 pt-4 border-t"><Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button><Button onClick={handleSaveAll}>Save Scenario</Button></div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <CharacterLibraryModal open={showCharacterLibrary} onOpenChange={setShowCharacterLibrary} onSelectCharacter={handleSelectCharacter} />
    </>
  );
};

// Define prop types for runtime type checking
const responsePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  avatarReaction: PropTypes.string,
  nextContentId: PropTypes.string,
  navigateTo: PropTypes.oneOf(['next-content', 'next-scene', 'end-scenario', 'specific-content']),
  specificContentId: PropTypes.string
});

const contentPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  avatarExpression: PropTypes.string.isRequired,
  responses: PropTypes.arrayOf(responsePropType).isRequired,
  contentType: PropTypes.oneOf(['text-block', 'dialog-bubble'])
});

const scenePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  backgroundImage: PropTypes.string,
  characterImage: PropTypes.string,
  heading: PropTypes.string.isRequired,
  contents: PropTypes.arrayOf(contentPropType).isRequired,
  expanded: PropTypes.bool
});

ScenarioEditModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  block: PropTypes.shape({
    id: PropTypes.string,
    content: PropTypes.shape({
      scenes: PropTypes.arrayOf(scenePropType)
    })
  })
};