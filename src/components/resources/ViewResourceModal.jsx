import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { 
  Award, FileText, Layout, BookOpen, File, BarChart3, 
  Calendar, ExternalLink, FileCheck, HelpCircle, ClipboardList, 
  Package, Star, MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ViewResourceModal = ({
  open,
  onOpenChange,
  resource
}) => {
  if (!resource) return null;

  const getResourceIcon = () => {
    const iconProps = { className: "h-6 w-6" };
    
    switch (resource.type) {
      case 'link':
        return <ExternalLink {...iconProps} className="h-6 w-6 text-blue-500" />;
      case 'badge':
        return <Award {...iconProps} className="h-6 w-6 text-yellow-500" />;
      case 'certificate':
        return <FileText {...iconProps} className="h-6 w-6 text-green-500" />;
      case 'content-template':
        return <Layout {...iconProps} className="h-6 w-6 text-purple-500" />;
      case 'course-template':
        return <BookOpen {...iconProps} className="h-6 w-6 text-blue-600" />;
      case 'grading-scale':
        return <BarChart3 {...iconProps} className="h-6 w-6 text-orange-500" />;
      case 'page':
        return <FileCheck {...iconProps} className="h-6 w-6 text-blue-600" />;
      case 'question-bank':
        return <HelpCircle {...iconProps} className="h-6 w-6 text-blue-600" />;
      case 'rubric':
        return <ClipboardList {...iconProps} className="h-6 w-6 text-purple-600" />;
      case 'scorm-package':
        return <Package {...iconProps} className="h-6 w-6 text-green-600" />;
      case 'skills':
        return <Star {...iconProps} className="h-6 w-6 text-yellow-600" />;
      case 'survey-question-bank':
        return <MessageSquare {...iconProps} className="h-6 w-6 text-green-600" />;
      default:
        return <File {...iconProps} className="h-6 w-6 text-gray-500" />;
    }
  };

  const getTypeDisplayName = (type) => {
    return type.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const getCertificatePreview = () => {
    if (resource.type !== 'certificate') return null;
    
    // Try multiple possible sources for the background image
    const backgroundImage = resource.backgroundData || resource.backgroundImagePreview || resource.imagePreview;
    
    console.log('Certificate background image sources:', {
      backgroundData: resource.backgroundData,
      backgroundImagePreview: resource.backgroundImagePreview,
      imagePreview: resource.imagePreview,
      finalBackgroundImage: backgroundImage
    });
    
    if (!backgroundImage) {
      console.log('No background image found for certificate');
      return (
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-md h-80 rounded-lg border-2 bg-blue-50 p-6 flex flex-col justify-center items-center text-center">
            <div className="bg-white/90 p-6 rounded-lg shadow-lg w-full h-full flex flex-col justify-center relative">
              <div className="text-center space-y-4">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">
                  {resource.certificateType || 'Certificate'}
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
              <div className="absolute bottom-4 right-4 text-sm text-gray-600">
                {'{{date}}'}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-center mb-6">
        <div 
          className="w-full max-w-md h-80 rounded-lg border-2 relative p-6 flex flex-col justify-center items-center text-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="bg-white/80 p-6 rounded-lg shadow-lg w-full h-full flex flex-col justify-center relative">
            <div className="text-center space-y-4">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">
                {resource.certificateType || 'Certificate'}
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
            <div className="absolute bottom-4 right-4 text-sm text-gray-600">
              {'{{date}}'}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {getResourceIcon()}
            <div className="flex flex-col items-start">
              <span>{resource.title}</span>
              <Badge variant="secondary" className="mt-1">
                {getTypeDisplayName(resource.type)}
              </Badge>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Certificate Preview */}
          {getCertificatePreview()}

          {/* Resource Image/Preview for other types */}
          {resource.type !== 'certificate' && resource.imagePreview && (
            <div className="flex justify-center">
              <img 
                src={resource.imagePreview} 
                alt={resource.title}
                className="max-w-48 max-h-48 object-cover rounded-lg border-2 border-gray-200"
              />
            </div>
          )}

          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Date Added</h4>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>{resource.dateAdded}</span>
              </div>
            </div>
            
            {resource.fileSize && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">File Size</h4>
                <p className="text-gray-600">{resource.fileSize}</p>
              </div>
            )}
            
            {resource.category && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Category</h4>
                <Badge variant="outline">{resource.category}</Badge>
              </div>
            )}
            
            {resource.fileName && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">File Name</h4>
                <p className="text-gray-600 text-sm break-all">{resource.fileName}</p>
              </div>
            )}
            
            {resource.certificateType && (
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Certificate Type</h4>
                <Badge variant="outline">{resource.certificateType}</Badge>
              </div>
            )}
          </div>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {resource.description && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg whitespace-pre-wrap">{resource.description}</p>
            </div>
          )}

          {/* Badge Criteria */}
          {resource.criteria && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Award Criteria</h4>
              <p className="text-gray-600 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-200">
                {resource.criteria}
              </p>
            </div>
          )}

          {/* Questions for Question Banks */}
          {resource.questions && resource.questions.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Questions ({resource.questions.length})</h4>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                {resource.questions.map((question, index) => (
                  <div key={question.id} className="bg-white p-3 rounded border">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-sm text-gray-700">Q{index + 1}</span>
                      <Badge variant="outline" className="text-xs">{question.type}</Badge>
                    </div>
                    <p className="text-gray-900 mb-2">{question.text}</p>
                    {question.options && question.options.length > 0 && (
                      <div className="space-y-1">
                        {question.options.filter(opt => opt.trim()).map((option, optIndex) => (
                          <p key={optIndex} className="text-sm text-gray-600 pl-2">
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Grading Scale Ranges */}
          {resource.gradeRanges && resource.gradeRanges.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Grade Ranges</h4>
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                {resource.gradeRanges.map((range, index) => (
                  <div key={index} className="flex justify-between items-center bg-white p-2 rounded border">
                    <span className="font-medium text-gray-900">{range.grade}</span>
                    <span className="text-gray-600">{range.minScore}% - {range.maxScore}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* URL for Links */}
          {resource.url && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">URL</h4>
              <div className="flex items-center gap-2 bg-blue-50 p-3 rounded-lg">
                <ExternalLink className="h-4 w-4 text-blue-600" />
                <a 
                  href={resource.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {resource.url}
                </a>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            {resource.url && (
              <Button variant="outline" asChild>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Open Link
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};