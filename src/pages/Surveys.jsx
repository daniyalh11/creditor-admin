import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Search,
  Plus,
  MoreVertical,
  Eye,
  Edit,
  XCircle,
  Trash2,
  FileText,
  Calendar,
  Users,
  BarChart3,
  CheckCircle,
  FolderOpen,
  History,
  Clock
} from 'lucide-react';
import { AddSurveyModal } from '@/components/surveys/AddSurveyModal';
import { useNavigate } from 'react-router-dom';

const Surveys = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('catalog');
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([
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
  ]);

  const getFilteredSurveys = (tabType) => {
    let filtered = surveys;

    switch (tabType) {
      case 'catalog':
        filtered = surveys.filter(survey => survey.status === 'Active' || survey.status === 'Published');
        break;
      case 'scheduled':
        filtered = surveys.filter(survey => survey.scheduledDate && survey.status !== 'Closed');
        break;
      case 'history':
        filtered = surveys.filter(survey => survey.status === 'Closed');
        break;
      default:
        filtered = surveys;
    }

    return filtered.filter(survey =>
      survey.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      survey.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const formatDate = (date) => {
    const options = {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleSurveyCreated = (newSurvey) => {
    setSurveys(prev => [newSurvey, ...prev]);
    navigate(`/surveys/builder/${newSurvey.id}`);
  };

  const handleViewSurvey = (surveyId) => {
    navigate(`/surveys/view/${surveyId}`);
  };

  const handleEditSurvey = (surveyId) => {
    navigate(`/surveys/builder/${surveyId}`);
  };

  const handleCloseSurvey = (surveyId) => {
    console.log('Close survey:', surveyId);
  };

  const handleDeleteSurvey = (surveyId) => {
    console.log('Delete survey:', surveyId);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
      case 'Published':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Draft':
        return <Edit className="h-4 w-4 text-orange-500" />;
      case 'Closed':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400" />;
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

  const renderSurveyCard = (survey) => (
    <Card key={survey.id} className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      {survey.thumbnail && (
        <div className="aspect-[4/3] relative overflow-hidden">
          <img
            src={survey.thumbnail}
            alt={survey.title}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="line-clamp-2">{survey.title}</span>
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleViewSurvey(survey.id)}>
                <Eye className="h-4 w-4 mr-2" />
                View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEditSurvey(survey.id)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              {(survey.status === 'Active' || survey.status === 'Published') && (
                <DropdownMenuItem onClick={() => handleCloseSurvey(survey.id)}>
                  <XCircle className="h-4 w-4 mr-2" />
                  Close Survey
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => handleDeleteSurvey(survey.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">{survey.description}</p>

        <div className="space-y-3">
          {survey.type && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Type</span>
              </div>
              <span className="font-medium">{survey.type}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Created</span>
            </div>
            <span className="font-medium">{formatDate(survey.createdAt)}</span>
          </div>

          {survey.scheduledDate && (
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600">Scheduled</span>
              </div>
              <span className="font-medium">{formatDate(survey.scheduledDate)}</span>
            </div>
          )}

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Assigned To</span>
            </div>
            <span className="font-medium truncate max-w-[120px]" title={survey.assignedTo}>
              {survey.assignedTo}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-gray-400" />
              <span className="text-gray-600">Responses</span>
            </div>
            <span className="font-medium">{survey.responseCount}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              {getStatusIcon(survey.status)}
              <span className="text-gray-600">Status</span>
            </div>
            <Badge
              variant="secondary"
              className={getStatusColor(survey.status)}
            >
              {survey.status}
            </Badge>
          </div>
        </div>

        <Button
          onClick={() => handleViewSurvey(survey.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          <Eye className="h-4 w-4 mr-2" />
          View Survey
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header and search */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Surveys</h1>
          <p className="text-gray-600 mt-1">Create and manage surveys and questionnaires</p>
        </div>
        <AddSurveyModal onSurveyCreated={handleSurveyCreated} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search surveys..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="catalog" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Catalog
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Scheduled
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <History className="h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="catalog" className="space-y-4">
          {getFilteredSurveys('catalog').length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <FolderOpen className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">📂 No active surveys</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Create your first survey to get started!'}
              </p>
              {!searchQuery && (
                <AddSurveyModal onSurveyCreated={handleSurveyCreated} />
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSurveys('catalog').map(renderSurveyCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-4">
          {getFilteredSurveys('scheduled').length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">📅 No scheduled surveys</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Schedule surveys to see them here!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSurveys('scheduled').map(renderSurveyCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {getFilteredSurveys('history').length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <History className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">📜 No completed surveys</h3>
              <p className="text-gray-600 mb-4">
                {searchQuery ? 'Try adjusting your search terms' : 'Completed surveys will appear here!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredSurveys('history').map(renderSurveyCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Surveys;