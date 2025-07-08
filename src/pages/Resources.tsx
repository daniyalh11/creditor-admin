import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, Download, FileText, Link, Trash2, Calendar as CalendarIcon, 
  X, FolderOpen, User, Eye, Search, Award, Layout, BookOpen, File, BarChart3
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { PageHeader } from '@/components/shared/PageHeader';
import { AddResourceModal } from '@/components/resources/AddResourceModal';
import { ViewResourceModal } from '@/components/resources/ViewResourceModal';

type Resource = {
  id: number;
  title: string;
  type: 'file' | 'link' | 'badge' | 'certificate' | 'content-template' | 'course-template' | 'grading-scale';
  url?: string;
  fileName?: string;
  fileSize?: string;
  description?: string;
  dateAdded: string;
  customDate?: string;
  category?: string;
  criteria?: string;
  imagePreview?: string;
  gradeRanges?: Array<{ grade: string; minScore: number; maxScore: number }>;
};

type Report = {
  id: number;
  title: string;
  type: string;
  generatedDate: string;
  createdBy: string;
  fileSize: string;
  tags?: string[];
};

const Resources = () => {
  const [selectedResources, setSelectedResources] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<Resource | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [resourceToView, setResourceToView] = useState<Resource | null>(null);
  
  // Add Resource form states
  const [newResourceTitle, setNewResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState<'file' | 'link'>('file');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customDate, setCustomDate] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Reports states
  const [showGenerateReportModal, setShowGenerateReportModal] = useState(false);
  const [showDeleteReportModal, setShowDeleteReportModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<Report | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  // Generate Report form states
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [reportTarget, setReportTarget] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: 'User Manual 2024',
      type: 'file',
      fileName: 'user-manual-2024.pdf',
      fileSize: '2.4 MB',
      description: 'Complete user guide for platform features',
      dateAdded: '2024-03-15',
    },
    {
      id: 2,
      title: 'API Documentation',
      type: 'link',
      url: 'https://docs.example.com/api',
      description: 'External API documentation link',
      dateAdded: '2024-03-10',
    },
    {
      id: 3,
      title: 'Training Videos',
      type: 'file',
      fileName: 'training-videos.zip',
      fileSize: '156 MB',
      description: 'Collection of training video materials',
      dateAdded: '2024-03-08',
    }
  ]);

  const [reports, setReports] = useState<Report[]>([
    {
      id: 1,
      title: 'User Activity Report',
      type: 'Analytics',
      generatedDate: '2024-03-20',
      createdBy: 'Admin User',
      fileSize: '1.2 MB',
      tags: ['Users', 'Activity']
    },
    {
      id: 2,
      title: 'Course Completion Report',
      type: 'Progress',
      generatedDate: '2024-03-18',
      createdBy: 'Manager',
      fileSize: '856 KB',
      tags: ['Courses', 'Progress']
    },
    {
      id: 3,
      title: 'Resource Usage Analytics',
      type: 'Usage',
      generatedDate: '2024-03-15',
      createdBy: 'System',
      fileSize: '2.1 MB',
      tags: ['Resources', 'Analytics']
    },
    {
      id: 4,
      title: 'Assessment Summary',
      type: 'Assessment',
      generatedDate: '2024-03-12',
      createdBy: 'Admin User',
      fileSize: '1.8 MB',
      tags: ['Assessments', 'Summary']
    }
  ]);

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !typeFilter || report.type === typeFilter;
    const matchesDate = !dateFilter || report.generatedDate >= dateFilter;
    
    return matchesSearch && matchesType && matchesDate;
  });

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

  const handleExportSelected = () => {
    if (selectedResources.length === 0) {
      toast.error("Please select resources to export");
      return;
    }
    
    const selectedResourceNames = resources
      .filter(r => selectedResources.includes(r.id))
      .map(r => r.title)
      .join(', ');
    
    toast.success(`Exporting ${selectedResources.length} resources: ${selectedResourceNames}`);
  };

  // New function to handle resource added from the modal
  const handleResourceAdded = (newResource: any) => {
    const resourceWithId = {
      ...newResource,
      id: Math.max(...resources.map(r => r.id)) + 1
    };
    setResources(prev => [...prev, resourceWithId]);
  };

  const handleViewResource = (resource: Resource) => {
    setResourceToView(resource);
    setShowViewModal(true);
  };

  const handleAddResource = () => {
    if (!newResourceTitle.trim()) {
      toast.error("Please enter resource title");
      return;
    }
    
    if (resourceType === 'link' && !resourceUrl.trim()) {
      toast.error("Please enter resource URL");
      return;
    }
    
    if (resourceType === 'file' && !selectedFile) {
      toast.error("Please select a file");
      return;
    }

    const newResource: Resource = {
      id: Math.max(...resources.map(r => r.id)) + 1,
      title: newResourceTitle.trim(),
      type: resourceType,
      url: resourceType === 'link' ? resourceUrl : undefined,
      fileName: resourceType === 'file' ? selectedFile?.name : undefined,
      fileSize: resourceType === 'file' ? `${(selectedFile!.size / 1024 / 1024).toFixed(1)} MB` : undefined,
      description: resourceDescription.trim() || undefined,
      dateAdded: new Date().toISOString().split('T')[0],
      customDate: customDate ? format(customDate, 'yyyy-MM-dd') : undefined
    };

    setResources(prev => [...prev, newResource]);
    toast.success(`Resource "${newResource.title}" added successfully!`);
    handleCancelAdd();
  };

  const handleCancelAdd = () => {
    setNewResourceTitle('');
    setResourceType('file');
    setResourceUrl('');
    setResourceDescription('');
    setSelectedFile(null);
    setCustomDate(undefined);
    setShowAddModal(false);
  };

  const handleDeleteResource = (resource: Resource) => {
    setResourceToDelete(resource);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (resourceToDelete) {
      setResources(prev => prev.filter(r => r.id !== resourceToDelete.id));
      setSelectedResources(prev => prev.filter(id => id !== resourceToDelete.id));
      toast.success(`"${resourceToDelete.title}" deleted successfully`);
      setResourceToDelete(null);
      setShowDeleteModal(false);
    }
  };

  // Report management functions
  const handleGenerateReport = () => {
    if (!reportType || !reportTarget) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newReport: Report = {
      id: Math.max(...reports.map(r => r.id)) + 1,
      title: `${reportType} Report`,
      type: reportType,
      generatedDate: new Date().toISOString().split('T')[0],
      createdBy: 'Current User',
      fileSize: '1.5 MB',
      tags: [reportTarget, reportType]
    };

    setReports(prev => [...prev, newReport]);
    toast.success(`"${newReport.title}" generated successfully!`);
    handleCancelGenerateReport();
  };

  const handleCancelGenerateReport = () => {
    setReportType('');
    setStartDate(undefined);
    setEndDate(undefined);
    setReportTarget('');
    setShowGenerateReportModal(false);
  };

  const handleDeleteReport = (report: Report) => {
    setReportToDelete(report);
    setShowDeleteReportModal(true);
  };

  const confirmDeleteReport = () => {
    if (reportToDelete) {
      setReports(prev => prev.filter(r => r.id !== reportToDelete.id));
      toast.success(`"${reportToDelete.title}" deleted successfully`);
      setReportToDelete(null);
      setShowDeleteReportModal(false);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDateFilter('');
    setTypeFilter('');
  };

  const getResourceIcon = (resource: Resource) => {
    const iconProps = { className: "h-5 w-5" };
    
    switch (resource.type) {
      case 'link':
        return <Link {...iconProps} className="h-5 w-5 text-blue-500" />;
      case 'badge':
        return <Award {...iconProps} className="h-5 w-5 text-yellow-500" />;
      case 'certificate':
        return <FileText {...iconProps} className="h-5 w-5 text-green-500" />;
      case 'content-template':
        return <Layout {...iconProps} className="h-5 w-5 text-purple-500" />;
      case 'course-template':
        return <BookOpen {...iconProps} className="h-5 w-5 text-blue-600" />;
      case 'grading-scale':
        return <BarChart3 {...iconProps} className="h-5 w-5 text-orange-500" />;
      default:
        return <FileText {...iconProps} className="h-5 w-5 text-gray-500" />;
    }
  };

  const getReportTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'analytics':
        return 'bg-blue-100 text-blue-800';
      case 'progress':
        return 'bg-green-100 text-green-800';
      case 'usage':
        return 'bg-purple-100 text-purple-800';
      case 'assessment':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const isAllSelected = resources.length > 0 && selectedResources.length === resources.length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Resources"
        description="Manage your files and links"
        icon={<FolderOpen className="h-6 w-6" />}
        action={{
          label: "Add Resource",
          onClick: () => setShowAddModal(true)
        }}
      />

      {/* Resources Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              My Resources ({resources.length})
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  checked={isAllSelected}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                />
                <label className="text-sm font-medium">
                  Select All
                </label>
              </div>
              <Button 
                variant="outline" 
                onClick={handleExportSelected}
                disabled={selectedResources.length === 0}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export Selected ({selectedResources.length})
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {resources.length === 0 ? (
              <div className="text-center py-12">
                <FolderOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">No resources available</p>
                <p className="text-sm text-gray-500">Click "Add Resource" to upload your first resource</p>
              </div>
            ) : (
              resources.map(resource => (
                <div key={resource.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <Checkbox 
                    checked={selectedResources.includes(resource.id)}
                    onCheckedChange={(checked) => handleSelectResource(resource.id, !!checked)}
                  />
                  
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {resource.imagePreview ? (
                      <img 
                        src={resource.imagePreview} 
                        alt={resource.title}
                        className="w-8 h-8 object-cover rounded"
                      />
                    ) : (
                      getResourceIcon(resource)
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">{resource.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="capitalize">{resource.type.replace('-', ' ')}</span>
                        {resource.category && <span>• {resource.category}</span>}
                        {resource.fileName && <span>• {resource.fileName}</span>}
                        {resource.url && <span>• {resource.url}</span>}
                        {resource.fileSize && <span>• {resource.fileSize}</span>}
                        <span>• {resource.dateAdded}</span>
                      </div>
                      {resource.description && (
                        <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                      )}
                      {resource.gradeRanges && (
                        <p className="text-sm text-gray-600 mt-1">
                          Grade ranges: {resource.gradeRanges.length} levels defined
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewResource(resource)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleDeleteResource(resource)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Resource Modal */}
      <AddResourceModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onResourceAdded={handleResourceAdded}
      />

      {/* View Resource Modal */}
      <ViewResourceModal
        open={showViewModal}
        onOpenChange={setShowViewModal}
        resource={resourceToView}
      />

      {/* Generate Report Modal */}
      <Dialog open={showGenerateReportModal} onOpenChange={setShowGenerateReportModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Generate New Report
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type *</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Analytics">User Analytics</SelectItem>
                  <SelectItem value="Progress">Course Progress</SelectItem>
                  <SelectItem value="Usage">Resource Usage</SelectItem>
                  <SelectItem value="Assessment">Assessment Summary</SelectItem>
                  <SelectItem value="Attendance">Attendance Report</SelectItem>
                  <SelectItem value="Performance">Performance Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover open={showStartDatePicker} onOpenChange={setShowStartDatePicker}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : <span>Start date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => {
                        setStartDate(date);
                        setShowStartDatePicker(false);
                      }}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover open={showEndDatePicker} onOpenChange={setShowEndDatePicker}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>End date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => {
                        setEndDate(date);
                        setShowEndDatePicker(false);
                      }}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="report-target">Target *</Label>
              <Select value={reportTarget} onValueChange={setReportTarget}>
                <SelectTrigger>
                  <SelectValue placeholder="Select target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Users">All Users</SelectItem>
                  <SelectItem value="Groups">Groups</SelectItem>
                  <SelectItem value="Courses">Courses</SelectItem>
                  <SelectItem value="Assignments">Assignments</SelectItem>
                  <SelectItem value="Resources">Resources</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={handleCancelGenerateReport}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button 
                onClick={handleGenerateReport}
                disabled={!reportType || !reportTarget}
              >
                <Plus className="mr-2 h-4 w-4" />
                Generate Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Resource Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Resource
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete "<strong>{resourceToDelete?.title}</strong>"? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Resource
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Report Confirmation Modal */}
      <Dialog open={showDeleteReportModal} onOpenChange={setShowDeleteReportModal}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="h-5 w-5" />
              Delete Report
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete "<strong>{reportToDelete?.title}</strong>"? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowDeleteReportModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDeleteReport}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
