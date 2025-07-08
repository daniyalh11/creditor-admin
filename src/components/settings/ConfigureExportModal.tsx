
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface ExportConfig {
  format: string;
  dateRange: string;
  customStartDate: string;
  customEndDate: string;
  selectedFields: {
    userLogs: string[];
    activityReports: string[];
    courseData: string[];
    assessmentResults: string[];
    calendarEvents: string[];
  };
}

interface ConfigureExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentConfig: ExportConfig;
  onSave: (config: ExportConfig) => void;
}

export const ConfigureExportModal: React.FC<ConfigureExportModalProps> = ({
  isOpen,
  onClose,
  currentConfig,
  onSave
}) => {
  const [config, setConfig] = useState<ExportConfig>(currentConfig);

  const fieldOptions = {
    userLogs: ['User ID', 'Username', 'Login Time', 'IP Address', 'Activity Type'],
    activityReports: ['User', 'Course', 'Progress', 'Completion Date', 'Time Spent'],
    courseData: ['Course Name', 'Instructor', 'Created Date', 'Enrollments', 'Status'],
    assessmentResults: ['Student', 'Assessment', 'Score', 'Completion Date', 'Attempts'],
    calendarEvents: ['Event Title', 'Date', 'Time', 'Attendees', 'Description']
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const handleCancel = () => {
    setConfig(currentConfig);
    onClose();
  };

  const handleFieldToggle = (category: keyof typeof fieldOptions, field: string, checked: boolean) => {
    setConfig(prev => ({
      ...prev,
      selectedFields: {
        ...prev.selectedFields,
        [category]: checked 
          ? [...prev.selectedFields[category], field]
          : prev.selectedFields[category].filter(f => f !== field)
      }
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configure Export Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="format">Export Format</Label>
            <Select value={config.format} onValueChange={(value) => setConfig(prev => ({...prev, format: value}))}>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSV">CSV (Comma Separated Values)</SelectItem>
                <SelectItem value="XLSX">XLSX (Excel)</SelectItem>
                <SelectItem value="JSON">JSON</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateRange">Date Range</Label>
            <Select value={config.dateRange} onValueChange={(value) => setConfig(prev => ({...prev, dateRange: value}))}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {config.dateRange === 'custom' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={config.customStartDate}
                  onChange={(e) => setConfig(prev => ({...prev, customStartDate: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={config.customEndDate}
                  onChange={(e) => setConfig(prev => ({...prev, customEndDate: e.target.value}))}
                />
              </div>
            </div>
          )}

          <div className="space-y-4">
            <Label>Export Fields</Label>
            {Object.entries(fieldOptions).map(([category, fields]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {fields.map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category}-${field}`}
                        checked={config.selectedFields[category as keyof typeof config.selectedFields].includes(field)}
                        onCheckedChange={(checked) => handleFieldToggle(category as keyof typeof fieldOptions, field, checked as boolean)}
                      />
                      <Label htmlFor={`${category}-${field}`} className="text-sm">{field}</Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
