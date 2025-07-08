
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Clock, Target, BookOpen, Users, TrendingUp, Edit, Trash2, Eye, BarChart3, Activity, Timer } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { AssignmentEditModal } from '@/components/courses/assessments/AssignmentEditModal';
import { AssignmentInstructionsModal } from '@/components/courses/assessments/AssignmentInstructionsModal';
import { AssignmentQuestionModal } from '@/components/courses/assessments/AssignmentQuestionModal';
import { AssignmentGradingModal } from '@/components/courses/assessments/AssignmentGradingModal';
import { useToast } from '@/hooks/use-toast';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from 'recharts';

const AssignmentDashboard = () => {
  const { id: courseId, assignmentId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [gradingStudent, setGradingStudent] = useState<any>(null);

  // Mock assignment data with state management
  const [assignment, setAssignment] = useState({
    id: assignmentId,
    title: 'Legal Research Assignment',
    description: 'Research and present findings on a legal topic of your choice. This assignment requires you to demonstrate your research skills and ability to analyze legal documents.',
    type: 'Research Assignment',
    timeLimit: 120,
    maxScore: 100,
    difficulty: 'Medium' as const,
    wordLimit: 1500,
    status: 'Published',
    instructions: 'Please follow the guidelines provided in the course materials. Submit your work in PDF format with proper citations.'
  });

  // Mock questions data
  const [questions, setQuestions] = useState([
    { id: 1, question: 'What is the main legal principle in this case?', type: 'Descriptive', points: 25 },
    { id: 2, question: 'Choose the correct legal precedent:', type: 'MCQ', points: 15, options: ['Option A', 'Option B', 'Option C'] },
    { id: 3, question: 'Analyze the court\'s decision and provide your opinion.', type: 'Descriptive', points: 60 }
  ]);

  // Mock students data
  const students = [
    { id: 1, name: 'John Doe', status: 'Submitted', score: 85, submittedAt: '2024-01-15', response: 'This is John\'s detailed response to the assignment...', feedback: 'Great work on legal analysis.', timeSpent: 95 },
    { id: 2, name: 'Jane Smith', status: 'Submitted', score: null, submittedAt: '2024-01-14', response: 'This is Jane\'s detailed response to the assignment...', feedback: '', timeSpent: 110 },
    { id: 3, name: 'Mike Johnson', status: 'Submitted', score: 78, submittedAt: '2024-01-16', response: 'This is Mike\'s detailed response to the assignment...', feedback: 'Good effort, needs improvement in citations.', timeSpent: 88 },
    { id: 4, name: 'Sarah Wilson', status: 'Not Submitted', score: null, submittedAt: null, response: null, feedback: '', timeSpent: 0 },
    { id: 5, name: 'Tom Brown', status: 'Not Submitted', score: null, submittedAt: null, response: null, feedback: '', timeSpent: 0 },
  ];

  const handleBack = () => {
    navigate(`/courses/edit/${courseId}`);
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditAssignment = () => {
    setShowEditModal(true);
  };

  const handleSaveAssignment = (data: any) => {
    setAssignment(prev => ({ ...prev, ...data }));
    toast({
      title: "✅ Assignment Updated",
      description: "Assignment details have been successfully updated.",
    });
  };

  const handleEditInstructions = () => {
    setShowInstructionsModal(true);
  };

  const handleSaveInstructions = (instructions: string) => {
    setAssignment(prev => ({ ...prev, instructions }));
    toast({
      title: "✅ Instructions Updated",
      description: "Assignment instructions have been successfully updated.",
    });
  };

  const handleEditQuestion = (question: any) => {
    setEditingQuestion(question);
    setShowQuestionModal(true);
  };

  const handleDeleteQuestion = (questionId: number) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
    toast({
      title: "✅ Question Deleted",
      description: "Question has been successfully deleted.",
    });
  };

  const handleSaveQuestion = (data: any) => {
    if (editingQuestion) {
      setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? { ...q, ...data } : q));
    }
    toast({
      title: "✅ Question Updated",
      description: "Question has been successfully updated.",
    });
  };

  const handleViewAndGrade = (student: any) => {
    setGradingStudent(student);
    setShowGradingModal(true);
  };

  const handleSaveGrade = (gradeData: any) => {
    toast({
      title: "✅ Grade Saved",
      description: `Grade for ${gradingStudent.name} has been successfully saved.`,
    });
  };

  // Calculate metrics
  const submittedCount = students.filter(s => s.status === 'Submitted').length;
  const gradedCount = students.filter(s => s.score !== null).length;
  const scores = students.filter(s => s.score !== null).map(s => s.score);
  const averageScore = scores.length > 0 ? scores.reduce((sum, s) => sum + s, 0) / scores.length : 0;
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;
  const completionRate = (submittedCount / students.length) * 100;
  const averageTimeSpent = students.filter(s => s.timeSpent > 0).reduce((sum, s) => sum + s.timeSpent, 0) / students.filter(s => s.timeSpent > 0).length || 0;
  const passRate = scores.length > 0 ? (scores.filter(s => s >= 60).length / scores.length) * 100 : 0;

  // Analytics data for graphs
  const scoreDistributionData = [
    { range: '0-20', count: scores.filter(s => s >= 0 && s <= 20).length },
    { range: '21-40', count: scores.filter(s => s >= 21 && s <= 40).length },
    { range: '41-60', count: scores.filter(s => s >= 41 && s <= 60).length },
    { range: '61-80', count: scores.filter(s => s >= 61 && s <= 80).length },
    { range: '81-100', count: scores.filter(s => s >= 81 && s <= 100).length }
  ];

  const completionStatusData = [
    { name: 'Completed', value: submittedCount, color: '#10B981' },
    { name: 'Not Completed', value: students.length - submittedCount, color: '#EF4444' }
  ];

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
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleBack}
                  className="rounded-full px-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Modules
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Assignment Dashboard</h1>
                  <p className="text-gray-600">Manage and evaluate assignment submissions</p>
                </div>
              </div>
            </div>

            {/* Assignment Info Card */}
            <Card className="bg-gradient-to-r from-purple-100 to-blue-100 border-purple-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-purple-900">{assignment.title}</CardTitle>
                      <Badge className={getDifficultyColor(assignment.difficulty)}>
                        {assignment.difficulty}
                      </Badge>
                    </div>
                    <p className="text-purple-700 mb-4">{assignment.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-purple-600">
                        <Clock className="h-4 w-4" />
                        <span>Time: {assignment.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-600">
                        <Target className="h-4 w-4" />
                        <span>Max Score: {assignment.maxScore}</span>
                      </div>
                      <div className="flex items-center gap-2 text-purple-600">
                        <BookOpen className="h-4 w-4" />
                        <span>{assignment.wordLimit} words</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="submissions">Submission Status</TabsTrigger>
                <TabsTrigger value="grades">Grades</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
              </TabsList>

              
              <TabsContent value="overview" className="space-y-6">
                {/* Top Row: Assignment Details and Insights Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Assignment Details Card */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Assignment Details</CardTitle>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleEditAssignment}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">Type</h4>
                        <p className="font-semibold">{assignment.type}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">Duration</h4>
                        <p className="font-semibold">{assignment.timeLimit} minutes</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">Word Limit</h4>
                        <p className="font-semibold">{assignment.wordLimit} words</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">Max Score</h4>
                        <p className="font-semibold">{assignment.maxScore} points</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500">Difficulty</h4>
                        <Badge className={getDifficultyColor(assignment.difficulty)}>
                          {assignment.difficulty}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Assignment Insights Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Assignment Insights</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Total Learners</h4>
                          <p className="text-2xl font-bold text-blue-600">{students.length}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Submitted</h4>
                          <p className="text-2xl font-bold text-green-600">{submittedCount}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Graded</h4>
                          <p className="text-2xl font-bold text-purple-600">{gradedCount}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Avg Score</h4>
                          <p className="text-2xl font-bold text-orange-600">{Math.round(averageScore)}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bottom Row: Instructions Card Full Width */}
                <div className="w-full">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Instructions</CardTitle>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={handleEditInstructions}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">
                        {assignment.instructions}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Assignment Questions</CardTitle>
                      <Button onClick={() => setShowQuestionModal(true)}>
                        Add Question
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {questions.map((question, index) => (
                        <div key={question.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium">Q{index + 1}. {question.question}</h4>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{question.type}</Badge>
                              <Badge variant="secondary">{question.points} points</Badge>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditQuestion(question)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteQuestion(question.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submissions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Submission Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Learner Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Submitted At</TableHead>
                          <TableHead>Time Spent</TableHead>
                          <TableHead>Grade Status</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>
                              <Badge variant={student.status === 'Submitted' ? 'default' : 'destructive'}>
                                {student.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{student.submittedAt || '-'}</TableCell>
                            <TableCell>{student.timeSpent > 0 ? `${student.timeSpent} min` : '-'}</TableCell>
                            <TableCell>
                              {student.score !== null ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700">
                                  Graded
                                </Badge>
                              ) : student.status === 'Submitted' ? (
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                                  Pending
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                                  Not Available
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {student.status === 'Submitted' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleViewAndGrade(student)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  Review
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="grades" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Grades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Learner Name</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Submitted At</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>
                              <Badge variant={student.status === 'Submitted' ? 'default' : 'destructive'}>
                                {student.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {student.score !== null ? `${student.score}/100` : '-'}
                            </TableCell>
                            <TableCell>{student.submittedAt || '-'}</TableCell>
                            <TableCell>
                              {student.status === 'Submitted' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleViewAndGrade(student)}
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View & Grade
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-6">
                {/* Top Stats Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Assignment Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-green-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Highest Score</h3>
                        <p className="text-3xl font-bold text-green-600">{highestScore}/100</p>
                        <p className="text-sm text-green-600 mt-1">+5.2%</p>
                      </div>
                      <div className="text-center p-6 bg-red-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Lowest Score</h3>
                        <p className="text-3xl font-bold text-red-600">{lowestScore}/100</p>
                        <p className="text-sm text-red-600 mt-1">+2.8%</p>
                      </div>
                      <div className="text-center p-6 bg-blue-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Average Score</h3>
                        <p className="text-3xl font-bold text-blue-600">{averageScore.toFixed(1)}/100</p>
                        <p className="text-sm text-blue-600 mt-1">+3.1%</p>
                      </div>
                      <div className="text-center p-6 bg-purple-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Total Participants</h3>
                        <p className="text-3xl font-bold text-purple-600">{students.length}</p>
                      </div>
                      <div className="text-center p-6 bg-orange-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Completion Rate</h3>
                        <p className="text-3xl font-bold text-orange-600">{completionRate.toFixed(1)}%</p>
                        <p className="text-sm text-orange-600 mt-1">+1.5%</p>
                      </div>
                      <div className="text-center p-6 bg-indigo-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Average Time Spent</h3>
                        <p className="text-3xl font-bold text-indigo-600">{Math.round(averageTimeSpent)} min</p>
                        <p className="text-sm text-indigo-600 mt-1">+4.2%</p>
                      </div>
                      <div className="text-center p-6 bg-teal-50 rounded-lg col-span-full lg:col-span-1 lg:col-start-2">
                        <h3 className="font-semibold text-gray-900 mb-2">Pass Rate</h3>
                        <p className="text-3xl font-bold text-teal-600">{passRate.toFixed(1)}%</p>
                        <p className="text-sm text-teal-600 mt-1">+2.3%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Graphs Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Score Distribution */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Score Distribution</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={scoreDistributionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Completion Status */}
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Completion Status</h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={completionStatusData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, value }) => `${name}: ${value}`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {completionStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AssignmentEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        assignmentData={assignment}
        onUpdate={handleSaveAssignment}
      />

      <AssignmentInstructionsModal
        isOpen={showInstructionsModal}
        onClose={() => setShowInstructionsModal(false)}
        instructions={assignment.instructions}
        onSave={handleSaveInstructions}
      />

      {showQuestionModal && (
        <AssignmentQuestionModal
          isOpen={showQuestionModal}
          onClose={() => {
            setShowQuestionModal(false);
            setEditingQuestion(null);
          }}
          questionData={editingQuestion}
          onSave={handleSaveQuestion}
        />
      )}

      {gradingStudent && (
        <AssignmentGradingModal
          isOpen={showGradingModal}
          onClose={() => {
            setShowGradingModal(false);
            setGradingStudent(null);
          }}
          studentData={gradingStudent}
          onSave={handleSaveGrade}
        />
      )}
    </div>
  );
};

export default AssignmentDashboard;
