
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MinusCircle, FileText, Upload, Download, X, Link, Trash2, Eye, Edit } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { AddResourceModal } from '@/components/resources/AddResourceModal';

type Resource = {
  id: number;
  name: string;
  type: string;
  dateAdded: string;
  size: string;
  // Additional fields for different resource types
  description?: string;
  category?: string;
  criteria?: string;
  questions?: any[];
  gradeRanges?: any[];
  content?: string;
  tags?: string[];
  imagePreview?: string;
};

const GroupResourcesPage = () => {
  const [selectedResources, setSelectedResources] = useState<number[]>([]);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showRemoveConfirmModal, setShowRemoveConfirmModal] = useState(false);
  const [resourceToRemove, setResourceToRemove] = useState<Resource | null>(null);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  
  // Edit form states
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState('');
  
  const [resources, setResources] = useState<Resource[]>([
    { 
      id: 1, 
      name: 'React Development Guide', 
      type: 'file', 
      dateAdded: '2025-03-15',
      size: '2.4 MB',
      description: 'Comprehensive guide for React development',
      category: 'Notes'
    },
    { 
      id: 2, 
      name: 'JavaScript Best Practices', 
      type: 'file', 
      dateAdded: '2025-03-10',
      size: '1.8 MB',
      description: 'Best practices for writing clean JavaScript code',
      category: 'Reference Documents'
    },
    { 
      id: 3, 
      name: 'API Documentation', 
      type: 'file', 
      dateAdded: '2025-03-08',
      size: '3.2 MB',
      description: 'Complete API documentation and examples',
      category: 'Reference Documents'
    }
  ]);

  const handleSelectResource = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedResources(prev => [...prev, id]);
    } else {
      setSelectedResources(prev => prev.filter(resourceId => resourceId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedResources(resources.map(r => r.id));
    } else {
      setSelectedResources([]);
    }
  };

  const handleRemove = () => {
    if (selectedResources.length === 0) {
      toast.error("Please select resources to remove");
      return;
    }
    toast.success(`${selectedResources.length} resources removed`);
    setSelectedResources([]);
  };

  const handleExport = () => {
    if (selectedResources.length === 0) {
      toast.error("Please select resources to export");
      return;
    }
    toast.success(`Exporting ${selectedResources.length} resources`);
  };

  const handleResourceAdded = (newResource: any) => {
    setResources(prev => [...prev, newResource]);
  };

  const handleRemoveResource = (resource: Resource) => {
    setResourceToRemove(resource);
    setShowRemoveConfirmModal(true);
  };

  const confirmRemoveResource = () => {
    if (resourceToRemove) {
      setResources(prev => prev.filter(r => r.id !== resourceToRemove.id));
      toast.success(`"${resourceToRemove.name}" removed successfully`);
      setResourceToRemove(null);
      setShowRemoveConfirmModal(false);
    }
  };

  const handleViewResource = (resource: Resource) => {
    setSelectedResource(resource);
    setShowViewModal(true);
  };

  const handleEditResource = (resource: Resource) => {
    setSelectedResource(resource);
    setEditTitle(resource.name);
    setEditDescription(resource.description || '');
    setEditCategory(resource.category || '');
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) {
      toast.error("Please enter a title");
      return;
    }

    if (selectedResource) {
      setResources(prev => prev.map(r => 
        r.id === selectedResource.id 
          ? { ...r, name: editTitle.trim(), description: editDescription.trim(), category: editCategory }
          : r
      ));
      toast.success("Resource updated successfully");
      setShowEditModal(false);
      setSelectedResource(null);
    }
  };

  const getResourceTypeIcon = (type: string) => {
    const iconProps = { className: "h-5 w-5" };
    
    switch (type.toLowerCase()) {
      case 'file':
        return <FileText {...iconProps} className="h-5 w-5 text-gray-500" />;
      case 'badge':
        return <FileText {...iconProps} className="h-5 w-5 text-blue-500" />;
      case 'certificate':
        return <FileText {...iconProps} className="h-5 w-5 text-green-500" />;
      case 'page':
        return <FileText {...iconProps} className="h-5 w-5 text-purple-500" />;
      case 'skills':
        return <FileText {...iconProps} className="h-5 w-5 text-yellow-500" />;
      case 'rubric':
        return <FileText {...iconProps} className="h-5 w-5 text-orange-500" />;
      case 'question-bank':
        return <FileText {...iconProps} className="h-5 w-5 text-indigo-500" />;
      case 'survey-question-bank':
        return <FileText {...iconProps} className="h-5 w-5 text-teal-500" />;
      case 'grading-scale':
        return <FileText {...iconProps} className="h-5 w-5 text-pink-500" />;
      case 'scorm-package':
        return <FileText {...iconProps} className="h-5 w-5 text-emerald-500" />;
      case 'course-template':
        return <FileText {...iconProps} className="h-5 w-5 text-cyan-500" />;
      case 'content-template':
        return <FileText {...iconProps} className="h-5 w-5 text-violet-500" />;
      default:
        return <FileText {...iconProps} className="h-5 w-5 text-gray-500" />;
    }
  };

  const renderViewContent = (resource: Resource) => {
    switch (resource.type) {
      case 'badge':
        return (
          <div className="space-y-4">
            {resource.imagePreview && (
              <div className="flex justify-center">
                <img src={resource.imagePreview} alt="Badge" className="w-24 h-24 rounded-lg" />
              </div>
            )}
            <div>
              <h4 className="font-medium mb-2">Description:</h4>
              <p className="text-gray-600">{resource.description || 'No description provided'}</p>
            </div>
            {resource.criteria && (
              <div>
                <h4 className="font-medium mb-2">Criteria:</h4>
                <p className="text-gray-600">{resource.criteria}</p>
              </div>
            )}
          </div>
        );
      case 'page':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Content:</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="whitespace-pre-wrap">{resource.content || 'No content provided'}</p>
              </div>
            </div>
            {resource.tags && resource.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 'question-bank':
      case 'survey-question-bank':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Questions:</h4>
              <div className="space-y-3">
                {resource.questions && resource.questions.length > 0 ? (
                  resource.questions.map((question, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <p className="font-medium">Q{index + 1}: {question.text}</p>
                      <p className="text-sm text-gray-600 mt-1">Type: {question.type}</p>
                      {question.options && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Options:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {question.options.filter(opt => opt.trim()).map((option, optIndex) => (
                              <li key={optIndex}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No questions added yet</p>
                )}
              </div>
            </div>
          </div>
        );
      case 'rubric':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Criteria:</h4>
              <div className="space-y-3">
                {resource.questions && resource.questions.length > 0 ? (
                  resource.questions.map((criterion, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">{criterion.name}</h5>
                        <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                          Scale: {criterion.scoringScale}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{criterion.description}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No criteria defined</p>
                )}
              </div>
            </div>
          </div>
        );
      case 'grading-scale':
        return (
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Grade Ranges:</h4>
              <div className="space-y-2">
                {resource.gradeRanges && resource.gradeRanges.length > 0 ? (
                  resource.gradeRanges.map((range, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="font-medium">{range.grade}</span>
                      <span className="text-gray-600">{range.minScore}% - {range.maxScore}%</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No grade ranges defined</p>
                )}
              </div>
            </div>
            {resource.description && (
              <div>
                <h4 className="font-medium mb-2">Description:</h4>
                <p className="text-gray-600">{resource.description}</p>
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-4">
            {resource.description && (
              <div>
                <h4 className="font-medium mb-2">Description:</h4>
                <p className="text-gray-600">{resource.description}</p>
              </div>
            )}
            {resource.category && (
              <div>
                <h4 className="font-medium mb-2">Category:</h4>
                <p className="text-gray-600">{resource.category}</p>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 mb-6">
        <h1 className="text-2xl font-semibold">Resources</h1>
        <p className="text-muted-foreground">
          Use this area to share resources with your other members of this group.
          <br />
          You can reuse existing resources from our library or contribute your own.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              checked={selectedResources.length > 0 && selectedResources.length === resources.length}
              onCheckedChange={(checked) => handleSelectAll(!!checked)}
            />
            <label className="text-sm font-medium text-gray-700">
              Select All ({resources.length})
            </label>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRemove} disabled={selectedResources.length === 0}>
            <MinusCircle className="mr-2 h-4 w-4" /> Remove Selected
          </Button>
          <Button variant="outline" onClick={handleExport} disabled={selectedResources.length === 0}>
            <Download className="mr-2 h-4 w-4" /> Export Selected ({selectedResources.length})
          </Button>
          <Button onClick={() => setShowAddResourceModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Upload className="mr-2 h-4 w-4" /> Add Resource
          </Button>
        </div>
      </div>
      
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="w-10 p-4 text-left">
                <span className="sr-only">Select</span>
              </th>
              <th className="p-4 text-left font-semibold text-gray-900">Resource</th>
              <th className="p-4 text-left font-semibold text-gray-900">Type</th>
              <th className="p-4 text-left font-semibold text-gray-900">Date Added</th>
              <th className="p-4 text-left font-semibold text-gray-900">Size</th>
              <th className="p-4 text-left font-semibold text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {resources.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-12 text-center text-gray-500">
                  <Upload className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg font-medium mb-2">No resources available</p>
                  <p className="text-sm">Click "Add Resource" to upload your first resource</p>
                </td>
              </tr>
            ) : (
              resources.map(resource => (
                <tr key={resource.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <Checkbox 
                      checked={selectedResources.includes(resource.id)}
                      onCheckedChange={(checked) => handleSelectResource(resource.id, !!checked)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {getResourceTypeIcon(resource.type)}
                      <span className="font-medium text-gray-900">{resource.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {resource.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{resource.dateAdded}</td>
                  <td className="p-4 text-gray-600">{resource.size}</td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => handleViewResource(resource)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                        onClick={() => handleEditResource(resource)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleRemoveResource(resource)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Resource Modal */}
      <AddResourceModal
        open={showAddResourceModal}
        onOpenChange={setShowAddResourceModal}
        onResourceAdded={handleResourceAdded}
      />

      {/* View Resource Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedResource && getResourceTypeIcon(selectedResource.type)}
              {selectedResource?.name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedResource && renderViewContent(selectedResource)}
        </DialogContent>
      </Dialog>

      {/* Edit Resource Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Resource
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            {selectedResource?.category && (
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />
              </div>
            )}
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} disabled={!editTitle.trim()}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Remove Confirmation Modal */}
      <Dialog open={showRemoveConfirmModal} onOpenChange={setShowRemoveConfirmModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Confirm Removal</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p>Are you sure you want to remove "{resourceToRemove?.name}"? This action cannot be undone.</p>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowRemoveConfirmModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmRemoveResource}>
                Remove
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupResourcesPage;
