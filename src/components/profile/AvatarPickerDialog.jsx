import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Upload, Camera, Monitor, CheckCircle2, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Modern, diverse avatars with different styles and backgrounds
const svgAvatars = [
  // Male Avatars
  {
    id: 'business-man-1',
    gender: 'male',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#2C3E50"/>
      <circle cx="60" cy="45" r="18" fill="#FDBCB4"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#34495E"/>
      <path d="M40 28 Q60 18 80 28 Q77 38 60 36 Q43 38 40 28" fill="#2C3E50"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#8D6E63" stroke-width="2" fill="none"/>
      <rect x="48" y="33" width="6" height="3" fill="#1A1A1A" rx="1"/>
      <rect x="66" y="33" width="6" height="3" fill="#1A1A1A" rx="1"/>
    </svg>`
  },
  {
    id: 'casual-man-1',
    gender: 'male',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#FF6B9D"/>
      <circle cx="60" cy="45" r="18" fill="#FDBCB4"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#E91E63"/>
      <path d="M42 30 Q60 20 78 30 Q75 40 60 38 Q45 40 42 30" fill="#8B4513"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#E74C3C" stroke-width="2" fill="none"/>
      <path d="M50 35 Q60 32 70 35" stroke="#654321" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'business-man-2',
    gender: 'male',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#3498DB"/>
      <circle cx="60" cy="45" r="18" fill="#D4A574"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#2980B9"/>
      <path d="M45 32 Q60 25 75 32 Q72 40 60 38 Q48 40 45 32" fill="#654321"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#8D6E63" stroke-width="2" fill="none"/>
      <path d="M52 36 Q60 34 68 36" stroke="#4A2C17" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'casual-man-2',
    gender: 'male',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#9B59B6"/>
      <circle cx="60" cy="45" r="18" fill="#8D5524"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#8E44AD"/>
      <path d="M30 22 Q60 12 90 22 Q87 35 60 33 Q33 35 30 22" fill="#F39C12"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#8D6E63" stroke-width="2" fill="none"/>
      <circle cx="42" cy="28" r="3" fill="#F39C12"/>
      <circle cx="78" cy="28" r="3" fill="#F39C12"/>
    </svg>`
  },
  {
    id: 'professional-man-1',
    gender: 'male',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#1ABC9C"/>
      <circle cx="60" cy="45" r="18" fill="#FDBCB4"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#16A085"/>
      <circle cx="60" cy="32" r="14" fill="#95A5A6"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#8D6E63" stroke-width="2" fill="none"/>
    </svg>`
  },
  // Female Avatars
  {
    id: 'business-woman-1',
    gender: 'female',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#E67E22"/>
      <circle cx="60" cy="45" r="18" fill="#FDBCB4"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#D35400"/>
      <path d="M35 25 Q60 15 85 25 Q82 38 60 36 Q38 38 35 25" fill="#8E44AD"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#E74C3C" stroke-width="2" fill="none"/>
      <circle cx="52" cy="45" r="1.5" fill="#FF69B4"/>
      <circle cx="68" cy="45" r="1.5" fill="#FF69B4"/>
      <ellipse cx="45" cy="32" rx="4" ry="6" fill="#8E44AD"/>
      <ellipse cx="75" cy="32" rx="4" ry="6" fill="#8E44AD"/>
    </svg>`
  },
  {
    id: 'casual-woman-1',
    gender: 'female',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#4A90E2"/>
      <circle cx="60" cy="45" r="18" fill="#FDBCB4"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#2980B9"/>
      <path d="M25 18 Q60 8 95 18 Q92 31 60 29 Q28 31 25 18" fill="#E74C3C"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#E74C3C" stroke-width="2" fill="none"/>
      <circle cx="52" cy="45" r="1.5" fill="#FF69B4"/>
      <circle cx="68" cy="45" r="1.5" fill="#FF69B4"/>
      <ellipse cx="40" cy="26" rx="3" ry="5" fill="#E74C3C"/>
      <ellipse cx="80" cy="26" rx="3" ry="5" fill="#E74C3C"/>
    </svg>`
  },
  {
    id: 'professional-woman-1',
    gender: 'female',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#27AE60"/>
      <circle cx="60" cy="45" r="18" fill="#FDBCB4"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#229954"/>
      <path d="M28 20 Q60 10 92 20 Q89 33 60 31 Q31 33 28 20" fill="#E67E22"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#E74C3C" stroke-width="2" fill="none"/>
      <circle cx="52" cy="45" r="1.5" fill="#FF69B4"/>
      <circle cx="68" cy="45" r="1.5" fill="#FF69B4"/>
      <path d="M35 24 Q60 20 85 24" stroke="#D35400" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'business-woman-2',
    gender: 'female',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#8E44AD"/>
      <circle cx="60" cy="45" r="18" fill="#D4A574"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#7D3C98"/>
      <path d="M30 22 Q60 12 90 22 Q87 35 60 33 Q33 35 30 22" fill="#2C3E50"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#8D6E63" stroke-width="2" fill="none"/>
      <circle cx="52" cy="45" r="1.5" fill="#FF69B4"/>
      <circle cx="68" cy="45" r="1.5" fill="#FF69B4"/>
    </svg>`
  },
  {
    id: 'casual-woman-2',
    gender: 'female',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#F39C12"/>
      <circle cx="60" cy="45" r="18" fill="#8D5524"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#E67E22"/>
      <path d="M32 24 Q60 14 88 24 Q85 36 60 34 Q35 36 32 24" fill="#C0392B"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#E74C3C" stroke-width="2" fill="none"/>
      <circle cx="52" cy="45" r="1.5" fill="#FF69B4"/>
      <circle cx="68" cy="45" r="1.5" fill="#FF69B4"/>
    </svg>`
  },
  // Alternative/Diverse Avatars
  {
    id: 'alternative-1',
    gender: 'alternative',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#FF6B9D"/>
      <circle cx="60" cy="45" r="18" fill="#8D5524"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#E91E63"/>
      <path d="M25 18 Q60 8 95 18 Q92 31 60 29 Q28 31 25 18" fill="#9B59B6"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#E74C3C" stroke-width="2" fill="none"/>
      <circle cx="52" cy="45" r="1.5" fill="#FF69B4"/>
      <circle cx="68" cy="45" r="1.5" fill="#FF69B4"/>
      <path d="M30 26 Q60 22 90 26" stroke="#8E44AD" stroke-width="3" fill="none"/>
    </svg>`
  },
  {
    id: 'alternative-2',
    gender: 'alternative',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#1ABC9C"/>
      <circle cx="60" cy="45" r="18" fill="#FDBCB4"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#16A085"/>
      <circle cx="60" cy="32" r="16" fill="#E74C3C"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#8D6E63" stroke-width="2" fill="none"/>
      <rect x="48" y="33" width="6" height="3" fill="#1A1A1A" rx="1"/>
      <rect x="66" y="33" width="6" height="3" fill="#1A1A1A" rx="1"/>
    </svg>`
  },
  {
    id: 'alternative-3',
    gender: 'alternative',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#34495E"/>
      <circle cx="60" cy="45" r="18" fill="#D4A574"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#2C3E50"/>
      <path d="M40 28 Q60 18 80 28 Q77 38 60 36 Q43 38 40 28" fill="#F39C12"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#8D6E63" stroke-width="2" fill="none"/>
      <circle cx="35" cy="35" r="2" fill="#F39C12"/>
      <circle cx="85" cy="35" r="2" fill="#F39C12"/>
      <circle cx="60" cy="25" r="1.5" fill="#E74C3C"/>
    </svg>`
  },
  {
    id: 'alternative-4',
    gender: 'alternative',
    svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="60" fill="#9B59B6"/>
      <circle cx="60" cy="45" r="18" fill="#FDBCB4"/>
      <ellipse cx="60" cy="85" rx="25" ry="35" fill="#8E44AD"/>
      <path d="M35 25 Q60 15 85 25 Q82 38 60 36 Q38 38 35 25" fill="#E67E22"/>
      <circle cx="54" cy="42" r="2" fill="#2C3E50"/>
      <circle cx="66" cy="42" r="2" fill="#2C3E50"/>
      <path d="M56 50 Q60 53 64 50" stroke="#E74C3C" stroke-width="2" fill="none"/>
      <circle cx="52" cy="45" r="1.5" fill="#FF69B4"/>
      <circle cx="68" cy="45" r="1.5" fill="#FF69B4"/>
      <rect x="48" y="33" width="6" height="3" fill="#1A1A1A" rx="1"/>
      <rect x="66" y="33" width="6" height="3" fill="#1A1A1A" rx="1"/>
    </svg>`
  }
];

export function AvatarPickerDialog({ isOpen, onClose, onSave, currentAvatar }) {
  const [activeTab, setActiveTab] = useState('upload');
  const [genderFilter, setGenderFilter] = useState('all');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [saveClicked, setSaveClicked] = useState(false);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && currentAvatar) {
      setSelectedAvatar(currentAvatar);
    }
  }, [isOpen, currentAvatar]);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result;
        setUploadedImage(result);
        setSelectedAvatar(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedAvatar) {
      setSaveClicked(true);
      setTimeout(() => {
        onSave(selectedAvatar);
        window.dispatchEvent(new CustomEvent('avatarUpdated', { 
          detail: { avatarUrl: selectedAvatar } 
        }));
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully.",
        });
        onClose();
        setSaveClicked(false);
      }, 800);
    } else {
      toast({
        title: "No image selected",
        description: "Please select or upload an image first.",
        variant: "destructive",
      });
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraUpload = () => {
    cameraInputRef.current?.click();
  };

  const filteredSvgAvatars = genderFilter && genderFilter !== 'all'
    ? svgAvatars.filter(avatar => avatar.gender === genderFilter)
    : svgAvatars;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-2xl animate-scale-in max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center">
            <span className="bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
              Change profile picture
            </span>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Upload a photo or select an avatar.
          </p>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="upload" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">Upload</TabsTrigger>
            <TabsTrigger value="svg" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              Avatars
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="py-4">
            <div className="flex flex-col items-center space-y-6">
              <p className="text-center text-gray-600">Choose how to add your picture</p>
              
              <div className="flex gap-4">
                <Button 
                  onClick={triggerCameraUpload}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-xl"
                >
                  <Camera className="h-6 w-6" />
                  Camera
                </Button>
                
                <Button 
                  onClick={triggerFileUpload}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-xl"
                >
                  <Monitor className="h-6 w-6" />
                  This PC
                </Button>
              </div>

              {uploadedImage && (
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="user"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
          </TabsContent>

          <TabsContent value="svg" className="py-4">
            <div className="mb-4">
              <p className="mb-3 text-center text-gray-700 font-medium">Click on an avatar to select it.</p>
              <div className="flex justify-center space-x-2 mb-6">
                <Button 
                  variant={genderFilter === 'all' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setGenderFilter('all')}
                  className={cn(
                    "transition-all hover:shadow-glow px-6 py-2 rounded-full",
                    genderFilter === 'all' 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  All
                </Button>
                <Button 
                  variant={genderFilter === 'male' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setGenderFilter('male')}
                  className={cn(
                    "transition-all hover:shadow-glow px-6 py-2 rounded-full",
                    genderFilter === 'male' 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  Male
                </Button>
                <Button 
                  variant={genderFilter === 'female' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setGenderFilter('female')}
                  className={cn(
                    "transition-all hover:shadow-glow px-6 py-2 rounded-full",
                    genderFilter === 'female' 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  Female
                </Button>
                <Button 
                  variant={genderFilter === 'alternative' ? 'default' : 'outline'} 
                  size="sm" 
                  onClick={() => setGenderFilter('alternative')}
                  className={cn(
                    "transition-all hover:shadow-glow px-6 py-2 rounded-full",
                    genderFilter === 'alternative' 
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white" 
                      : "hover:bg-gray-100"
                  )}
                >
                  Alternative
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 max-h-80 overflow-y-auto pr-2">
              {filteredSvgAvatars.map((avatar, index) => {
                const avatarDataUrl = `data:image/svg+xml,${encodeURIComponent(avatar.svg)}`;
                const isSelected = selectedAvatar === avatarDataUrl;
                
                return (
                  <div 
                    key={avatar.id}
                    className={`
                      cursor-pointer rounded-full p-1 transform transition-all duration-300 hover:scale-110
                      ${isSelected ? 'ring-4 ring-blue-500 scale-110 shadow-lg bg-blue-50' : 'hover:bg-gray-50 hover:shadow-md'}
                      relative flex items-center justify-center
                    `}
                    onClick={() => setSelectedAvatar(avatarDataUrl)}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden animate-fade-in bg-white border border-gray-100">
                      <div 
                        className="w-full h-full transition-transform duration-500 hover:scale-105"
                        dangerouslySetInnerHTML={{ __html: avatar.svg }}
                      />
                    </div>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 bg-white rounded-full shadow-lg">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <DialogClose asChild>
            <Button variant="outline" className="hover:bg-muted/80 active:scale-95 transition-all">Cancel</Button>
          </DialogClose>
          <Button 
            onClick={handleSave} 
            className={cn(
              "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all hover:shadow-glow active:scale-95",
              saveClicked && "animate-pulse"
            )}
            disabled={saveClicked}
          >
            {saveClicked ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}