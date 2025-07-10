import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Clock, Target, BookOpen, Users, TrendingUp, Plus, Edit, Trash2, Save, ExternalLink, Eye } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const AdminAssignmentDashboard = () => {
  const { id: courseId, assignmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock assignments data
  const [assignments, setAssignments] = useState([
    {
      id: '1',
      name: 'Assignment 1',
      topic: 'Legal Research Fundamentals',
      totalQuestions: 4,
      timeLimit: 120,
      maxScore: 100,
      difficulty: 'Medium',
      description: 'Research and analyze legal cases related to contract law.'
    },
    {
      id: '2',
      name: 'Assignment 2',
      topic: 'Constitutional Law Analysis',
      totalQuestions: 3,
      timeLimit: 90,
      maxScore: 75,
      difficulty: 'Hard',
      description: 'Analyze constitutional amendments and their implications.'
    },
    {
      id: '3',
      name: 'Assignment 3',
      topic: 'Criminal Procedure',
      totalQuestions: 5,
      timeLimit: 150,
      maxScore: 125,
      difficulty: 'Easy',
      description: 'Study criminal procedure and due process requirements.'
    }
  ]);

  // Mock questions data
  const [questions, setQuestions] = useState([
    { id: '1', assignmentId: '1', text: 'What are the key elements of a valid contract?', points: 25 },
    { id: '2', assignmentId: '1', text: 'Explain the doctrine of consideration in contract law.', points: 25 },
    { id: '3', assignmentId: '1', text: 'Analyze a breach of contract scenario.', points: 25 },
    { id: '4', assignmentId: '1', text: 'Discuss remedies for contract violations.', points: 25 },
    { id: '5', assignmentId: '2', text: 'Explain the First Amendment rights.', points: 25 },
    { id: '6', assignmentId: '2', text: 'Analyze due process clause.', points: 25 },
    { id: '7', assignmentId: '2', text: 'Discuss equal protection under law.', points: 25 }
  ]);

  // Mock submissions data
  const [submissions, setSubmissions] = useState([
    {
      id: '1',
      userId: 'user1',
      userName: 'John Smith',
      userEmail: 'john@example.com',
      assignmentId: '1',
      submissionLink: 'https://drive.google.com/file/d/sample1',
      status: 'completed',
      score: 85,
      answers: [
        { questionId: '1', question: 'What are the key elements of a valid contract?', answer: 'Offer, acceptance, consideration, legal capacity, and lawful purpose are the key elements.' },
        { questionId: '2', question: 'Explain the doctrine of consideration in contract law.', answer: 'Consideration is the exchange of value between parties that makes a contract legally binding.' }
      ],
      submittedAt: '2024-01-15 14:30:00'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Sarah Johnson',
      userEmail: 'sarah@example.com',
      assignmentId: '1',
      submissionLink: 'https://drive.google.com/file/d/sample2',
      status: 'completed',
      score: 92,
      answers: [
        { questionId: '1', question: 'What are the key elements of a valid contract?', answer: 'A valid contract requires offer, acceptance, consideration, capacity, and legality.' },
        { questionId: '2', question: 'Explain the doctrine of consideration in contract law.', answer: 'Consideration ensures that both parties provide something of value in the agreement.' }
      ],
      submittedAt: '2024-01-16 10:15:00'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Mike Davis',
      userEmail: 'mike@example.com',
      assignmentId: '1',
      submissionLink: '',
      status: 'not_attempted',
      answers: []
    },
    {
      id: '4',
      userId: 'user4',
      userName: 'Emily Wilson',
      userEmail: 'emily@example.com',
      assignmentId: '1',
      submissionLink: '',
      status: 'not_attempted',
      answers: []
    }
  ]);

  // State management
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isEditingAssignment, setIsEditingAssignment] = useState(false);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [newQuestion, setNewQuestion] = useState({ text: '', points: 10 });
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isViewingResponse, setIsViewingResponse] = useState(false);

  const handleBack = () => {
    if (selectedAssignment) {
      setSelectedAssignment(null);
    } else {
      navigate(`/courses/edit/${courseId}`);
    }
  };

  const handleViewAssignment = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const handleSaveAssignment = () => {
    if (!selectedAssignment) return;
    
    setAssignments(assignments.map(a => 
      a.id === selectedAssignment.id ? selectedAssignment : a
    ));
    
    setIsEditingAssignment(false);
    toast({
      title: "Assignment Updated",
      description: "Assignment details have been successfully updated.",
    });
  };

  const handleAddQuestion = () => {
    if (!selectedAssignment || !newQuestion.text.trim()) return;
    
    const question = {
      id: Date.now().toString(),
      assignmentId: selectedAssignment.id,
      text: newQuestion.text,
      points: newQuestion.points
    };
    
    setQuestions([...questions, question]);
    
    // Update assignment total questions and max score
    const updatedAssignment = {
      ...selectedAssignment,
      totalQuestions: selectedAssignment.totalQuestions + 1,
      maxScore: selectedAssignment.maxScore + newQuestion.points
    };
    
    setSelectedAssignment(updatedAssignment);
    setAssignments(assignments.map(a => 
      a.id === selectedAssignment.id ? updatedAssignment : a
    ));
    
    setNewQuestion({ text: '', points: 10 });
    setIsAddingQuestion(false);
    
    toast({
      title: "Question Added",
      description: "New question has been added successfully.",
    });
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
  };

  const handleSaveQuestionEdit = () => {
    if (!editingQuestion || !selectedAssignment) return;
    
    const oldQuestion = questions.find(q => q.id === editingQuestion.id);
    const pointsDiff = editingQuestion.points - (oldQuestion?.points || 0);
    
    setQuestions(questions.map(q => 
      q.id === editingQuestion.id ? editingQuestion : q
    ));
    
    // Update assignment max score
    const updatedAssignment = {
      ...selectedAssignment,
      maxScore: selectedAssignment.maxScore + pointsDiff
    };
    
    setSelectedAssignment(updatedAssignment);
    setAssignments(assignments.map(a => 
      a.id === selectedAssignment.id ? updatedAssignment : a
    ));
    
    setEditingQuestion(null);
    
    toast({
      title: "Question Updated",
      description: "Question has been updated successfully.",
    });
  };

  const handleDeleteQuestion = (questionId) => {
    if (!selectedAssignment) return;
    
    const questionToDelete = questions.find(q => q.id === questionId);
    if (!questionToDelete) return;
    
    setQuestions(questions.filter(q => q.id !== questionId));
    
    // Update assignment total questions and max score
    const updatedAssignment = {
      ...selectedAssignment,
      totalQuestions: selectedAssignment.totalQuestions - 1,
      maxScore: selectedAssignment.maxScore - questionToDelete.points
    };
    
    setSelectedAssignment(updatedAssignment);
    setAssignments(assignments.map(a => 
      a.id === selectedAssignment.id ? updatedAssignment : a
    ));
    
    toast({
      title: "Question Deleted",
      description: "Question has been deleted successfully.",
    });
  };

  const handleViewResponse = (submission) => {
    setSelectedSubmission(submission);
    setIsViewingResponse(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const assignmentQuestions = questions.filter(q => q.assignmentId === selectedAssignment?.id);
  const assignmentSubmissions = submissions.filter(s => s.assignmentId === selectedAssignment?.id);
  const completedSubmissions = assignmentSubmissions.filter(s => s.status === 'completed');

  // Analytics data
  const scoresData = completedSubmissions.map(s => ({ name: s.userName.split(' ')[0], score: s.score || 0 }));
  const highestScore = completedSubmissions.length > 0 ? Math.max(...completedSubmissions.map(s => s.score || 0)) : 0;
  const lowestScore = completedSubmissions.length > 0 ? Math.min(...completedSubmissions.map(s => s.score || 0)) : 0;
  const averageScore = completedSubmissions.length > 0 ? Math.round(completedSubmissions.reduce((sum, s) => sum + (s.score || 0), 0) / completedSubmissions.length) : 0;

  if (!selectedAssignment) {
    // Assignment listing view
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <div className="flex pt-16">
          <div className="fixed left-0 top-0 bottom-0 w-64 z-40">
            <div className="h-full overflow-hidden">
              <SidebarNav onCloseMobile={() => {}} />
            </div>
          </div>
          
          <div className="flex-1 ml-64">
            <div className="p-4 md:p-6 space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleBack}
                    className="rounded-full px-4"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Assessments
                  </Button>
                  <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-900">Assignment Management</h1>
                    <p className="text-gray-600 text-sm md:text-base">Manage and evaluate assignment submissions</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {assignments.map((assignment) => (
                  <Card key={assignment.id} className="hover:shadow-md transition-shadow duration-200 border-l-4 border-l-purple-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <FileText className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                          </div>
                          <div>
                            <CardTitle className="text-base md:text-lg font-semibold text-gray-900">{assignment.name}</CardTitle>
                            <p className="text-xs md:text-sm text-gray-600 mt-1">{assignment.topic}</p>
                          </div>
                        </div>
                        <Badge className={getDifficultyColor(assignment.difficulty)}>
                          {assignment.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4">
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{assignment.totalQuestions} Questions</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <Clock className="h-3 w-3 md:h-4 md:w-4" />
                          <span>{assignment.timeLimit} mins</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                          <Target className="h-3 w-3 md:h-4 md:w-4" />
                          <span>Max: {assignment.maxScore}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleViewAssignment(assignment)}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white text-sm md:text-base"
                      >
                        View Assignment
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assignment detail view
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex pt-16">
        <div className="fixed left-0 top-0 bottom-0 w-64 z-40">
          <div className="h-full overflow-hidden">
            <SidebarNav onCloseMobile={() => {}} />
          </div>
        </div>
        
        <div className="flex-1 ml-64">
          <div className="p-4 md:p-6 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBack}
                  className="rounded-full px-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Assignments
                </Button>
                <div>
                  <h1 className="text-xl md:text-2xl font-bold text-gray-900">Assignment Dashboard</h1>
                  <p className="text-gray-600 text-sm md:text-base">Manage and evaluate assignment activities</p>
                </div>
              </div>
            </div>

            {/* Assignment Info Card */}
            <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
              <CardHeader>
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-2">
                      <CardTitle className="text-lg md:text-xl text-purple-900">{selectedAssignment.topic}</CardTitle>
                      <Badge className={getDifficultyColor(selectedAssignment.difficulty)}>
                        {selectedAssignment.difficulty}
                      </Badge>
                    </div>
                    <p className="text-purple-700 mb-4 text-sm md:text-base">{selectedAssignment.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm mb-4">
                      <div className="flex items-center gap-2 text-purple-600">
                        <Clock className="h-3 w-3 md:h-4 md:w-4" />
                        <span>Time: {selectedAssignment.timeLimit} mins</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-600">
                        <Target className="h-3 w-3 md:h-4 md:w-4" />
                        <span>Max Score: {selectedAssignment.maxScore}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-600">
                        <BookOpen className="h-3 w-3 md:h-4 md:w-4" />
                        <span>{selectedAssignment.totalQuestions} questions</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-600">
                        <span>📊</span>
                        <span>Difficulty: {selectedAssignment.difficulty}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => setIsEditingAssignment(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      size="sm"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Assignment
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto">
                <TabsTrigger value="overview" className="text-xs md:text-sm">Overview</TabsTrigger>
                <TabsTrigger value="questions" className="text-xs md:text-sm">Questions</TabsTrigger>
                <TabsTrigger value="scores" className="text-xs md:text-sm">Scores</TabsTrigger>
                <TabsTrigger value="submission-status" className="text-xs md:text-sm">Submission Status</TabsTrigger>
                <TabsTrigger value="analytics" className="text-xs md:text-sm">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Assignment Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-base md:text-lg font-semibold mb-4">Assignment Information</h3>
                        <div className="space-y-3">
                          <div>
                            <span className="font-medium text-sm md:text-base">Topic:</span>
                            <p className="text-sm md:text-base text-gray-700">{selectedAssignment.topic}</p>
                          </div>
                          <div>
                            <span className="font-medium text-sm md:text-base">Description:</span>
                            <p className="text-sm md:text-base text-gray-700">{selectedAssignment.description}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                            <Clock className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-600">Time Limit</p>
                            <p className="text-base md:text-lg font-semibold">{selectedAssignment.timeLimit} minutes</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <Target className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-600">Max Score</p>
                            <p className="text-base md:text-lg font-semibold">{selectedAssignment.maxScore}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <BookOpen className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-600">Questions</p>
                            <p className="text-base md:text-lg font-semibold">{selectedAssignment.totalQuestions}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                            <span className="text-lg md:text-xl">🏆</span>
                          </div>
                          <div>
                            <p className="text-xs md:text-sm text-gray-600">Difficulty</p>
                            <p className="text-base md:text-lg font-semibold">{selectedAssignment.difficulty}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                          <span className="font-semibold text-blue-900 text-sm md:text-base">Total Enrolled</span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-blue-600">{assignmentSubmissions.length}</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
                          <span className="font-semibold text-green-900 text-sm md:text-base">Completed</span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-green-600">{completedSubmissions.length}</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                          <span className="font-semibold text-orange-900 text-sm md:text-base">Average Score</span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-orange-600">{averageScore}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <CardTitle className="text-lg md:text-xl">Assignment Questions</CardTitle>
                      <Button 
                        onClick={() => setIsAddingQuestion(true)}
                        className="bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Question
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignmentQuestions.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No questions added yet. Click "Add Question" to get started.</p>
                      </div>
                    ) : (
                      assignmentQuestions.map((question, index) => (
                        <Card key={question.id} className="border-l-4 border-l-purple-500">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-4">
                              <div className="flex items-center gap-3">
                                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                  Question {index + 1}
                                </h3>
                                <span className="text-xs md:text-sm text-purple-600 font-medium">
                                  {question.points} points
                                </span>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditQuestion(question)}
                                >
                                  <Edit className="h-3 w-3 md:h-4 md:w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleDeleteQuestion(question.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                              <p className="font-medium text-sm md:text-base">{question.text}</p>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="scores" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Student Scores & Responses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {completedSubmissions.length === 0 ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No submissions with scores yet.</p>
                        </div>
                      ) : (
                        completedSubmissions.map((submission) => (
                          <div key={submission.id} className="border rounded-lg p-4">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                                  <span className="text-purple-600 font-semibold text-xs md:text-sm">
                                    {submission.userName.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-900 text-sm md:text-base">{submission.userName}</h4>
                                  <p className="text-xs md:text-sm text-gray-600">{submission.userEmail}</p>
                                  {submission.submittedAt && (
                                    <p className="text-xs text-gray-500">Submitted: {submission.submittedAt}</p>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="text-lg font-bold text-purple-600">
                                    {submission.score}/{selectedAssignment.maxScore}
                                  </div>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleViewResponse(submission)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Response
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submission-status" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Submission Status</CardTitle>
                    <p className="text-gray-600 text-sm md:text-base">Track student progress and submission status</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">{completedSubmissions.length}</div>
                        <div className="text-xs md:text-sm text-gray-600">✅ Completed</div>
                      </div>
                      <div className="text-center p-6 bg-red-50 rounded-lg">
                        <div className="text-2xl md:text-3xl font-bold text-red-600 mb-1">{assignmentSubmissions.filter(s => s.status === 'not_attempted').length}</div>
                        <div className="text-xs md:text-sm text-gray-600">❌ Not Attempted</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {assignmentSubmissions.map((submission) => (
                        <div key={submission.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 font-semibold text-xs md:text-sm">
                                {submission.userName.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 text-sm md:text-base">{submission.userName}</h4>
                              <p className="text-xs md:text-sm text-gray-600">{submission.userEmail}</p>
                              {submission.submittedAt && (
                                <p className="text-xs text-gray-500">Submitted: {submission.submittedAt}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`${
                              submission.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {submission.status === 'completed' ? '✅ Completed' : '❌ Not Attempted'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg md:text-xl">Assignment Analytics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <div className="text-xl md:text-2xl font-bold text-blue-600">{highestScore}</div>
                        <div className="text-xs md:text-sm text-gray-600">Highest Score</div>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg text-center">
                        <div className="text-xl md:text-2xl font-bold text-red-600">{lowestScore}</div>
                        <div className="text-xs md:text-sm text-gray-600">Lowest Score</div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <div className="text-xl md:text-2xl font-bold text-green-600">{averageScore}</div>
                        <div className="text-xs md:text-sm text-gray-600">Average Score</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <div className="text-xl md:text-2xl font-bold text-purple-600">{completedSubmissions.length}</div>
                        <div className="text-xs md:text-sm text-gray-600">Total Participants</div>
                      </div>
                    </div>

                    {scoresData.length > 0 && (
                      <div className="h-48 md:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={scoresData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="score" fill="#a855f7" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Edit Assignment Modal */}
      <Dialog open={isEditingAssignment} onOpenChange={setIsEditingAssignment}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Topic Name</Label>
              <Input
                id="topic"
                value={selectedAssignment?.topic || ''}
                onChange={(e) => selectedAssignment && setSelectedAssignment({...selectedAssignment, topic: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={selectedAssignment?.description || ''}
                onChange={(e) => selectedAssignment && setSelectedAssignment({...selectedAssignment, description: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={selectedAssignment?.timeLimit || 0}
                onChange={(e) => selectedAssignment && setSelectedAssignment({...selectedAssignment, timeLimit: parseInt(e.target.value)})}
              />
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty Level</Label>
              <Select 
                value={selectedAssignment?.difficulty || 'Medium'} 
                onValueChange={(value) => selectedAssignment && setSelectedAssignment({...selectedAssignment, difficulty: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingAssignment(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAssignment}>
              <Save className="h-4 w-4 mr-2" />
              Save Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Question Modal */}
      <Dialog open={isAddingQuestion} onOpenChange={setIsAddingQuestion}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Question</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="questionText">Question Text</Label>
              <Textarea
                id="questionText"
                value={newQuestion.text}
                onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                placeholder="Enter the question text here..."
              />
            </div>
            <div>
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="number"
                value={newQuestion.points}
                onChange={(e) => setNewQuestion({...newQuestion, points: parseInt(e.target.value) || 10})}
                min="1"
                max="100"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingQuestion(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddQuestion} disabled={!newQuestion.text.trim()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Question Modal */}
      <Dialog open={!!editingQuestion} onOpenChange={() => setEditingQuestion(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Question</DialogTitle>
          </DialogHeader>
          {editingQuestion && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="editQuestionText">Question Text</Label>
                <Textarea
                  id="editQuestionText"
                  value={editingQuestion.text}
                  onChange={(e) => setEditingQuestion({...editingQuestion, text: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="editPoints">Points</Label>
                <Input
                  id="editPoints"
                  type="number"
                  value={editingQuestion.points}
                  onChange={(e) => setEditingQuestion({...editingQuestion, points: parseInt(e.target.value) || 10})}
                  min="1"
                  max="100"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingQuestion(null)}>
              Cancel
            </Button>
            <Button onClick={handleSaveQuestionEdit}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Response Modal */}
      <Dialog open={isViewingResponse} onOpenChange={setIsViewingResponse}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Student Response - {selectedSubmission?.userName}</DialogTitle>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">Student Information</h3>
                <p className="text-blue-700">Name: {selectedSubmission.userName}</p>
                <p className="text-blue-700">Email: {selectedSubmission.userEmail}</p>
                {selectedSubmission.submittedAt && (
                  <p className="text-blue-700">Submitted: {selectedSubmission.submittedAt}</p>
                )}
                {selectedSubmission.submissionLink && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(selectedSubmission.submissionLink, '_blank')}
                    className="mt-2"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Original Submission
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Responses to Questions</h3>
                {selectedSubmission.answers.map((answer, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="mb-3">
                      <h4 className="font-semibold text-purple-900">Question {index + 1}:</h4>
                      <p className="text-gray-700">{answer.question}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-900 mb-2">Student Answer:</h4>
                      <div className="bg-gray-50 p-3 rounded border">
                        <p className="text-gray-800">{answer.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {selectedSubmission.score && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-900">Final Score</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedSubmission.score} / {selectedAssignment.maxScore}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewingResponse(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAssignmentDashboard;