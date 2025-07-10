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

  const [showDetailsEditModal, setShowDetailsEditModal] = useState(false);
  const [showQuestionEditModal, setShowQuestionEditModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

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

  const handleSaveSurveyDetails = (data) => {
    setSurvey(prev => ({
      ...prev,
      title: data.title,
      description: data.description,
      estimatedTime: data.estimatedTime,
      responseLimit: data.responseLimit
    }));

    toast({
      title: "✅ Survey Updated",
      description: "Survey details have been successfully updated."
    });
  };

  const handleSaveInstructions = (instructions) => {
    setSurvey(prev => ({
      ...prev,
      instructions
    }));
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowQuestionEditModal(true);
  };

  const handleSaveQuestion = (updatedQuestion) => {
    setQuestions(prev => 
      prev.map(q => 
        q.id === updatedQuestion.id 
          ? { ...q, question: updatedQuestion.question, type: updatedQuestion.type }
          : q
      )
    );

    toast({
      title: "✅ Question Updated",
      description: "Question has been successfully updated."
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

            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="questions">Questions</TabsTrigger>
                <TabsTrigger value="response-status">Response Status</TabsTrigger>
                <TabsTrigger value="responses">Responses</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <InstructionBlock
                  title="Survey"
                  instructions={survey.instructions}
                  onSave={handleSaveInstructions}
                />
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
            </Tabs>
          </div>
        </div>
      </div>

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