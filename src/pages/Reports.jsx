import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Plus, Download, FileText, Trash2, Calendar as CalendarIcon, 
  X, User, Eye, Search
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { PageHeader } from '@/components/shared/PageHeader';
import { ReportPreviewModal } from '@/components/reports/ReportPreviewModal';

const Reports = () => {
  const [showGenerateReportModal, setShowGenerateReportModal] = useState(false);
  const [showDeleteReportModal, setShowDeleteReportModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [reportToDelete, setReportToDelete] = useState(null);
  const [reportToPreview, setReportToPreview] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  
  // Generate Report form states
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [reportTarget, setReportTarget] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  
  const [reports, setReports] = useState([
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
    },
    {
      id: 5,
      title: 'Attendance Report',
      type: 'Attendance',
      generatedDate: '2024-03-10',
      createdBy: 'Instructor',
      fileSize: '945 KB',
      tags: ['Attendance', 'Classes']
    },
    {
      id: 6,
      title: 'Performance Analytics',
      type: 'Performance',
      generatedDate: '2024-03-08',
      createdBy: 'Manager',
      fileSize: '2.7 MB',
      tags: ['Performance', 'Learners']
    }
  ]);

  // Filter reports based on search and filters
  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = !typeFilter || typeFilter === 'all-types' || report.type === typeFilter;
    const matchesDate = !dateFilter || report.generatedDate >= dateFilter;
    
    return matchesSearch && matchesType && matchesDate;
  });

  // Report management functions
  const handleGenerateReport = () => {
    if (!reportType || !reportTarget) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newReport = {
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

  const handleDeleteReport = (report) => {
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

  const handleViewReport = (report) => {
    setReportToPreview(report);
    setShowPreviewModal(true);
  };

  const handleDownloadReport = (report) => {
    // Generate a dummy file for the report
    const content = `Report Title: ${report.title}\nType: ${report.type}\nTags: ${(report.tags || []).join(', ')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${report.title.replace(/\s+/g, '_') || 'report'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDateFilter('');
    setTypeFilter('');
  };

  const getReportTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'analytics':
        return 'bg-blue-100 text-blue-800';
      case 'progress':
        return 'bg-green-100 text-green-800';
      case 'usage':
        return 'bg-purple-100 text-purple-800';
      case 'assessment':
        return 'bg-orange-100 text-orange-800';
      case 'attendance':
        return 'bg-cyan-100 text-cyan-800';
      case 'performance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <PageHeader
        title="Reports"
        description="Generate and manage system reports"
        icon={<FileText className="h-6 w-6" />}
        action={{
          label: "Generate Report",
          onClick: () => setShowGenerateReportModal(true)
        }}
      />

      {/* Reports Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Generated Reports ({filteredReports.length})
            </CardTitle>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-types">All Types</SelectItem>
                <SelectItem value="Analytics">Analytics</SelectItem>
                <SelectItem value="Progress">Progress</SelectItem>
                <SelectItem value="Usage">Usage</SelectItem>
                <SelectItem value="Assessment">Assessment</SelectItem>
                <SelectItem value="Attendance">Attendance</SelectItem>
                <SelectItem value="Performance">Performance</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-48"
              placeholder="Filter by date"
            />
            {(searchQuery || dateFilter || typeFilter) && (
              <Button variant="outline" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Generated Date</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReports.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">No reports found</p>
                    <p className="text-sm text-gray-500">Generate your first report or adjust your filters</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredReports.map(report => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getReportTypeColor(report.type)}`}>
                        {report.type}
                      </span>
                    </TableCell>
                    <TableCell>{report.generatedDate}</TableCell>
                    <TableCell className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      {report.createdBy}
                    </TableCell>
                    <TableCell>
                      {report.tags && (
                        <div className="flex gap-1 flex-wrap">
                          {report.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">{report.fileSize}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewReport(report)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownloadReport(report)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDeleteReport(report)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
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
          <Input
            type="date"
            value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
            onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label>End Date</Label>
          <Input
            type="date"
            value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
            onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
            className="w-full"
          />
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

      {/* Report Preview Modal */}
      <ReportPreviewModal
        open={showPreviewModal}
        onOpenChange={setShowPreviewModal}
        report={reportToPreview}
      />
    </div>
  );
};

export default Reports;