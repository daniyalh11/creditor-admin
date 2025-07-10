import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Edit, TrendingUp, TrendingDown, BarChart3, CheckCircle, Clock, AlertCircle, X, FileText, Save, Users, Timer, Target } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { InstructionBlock } from '@/components/courses/assessments/InstructionBlock';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

const EssayDashboard = () => {
  const { id, essayId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [score, setScore] = useState('');
  const [feedback, setFeedback] = useState('');

  // Mock essay data - with state management for editing
  const [essayData, setEssayData] = useState({
    'essay-1': {
      title: 'Essay 1: The Impact of Technology on Education',
      description: 'Write a comprehensive essay analyzing how technology has transformed modern education.',
      prompt: 'Discuss the positive and negative impacts of technology on education, providing specific examples and your personal perspective.',
      maxScore: 100,
      wordLimit: 1500,
      minWordLimit: 800,
      timeLimit: 120,
      totalSubmissions: 8,
      gradedSubmissions: 5,
      instructions: 'Please read the essay prompt carefully and plan your response before writing. Ensure your essay has a clear introduction, body paragraphs with supporting evidence, and a conclusion. Use proper grammar and cite any sources appropriately.'
    },
    'essay-2': {
      title: 'Essay 2: Environmental Conservation Strategies',
      description: 'Analyze various approaches to environmental conservation and their effectiveness.',
      prompt: 'Evaluate different environmental conservation strategies and propose solutions for sustainable development.',
      maxScore: 100,
      wordLimit: 2000,
      minWordLimit: 1000,
      timeLimit: 150,
      totalSubmissions: 6,
      gradedSubmissions: 3,
      instructions: 'Structure your essay with clear arguments and supporting evidence. Consider multiple perspectives on environmental conservation and provide well-reasoned solutions.'
    }
  });

  const essay = essayData[essayId] || essayData['essay-1'];

  const handleSaveInstructions = (instructions) => {
    setEssayData(prev => ({
      ...prev,
      [essayId]: {
        ...prev[essayId],
        instructions
      }
    }));
  };

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    minWordLimit: '',
    maxWordLimit: ''
  });

  // All enrolled students data (including those who haven't submitted)
  const allStudentsData = [
    {
      id: 1,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      score: '85/100',
      wordCount: 1450,
      timeSpent: 95,
      response: 'Technology has fundamentally transformed the educational landscape in unprecedented ways. From the introduction of computers in classrooms to the recent shift towards online learning platforms, technological advancement has created both opportunities and challenges for educators and students alike...',
      feedback: 'Excellent analysis with strong supporting evidence. Your argument structure is clear and persuasive.',
      submitted: '15/01/2024, 14:30:00',
      status: 'Graded'
    },
    {
      id: 2,
      name: 'Bob Wilson',
      email: 'bob@example.com',
      score: null,
      wordCount: 1380,
      timeSpent: 87,
      response: 'The integration of technology in education represents one of the most significant paradigm shifts of the 21st century. While traditional teaching methods focused on direct instruction and textbook learning, modern educational approaches leverage digital tools to create more interactive and engaging learning experiences...',
      feedback: null,
      submitted: '15/01/2024, 15:45:00',
      status: 'Pending'
    },
    {
      id: 3,
      name: 'Carol Davis',
      email: 'carol@example.com',
      score: '92/100',
      wordCount: 1520,
      timeSpent: 112,
      response: 'Educational technology has evolved from simple computer-assisted instruction to sophisticated learning management systems that personalize the learning experience for individual students. This transformation has implications that extend far beyond the classroom...',
      feedback: 'Outstanding work! Your analysis is thorough and demonstrates deep understanding of the topic.',
      submitted: '15/01/2024, 16:20:00',
      status: 'Graded'
    },
    {
      id: 4,
      name: 'David Brown',
      email: 'david@example.com',
      score: null,
      wordCount: 0,
      timeSpent: 0,
      response: null,
      feedback: null,
      submitted: null,
      status: 'Not Submitted'
    },
    {
      id: 5,
      name: 'Eva Martinez',
      email: 'eva@example.com',
      score: null,
      wordCount: 0,
      timeSpent: 0,
      response: null,
      feedback: null,
      submitted: null,
      status: 'Not Submitted'
    },
    {
      id: 6,
      name: 'Frank Wilson',
      email: 'frank@example.com',
      score: null,
      wordCount: 890,
      timeSpent: 65,
      response: 'Education technology has been evolving rapidly...',
      feedback: null,
      submitted: '17/01/2024, 09:30:00',
      status: 'Pending'
    }
  ];

  // Mock analytics data
  const analyticsData = [
    { name: '0-20', value: 0 },
    { name: '21-40', value: 0 },
    { name: '41-60', value: 0 },
    { name: '61-80', value: 2 },
    { name: '81-100', value: 3 }
  ];

  // Additional analytics data for new graphs
  const submissionStatusData = [
    { name: 'Submitted', value: 6, color: '#10B981' },
    { name: 'Not Submitted', value: 2, color: '#EF4444' }
  ];

  const wordCountDistributionData = [
    { range: '0-500', count: 0 },
    { range: '501-1000', count: 1 },
    { range: '1001-1500', count: 4 },
    { range: '1501-2000', count: 1 }
  ];

  const timeSpentData = [
    { range: '0-30min', count: 0 },
    { range: '31-60min', count: 1 },
    { range: '61-90min', count: 2 },
    { range: '91-120min', count: 3 }
  ];

  // Calculate enhanced metrics
  const submittedStudents = allStudentsData.filter(s => s.status === 'Graded' || s.status === 'Pending');
  const gradedStudents = allStudentsData.filter(s => s.score !== null);
  const scores = gradedStudents.map(s => parseInt(s.score?.split('/')[0] || '0'));
  const wordCounts = submittedStudents.map(s => s.wordCount);
  const timeSpents = submittedStudents.map(s => s.timeSpent);

  const averageScore = scores.length > 0 ? Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length) : 0;
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;
  const completionRate = Math.round((submittedStudents.length / allStudentsData.length) * 100);
  const avgWordCount = wordCounts.length > 0 ? Math.round(wordCounts.reduce((sum, count) => sum + count, 0) / wordCounts.length) : 0;
  const avgTimeSpent = timeSpents.length > 0 ? Math.round(timeSpents.reduce((sum, time) => sum + time, 0) / timeSpents.length) : 0;

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const handleBackToAssessments = () => {
    navigate(`/courses/edit/${id}`);
  };

  const handleEditEssay = () => {
    setEditForm({
      title: essay.title,
      description: essay.description,
      minWordLimit: essay.minWordLimit?.toString() || '',
      maxWordLimit: essay.wordLimit?.toString() || ''
    });
    setShowEditModal(true);
  };

  const handleSaveEssay = () => {
    if (!editForm.title.trim() || !editForm.description.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in the title and description fields.",
        variant: "destructive"
      });
      return;
    }

    // Validate word limits if provided
    const minWordLimit = editForm.minWordLimit ? parseInt(editForm.minWordLimit) : undefined;
    const maxWordLimit = editForm.maxWordLimit ? parseInt(editForm.maxWordLimit) : undefined;

    if (minWordLimit && maxWordLimit && minWordLimit >= maxWordLimit) {
      toast({
        title: "Validation Error",
        description: "Minimum word limit must be less than maximum word limit.",
        variant: "destructive"
      });
      return;
    }

    // Update the essay data
    setEssayData(prev => ({
      ...prev,
      [essayId]: {
        ...prev[essayId],
        title: editForm.title,
        description: editForm.description,
        minWordLimit: minWordLimit,
        wordLimit: maxWordLimit || prev[essayId].wordLimit
      }
    }));

    setShowEditModal(false);
    toast({
      title: "Essay Updated",
      description: "Essay details have been successfully updated.",
    });
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditForm({ title: '', description: '', minWordLimit: '', maxWordLimit: '' });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setShowViewDetailsModal(true);
  };

  const handleViewAndGrade = (student) => {
    setSelectedStudent(student);
    setScore(student.score ? student.score.split('/')[0] : '');
    setFeedback(student.feedback || '');
    setShowScoreModal(true);
  };

  const handleSubmitScore = () => {
    if (!score.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a score before submitting.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Grade Submitted",
      description: `Score and feedback submitted for ${selectedStudent?.name}`,
    });
    setShowScoreModal(false);
    setSelectedStudent(null);
    setScore('');
    setFeedback('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Graded':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Not Submitted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Graded':
        return <CheckCircle className="h-4 w-4" />;
      case 'Pending':
        return <Clock className="h-4 w-4" />;
      case 'Not Submitted':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'scores', label: 'Scores' },
    { id: 'submission-status', label: 'Submission Status' },
    { id: 'analytics', label: 'Analytics' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'scores':
        return (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <FileText className="h-6 w-6 text-blue-600" />
                    Essay Scores
                  </h3>
                  <p className="text-gray-600 mt-1">Review and grade student essay submissions</p>
                </div>
              </div>

              {/* Stats Display */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{submittedStudents.length}</div>
                  <div className="text-sm text-gray-600">Total Submissions</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{gradedStudents.length}</div>
                  <div className="text-sm text-gray-600">Graded</div>
                </div>
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{submittedStudents.length - gradedStudents.length}</div>
                  <div className="text-sm text-gray-600">Pending</div>
                </div>
              </div>

              {/* Student List Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Student Name</th>
                      <th className="text-left p-3 font-semibold">Submission Status</th>
                      <th className="text-left p-3 font-semibold">Score</th>
                      <th className="text-left p-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStudentsData.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                        </td>
                        <td className="p-3">{student.score || '—'}</td>
                        <td className="p-3">
                          <Button
                            onClick={() => handleViewAndGrade(student)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            View & Grade
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );

      case 'submission-status':
        return (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Submission Status</h3>
                </div>
              </div>

              {/* Cards at the Top */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{allStudentsData.length}</div>
                  <div className="text-sm text-gray-600">Total Enrolled</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{submittedStudents.length}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">{allStudentsData.length - submittedStudents.length}</div>
                  <div className="text-sm text-gray-600">Not Attempted</div>
                </div>
              </div>

              {/* Student Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-semibold">Student Name</th>
                      <th className="text-left p-3 font-semibold">Score</th>
                      <th className="text-left p-3 font-semibold">Time Spent</th>
                      <th className="text-left p-3 font-semibold">Word Count</th>
                      <th className="text-left p-3 font-semibold">Status Tag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allStudentsData.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">{student.name}</td>
                        <td className="p-3">{student.score || '—'}</td>
                        <td className="p-3">{student.timeSpent > 0 ? `${student.timeSpent}m` : '—'}</td>
                        <td className="p-3">{student.wordCount || '—'}</td>
                        <td className="p-3">
                          <Badge className={getStatusColor(student.status)}>
                            {student.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );

      case 'analytics':
        return (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Essay Analytics Overview</h3>
                
                {/* Overview Cards - 2x3 Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-blue-50 rounded-lg">
                    <BarChart3 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-blue-600 mb-1">{averageScore}%</div>
                    <div className="text-sm text-gray-600">Average Score</div>
                  </div>
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-green-600 mb-1">{highestScore}%</div>
                    <div className="text-sm text-gray-600">Highest Score</div>
                  </div>
                  <div className="text-center p-6 bg-red-50 rounded-lg">
                    <TrendingDown className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-red-600 mb-1">{lowestScore}%</div>
                    <div className="text-sm text-gray-600">Lowest Score</div>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-purple-600 mb-1">{completionRate}%</div>
                    <div className="text-sm text-gray-600">Completion Rate</div>
                  </div>
                  <div className="text-center p-6 bg-yellow-50 rounded-lg">
                    <FileText className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-yellow-600 mb-1">{avgWordCount}</div>
                    <div className="text-sm text-gray-600">Avg Word Count</div>
                  </div>
                  <div className="text-center p-6 bg-indigo-50 rounded-lg">
                    <Timer className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                    <div className="text-3xl font-bold text-indigo-600 mb-1">{formatTime(avgTimeSpent)}</div>
                    <div className="text-sm text-gray-600">Avg Time Spent</div>
                  </div>
                </div>

                {/* Graphs Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Score Distribution */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={analyticsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Submission Status */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Submission Status</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={submissionStatusData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name}: ${value}`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {submissionStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Word Count Distribution */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Word Count Distribution</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={wordCountDistributionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#10b981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Time Spent Distribution */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Time Spent Distribution</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={timeSpentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#f59e0b" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <>
            {/* Instructions Block */}
            <InstructionBlock
              title="Essay"
              instructions={essay.instructions}
              onSave={handleSaveInstructions}
            />

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Essay Overview</h3>
                  <Button 
                    onClick={handleEditEssay}
                    variant="outline" 
                    className="hover:bg-gray-50"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{essay.title}</h4>
                  <p className="text-gray-600 mb-3">{essay.description}</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 italic">
                      <strong>Essay Prompt:</strong> {essay.prompt}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {essay.totalSubmissions}
                    </div>
                    <div className="text-sm text-gray-600">Total Submissions</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {essay.gradedSubmissions}
                    </div>
                    <div className="text-sm text-gray-600">Graded</div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      {essay.totalSubmissions - essay.gradedSubmissions}
                    </div>
                    <div className="text-sm text-gray-600">Pending Review</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-1">
                      {essay.minWordLimit && essay.wordLimit ? `${essay.minWordLimit}-${essay.wordLimit}` : essay.wordLimit}
                    </div>
                    <div className="text-sm text-gray-600">Word Limit</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Top Header */}
      <Header />

      {/* Main Layout Container */}
      <div className="flex pt-16">
        {/* Main Sidebar - Always expanded */}
        <div className="fixed left-0 top-0 bottom-0 w-64 z-40">
          <div className="h-full overflow-hidden">
            <SidebarNav onCloseMobile={() => {}} />
          </div>
        </div>
        
        {/* Main Content Area - Full width with only main sidebar margin */}
        <div className="flex-1 ml-64">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBackToAssessments}
                  className="rounded-full px-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Assessments
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Essay Instructor Dashboard</h1>
                  <p className="text-gray-600">Manage and evaluate essay assignments</p>
                </div>
              </div>
            </div>

            {/* Essay Title Section */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-green-900">{essay.title}</h2>
                  <Badge className="bg-green-100 text-green-800">
                    Max Score: {essay.maxScore}
                  </Badge>
                </div>
                <p className="text-green-700 mb-2">{essay.description}</p>
                <div className="flex items-center gap-4 text-sm text-green-600">
                  <span>Word Limit: {essay.minWordLimit && essay.wordLimit ? `${essay.minWordLimit}-${essay.wordLimit}` : essay.wordLimit}</span>
                  <span>Time Limit: {essay.timeLimit} minutes</span>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={cn(
                      "py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200",
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Content Area */}
            <div className="space-y-4">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Essay Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-green-600" />
              Edit Essay Details
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="essay-title">Essay Title *</Label>
              <Input
                id="essay-title"
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter essay title"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="essay-description">Description *</Label>
              <Textarea
                id="essay-description"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter essay description or instructions"
                rows={4}
                className="resize-none w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="min-word-limit">Minimum Word Count</Label>
                <Input
                  id="min-word-limit"
                  type="number"
                  value={editForm.minWordLimit}
                  onChange={(e) => setEditForm(prev => ({ ...prev, minWordLimit: e.target.value }))}
                  placeholder="Optional minimum words"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-word-limit">Maximum Word Count</Label>
                <Input
                  id="max-word-limit"
                  type="number"
                  value={editForm.maxWordLimit}
                  onChange={(e) => setEditForm(prev => ({ ...prev, maxWordLimit: e.target.value }))}
                  placeholder="Optional maximum words"
                  min="0"
                />
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-700 text-sm">
                <strong>Note:</strong> Editing these details will not affect existing submissions, scores, or learner data. Only the essay metadata will be updated.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEssay}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Modal */}
      <Dialog open={showViewDetailsModal} onOpenChange={setShowViewDetailsModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                Essay Submission - {selectedStudent?.name}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowViewDetailsModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Badge className="bg-blue-100 text-blue-800">
                  Word Count: {selectedStudent.wordCount}
                </Badge>
                {selectedStudent.score && (
                  <Badge className="bg-green-100 text-green-800">
                    Score: {selectedStudent.score}
                  </Badge>
                )}
                <Badge className={getStatusColor(selectedStudent.status)}>
                  {selectedStudent.status}
                </Badge>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Essay Content:</h4>
                <div className="text-gray-600 bg-gray-50 p-4 rounded max-h-96 overflow-y-auto">
                  <p className="whitespace-pre-wrap">{selectedStudent.response}</p>
                </div>
              </div>
              
              {selectedStudent.feedback && (
                <div className="bg-blue-50 p-3 rounded">
                  <h4 className="font-semibold text-blue-900 mb-2">Instructor Feedback:</h4>
                  <p className="text-blue-700">{selectedStudent.feedback}</p>
                </div>
              )}
              
              <p className="text-gray-500 text-sm">Submitted: {selectedStudent.submitted}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Score Response Modal */}
      <Dialog open={showScoreModal} onOpenChange={setShowScoreModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                View & Grade Essay - {selectedStudent?.name}
              </DialogTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowScoreModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {selectedStudent && (
            <div className="space-y-6">
              {/* Student Essay Section */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Student Essay Response
                </h4>
                {selectedStudent.response ? (
                  <div className="bg-gray-50 p-4 rounded-lg max-h-96 overflow-y-auto border">
                    <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {selectedStudent.response}
                    </p>
                  </div>
                ) : (
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-red-700 font-medium">No submission found.</p>
                    <p className="text-red-600 text-sm mt-1">This student has not submitted their essay yet.</p>
                  </div>
                )}
              </div>

              {/* Grading Section - Only show if student has submitted */}
              {selectedStudent.response && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Score Input */}
                    <div className="space-y-2">
                      <Label htmlFor="score-input" className="flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Score (out of {essay.maxScore})
                      </Label>
                      <Input
                        id="score-input"
                        type="number"
                        value={score}
                        onChange={(e) => setScore(e.target.value)}
                        placeholder="Enter score"
                        min="0"
                        max={essay.maxScore}
                        className="text-lg font-medium"
                      />
                    </div>

                    {/* Student Info */}
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Submission Details
                      </Label>
                      <div className="bg-blue-50 p-3 rounded-lg text-sm">
                        <p><strong>Word Count:</strong> {selectedStudent.wordCount}</p>
                        <p><strong>Time Spent:</strong> {selectedStudent.timeSpent}m</p>
                        <p><strong>Submitted:</strong> {selectedStudent.submitted}</p>
                      </div>
                    </div>
                  </div>

                  {/* Feedback Section */}
                  <div className="space-y-2">
                    <Label htmlFor="feedback-input" className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Feedback & Remarks (Optional)
                    </Label>
                    <Textarea
                      id="feedback-input"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Provide constructive feedback on the student's essay..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </>
              )}
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowScoreModal(false)}
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            {selectedStudent?.response && (
              <Button
                onClick={handleSubmitScore}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Grade
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EssayDashboard;