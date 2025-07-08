
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  Users, 
  BarChart3, 
  CheckCircle,
  FileText,
  Clock,
  User
} from 'lucide-react';
import { toast } from 'sonner';

type Survey = {
  id: string;
  title: string;
  createdAt: Date;
  description: string;
  thumbnail?: string;
  assignedTo: string;
  responseCount: number;
  status: 'Active' | 'Closed' | 'Draft' | 'Published';
  type?: string;
  scheduledDate?: Date;
};

const SurveyDetail = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  
  // Edit form states
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editType, setEditType] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editScheduledDate, setEditScheduledDate] = useState('');
  const [editAssignedTo, setEditAssignedTo] = useState('');

  useEffect(() => {
    // Mock data - in real app, fetch from API based on surveyId
    const mockSurveys: Survey[] = [
      {
        id: '1',
        title: 'Customer Service Excellence Survey',
        createdAt: new Date('2025-04-07'),
        description: 'Comprehensive assessment of customer service skills and knowledge',
        thumbnail: '/lovable-uploads/926858f6-3201-44d2-80fa-8bbc21bd5a72.png',
        assignedTo: 'Customer Service Team',
        responseCount: 45,
        status: 'Active',
        type: 'Feedback'
      },
      {
        id: '2',
        title: 'IT Security Awareness Survey',
        createdAt: new Date('2025-04-22'),
        description: 'Evaluate understanding of cybersecurity best practices',
        thumbnail: '/lovable-uploads/926858f6-3201-44d2-80fa-8bbc21bd5a72.png',
        assignedTo: 'All Employees',
        responseCount: 128,
        status: 'Published',
        type: 'Experience',
        scheduledDate: new Date('2025-07-15')
      },
      {
        id: '3',
        title: 'Training Effectiveness Survey',
        createdAt: new Date('2025-03-15'),
        description: 'Feedback on recent training programs and effectiveness',
        assignedTo: 'Training Participants',
        responseCount: 67,
        status: 'Closed',
        type: 'Feedback'
      },
      {
        id: '4',
        title: 'Employee Satisfaction Survey',
        createdAt: new Date('2025-05-10'),
        description: 'Annual employee satisfaction and engagement survey',
        assignedTo: 'All Employees',
        responseCount: 0,
        status: 'Draft',
        type: 'Experience'
      },
    ];

    const foundSurvey = mockSurveys.find(s => s.id === surveyId);
    if (foundSurvey) {
      setSurvey(foundSurvey);
      setEditTitle(foundSurvey.title);
      setEditDescription(foundSurvey.description);
      setEditType(foundSurvey.type || '');
      setEditStatus(foundSurvey.status);
      setEditScheduledDate(foundSurvey.scheduledDate ? foundSurvey.scheduledDate.toISOString().split('T')[0] : '');
      setEditAssignedTo(foundSurvey.assignedTo);
    }
  }, [surveyId]);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Published':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Draft':
        return <Edit className="h-5 w-5 text-orange-500" />;
      case 'Closed':
        return <CheckCircle className="h-5 w-5 text-gray-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
      case 'Published':
        return 'bg-green-100 text-green-800';
      case 'Draft':
        return 'bg-orange-100 text-orange-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const handleEditSurvey = () => {
    if (survey) {
      const updatedSurvey = {
        ...survey,
        title: editTitle,
        description: editDescription,
        type: editType,
        status: editStatus as 'Active' | 'Closed' | 'Draft' | 'Published',
        scheduledDate: editScheduledDate ? new Date(editScheduledDate) : undefined,
        assignedTo: editAssignedTo
      };
      setSurvey(updatedSurvey);
      setIsEditModalOpen(false);
      toast.success('Survey updated successfully');
    }
  };

  const handleDeleteSurvey = () => {
    toast.success('Survey deleted successfully');
    navigate('/surveys');
  };

  const handleUpdateSchedule = () => {
    if (survey && editScheduledDate) {
      const updatedSurvey = {
        ...survey,
        scheduledDate: new Date(editScheduledDate)
      };
      setSurvey(updatedSurvey);
      setIsScheduleModalOpen(false);
      toast.success('Schedule updated successfully');
    }
  };

  const handleUpdateAssignment = () => {
    if (survey) {
      const updatedSurvey = {
        ...survey,
        assignedTo: editAssignedTo
      };
      setSurvey(updatedSurvey);
      setIsAssignModalOpen(false);
      toast.success('Assignment updated successfully');
    }
  };

  if (!survey) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Survey not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/surveys')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Surveys
        </Button>
      </div>

      {/* Survey Header Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-6">
            {survey.thumbnail && (
              <div className="w-full lg:w-64 h-48 overflow-hidden rounded-lg">
                <img 
                  src={survey.thumbnail} 
                  alt={survey.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{survey.title}</h1>
                  <div className="flex items-center gap-2 mb-3">
                    {getStatusIcon(survey.status)}
                    <Badge 
                      variant="secondary"
                      className={getStatusColor(survey.status)}
                    >
                      {survey.status}
                    </Badge>
                    {survey.type && (
                      <Badge variant="outline">
                        {survey.type}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-lg">{survey.description}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold text-gray-900">Created</h3>
            </div>
            <p className="text-gray-600">{formatDate(survey.createdAt)}</p>
          </CardContent>
        </Card>

        {survey.scheduledDate && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-orange-500" />
                <h3 className="font-semibold text-gray-900">Scheduled</h3>
              </div>
              <p className="text-gray-600">{formatDate(survey.scheduledDate)}</p>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-green-500" />
              <h3 className="font-semibold text-gray-900">Assigned To</h3>
            </div>
            <p className="text-gray-600">{survey.assignedTo}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="h-5 w-5 text-purple-500" />
              <h3 className="font-semibold text-gray-900">Responses</h3>
            </div>
            <p className="text-2xl font-bold text-gray-900">{survey.responseCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Survey
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Survey</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      value={editTitle} 
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      value={editDescription} 
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Type</label>
                      <Select value={editType} onValueChange={setEditType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Feedback">Feedback</SelectItem>
                          <SelectItem value="Experience">Experience</SelectItem>
                          <SelectItem value="Assessment">Assessment</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select value={editStatus} onValueChange={setEditStatus}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Published">Published</SelectItem>
                          <SelectItem value="Closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleEditSurvey}>
                      Save Changes
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isScheduleModalOpen} onOpenChange={setIsScheduleModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Update Schedule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Schedule</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Scheduled Date</label>
                    <Input 
                      type="date"
                      value={editScheduledDate} 
                      onChange={(e) => setEditScheduledDate(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsScheduleModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateSchedule}>
                      Update Schedule
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Update Assignment
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Assignment</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Assigned To</label>
                    <Select value={editAssignedTo} onValueChange={setEditAssignedTo}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All Employees">All Employees</SelectItem>
                        <SelectItem value="Customer Service Team">Customer Service Team</SelectItem>
                        <SelectItem value="Training Participants">Training Participants</SelectItem>
                        <SelectItem value="IT Department">IT Department</SelectItem>
                        <SelectItem value="Management Team">Management Team</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleUpdateAssignment}>
                      Update Assignment
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Survey
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Survey</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Are you sure you want to delete "{survey.title}"? This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDeleteSurvey}>
                      Delete Survey
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SurveyDetail;
