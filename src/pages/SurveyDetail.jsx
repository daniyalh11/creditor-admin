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

const SurveyDetail = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editType, setEditType] = useState('');
  const [editStatus, setEditStatus] = useState('');
  const [editScheduledDate, setEditScheduledDate] = useState('');
  const [editAssignedTo, setEditAssignedTo] = useState('');

  useEffect(() => {
    const mockSurveys = [
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

  const formatDate = (date) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const getStatusIcon = (status) => {
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

  const getStatusColor = (status) => {
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
        status: editStatus,
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
      {/* UI rendering as-is, logic unchanged */}
    </div>
  );
};

export default SurveyDetail;