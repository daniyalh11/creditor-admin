import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Award, Trophy, Star, Medal } from 'lucide-react';

const badgeTemplates = [
  { id: 'achievement', name: 'Achievement Badge', icon: Trophy, color: 'bg-yellow-100 text-yellow-800' },
  { id: 'excellence', name: 'Excellence Badge', icon: Star, color: 'bg-blue-100 text-blue-800' },
  { id: 'completion', name: 'Completion Badge', icon: Award, color: 'bg-green-100 text-green-800' },
  { id: 'participation', name: 'Participation Badge', icon: Medal, color: 'bg-purple-100 text-purple-800' }
];

const certificateTemplates = [
  { id: 'completion', name: 'Course Completion Certificate', description: 'Official completion certificate' },
  { id: 'excellence', name: 'Excellence Certificate', description: 'Recognition for outstanding performance' },
  { id: 'participation', name: 'Participation Certificate', description: 'Certificate of participation' }
];

const mockCourses = [
  { id: 1, name: 'Introduction to Legal Studies' },
  { id: 2, name: 'Constitutional Law' },
  { id: 3, name: 'Criminal Law Fundamentals' },
  { id: 4, name: 'Corporate Law Basics' }
];

export const RewardUserModal = ({
  user,
  open,
  onOpenChange,
  onRewardSent,
  course,
}) => {
  const [rewardType, setRewardType] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(course?.id.toString() || '');

  if (!user) return null;

  const handleSend = () => {
    if (!rewardType || !selectedTemplate || (!course && !selectedCourse)) {
      toast({
        title: "Missing Information",
        description: "Please select reward type and template.",
        variant: "destructive"
      });
      return;
    }

    const courseData = course || mockCourses.find(c => c.id.toString() === selectedCourse);
    const templateData = rewardType === 'badge' 
      ? badgeTemplates.find(t => t.id === selectedTemplate)
      : certificateTemplates.find(t => t.id === selectedTemplate);

    const reward = {
      id: Date.now().toString(),
      type: rewardType,
      template: templateData,
      course: courseData,
      user: user,
      date: new Date().toISOString().split('T')[0]
    };

    onRewardSent(reward);

    toast({
      title: "Reward Sent Successfully",
      description: `${rewardType === 'badge' ? 'Badge' : 'Certificate'} sent to ${user.name}.`
    });

    // Reset form
    setRewardType(null);
    setSelectedTemplate('');
    if (!course) {
      setSelectedCourse('');
    }
    onOpenChange(false);
  };

  const handleCancel = () => {
    setRewardType(null);
    setSelectedTemplate('');
    if (!course) {
      setSelectedCourse('');
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Send Reward to {user.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Reward Type Selection */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Select Reward Type</h3>
            <div className="grid grid-cols-2 gap-4">
              <Card 
                className={`cursor-pointer transition-all ${rewardType === 'badge' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                onClick={() => {
                  setRewardType('badge');
                  setSelectedTemplate('');
                }}
              >
                <CardContent className="p-4 text-center">
                  <Award className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium">Badge</h4>
                </CardContent>
              </Card>
              
              <Card 
                className={`cursor-pointer transition-all ${rewardType === 'certificate' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                onClick={() => {
                  setRewardType('certificate');
                  setSelectedTemplate('');
                }}
              >
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <h4 className="font-medium">Certificate</h4>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Course Selection - Only show if no course is provided */}
          {rewardType && !course && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Select Course</h3>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent>
                  {mockCourses.map(courseItem => (
                    <SelectItem key={courseItem.id} value={courseItem.id.toString()}>
                      {courseItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Template Selection */}
          {rewardType && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">
                Select {rewardType === 'badge' ? 'Badge' : 'Certificate'} Template
              </h3>
              
              {rewardType === 'badge' ? (
                <div className="grid grid-cols-2 gap-3">
                  {badgeTemplates.map(template => {
                    const IconComponent = template.icon;
                    return (
                      <Card 
                        key={template.id}
                        className={`cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-50'}`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <CardContent className="p-3 text-center">
                          <IconComponent className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                          <h5 className="text-sm font-medium">{template.name}</h5>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  {certificateTemplates.map(template => (
                    <Card 
                      key={template.id}
                      className={`cursor-pointer transition-all ${selectedTemplate === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <CardContent className="p-3">
                        <h5 className="font-medium">{template.name}</h5>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Live Preview */}
          {rewardType && selectedTemplate && (course || selectedCourse) && (
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Preview</h3>
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-200">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <div className="flex justify-center mb-3">
                      {rewardType === 'badge' ? (
                        <Award className="h-12 w-12 text-blue-600" />
                      ) : (
                        <Trophy className="h-12 w-12 text-blue-600" />
                      )}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-800">{user.name}</h4>
                    <p className="text-gray-600">
                      {course?.name || mockCourses.find(c => c.id.toString() === selectedCourse)?.name}
                    </p>
                    <Badge className="bg-blue-100 text-blue-800">
                      {rewardType === 'badge' 
                        ? badgeTemplates.find(t => t.id === selectedTemplate)?.name
                        : certificateTemplates.find(t => t.id === selectedTemplate)?.name
                      }
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend}
            disabled={!rewardType || !selectedTemplate || (!course && !selectedCourse)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Send Reward
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};