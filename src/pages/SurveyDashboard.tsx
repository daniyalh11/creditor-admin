import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Clock, Target, BookOpen, Users, TrendingUp, Edit, BarChart3 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { SidebarNav } from '@/components/layout/SidebarNav';
import { SurveyDetailsEditModal } from '@/components/surveys/SurveyDetailsEditModal';
import { SurveyQuestionEditModal } from '@/components/surveys/SurveyQuestionEditModal';
import { InstructionBlock } from '@/components/courses/assessments/InstructionBlock';
import { useToast } from '@/hooks/use-toast';

const SurveyDashboard = () => {
  const { id: courseId, surveyId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Modal states
  const [showDetailsEditModal, setShowDetailsEditModal] = useState(false);
  const [showQuestionEditModal, setShowQuestionEditModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  
  // Mock survey data - with state management
  const [survey, setSurvey] = useState({
    id: surveyId,
    title: 'Course Feedback Survey',
    description: 'Share your thoughts about the course content and delivery methods. Your feedback helps us improve the learning experience.',
    estimatedTime: 15,
    questions: 8,
    responseLimit: 'unlimited',
    surveyType: 'Feedback Survey',
    status: 'Published',
    instructions: 'Please take a few minutes to provide honest feedback about your learning experience. Your responses are anonymous and will help us improve the course for future learners. Answer all questions to the best of your ability.'
  });

  // Mock questions data
  const [questions, setQuestions] = useState([
    { id: 1, question: 'How would you rate the overall course content?', type: 'Rating Scale' },
    { id: 2, question: 'Which topics did you find most valuable?', type: 'Multiple Choice' },
    { id: 3, question: 'What improvements would you suggest for future courses?', type: 'Text Response' },
    { id: 4, question: 'How clear were the course instructions?', type: 'Rating Scale' },
    { id: 5, question: 'Would you recommend this course to others?', type: 'Yes/No' },
  ]);

  const handleBack = () => {
    navigate(`/courses/edit/${courseId}`);
  };

  const handleEditSurveyDetails = () => {
    setShowDetailsEditModal(true);
  };

  const handleSaveSurveyDetails = (data: any) => {
    setSurvey(prev => ({
      ...prev,
      title: data.title,
      description: data.description,
      estimatedTime: data.estimatedTime,
      responseLimit: data.responseLimit
    }));
    
    toast({
      title: "✅ Survey Updated",
      description: "Survey details have been successfully updated.",
    });
  };

  const handleSaveInstructions = (instructions: string) => {
    setSurvey(prev => ({
      ...prev,
      instructions
    }));
  };

  const handleEditQuestion = (question: any) => {
    setEditingQuestion(question);
    setShowQuestionEditModal(true);
  };

  const handleSaveQuestion = (updatedQuestion: any) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === updatedQuestion.id 
          ? { ...q, question: updatedQuestion.question, type: updatedQuestion.type }
          : q
      )
    );
    
    toast({
      title: "✅ Question Updated",
      description: "Question has been successfully updated.",
    });
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
                  <h1 className="text-2xl font-bold text-gray-900">Survey Dashboard</h1>
                  <p className="text-gray-600">Manage and analyze survey responses</p>
                </div>
              </div>
            </div>

            {/* Survey Info Card */}
            <Card className="bg-gradient-to-r from-green-100 to-blue-100 border-green-200">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-green-900">{survey.title}</CardTitle>
                      <Badge className="bg-green-100 text-green-800">{survey.surveyType}</Badge>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-8 px-3"
                        onClick={handleEditSurveyDetails}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                    <p className="text-green-700 mb-4">{survey.description}</p>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="flex items-center gap-2 text-green-600">
                        <Clock className="h-4 w-4" />
                        <span>Time: {survey.estimatedTime} minutes</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <BarChart3 className="h-4 w-4" />
                        <span>{survey.questions} questions</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-600">
                        <Users className="h-4 w-4" />
                        <span>Responses: {survey.responseLimit}</span>
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
                <TabsTrigger value="response-status">Response Status</TabsTrigger>
                <TabsTrigger value="responses">Responses</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Instructions Block */}
                <InstructionBlock
                  title="Survey"
                  instructions={survey.instructions}
                  onSave={handleSaveInstructions}
                />

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Survey Overview</CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleEditSurveyDetails}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Survey Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Survey Information</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Questions</h4>
                          <p className="font-semibold text-lg">{survey.questions}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Estimated Time</h4>
                          <p className="font-semibold text-lg">{survey.estimatedTime} minutes</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Response Limit</h4>
                          <p className="font-semibold text-lg capitalize">{survey.responseLimit}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-500">Status</h4>
                          <Badge variant="default">{survey.status}</Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-3">Survey Statistics</h3>
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
                          <p className="text-2xl font-bold text-green-600">28</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-orange-600" />
                            <span className="font-semibold text-orange-900">Response Rate</span>
                          </div>
                          <p className="text-2xl font-bold text-orange-600">62%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="questions" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Survey Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {questions.map((q) => (
                        <div key={q.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">Q{q.id}. {q.question}</h4>
                            <Badge variant="outline" className="mt-1">{q.type}</Badge>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditQuestion(q)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="response-status" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Response Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'John Doe', status: 'Completed', completedAt: '2024-01-15' },
                        { name: 'Jane Smith', status: 'Completed', completedAt: '2024-01-14' },
                        { name: 'Mike Johnson', status: 'Completed', completedAt: '2024-01-16' },
                        { name: 'Sarah Wilson', status: 'Not Attempted', completedAt: null },
                        { name: 'Tom Brown', status: 'Not Attempted', completedAt: null },
                      ].map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{student.name}</h4>
                            {student.completedAt && (
                              <p className="text-sm text-gray-500">Completed: {student.completedAt}</p>
                            )}
                          </div>
                          <Badge variant={student.status === 'Completed' ? 'default' : 'destructive'}>
                            {student.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="responses" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Individual Responses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { name: 'John Doe', rating: 4.5, feedback: 'Great course content and structure', completedAt: '2024-01-15' },
                        { name: 'Jane Smith', rating: 5.0, feedback: 'Excellent materials and very helpful', completedAt: '2024-01-14' },
                        { name: 'Mike Johnson', rating: 4.0, feedback: 'Good overall but could use more examples', completedAt: '2024-01-16' },
                      ].map((response, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{response.name}</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-500">★ {response.rating}</span>
                              <span className="text-sm text-gray-500">{response.completedAt}</span>
                            </div>
                          </div>
                          <p className="text-gray-600">{response.feedback}</p>
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
                        <h3 className="font-semibold text-gray-900">Total Responses</h3>
                        <p className="text-3xl font-bold text-blue-600">28</p>
                        <p className="text-sm text-gray-500">Out of 45 enrolled</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">Response Rate</h3>
                        <p className="text-3xl font-bold text-green-600">62%</p>
                        <p className="text-sm text-gray-500">Above average</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">Average Rating</h3>
                        <p className="text-3xl font-bold text-yellow-600">4.5</p>
                        <p className="text-sm text-gray-500">Out of 5.0</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center">
                        <h3 className="font-semibold text-gray-900">Completion Time</h3>
                        <p className="text-3xl font-bold text-purple-600">12</p>
                        <p className="text-sm text-gray-500">Average minutes</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Survey Details Edit Modal */}
      <SurveyDetailsEditModal
        isOpen={showDetailsEditModal}
        onClose={() => setShowDetailsEditModal(false)}
        onSave={handleSaveSurveyDetails}
        surveyData={{
          title: survey.title,
          description: survey.description,
          estimatedTime: survey.estimatedTime,
          responseLimit: survey.responseLimit
        }}
      />

      {/* Question Edit Modal */}
      {editingQuestion && (
        <SurveyQuestionEditModal
          isOpen={showQuestionEditModal}
          onClose={() => {
            setShowQuestionEditModal(false);
            setEditingQuestion(null);
          }}
          onSave={handleSaveQuestion}
          questionData={{
            id: editingQuestion.id,
            question: editingQuestion.question,
            type: editingQuestion.type
          }}
        />
      )}
    </div>
  );
};

export default SurveyDashboard;
