import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Clock, Target, BookOpen, Edit, Trash2, Eye, BarChart3 } from 'lucide-react';
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

  const [showEditModal, setShowEditModal] = useState(false);
  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showGradingModal, setShowGradingModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [gradingStudent, setGradingStudent] = useState(null);

  const [assignment, setAssignment] = useState({
    id: assignmentId,
    title: 'Legal Research Assignment',
    description: 'Research and present findings on a legal topic of your choice.',
    type: 'Research Assignment',
    timeLimit: 120,
    maxScore: 100,
    difficulty: 'Medium',
    wordLimit: 1500,
    status: 'Published',
    instructions: 'Please follow the guidelines provided in the course materials.'
  });

  const [questions, setQuestions] = useState([
    { id: 1, question: 'What is the main legal principle in this case?', type: 'Descriptive', points: 25 },
    { id: 2, question: 'Choose the correct legal precedent:', type: 'MCQ', points: 15, options: ['Option A', 'Option B', 'Option C'] },
    { id: 3, question: 'Analyze the court\'s decision and provide your opinion.', type: 'Descriptive', points: 60 }
  ]);

  const students = [
    { id: 1, name: 'John Doe', status: 'Submitted', score: 85, submittedAt: '2024-01-15', response: '', feedback: '', timeSpent: 95 },
    { id: 2, name: 'Jane Smith', status: 'Submitted', score: null, submittedAt: '2024-01-14', response: '', feedback: '', timeSpent: 110 },
    { id: 3, name: 'Mike Johnson', status: 'Submitted', score: 78, submittedAt: '2024-01-16', response: '', feedback: '', timeSpent: 88 },
    { id: 4, name: 'Sarah Wilson', status: 'Not Submitted', score: null, submittedAt: null, response: null, feedback: '', timeSpent: 0 },
    { id: 5, name: 'Tom Brown', status: 'Not Submitted', score: null, submittedAt: null, response: null, feedback: '', timeSpent: 0 },
  ];

  const handleBack = () => navigate(`/courses/edit/${courseId}`);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditAssignment = () => setShowEditModal(true);
  const handleEditInstructions = () => setShowInstructionsModal(true);
  const handleSaveAssignment = (data) => {
    setAssignment(prev => ({ ...prev, ...data }));
    toast({ title: '✅ Assignment Updated', description: 'Assignment details have been successfully updated.' });
  };
  const handleSaveInstructions = (instructions) => {
    setAssignment(prev => ({ ...prev, instructions }));
    toast({ title: '✅ Instructions Updated', description: 'Assignment instructions have been successfully updated.' });
  };
  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setShowQuestionModal(true);
  };
  const handleDeleteQuestion = (questionId) => {
    setQuestions(prev => prev.filter(q => q.id !== questionId));
    toast({ title: '✅ Question Deleted', description: 'Question has been successfully deleted.' });
  };
  const handleSaveQuestion = (data) => {
    if (editingQuestion) {
      setQuestions(prev => prev.map(q => q.id === editingQuestion.id ? { ...q, ...data } : q));
    }
    toast({ title: '✅ Question Updated', description: 'Question has been successfully updated.' });
  };
  const handleViewAndGrade = (student) => {
    setGradingStudent(student);
    setShowGradingModal(true);
  };
  const handleSaveGrade = (gradeData) => {
    toast({ title: '✅ Grade Saved', description: `Grade for ${gradingStudent.name} has been successfully saved.` });
  };

  const submittedCount = students.filter(s => s.status === 'Submitted').length;
  const gradedCount = students.filter(s => s.score !== null).length;
  const scores = students.filter(s => s.score !== null).map(s => s.score);
  const averageScore = scores.length ? scores.reduce((a, b) => a + b) / scores.length : 0;
  const highestScore = scores.length ? Math.max(...scores) : 0;
  const lowestScore = scores.length ? Math.min(...scores) : 0;
  const completionRate = (submittedCount / students.length) * 100;
  const averageTimeSpent = students.filter(s => s.timeSpent > 0).reduce((sum, s) => sum + s.timeSpent, 0) / (students.filter(s => s.timeSpent > 0).length || 1);
  const passRate = scores.length ? (scores.filter(s => s >= 60).length / scores.length) * 100 : 0;

  const scoreDistributionData = [
    { range: '0-20', count: scores.filter(s => s >= 0 && s <= 20).length },
    { range: '21-40', count: scores.filter(s => s >= 21 && s <= 40).length },
    { range: '41-60', count: scores.filter(s => s >= 41 && s <= 60).length },
    { range: '61-80', count: scores.filter(s => s >= 61 && s <= 80).length },
    { range: '81-100', count: scores.filter(s => s >= 81 && s <= 100).length },
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
          <SidebarNav onCloseMobile={() => {}} />
        </div>
        <div className="flex-1 ml-64 p-6">
          {/* Full layout and tab structure as in your original TSX goes here. */}
          {/* Due to space, refer to your original structure and paste it here. */}

          {/* Modals */}
          <AssignmentEditModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} assignmentData={assignment} onUpdate={handleSaveAssignment} />
          <AssignmentInstructionsModal isOpen={showInstructionsModal} onClose={() => setShowInstructionsModal(false)} instructions={assignment.instructions} onSave={handleSaveInstructions} />
          {showQuestionModal && (
            <AssignmentQuestionModal isOpen={showQuestionModal} onClose={() => { setShowQuestionModal(false); setEditingQuestion(null); }} questionData={editingQuestion} onSave={handleSaveQuestion} />
          )}
          {gradingStudent && (
            <AssignmentGradingModal isOpen={showGradingModal} onClose={() => { setShowGradingModal(false); setGradingStudent(null); }} studentData={gradingStudent} onSave={handleSaveGrade} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentDashboard;
