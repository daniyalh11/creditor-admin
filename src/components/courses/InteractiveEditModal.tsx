import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, Upload, X, Image, Video } from 'lucide-react';

interface InteractiveBlock {
  id: string;
  type: 'interactive';
  style: 'accordion' | 'tabs' | 'labeled-graphic' | 'process' | 'scenario' | 'flashcard' | 'timeline';
  content: any;
}

interface InteractiveEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block: InteractiveBlock | null;
  onSave: (block: InteractiveBlock) => void;
}

export const InteractiveEditModal: React.FC<InteractiveEditModalProps> = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editedBlock, setEditedBlock] = useState<InteractiveBlock | null>(null);

  useEffect(() => {
    if (block) {
      setEditedBlock(block);
    }
  }, [block]);

  const handleSave = () => {
    if (editedBlock) {
      onSave(editedBlock);
      onOpenChange(false);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editedBlock) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setEditedBlock(prev => prev ? ({
          ...prev,
          content: {
            ...prev.content,
            image: imageUrl
          }
        }) : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSectionMediaUpload = (sectionId: string, mediaType: 'image' | 'video', event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editedBlock) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const mediaUrl = e.target?.result as string;
        setEditedBlock(prev => prev ? ({
          ...prev,
          content: {
            ...prev.content,
            sections: prev.content.sections.map((s: any) => 
              s.id === sectionId ? { 
                ...s, 
                media: {
                  ...s.media,
                  [mediaType]: mediaUrl
                }
              } : s
            )
          }
        }) : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeSectionMedia = (sectionId: string, mediaType: 'image' | 'video') => {
    if (editedBlock) {
      setEditedBlock(prev => prev ? ({
        ...prev,
        content: {
          ...prev.content,
          sections: prev.content.sections.map((s: any) => 
            s.id === sectionId ? { 
              ...s, 
              media: {
                ...s.media,
                [mediaType]: undefined
              }
            } : s
          )
        }
      }) : null);
    }
  };

  // Early return if block is null or editedBlock is null
  if (!block || !editedBlock) {
    return null;
  }

  const renderAccordionEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Accordion Sections</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newSection = {
              id: Date.now().toString(),
              title: 'New Section',
              content: 'Section content',
              media: {}
            };
            setEditedBlock(prev => prev ? ({
              ...prev,
              content: {
                ...prev.content,
                sections: [...(prev.content.sections || []), newSection]
              }
            }) : null);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Section
        </Button>
      </div>
      
      {editedBlock.content.sections?.map((section: any, index: number) => (
        <div key={section.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label>Section {index + 1}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    sections: prev.content.sections.filter((s: any) => s.id !== section.id)
                  }
                }) : null);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Section title"
            value={section.title}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  sections: prev.content.sections.map((s: any) => 
                    s.id === section.id ? { ...s, title: e.target.value } : s
                  )
                }
              }) : null);
            }}
          />
          <Textarea
            placeholder="Section content"
            value={section.content}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  sections: prev.content.sections.map((s: any) => 
                    s.id === section.id ? { ...s, content: e.target.value } : s
                  )
                }
              }) : null);
            }}
          />
          
          {/* Media Upload Section */}
          <div className="border-t pt-3 space-y-3">
            <Label className="text-sm font-medium">Media Gallery</Label>
            
            {/* Image Upload */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Images</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleSectionMediaUpload(section.id, 'image', e)}
                  className="hidden"
                  id={`image-upload-${section.id}`}
                />
                <label htmlFor={`image-upload-${section.id}`}>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>
                      <Image className="h-4 w-4 mr-2" />
                      Upload Image
                    </span>
                  </Button>
                </label>
              </div>
              
              {section.media?.image && (
                <div className="relative inline-block">
                  <img src={section.media.image} alt="Section image" className="w-full max-w-xs rounded-lg" />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => removeSectionMedia(section.id, 'image')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Video Upload */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label className="text-sm">Videos</Label>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleSectionMediaUpload(section.id, 'video', e)}
                  className="hidden"
                  id={`video-upload-${section.id}`}
                />
                <label htmlFor={`video-upload-${section.id}`}>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>
                      <Video className="h-4 w-4 mr-2" />
                      Upload Video
                    </span>
                  </Button>
                </label>
              </div>
              
              {section.media?.video && (
                <div className="relative inline-block">
                  <video src={section.media.video} controls className="w-full max-w-xs rounded-lg">
                    Your browser does not support the video tag.
                  </video>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={() => removeSectionMedia(section.id, 'video')}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTabsEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Tabs</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newTab = {
              id: Date.now().toString(),
              title: 'New Tab',
              content: 'Tab content'
            };
            setEditedBlock(prev => prev ? ({
              ...prev,
              content: {
                ...prev.content,
                tabs: [...(prev.content.tabs || []), newTab]
              }
            }) : null);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Tab
        </Button>
      </div>
      
      {editedBlock.content.tabs?.map((tab: any, index: number) => (
        <div key={tab.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label>Tab {index + 1}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    tabs: prev.content.tabs.filter((t: any) => t.id !== tab.id)
                  }
                }) : null);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Tab title"
            value={tab.title}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  tabs: prev.content.tabs.map((t: any) => 
                    t.id === tab.id ? { ...t, title: e.target.value } : t
                  )
                }
              }) : null);
            }}
          />
          <Textarea
            placeholder="Tab content"
            value={tab.content}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  tabs: prev.content.tabs.map((t: any) => 
                    t.id === tab.id ? { ...t, content: e.target.value } : t
                  )
                }
              }) : null);
            }}
          />
        </div>
      ))}
    </div>
  );

  const renderScenarioEditor = () => (
    <div className="space-y-6">
      {/* Basic Scenario Info */}
      <div className="space-y-4">
        <div>
          <Label>Scenario Question</Label>
          <Textarea
            placeholder="Enter the main scenario question"
            value={editedBlock.content.question || ''}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  question: e.target.value
                }
              }) : null);
            }}
          />
        </div>
        
        <div>
          <Label>Scenario Description</Label>
          <Textarea
            placeholder="Provide context and background for the scenario"
            value={editedBlock.content.description || ''}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  description: e.target.value
                }
              }) : null);
            }}
          />
        </div>
      </div>

      {/* Scenario Media */}
      <div className="border rounded-lg p-4 space-y-4">
        <Label className="text-lg font-semibold">Scenario Media</Label>
        
        {/* Image Upload */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label>Scenario Image</Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="scenario-image-upload"
            />
            <label htmlFor="scenario-image-upload">
              <Button type="button" variant="outline" size="sm" asChild>
                <span>
                  <Image className="h-4 w-4 mr-2" />
                  Upload Image
                </span>
              </Button>
            </label>
          </div>
          
          {editedBlock.content.image && (
            <div className="relative inline-block">
              <img src={editedBlock.content.image} alt="Scenario" className="w-full max-w-md rounded-lg" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => {
                  setEditedBlock(prev => prev ? ({
                    ...prev,
                    content: { ...prev.content, image: undefined }
                  }) : null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Video Upload */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Label>Scenario Video</Label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setEditedBlock(prev => prev ? ({
                      ...prev,
                      content: {
                        ...prev.content,
                        video: event.target?.result as string
                      }
                    }) : null);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
              id="scenario-video-upload"
            />
            <label htmlFor="scenario-video-upload">
              <Button type="button" variant="outline" size="sm" asChild>
                <span>
                  <Video className="h-4 w-4 mr-2" />
                  Upload Video
                </span>
              </Button>
            </label>
          </div>
          
          {editedBlock.content.video && (
            <div className="relative inline-block">
              <video src={editedBlock.content.video} controls className="w-full max-w-md rounded-lg">
                Your browser does not support the video tag.
              </video>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={() => {
                  setEditedBlock(prev => prev ? ({
                    ...prev,
                    content: { ...prev.content, video: undefined }
                  }) : null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Answer Options</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const newOption = {
                id: Date.now().toString(),
                text: 'New answer option',
                feedback: 'Feedback for this option',
                isCorrect: false
              };
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  options: [...(prev.content.options || []), newOption]
                }
              }) : null);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </div>
        
        {editedBlock.content.options?.map((option: any, index: number) => (
          <div key={option.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label>Option {index + 1}</Label>
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={option.isCorrect || false}
                    onChange={(e) => {
                      setEditedBlock(prev => prev ? ({
                        ...prev,
                        content: {
                          ...prev.content,
                          options: prev.content.options.map((opt: any) => 
                            opt.id === option.id ? { ...opt, isCorrect: e.target.checked } : opt
                          )
                        }
                      }) : null);
                    }}
                    className="rounded"
                  />
                  Correct Answer
                </label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setEditedBlock(prev => prev ? ({
                      ...prev,
                      content: {
                        ...prev.content,
                        options: prev.content.options.filter((opt: any) => opt.id !== option.id)
                      }
                    }) : null);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div>
              <Label className="text-sm">Answer Text</Label>
              <Textarea
                placeholder="Enter the answer option text"
                value={option.text}
                onChange={(e) => {
                  setEditedBlock(prev => prev ? ({
                    ...prev,
                    content: {
                      ...prev.content,
                      options: prev.content.options.map((opt: any) => 
                        opt.id === option.id ? { ...opt, text: e.target.value } : opt
                      )
                    }
                  }) : null);
                }}
                rows={2}
              />
            </div>
            
            <div>
              <Label className="text-sm">Feedback</Label>
              <Textarea
                placeholder="Provide feedback for this answer choice"
                value={option.feedback}
                onChange={(e) => {
                  setEditedBlock(prev => prev ? ({
                    ...prev,
                    content: {
                      ...prev.content,
                      options: prev.content.options.map((opt: any) => 
                        opt.id === option.id ? { ...opt, feedback: e.target.value } : opt
                      )
                    }
                  }) : null);
                }}
                rows={2}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Scenes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-lg font-semibold">Additional Scenes</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const newScene = {
                id: Date.now().toString(),
                title: 'New Scene',
                description: 'Scene description',
                image: '',
                text: ''
              };
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  scenes: [...(prev.content.scenes || []), newScene]
                }
              }) : null);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Scene
          </Button>
        </div>
        
        {editedBlock.content.scenes?.map((scene: any, index: number) => (
          <div key={scene.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label>Scene {index + 1}</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditedBlock(prev => prev ? ({
                    ...prev,
                    content: {
                      ...prev.content,
                      scenes: prev.content.scenes.filter((s: any) => s.id !== scene.id)
                    }
                  }) : null);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <Input
              placeholder="Scene title"
              value={scene.title}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    scenes: prev.content.scenes.map((s: any) => 
                      s.id === scene.id ? { ...s, title: e.target.value } : s
                    )
                  }
                }) : null);
              }}
            />
            
            <Textarea
              placeholder="Scene description"
              value={scene.description}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    scenes: prev.content.scenes.map((s: any) => 
                      s.id === scene.id ? { ...s, description: e.target.value } : s
                    )
                  }
                }) : null);
              }}
            />
            
            <Textarea
              placeholder="Additional scene text"
              value={scene.text}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    scenes: prev.content.scenes.map((s: any) => 
                      s.id === scene.id ? { ...s, text: e.target.value } : s
                    )
                  }
                }) : null);
              }}
            />
            
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setEditedBlock(prev => prev ? ({
                        ...prev,
                        content: {
                          ...prev.content,
                          scenes: prev.content.scenes.map((s: any) => 
                            s.id === scene.id ? { ...s, image: event.target?.result as string } : s
                          )
                        }
                      }) : null);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id={`scene-image-${scene.id}`}
              />
              <label htmlFor={`scene-image-${scene.id}`}>
                <Button type="button" variant="outline" size="sm" asChild>
                  <span>
                    <Image className="h-4 w-4 mr-2" />
                    Upload Scene Image
                  </span>
                </Button>
              </label>
            </div>
            
            {scene.image && (
              <div className="relative inline-block">
                <img src={scene.image} alt={`Scene ${index + 1}`} className="w-full max-w-xs rounded-lg" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => {
                    setEditedBlock(prev => prev ? ({
                      ...prev,
                      content: {
                        ...prev.content,
                        scenes: prev.content.scenes.map((s: any) => 
                          s.id === scene.id ? { ...s, image: '' } : s
                        )
                      }
                    }) : null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderLabeledGraphicEditor = () => (
    <div className="space-y-4">
      <div>
        <Label>Image</Label>
        <div className="mt-2 space-y-3">
          {editedBlock.content.image && (
            <div className="relative">
              <img src={editedBlock.content.image} alt="Labeled graphic" className="w-full max-w-md rounded-lg" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => {
                  setEditedBlock(prev => prev ? ({
                    ...prev,
                    content: { ...prev.content, image: '' }
                  }) : null);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button type="button" variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      <div>
        <Label>Point Display Style</Label>
        <div className="mt-2">
          <select
            value={editedBlock.content.pointStyle || 'dots'}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  pointStyle: e.target.value as 'dots' | 'numbers' | 'letters' | 'icons'
                }
              }) : null);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="dots">Dots</option>
            <option value="numbers">Numbers (1, 2, 3...)</option>
            <option value="letters">Letters (A, B, C...)</option>
            <option value="icons">Icons (●)</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Hotspots</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              const newHotspot = {
                id: Date.now().toString(),
                x: 50,
                y: 50,
                label: 'New Hotspot',
                description: 'Hotspot description'
              };
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  hotspots: [...(prev.content.hotspots || []), newHotspot]
                }
              }) : null);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Hotspot
          </Button>
        </div>
        
        {editedBlock.content.hotspots?.map((hotspot: any, index: number) => (
          <div key={hotspot.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label>Hotspot {index + 1}</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditedBlock(prev => prev ? ({
                    ...prev,
                    content: {
                      ...prev.content,
                      hotspots: prev.content.hotspots.filter((h: any) => h.id !== hotspot.id)
                    }
                  }) : null);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Hotspot label"
              value={hotspot.label}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    hotspots: prev.content.hotspots.map((h: any) => 
                      h.id === hotspot.id ? { ...h, label: e.target.value } : h
                    )
                  }
                }) : null);
              }}
            />
            <Textarea
              placeholder="Hotspot description"
              value={hotspot.description}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    hotspots: prev.content.hotspots.map((h: any) => 
                      h.id === hotspot.id ? { ...h, description: e.target.value } : h
                    )
                  }
                }) : null);
              }}
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-sm">X Position (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={hotspot.x}
                  onChange={(e) => {
                    setEditedBlock(prev => prev ? ({
                      ...prev,
                      content: {
                        ...prev.content,
                        hotspots: prev.content.hotspots.map((h: any) => 
                          h.id === hotspot.id ? { ...h, x: Number(e.target.value) } : h
                        )
                      }
                    }) : null);
                  }}
                />
              </div>
              <div>
                <Label className="text-sm">Y Position (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={hotspot.y}
                  onChange={(e) => {
                    setEditedBlock(prev => prev ? ({
                      ...prev,
                      content: {
                        ...prev.content,
                        hotspots: prev.content.hotspots.map((h: any) => 
                          h.id === hotspot.id ? { ...h, y: Number(e.target.value) } : h
                        )
                      }
                    }) : null);
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProcessEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Process Steps</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newStep = {
              id: Date.now().toString(),
              title: 'New Step',
              description: 'Step description'
            };
            setEditedBlock(prev => prev ? ({
              ...prev,
              content: {
                ...prev.content,
                steps: [...(prev.content.steps || []), newStep]
              }
            }) : null);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Step
        </Button>
      </div>
      
      {editedBlock.content.steps?.map((step: any, index: number) => (
        <div key={step.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label>Step {index + 1}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    steps: prev.content.steps.filter((s: any) => s.id !== step.id)
                  }
                }) : null);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Step title"
            value={step.title}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  steps: prev.content.steps.map((s: any) => 
                    s.id === step.id ? { ...s, title: e.target.value } : s
                  )
                }
              }) : null);
            }}
          />
          <Textarea
            placeholder="Step description"
            value={step.description}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  steps: prev.content.steps.map((s: any) => 
                    s.id === step.id ? { ...s, description: e.target.value } : s
                  )
                }
              }) : null);
            }}
          />
        </div>
      ))}
    </div>
  );

  const renderFlashcardEditor = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label>Front Side</Label>
          <div className="border rounded-lg p-4 space-y-3">
            <Textarea
              placeholder="Front text"
              value={editedBlock.content.front?.text || ''}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    front: {
                      ...prev.content.front,
                      text: e.target.value
                    }
                  }
                }) : null);
              }}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setEditedBlock(prev => prev ? ({
                        ...prev,
                        content: {
                          ...prev.content,
                          front: {
                            ...prev.content.front,
                            image: event.target?.result as string
                          }
                        }
                      }) : null);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="front-image-upload"
              />
              <label htmlFor="front-image-upload">
                <Button type="button" variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Front Image
                  </span>
                </Button>
              </label>
            </div>
            {editedBlock.content.front?.image && (
              <div className="relative">
                <img src={editedBlock.content.front.image} alt="Front" className="w-full max-w-32 rounded" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={() => {
                    setEditedBlock(prev => prev ? ({
                      ...prev,
                      content: {
                        ...prev.content,
                        front: {
                          ...prev.content.front,
                          image: undefined
                        }
                      }
                    }) : null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <Label>Back Side</Label>
          <div className="border rounded-lg p-4 space-y-3">
            <Textarea
              placeholder="Back text"
              value={editedBlock.content.back?.text || ''}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    back: {
                      ...prev.content.back,
                      text: e.target.value
                    }
                  }
                }) : null);
              }}
            />
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setEditedBlock(prev => prev ? ({
                        ...prev,
                        content: {
                          ...prev.content,
                          back: {
                            ...prev.content.back,
                            image: event.target?.result as string
                          }
                        }
                      }) : null);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="hidden"
                id="back-image-upload"
              />
              <label htmlFor="back-image-upload">
                <Button type="button" variant="outline" size="sm" asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Back Image
                  </span>
                </Button>
              </label>
            </div>
            {editedBlock.content.back?.image && (
              <div className="relative">
                <img src={editedBlock.content.back.image} alt="Back" className="w-full max-w-32 rounded" />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={() => {
                    setEditedBlock(prev => prev ? ({
                      ...prev,
                      content: {
                        ...prev.content,
                        back: {
                          ...prev.content.back,
                          image: undefined
                        }
                      }
                    }) : null);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimelineEditor = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Timeline Events</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            const newEvent = {
              id: Date.now().toString(),
              date: '2024',
              title: 'New Event',
              description: 'Event description'
            };
            setEditedBlock(prev => prev ? ({
              ...prev,
              content: {
                ...prev.content,
                events: [...(prev.content.events || []), newEvent]
              }
            }) : null);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>
      
      {editedBlock.content.events?.map((event: any, index: number) => (
        <div key={event.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Label>Event {index + 1}</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    events: prev.content.events.filter((e: any) => e.id !== event.id)
                  }
                }) : null);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="Date/Year"
              value={event.date}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    events: prev.content.events.map((ev: any) => 
                      ev.id === event.id ? { ...ev, date: e.target.value } : ev
                    )
                  }
                }) : null);
              }}
            />
            <Input
              placeholder="Event title"
              value={event.title}
              onChange={(e) => {
                setEditedBlock(prev => prev ? ({
                  ...prev,
                  content: {
                    ...prev.content,
                    events: prev.content.events.map((ev: any) => 
                      ev.id === event.id ? { ...ev, title: e.target.value } : ev
                    )
                  }
                }) : null);
              }}
            />
          </div>
          <Textarea
            placeholder="Event description"
            value={event.description}
            onChange={(e) => {
              setEditedBlock(prev => prev ? ({
                ...prev,
                content: {
                  ...prev.content,
                  events: prev.content.events.map((ev: any) => 
                    ev.id === event.id ? { ...ev, description: e.target.value } : ev
                  )
                }
              }) : null);
            }}
          />
        </div>
      ))}
    </div>
  );

  const renderEditor = () => {
    switch (editedBlock.style) {
      case 'accordion':
        return renderAccordionEditor();
      case 'tabs':
        return renderTabsEditor();
      case 'labeled-graphic':
        return renderLabeledGraphicEditor();
      case 'process':
        return renderProcessEditor();
      case 'scenario':
        return renderScenarioEditor();
      case 'flashcard':
        return renderFlashcardEditor();
      case 'timeline':
        return renderTimelineEditor();
      default:
        return <div>Editor for {editedBlock.style} is coming soon...</div>;
    }
  };

  // Get the display name for the dialog title, with proper null checking
  const getDisplayName = () => {
    if (!editedBlock?.style) return 'Interactive Block';
    return editedBlock.style.charAt(0).toUpperCase() + editedBlock.style.slice(1);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {getDisplayName()}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {renderEditor()}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
