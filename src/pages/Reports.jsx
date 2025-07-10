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

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.createdBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !typeFilter || typeFilter === 'all-types' || report.type === typeFilter;
    const matchesDate = !dateFilter || report.generatedDate >= dateFilter;
    return matchesSearch && matchesType && matchesDate;
  });

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
    console.log(`Downloading report: ${report.title}`);
    toast.success("Report downloaded successfully", {
      description: `${report.title} has been downloaded to your device.`,
      duration: 4000,
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDateFilter('');
    setTypeFilter('');
  };

  const getReportTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'analytics': return 'bg-blue-100 text-blue-800';
      case 'progress': return 'bg-green-100 text-green-800';
      case 'usage': return 'bg-purple-100 text-purple-800';
      case 'assessment': return 'bg-orange-100 text-orange-800';
      case 'attendance': return 'bg-cyan-100 text-cyan-800';
      case 'performance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* UI rendering code remains unchanged */}
      {/* Use the JSX code you already have for rendering */}
      {/* You can paste it here or continue using your editor */}
    </div>
  );
};

export default Reports;
