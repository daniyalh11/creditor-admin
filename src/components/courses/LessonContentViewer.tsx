
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Video, Headphones, Eye, BookOpen } from 'lucide-react';

interface LessonContent {
  id: string;
  title: string;
  type: 'text' | 'video' | 'audio';
  duration: string;
  content: string;
  description: string;
}

interface LessonContentViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lesson: LessonContent | null;
}

export const LessonContentViewer: React.FC<LessonContentViewerProps> = ({
  open,
  onOpenChange,
  lesson
}) => {
  if (!lesson) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Headphones className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'audio':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const renderContent = () => {
    switch (lesson.type) {
      case 'video':
        return (
          <div className="space-y-4">
            <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=450&fit=crop" 
                alt="Video preview"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/50 text-white px-3 py-1 rounded text-sm">0:00 / 0:10</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Video Description & Transcript:
                <Button variant="outline" size="sm" className="ml-auto">
                  Read Description
                </Button>
              </h4>
              <p className="text-gray-600">
                This comprehensive video tutorial covers the essential aspects of digital marketing, from strategy development to execution.
              </p>
              <div className="mt-3">
                <p className="font-medium text-sm text-gray-700 mb-1">Key Topics Covered:</p>
              </div>
            </div>
          </div>
        );
      case 'audio':
        return (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Headphones className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold">Audio Lesson</h4>
                  <p className="text-sm text-gray-600">Duration: 30 minutes</p>
                </div>
                <Button className="ml-auto bg-blue-500 hover:bg-blue-600">
                  <Video className="h-4 w-4 mr-2" />
                  Play
                </Button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>0:00 / 0:00</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-1">
                    <div className="bg-blue-500 h-1 rounded-full w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                Audio Transcript:
                <Button variant="outline" size="sm" className="ml-auto">
                  Read Transcript
                </Button>
              </h4>
              <p className="text-gray-600">
                Welcome to this comprehensive audio lecture on the legal framework governing modern business operations.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">Text Content</h4>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Immersive Reader
              </Button>
            </div>
            <div className="prose prose-sm max-w-none">
              <p>Business trusts are legal entities that hold and manage assets for the benefit of beneficiaries. They operate under specific legal frameworks and provide various advantages for business operations.</p>
              
              <h5 className="font-medium mt-4 mb-2">Key Concepts:</h5>
              <ul className="space-y-1 text-gray-700">
                <li>- Legal Structure: Business trusts are formed under state law and provide a flexible structure for business operations</li>
                <li>- Fiduciary Duties: Trustees have legal obligations to manage assets in the best interests of beneficiaries</li>
                <li>- Tax Advantages: Business trusts can provide certain tax benefits depending on their structure and jurisdiction</li>
                <li>- Asset Protection: Properly structured trusts can offer protection from creditors and legal claims</li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" hideCloseButton={true}>
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1">
              <DialogTitle className="text-xl">{lesson.title}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={`text-xs ${getTypeBadgeColor(lesson.type)}`}>
                  {getTypeIcon(lesson.type)}
                  <span className="ml-1 capitalize">{lesson.type}</span>
                </Badge>
                <span className="text-sm text-gray-600">{lesson.duration}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="mt-6">
          {renderContent()}
        </div>
      </DialogContent>
    </Dialog>
  );
};
