import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export const UserScoresModal = ({
  users,
  open,
  onOpenChange,
}) => {
  // Mock assessment data for demo
  const mockAssessments = [
    {
      id: '1',
      name: 'Legal Terminology Quiz',
      course: 'Introduction to Legal Studies',
      score: 85,
      maxScore: 100,
      date: '2024-12-20',
      status: 'completed'
    },
    {
      id: '2',
      name: 'Constitutional Law Essay',
      course: 'Constitutional Law',
      score: 92,
      maxScore: 100,
      date: '2024-12-18',
      status: 'completed'
    },
    {
      id: '3',
      name: 'Criminal Law Assignment',
      course: 'Criminal Law Fundamentals',
      score: 78,
      maxScore: 100,
      date: '2024-12-15',
      status: 'completed'
    },
    {
      id: '4',
      name: 'Practice Test',
      course: 'Legal Research Methods',
      score: 0,
      maxScore: 100,
      date: '2024-12-25',
      status: 'in-progress'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateOverallAverage = () => {
    const completedAssessments = mockAssessments.filter(a => a.status === 'completed');
    if (completedAssessments.length === 0) return 0;
    return Math.round(
      completedAssessments.reduce((sum, a) => sum + (a.score / a.maxScore) * 100, 0) / 
      completedAssessments.length
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            User Scores {users.length > 1 ? `(${users.length} users selected)` : ''}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {users.map((user) => (
            <div key={user.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    {calculateOverallAverage()}%
                  </div>
                  <div className="text-sm text-gray-500">Overall Average</div>
                </div>
              </div>
              
              <div className="space-y-3">
                {mockAssessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{assessment.name}</h4>
                        <Badge className={getStatusColor(assessment.status)}>
                          {assessment.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{assessment.course}</p>
                      <p className="text-xs text-gray-500">Due: {assessment.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {assessment.status === 'completed' ? (
                        <div className="text-right">
                          <div className="font-semibold">
                            {assessment.score}/{assessment.maxScore}
                          </div>
                          <div className="text-sm text-gray-500">
                            {Math.round((assessment.score / assessment.maxScore) * 100)}%
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">Not completed</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Progress</span>
                  <span>{calculateOverallAverage()}%</span>
                </div>
                <Progress value={calculateOverallAverage()} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};