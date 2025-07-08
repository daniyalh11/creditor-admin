
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UserRound, Mail, Phone, MapPin, Calendar, BookOpen, FileText, ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock user data - in a real app, you would fetch this based on the ID
  const user = {
    id: parseInt(id || "1"),
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    role: "Student",
    enrollmentDate: "2024-09-15",
    status: "active",
    courses: [
      { id: 1, title: "Credit Analysis Fundamentals", progress: 85 },
      { id: 2, title: "Risk Assessment Basics", progress: 62 },
      { id: 3, title: "Financial Reporting", progress: 45 }
    ],
    assignments: [
      { id: 1, title: "Credit Risk Analysis", dueDate: "2025-05-01", status: "Completed", grade: 92 },
      { id: 2, title: "Market Assessment", dueDate: "2025-05-05", status: "In Progress", grade: null },
      { id: 3, title: "Financial Statements", dueDate: "2025-05-10", status: "Not Started", grade: null }
    ],
    groups: ["Credit Analysis A", "Financial Markets C"]
  };

  const averageProgress = user.courses.reduce((sum, course) => sum + course.progress, 0) / user.courses.length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate('/users')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">User Profile</h1>
        </div>
        <Button onClick={() => navigate(`/users/edit/${id}`)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit User
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-ca-light flex items-center justify-center mb-4">
              <UserRound className="h-12 w-12 text-ca-primary" />
            </div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground mb-4">{user.role}</p>
            
            <div className="w-full space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {user.enrollmentDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Performance Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span>{averageProgress.toFixed(0)}%</span>
              </div>
              <Progress value={averageProgress} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="bg-ca-light p-2 rounded-md">
                  <BookOpen className="h-5 w-5 text-ca-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                  <p className="font-medium">{user.courses.length}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-ca-light p-2 rounded-md">
                  <FileText className="h-5 w-5 text-ca-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed Assignments</p>
                  <p className="font-medium">
                    {user.assignments.filter(a => a.status === "Completed").length}/{user.assignments.length}
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-2">Group Memberships</h3>
              <div className="flex flex-wrap gap-2">
                {user.groups.map((group, index) => (
                  <div key={index} className="px-3 py-1 bg-ca-light text-ca-primary rounded-full text-sm">
                    {group}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="courses">Enrolled Courses</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4">
          {user.courses.map(course => (
            <Card key={course.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-ca-primary" />
                    <h3 className="font-medium">{course.title}</h3>
                  </div>
                  <Button variant="outline" size="sm">View Course</Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full">
                    <div 
                      className="h-full bg-ca-primary rounded-full" 
                      style={{ width: `${course.progress}%` }} 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="assignments" className="space-y-4">
          <Card>
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Assignment</th>
                    <th className="text-left p-4">Due Date</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {user.assignments.map(assignment => (
                    <tr key={assignment.id} className="border-b hover:bg-muted/50">
                      <td className="p-4">{assignment.title}</td>
                      <td className="p-4">{assignment.dueDate}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          assignment.status === "Completed" ? "bg-green-100 text-green-600" :
                          assignment.status === "In Progress" ? "bg-blue-100 text-blue-600" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {assignment.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {assignment.grade !== null ? `${assignment.grade}/100` : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserDetail;
