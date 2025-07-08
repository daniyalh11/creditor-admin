
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FileText, Clock, Users, ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const AssignmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock assignment data - in a real app, you would fetch this based on the ID
  const assignment = {
    id: parseInt(id || "1"),
    title: "Credit Risk Analysis",
    description: "Analyze credit risk factors for a sample financial institution and provide recommendations.",
    dueDate: "2025-05-01",
    totalStudents: 50,
    groups: ["Credit Analysis A", "Credit Analysis B"],
    submissionCount: 45,
    submissions: [
      { id: 1, student: "John Smith", submitted: "2025-04-22", grade: 92 },
      { id: 2, student: "Mary Johnson", submitted: "2025-04-23", grade: 88 },
      { id: 3, student: "Robert Davis", submitted: "2025-04-25", grade: 75 },
      { id: 4, student: "Sarah Wilson", submitted: "2025-04-26", grade: 95 },
      { id: 5, student: "Michael Brown", submitted: "2025-04-27", grade: 85 }
    ]
  };

  const averageGrade = assignment.submissions.reduce((sum, sub) => sum + sub.grade, 0) / assignment.submissions.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate('/assignments')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">{assignment.title}</h1>
        </div>
        <Button onClick={() => navigate(`/assignments/edit/${id}`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Assignment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Assignment Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{assignment.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-ca-light p-2 rounded-md">
                  <Clock className="h-5 w-5 text-ca-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Due Date</p>
                  <p className="font-medium">{assignment.dueDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-ca-light p-2 rounded-md">
                  <Users className="h-5 w-5 text-ca-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Submissions</p>
                  <p className="font-medium">{assignment.submissionCount}/{assignment.totalStudents}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-ca-light p-2 rounded-md">
                  <FileText className="h-5 w-5 text-ca-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Grade</p>
                  <p className="font-medium">{averageGrade.toFixed(1)}/100</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assigned Groups</CardTitle>
          </CardHeader>
          <CardContent>
            {assignment.groups.map((group, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <div className="bg-ca-light w-8 h-8 rounded-full flex items-center justify-center">
                  <Users className="h-4 w-4 text-ca-primary" />
                </div>
                <span>{group}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Progress</span>
              <span>{assignment.submissionCount}/{assignment.totalStudents} submissions</span>
            </div>
            <Progress value={(assignment.submissionCount / assignment.totalStudents) * 100} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4">Student</th>
                <th className="text-left p-4">Submitted On</th>
                <th className="text-left p-4">Grade</th>
                <th className="p-4"></th>
              </tr>
            </thead>
            <tbody>
              {assignment.submissions.map(submission => (
                <tr key={submission.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">{submission.student}</td>
                  <td className="p-4">{submission.submitted}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      submission.grade >= 90 ? 'bg-green-100 text-green-600' :
                      submission.grade >= 70 ? 'bg-blue-100 text-blue-600' :
                      'bg-amber-100 text-amber-600'
                    }`}>
                      {submission.grade}/100
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="outline" size="sm">Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssignmentDetail;
