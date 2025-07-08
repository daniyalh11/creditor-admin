import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight, Upload, X, FileText, Image } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { useNavigate } from 'react-router-dom';

interface AttachedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
}

const SupportTicket = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    subject: '',
    description: '',
    attachments: []
  });

  const steps = [
    { number: 1, title: 'Details' },
    { number: 2, title: 'Attachments' },
    { number: 3, title: 'Review' }
  ];

  const categories = [
    'Technical Support',
    'Account Issues',
    'Billing & Payments',
    'Course Content',
    'Feature Request',
    'Bug Report',
    'General Inquiry'
  ];

  const priorities = [
    { value: 'low', label: 'Low - General question or minor issue' },
    { value: 'medium', label: 'Medium - Moderate impact on work' },
    { value: 'high', label: 'High - Significant impact, urgent assistance needed' },
    { value: 'critical', label: 'Critical - System down, cannot work' }
  ];

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles: AttachedFile[] = Array.from(files).map(file => ({
        id: Date.now() + Math.random().toString(),
        file,
        name: file.name,
        size: file.size,
        type: file.type
      }));
      
      setAttachedFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) {
      return <Image className="h-4 w-4" />;
    }
    return <FileText className="h-4 w-4" />;
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/help');
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return formData.category && formData.priority && formData.subject;
    }
    return true;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="category">Ticket Category *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority Level *</Label>
              <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  {priorities.map((priority) => (
                    <SelectItem key={priority.value} value={priority.value}>
                      {priority.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                placeholder="Brief description of your issue"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Please provide detailed information about your issue"
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Attachments (Optional)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-gray-50">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <Upload className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <p className="text-lg text-gray-600 mb-2">Drop files here or click to upload</p>
                    <p className="text-sm text-gray-500">
                      Support for images, documents, and logs (max 10MB each)
                    </p>
                  </div>
                  <Button variant="outline" className="mt-4" onClick={handleFileSelect}>
                    Choose Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*,.pdf,.doc,.docx,.txt,.log"
                  />
                </div>
              </div>

              {/* Display attached files */}
              {attachedFiles.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-md font-medium mb-3">Attached Files ({attachedFiles.length})</h4>
                  <div className="space-y-2">
                    {attachedFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.type)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg">Review Your Ticket</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Category</Label>
                  <p className="text-gray-900">{formData.category}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-600">Priority</Label>
                  <p className="text-gray-900">{priorities.find(p => p.value === formData.priority)?.label}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Subject</Label>
                <p className="text-gray-900">{formData.subject}</p>
              </div>

              {formData.description && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Description</Label>
                  <p className="text-gray-900">{formData.description}</p>
                </div>
              )}

              {/* Display attached files in review */}
              {attachedFiles.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-600">Attachments ({attachedFiles.length})</Label>
                  <div className="mt-2 space-y-2">
                    {attachedFiles.map((file) => (
                      <div key={file.id} className="flex items-center space-x-2 text-sm">
                        {getFileIcon(file.type)}
                        <span className="text-gray-900">{file.name}</span>
                        <span className="text-gray-500">({formatFileSize(file.size)})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center py-6">
              <Button size="lg" className="px-8">
                Submit Ticket
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Create Support Ticket</h1>
        <p className="text-lg text-gray-600">
          Fill out the form below to submit a support ticket. Our team will respond as soon as possible.
        </p>
      </div>

      {/* Stepper */}
      <div className="flex items-center justify-center space-x-8 py-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex items-center space-x-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-semibold ${
                currentStep >= step.number 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {step.number}
              </div>
              <span className={`text-lg font-medium ${
                currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-4 max-w-[100px]">
                <div className={`h-full rounded ${
                  currentStep > step.number ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Content */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-8">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center pt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          className="flex items-center space-x-2 px-6 py-3"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        {currentStep < 3 && (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center space-x-2 px-8 py-3 bg-blue-600 hover:bg-blue-700"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SupportTicket;
