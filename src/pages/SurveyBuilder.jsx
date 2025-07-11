import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, 
  Plus, 
  Settings, 
  Eye, 
  Save, 
  Upload,
  Edit,
  Trash2,
  GripVertical,
  FileText
} from 'lucide-react';
import { RichTextEditor } from '@/components/courses/RichTextEditor';
import { SurveyMCQEditModal } from '@/components/courses/assessments/SurveyMCQEditModal';
import { SurveyPreviewModal } from '@/components/surveys/SurveyPreviewModal';
import { useToast } from '@/hooks/use-toast';

const SurveyBuilder = () => {
  const { surveyId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('settings');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  
  const [surveyData, setSurveyData] = useState({
    id: surveyId || editId || '',
    title: 'New Survey',
    description: '',
    instructions: [],
    questions: [],
    status: 'Draft',
    createdAt: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (editId) {
      const existingAssessments = JSON.parse(localStorage.getItem('publishedAssessments') || '[]');
      const editingAssessment = existingAssessments.find(a => a.id === editId);
      
      if (editingAssessment) {
        setSurveyData({
          id: editingAssessment.id,
          title: editingAssessment.settings?.title || editingAssessment.title || 'New Survey',
          description: editingAssessment.settings?.description || editingAssessment.description || '',
          instructions: editingAssessment.instructions || [],
          questions: editingAssessment.questions || [],
          status: editingAssessment.status === 'published' ? 'Published' : 'Draft',
          createdAt: editingAssessment.createdAt || new Date().toISOString().split('T')[0],
          publishedAt: editingAssessment.publishedAt
        });
      }
    } else if (surveyId) {
      console.log('Loading survey:', surveyId);
    }
  }, [surveyId, editId]);

  const handleSurveyUpdate = (field, value) => {
    setSurveyData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddInstruction = () => {
    const newInstruction = {
      id: Date.now().toString(),
      content: 'Enter your instruction here...'
    };
    
    setSurveyData(prev => ({
      ...prev,
      instructions: [...prev.instructions, newInstruction]
    }));
  };

  const handleInstructionUpdate = (instructionId, content) => {
    setSurveyData(prev => ({
      ...prev,
      instructions: prev.instructions.map(instruction =>
        instruction.id === instructionId ? { ...instruction, content } : instruction
      )
    }));
  };

  const handleDeleteInstruction = (instructionId) => {
    setSurveyData(prev => ({
      ...prev,
      instructions: prev.instructions.filter(instruction => instruction.id !== instructionId)
    }));
  };

  const handleAddQuestion = (type) => {
    const newQuestion = {
      id: Date.now().toString(),
      type,
      question: type === 'survey-mcq' ? 'Enter your question here...' : 'Enter description text...',
      ...(type === 'survey-mcq' && {
        options: [
          { id: '1', text: 'Option 1' },
          { id: '2', text: 'Option 2' }
        ],
        allowMultiple: false
      }),
      required: false
    };
    
    setSurveyData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
    
    if (type === 'survey-mcq') {
      setEditingQuestion(newQuestion);
    }
  };

  const handleQuestionUpdate = (updatedQuestion) => {
    setSurveyData(prev => ({
      ...prev,
      questions: prev.questions.map(q => 
        q.id === updatedQuestion.id ? updatedQuestion : q
      )
    }));
    setEditingQuestion(null);
  };

  const handleDeleteQuestion = (questionId) => {
    setSurveyData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== questionId)
    }));
  };

  const handleEditQuestion = (question) => {
    if (question.type === 'survey-mcq') {
      setEditingQuestion(question);
    }
  };

  const handleSave = () => {
    console.log('Saving survey:', surveyData);
    toast({
      title: "✅ Survey saved",
      description: "Your survey has been saved as a draft.",
    });
  };

  const handlePreview = () => {
    setShowPreviewModal(true);
  };

  const handlePublish = () => {
    if (!surveyData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title before publishing.",
        variant: "destructive"
      });
      return;
    }

    if (surveyData.questions.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one question before publishing.",
        variant: "destructive"
      });
      return;
    }

    const assessment = {
      id: surveyData.id,
      type: 'survey',
      title: surveyData.title,
      description: surveyData.description,
      settings: {
        title: surveyData.title,
        description: surveyData.description,
        timeLimit: 30,
        passingScore: 70,
        attemptsAllowed: 1
      },
      instructions: surveyData.instructions,
      questions: surveyData.questions,
      status: 'published',
      createdAt: surveyData.createdAt,
      publishedAt: new Date().toISOString()
    };

    const existingAssessments = JSON.parse(localStorage.getItem('publishedAssessments') || '[]');
    
    if (editId) {
      const updatedAssessments = existingAssessments.map(a => 
        a.id === editId ? assessment : a
      );
      localStorage.setItem('publishedAssessments', JSON.stringify(updatedAssessments));
      
      toast({
        title: "✅ Survey updated successfully",
        description: "Your survey has been updated and published.",
      });
    } else {
      existingAssessments.push(assessment);
      localStorage.setItem('publishedAssessments', JSON.stringify(existingAssessments));
      
      toast({
        title: "✅ Survey published successfully",
        description: "Your survey has been published and is now available.",
      });
    }

    setSurveyData(prev => ({
      ...prev,
      status: 'Published',
      publishedAt: new Date().toISOString()
    }));

    navigate('/surveys');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/surveys')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Survey Builder</h1>
              <p className="text-sm text-gray-600">Create and manage your survey</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button onClick={handlePublish} className="bg-blue-600 hover:bg-blue-700">
              <Upload className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 m-4">
              <TabsTrigger value="settings">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="questions">
                <Plus className="h-4 w-4 mr-2" />
                Questions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="px-4 pb-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Survey Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Survey Title</Label>
                    <Input
                      id="title"
                      value={surveyData.title}
                      onChange={(e) => handleSurveyUpdate('title', e.target.value)}
                      placeholder="Enter survey title..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={surveyData.description}
                      onChange={(e) => handleSurveyUpdate('description', e.target.value)}
                      placeholder="Brief description of your survey..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="questions" className="px-4 pb-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Add Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleAddInstruction}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Add Instruction
                  </Button>
                  
                  <Button
                    onClick={() => handleAddQuestion('survey-mcq')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Multiple Choice
                  </Button>
                  
                  <Button
                    onClick={() => handleAddQuestion('description')}
                    className="w-full justify-start"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Description Text
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {/* Survey Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">{surveyData.title}</h2>
                {surveyData.description && (
                  <p className="text-gray-600">{surveyData.description}</p>
                )}
              </div>
            </div>

            {/* Instructions */}
            {surveyData.instructions.map((instruction) => (
              <Card key={instruction.id} className="mb-4 group hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">Instruction</span>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteInstruction(instruction.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <RichTextEditor
                    value={instruction.content}
                    onChange={(value) => handleInstructionUpdate(instruction.id, value)}
                    placeholder="Enter instruction content..."
                    className="min-h-[150px]"
                  />
                </CardContent>
              </Card>
            ))}

            {/* Questions List */}
            <div className="space-y-4">
              {surveyData.questions.map((question, index) => (
                <Card key={question.id} className="group hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-600 rounded-full font-medium text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-sm font-medium text-blue-600 capitalize">
                              {question.type.replace('-', ' ')}
                            </span>
                            {question.required && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          <h3 className="font-medium text-gray-900">{question.question}</h3>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="h-4 w-4 text-gray-400 cursor-grab" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditQuestion(question)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteQuestion(question.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  {question.type === 'survey-mcq' && question.options && (
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {question.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-3">
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full"></div>
                            <span className="text-gray-700">{option.text}</span>
                          </div>
                        ))}
                      </div>
                      {question.allowMultiple && (
                        <p className="text-xs text-blue-600 mt-3">Multiple selections allowed</p>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))}

              {surveyData.questions.length === 0 && surveyData.instructions.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">Start building your survey</h3>
                      <p className="text-gray-600 mt-1">
                        Add instructions and questions using the sidebar
                      </p>
                    </div>
                    <div className="flex justify-center space-x-3">
                      <Button onClick={handleAddInstruction} variant="outline">
                        Add Instruction
                      </Button>
                      <Button onClick={() => handleAddQuestion('survey-mcq')} variant="outline">
                        Add Question
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Question Modal */}
      {editingQuestion && (
        <SurveyMCQEditModal
          question={editingQuestion}
          onSave={handleQuestionUpdate}
          onCancel={() => setEditingQuestion(null)}
        />
      )}

      {/* Preview Modal */}
      <SurveyPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        surveyData={surveyData}
      />
    </div>
  );
};

export default SurveyBuilder;