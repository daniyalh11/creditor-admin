import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Clock, Target, BookOpen, Users, TrendingUp, Edit, BarChart3 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { InstructionBlock } from '@/components/courses/assessments/InstructionBlock';
import { useToast } from '@/hooks/use-toast';

const QuizDashboard = () => {
  const { id: courseId, quizId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [quiz, setQuiz] = useState({
    id: quizId,
    title: 'Module 1 Quiz: Legal Foundations',
    description: 'Test your understanding of basic legal concepts and terminology covered in Module 1.',
    questions: 15,
    timeLimit: 30,
    attempts: 3,
    passingScore: 70,
    maxScore: 100,
    status: 'Published',
    instructions: 'Please read each question carefully before selecting your answer. You have 30 minutes to complete this quiz and up to 3 attempts. A passing score of 70% is required.'
  });

  const handleSaveInstructions = (instructions) => {
    setQuiz(prev => ({
      ...prev,
      instructions
    }));
  };

  const handleBack = () => {
    navigate(`/courses/edit/${courseId}`);
  };

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
                  <h1 className="text-2xl font-bold text-gray-900">Quiz Dashboard</h1>
                  <p className="text-gray-600">Manage and analyze quiz performance</p>
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-blue-900">{quiz.title}</CardTitle>
                      <Badge className="bg-blue-100 text-blue-800">Quiz</Badge>
                    </div>
                    <p className="text-blue-700 mb-4">{quiz.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-blue-600">
                        <BookOpen className="h-4 w-4" />
                        <span>{quiz.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <Clock className="h-4 w-4" />
                        <span>{quiz.timeLimit} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-blue-600">
                        <Target className="h-4 w-4" />
                        <span>{quiz.attempts} attempts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="attempts">Attempts</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <InstructionBlock
                  title="Quiz"
                  instructions={quiz.instructions}
                  onSave={handleSaveInstructions}
                />

                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Quiz Settings</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Questions</h4>
                          <p className="font-semibold text-lg">{quiz.questions}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Time Limit</h4>
                          <p className="font-semibold text-lg">{quiz.timeLimit} minutes</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Attempts Allowed</h4>
                          <p className="font-semibold text-lg">{quiz.attempts}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Passing Score</h4>
                          <p className="font-semibold text-lg">{quiz.passingScore}%</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-3">Quiz Statistics</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            <span className="font-semibold text-blue-900">Total Enrolled</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-600">45</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Target className="h-5 w-5 text-green-600" />
                            <span className="font-semibold text-green-900">Completed</span>
                          </div>
                          <p className="text-2xl font-bold text-green-600">32</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-orange-600" />
                            <span className="font-semibold text-orange-900">Pass Rate</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-600">78%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3, 4, 5].map((q) => (
                        <div key={q} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Question {q}</h4>
                            <p className="text-sm text-gray-500">Multiple Choice</p>
                          </div>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="attempts" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Attempts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'John Doe', attempts: 2, bestScore: 85, status: 'Passed' },
                        { name: 'Jane Smith', attempts: 1, bestScore: 92, status: 'Passed' },
                        { name: 'Mike Johnson', attempts: 3, bestScore: 68, status: 'Failed' },
                        { name: 'Sarah Wilson', attempts: 1, bestScore: 76, status: 'Passed' },
                      ].map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            <p className="text-sm text-gray-500">Attempts: {student.attempts}/3</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold">Best Score: {student.bestScore}%</p>
                              <Badge variant={student.status === 'Passed' ? 'default' : 'destructive'}>
                                {student.status}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {[
                        { name: 'John Doe', score: 85, timeSpent: '18 min', answers: [true, true, false, true, true] },
                        { name: 'Jane Smith', score: 92, timeSpent: '22 min', answers: [true, true, true, true, false] },
                      ].map((result, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold">{result.name}</h4>
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-gray-500">Time: {result.timeSpent}</span>
                              <Badge className="bg-blue-100 text-blue-800">Score: {result.score}%</Badge>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-gray-700">Question Performance:</p>
                            <div className="flex gap-2">
                              {result.answers.map((correct, qIndex) => (
                                <div
                                  key={qIndex}
                                  className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                                    correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                  }`}
                                >
                                  {qIndex + 1}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">Average Score</h3>
                        <p className="text-3xl font-bold text-blue-600">78%</p>
                        <p className="text-sm text-gray-500">Across all attempts</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">Completion Rate</h3>
                        <p className="text-3xl font-bold text-green-600">71%</p>
                        <p className="text-sm text-gray-500">Students completed</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">Average Time</h3>
                        <p className="text-3xl font-bold text-yellow-600">20</p>
                        <p className="text-sm text-gray-500">Minutes per attempt</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">Pass Rate</h3>
                        <p className="text-3xl font-bold text-purple-600">78%</p>
                        <p className="text-sm text-gray-500">Above 70%</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDashboard;
