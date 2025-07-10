import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { Download, FileText, Users, BarChart3, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ConfigureExportModal } from '@/components/settings/ConfigureExportModal';

const ExportSettings = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    format: 'CSV',
    dateRange: '30',
    customStartDate: '',
    customEndDate: '',
    selectedFields: {
      userLogs: ['User ID', 'Username', 'Login Time', 'IP Address', 'Activity Type'],
      activityReports: ['User', 'Course', 'Progress', 'Completion Date', 'Time Spent'],
      courseData: ['Course Name', 'Instructor', 'Created Date', 'Enrollments', 'Status'],
      assessmentResults: ['Student', 'Assessment', 'Score', 'Completion Date', 'Attempts'],
      calendarEvents: ['Event Title', 'Date', 'Time', 'Attendees', 'Description']
    }
  });

  const generateSampleData = (type) => {
    const sampleData = {
      'user-logs': [
        { 'User ID': '001', 'Username': 'john.doe', 'Login Time': '2025-01-01 09:00', 'IP Address': '192.168.1.1', 'Activity Type': 'Login' },
        { 'User ID': '002', 'Username': 'jane.smith', 'Login Time': '2025-01-01 10:30', 'IP Address': '192.168.1.2', 'Activity Type': 'Course Access' },
        { 'User ID': '003', 'Username': 'bob.wilson', 'Login Time': '2025-01-01 11:15', 'IP Address': '192.168.1.3', 'Activity Type': 'Assessment' }
      ],
      'activity-reports': [
        { 'User': 'John Doe', 'Course': 'Creditor Academy 101', 'Progress': '85%', 'Completion Date': '2025-01-15', 'Time Spent': '4.5 hours' },
        { 'User': 'Jane Smith', 'Course': 'Advanced Credit', 'Progress': '92%', 'Completion Date': '2025-01-20', 'Time Spent': '6.2 hours' },
        { 'User': 'Bob Wilson', 'Course': 'Legal Foundations', 'Progress': '78%', 'Completion Date': '2025-01-18', 'Time Spent': '3.8 hours' }
      ],
      'course-data': [
        { 'Course Name': 'Creditor Academy 101', 'Instructor': 'Prof. Anderson', 'Created Date': '2024-12-01', 'Enrollments': '150', 'Status': 'Active' },
        { 'Course Name': 'Advanced Credit', 'Instructor': 'Dr. Johnson', 'Created Date': '2024-11-15', 'Enrollments': '89', 'Status': 'Active' },
        { 'Course Name': 'Legal Foundations', 'Instructor': 'Prof. Davis', 'Created Date': '2024-10-20', 'Enrollments': '120', 'Status': 'Active' }
      ],
      'assessment-results': [
        { 'Student': 'John Doe', 'Assessment': 'Module 1 Quiz', 'Score': '88%', 'Completion Date': '2025-01-10', 'Attempts': '1' },
        { 'Student': 'Jane Smith', 'Assessment': 'Final Exam', 'Score': '94%', 'Completion Date': '2025-01-12', 'Attempts': '1' },
        { 'Student': 'Bob Wilson', 'Assessment': 'Midterm Test', 'Score': '76%', 'Completion Date': '2025-01-08', 'Attempts': '2' }
      ],
      'calendar-events': [
        { 'Event Title': 'Course Launch', 'Date': '2025-02-01', 'Time': '10:00 AM', 'Attendees': '25', 'Description': 'New course introduction' },
        { 'Event Title': 'Study Group', 'Date': '2025-02-05', 'Time': '2:00 PM', 'Attendees': '12', 'Description': 'Weekly study session' },
        { 'Event Title': 'Assessment Review', 'Date': '2025-02-10', 'Time': '11:00 AM', 'Attendees': '18', 'Description': 'Review session for upcoming test' }
      ]
    };
    return sampleData[type] || [];
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header] || '';
          return `"${value.toString().replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');
    
    return csvContent;
  };

  const downloadCSV = (content, filename) => {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = async (type, title) => {
    setIsExporting(true);
    toast({
      title: "Export Started",
      description: `Preparing ${title} export...`
    });

    // Simulate processing time
    setTimeout(() => {
      const data = generateSampleData(type);
      const csvContent = convertToCSV(data);
      const filename = `${type.replace('-', '_')}_${new Date().toISOString().split('T')[0]}.csv`;
      
      downloadCSV(csvContent, filename);
      
      setIsExporting(false);
      toast({
        title: "Export Complete",
        description: `${title} has been downloaded successfully.`
      });
    }, 2000);
  };

  const handleConfigSave = (config) => {
    setExportConfig(config);
    toast({
      title: "Settings Updated",
      description: "Export settings have been saved successfully.",
    });
  };

  const getDateRangeDisplay = () => {
    if (exportConfig.dateRange === 'custom') {
      return `${exportConfig.customStartDate} to ${exportConfig.customEndDate}`;
    }
    return `Last ${exportConfig.dateRange} days`;
  };

  const exportOptions = [
    {
      title: "User Logs",
      description: "Export user activity and login logs",
      icon: Users,
      type: "user-logs"
    },
    {
      title: "Activity Reports",
      description: "Export detailed activity and engagement reports",
      icon: BarChart3,
      type: "activity-reports"
    },
    {
      title: "Course Data",
      description: "Export course content and enrollment data",
      icon: FileText,
      type: "course-data"
    },
    {
      title: "Assessment Results",
      description: "Export assessment scores and completion data",
      icon: FileText,
      type: "assessment-results"
    },
    {
      title: "Calendar Events",
      description: "Export scheduled events and appointments",
      icon: Calendar,
      type: "calendar-events"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Export Settings" 
        description="Configure data export options and formats"
        icon={<Download className="h-6 w-6 text-primary" />}
      />

      <div className="grid gap-4 md:grid-cols-2">
        {exportOptions.map((option) => (
          <Card key={option.type} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <option.icon className="h-5 w-5 text-primary" />
                {option.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{option.description}</p>
              <Button 
                onClick={() => handleExport(option.type, option.title)}
                disabled={isExporting}
                className="w-full flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {isExporting ? 'Exporting...' : `Export ${exportConfig.format}`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Export Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Default Format</label>
              <p className="text-sm text-muted-foreground">{exportConfig.format} ({exportConfig.format === 'CSV' ? 'Comma Separated Values' : exportConfig.format})</p>
            </div>
            <div>
              <label className="text-sm font-medium">Date Range</label>
              <p className="text-sm text-muted-foreground">{getDateRangeDisplay()}</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => setShowConfigModal(true)}>
            Configure Export Settings
          </Button>
        </CardContent>
      </Card>

      <ConfigureExportModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        currentConfig={exportConfig}
        onSave={handleConfigSave}
      />
    </div>
  );
};

export default ExportSettings;