import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, HelpCircle, MessageSquare, Users, TrendingUp, Clock, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ScoresSection = () => {
  const navigate = useNavigate();

  // Mock performance data
  const performanceData = [
    {
      id: 'quiz',
      title: 'Quiz Section',
      icon: HelpCircle,
      totalAssessments: 5,
      completedAssessments: 4,
      totalScore: 340,
      maxPossibleScore: 400,
      averageScore: 85,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600'
    },
    {
      id: 'essay',
      title: 'Essay Section',
      icon: FileText,
      totalAssessments: 3,
      completedAssessments: 2,
      totalScore: 180,
      maxPossibleScore: 330,
      averageScore: 90,
      color: 'purple',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600'
    },
    {
      id: 'assignment',
      title: 'Assignment Section',
      icon: FileText,
      totalAssessments: 4,
      completedAssessments: 3,
      totalScore: 240,
      maxPossibleScore: 400,
      averageScore: 80,
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600'
    },
    {
      id: 'debate',
      title: 'Debate Section',
      icon: MessageSquare,
      totalAssessments: 2,
      completedAssessments: 1,
      totalScore: 45,
      maxPossibleScore: 110,
      averageScore: 45,
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600'
    }
  ];

  const overallStats = {
    totalAssessments: performanceData.reduce((sum, section) => sum + section.totalAssessments, 0),
    completedAssessments: performanceData.reduce((sum, section) => sum + section.completedAssessments, 0),
    totalScore: performanceData.reduce((sum, section) => sum + section.totalScore, 0),
    maxPossibleScore: performanceData.reduce((sum, section) => sum + section.maxPossibleScore, 0)
  };

  const overallPercentage = Math.round((overallStats.totalScore / overallStats.maxPossibleScore) * 100);

  const handleSectionClick = (sectionId) => {
    // Navigate to specific section scores
    navigate(`/courses/edit/1/scores/${sectionId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Course Performance Overview</h2>
          <p className="text-gray-600">Track your progress across all assessment sections</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            {overallStats.completedAssessments}/{overallStats.totalAssessments} Completed
          </Badge>
        </div>
      </div>

      {/* Overall Performance Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-blue-900">
            <Award className="h-6 w-6" />
            Overall Course Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{overallPercentage}%</div>
              <div className="text-sm text-gray-600">Overall Score</div>
              <div className="text-xs text-gray-500 mt-1">
                {overallStats.totalScore}/{overallStats.maxPossibleScore} points
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{overallStats.completedAssessments}</div>
              <div className="text-sm text-gray-600">Completed</div>
              <div className="text-xs text-gray-500 mt-1">
                out of {overallStats.totalAssessments} total
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{overallStats.totalAssessments - overallStats.completedAssessments}</div>
              <div className="text-sm text-gray-600">Remaining</div>
              <div className="text-xs text-gray-500 mt-1">assessments</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">
                {Math.round(overallStats.totalScore / overallStats.completedAssessments) || 0}
              </div>
              <div className="text-sm text-gray-600">Avg Score</div>
              <div className="text-xs text-gray-500 mt-1">per assessment</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section Performance */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Performance by Section</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {performanceData.map((section) => {
            const Icon = section.icon;
            const completionRate = Math.round((section.completedAssessments / section.totalAssessments) * 100);
            const scorePercentage = Math.round((section.totalScore / section.maxPossibleScore) * 100);
            
            return (
              <Card 
                key={section.id} 
                className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${section.bgColor} ${section.borderColor} border-l-4`}
                onClick={() => handleSectionClick(section.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`h-6 w-6 ${section.textColor}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-gray-900">{section.title}</CardTitle>
                        <p className="text-sm text-gray-600">
                          {section.completedAssessments}/{section.totalAssessments} assessments completed
                        </p>
                      </div>
                    </div>
                    <Badge className={`${section.bgColor} ${section.textColor} border-0`}>
                      {scorePercentage}%
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${section.textColor} mb-1`}>
                        {section.totalScore}
                      </div>
                      <div className="text-xs text-gray-600">Total Score</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${section.textColor} mb-1`}>
                        {section.averageScore}
                      </div>
                      <div className="text-xs text-gray-600">Average</div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${section.textColor} mb-1`}>
                        {completionRate}%
                      </div>
                      <div className="text-xs text-gray-600">Complete</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        section.color === 'blue' ? 'bg-blue-500' :
                        section.color === 'purple' ? 'bg-purple-500' :
                        section.color === 'green' ? 'bg-green-500' :
                        'bg-orange-500'
                      }`}
                      style={{ width: `${completionRate}%` }}
                    ></div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSectionClick(section.id);
                    }}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Assessment Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { title: 'JavaScript Fundamentals Quiz', score: '85/100', time: '2 hours ago', type: 'quiz' },
              { title: 'Technology Essay', score: '92/100', time: '1 day ago', type: 'essay' },
              { title: 'Legal Research Assignment', score: '78/100', time: '3 days ago', type: 'assignment' },
              { title: 'Ethics Debate', score: '45/50', time: '1 week ago', type: 'debate' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600">{activity.time}</p>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{activity.score}</div>
                  <Badge variant="outline" className="text-xs capitalize">
                    {activity.type}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};