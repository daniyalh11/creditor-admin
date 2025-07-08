
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { FileText, Upload, X, Save } from 'lucide-react';
import { toast } from 'sonner';

interface AddCertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCertificateAdded: (certificate: any) => void;
}

const predefinedBackgrounds = [
  {
    id: 'classic',
    name: 'Classic',
    imageUrl: '/lovable-uploads/ff13901e-cbfa-46cb-97a7-ceb8313bb413.png',
    preview: 'bg-blue-50 border-4 border-blue-200'
  },
  {
    id: 'gold',
    name: 'Gold',
    imageUrl: '/lovable-uploads/6d69d39c-f426-47a8-94de-9f1d018cd26b.png',
    preview: 'bg-yellow-50 border-4 border-yellow-300'
  }
];

export const AddCertificateModal: React.FC<AddCertificateModalProps> = ({
  open,
  onOpenChange,
  onCertificateAdded
}) => {
  const [certificateType, setCertificateType] = useState('');
  const [selectedBackground, setSelectedBackground] = useState('classic');
  const [customBackground, setCustomBackground] = useState<File | null>(null);
  const [customBackgroundPreview, setCustomBackgroundPreview] = useState<string | null>(null);
  const [useCustomBackground, setUseCustomBackground] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const handleCustomBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      setCustomBackground(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomBackgroundPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setUseCustomBackground(true);
    }
  };

  const handleSave = () => {
    if (!certificateType) {
      toast.error("Please select a certificate type");
      return;
    }

    const selectedBg = predefinedBackgrounds.find(bg => bg.id === selectedBackground);
    
    const newCertificate = {
      id: Date.now(),
      type: 'certificate',
      title: `${certificateType} Template`,
      certificateType: certificateType,
      backgroundStyle: useCustomBackground ? 'custom' : selectedBackground,
      backgroundImage: customBackground ? customBackground.name : undefined,
      backgroundImagePreview: customBackgroundPreview,
      backgroundData: useCustomBackground ? customBackgroundPreview : selectedBg?.imageUrl,
      placeholders: [
        { key: '{{name}}', label: "Learner's Name" },
        { key: '{{course_name}}', label: 'Course Title' },
        { key: '{{date}}', label: 'Completion Date' },
        { key: '{{certificate_type}}', label: 'Certificate Type' }
      ],
      isVisible: isVisible,
      dateAdded: new Date().toISOString().split('T')[0],
      fileSize: '0 KB'
    };

    onCertificateAdded(newCertificate);
    toast.success(`Certificate template created successfully!`);
    handleCancel();
  };

  const handleCancel = () => {
    setCertificateType('');
    setSelectedBackground('classic');
    setCustomBackground(null);
    setCustomBackgroundPreview(null);
    setUseCustomBackground(false);
    setIsVisible(true);
    onOpenChange(false);
  };

  const getPreviewBackground = () => {
    if (useCustomBackground && customBackgroundPreview) {
      return { backgroundImage: `url(${customBackgroundPreview})`, backgroundSize: 'cover', backgroundPosition: 'center' };
    }
    const selectedBg = predefinedBackgrounds.find(bg => bg.id === selectedBackground);
    return { backgroundImage: `url(${selectedBg?.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' };
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-600" />
            Add New Certificate Template
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Settings */}
          <div className="space-y-6">
            {/* Certificate Type */}
            <div className="space-y-2">
              <Label htmlFor="cert-type">Certificate Type *</Label>
              <Select value={certificateType} onValueChange={setCertificateType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select certificate type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Certificate of Completion">Certificate of Completion</SelectItem>
                  <SelectItem value="Certificate of Achievement">Certificate of Achievement</SelectItem>
                  <SelectItem value="Certificate of Participation">Certificate of Participation</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Background Design */}
            <div className="space-y-4">
              <Label>Background Design</Label>
              
              {/* Custom Background Upload */}
              <div className="space-y-3">
                <Label className="text-sm">Upload Custom Background (A4 recommended)</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleCustomBackgroundUpload}
                  className="text-sm"
                />
                {customBackgroundPreview && (
                  <div className="relative inline-block">
                    <div 
                      className="w-40 h-28 object-cover rounded border"
                      style={{
                        backgroundImage: `url(${customBackgroundPreview})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => {
                        setCustomBackground(null);
                        setCustomBackgroundPreview(null);
                        setUseCustomBackground(false);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="text-center text-gray-500 text-sm">OR</div>

              {/* Predefined Backgrounds */}
              <div className="space-y-3">
                <Label className="text-sm">Select Preset Background</Label>
                <div className="grid grid-cols-1 gap-3">
                  {predefinedBackgrounds.map((bg) => (
                    <Card 
                      key={bg.id}
                      className={`cursor-pointer transition-all ${
                        selectedBackground === bg.id && !useCustomBackground 
                          ? 'ring-2 ring-blue-500' 
                          : 'hover:shadow-md'
                      }`}
                      onClick={() => {
                        setSelectedBackground(bg.id);
                        setUseCustomBackground(false);
                      }}
                    >
                      <CardContent className="p-3">
                        <div 
                          className="w-full h-20 rounded mb-2 flex items-center justify-center text-xs text-gray-800 font-medium relative"
                          style={{
                            backgroundImage: `url(${bg.imageUrl})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        >
                          <div className="bg-white/70 px-2 py-1 rounded text-center">
                            <div>CERTIFICATE</div>
                            <div className="text-[10px] mt-1">Sample Layout</div>
                          </div>
                          <div className="absolute bottom-1 right-2 text-[8px] bg-white/70 px-1 rounded">
                            Date
                          </div>
                        </div>
                        <p className="text-sm font-medium text-center">{bg.name}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Placeholders Info */}
            <div className="space-y-3">
              <Label>Available Placeholders</Label>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div><code className="bg-white px-2 py-1 rounded">{'{{name}}'}</code> - Learner's Name</div>
                  <div><code className="bg-white px-2 py-1 rounded">{'{{course_name}}'}</code> - Course Title</div>
                  <div><code className="bg-white px-2 py-1 rounded">{'{{date}}'}</code> - Completion Date</div>
                  <div><code className="bg-white px-2 py-1 rounded">{'{{certificate_type}}'}</code> - Certificate Type</div>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="cert-visibility">Visibility</Label>
                <p className="text-sm text-gray-500">Available to instructors</p>
              </div>
              <Switch
                id="cert-visibility"
                checked={isVisible}
                onCheckedChange={setIsVisible}
              />
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-4">
            <Label>Live Preview</Label>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div 
                className="w-full h-80 rounded-lg border-2 relative p-6 flex flex-col justify-center items-center text-center"
                style={getPreviewBackground()}
              >
                <div className="bg-white/80 p-6 rounded-lg shadow-lg w-full h-full flex flex-col justify-center relative">
                  <div className="text-center space-y-4">
                    <h1 className="text-2xl font-bold mb-4 text-gray-800">
                      {certificateType || 'Certificate Type'}
                    </h1>
                    <div className="space-y-3 text-gray-700">
                      <p className="text-lg">This certifies that</p>
                      <p className="text-xl font-semibold border-b-2 border-gray-300 pb-1">
                        {'{{name}}'}
                      </p>
                      <p>has successfully completed</p>
                      <p className="text-lg font-medium">
                        {'{{course_name}}'}
                      </p>
                    </div>
                  </div>
                  {/* Date placeholder positioned at bottom-right */}
                  <div className="absolute bottom-4 right-4 text-sm text-gray-600">
                    {'{{date}}'}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Placeholders will be automatically replaced when certificates are issued to learners.
            </p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={!certificateType}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
