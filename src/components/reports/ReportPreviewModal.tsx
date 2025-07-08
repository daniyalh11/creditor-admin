import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, User, Calendar, BookOpen, 
  TrendingUp, Users, Activity, Award, Clock, Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

type Report = {
  id: number;
  title: string;
  type: string;
  generatedDate: string;
  createdBy: string;
  fileSize: string;
  tags?: string[];
};

interface ReportPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: Report | null;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  open,
  onOpenChange,
  report
}) => {
  if (!report) return null;

  const getReportTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'analytics':
        return 'bg-blue-100 text-blue-800';
      case 'progress':
        return 'bg-green-100 text-green-800';
      case 'usage':
        return 'bg-purple-100 text-purple-800';
      case 'assessment':
        return 'bg-orange-100 text-orange-800';
      case 'attendance':
        return 'bg-cyan-100 text-cyan-800';
      case 'performance':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getReportIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'analytics':
        return <TrendingUp className="h-5 w-5" />;
      case 'progress':
        return <Target className="h-5 w-5" />;
      case 'usage':
        return <Activity className="h-5 w-5" />;
      case 'assessment':
        return <Award className="h-5 w-5" />;
      case 'attendance':
        return <Users className="h-5 w-5" />;
      case 'performance':
        return <TrendingUp className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const generateMockData = (type: string) => {
    switch (type.toLowerCase()) {
      case 'analytics':
        return {
          summary: [
            { label: 'Total Users', value: '1,247', change: '+12%' },
            { label: 'Active Sessions', value: '834', change: '+8%' },
            { label: 'Page Views', value: '15,432', change: '+15%' },
            { label: 'Avg. Session Duration', value: '24m 15s', change: '+5%' }
          ],
          chartData: [
            { name: 'Mon', users: 120, sessions: 89 },
            { name: 'Tue', users: 156, sessions: 134 },
            { name: 'Wed', users: 198, sessions: 167 },
            { name: 'Thu', users: 234, sessions: 189 },
            { name: 'Fri', users: 287, sessions: 234 },
            { name: 'Sat', users: 198, sessions: 156 },
            { name: 'Sun', users: 145, sessions: 98 }
          ]
        };
      case 'progress':
        return {
          summary: [
            { label: 'Courses Completed', value: '89', change: '+23%' },
            { label: 'In Progress', value: '156', change: '+7%' },
            { label: 'Average Score', value: '85.2%', change: '+3%' },
            { label: 'Time to Complete', value: '4.2 days', change: '-8%' }
          ],
          pieData: [
            { name: 'Completed', value: 89, color: '#00C49F' },
            { name: 'In Progress', value: 156, color: '#FFBB28' },
            { name: 'Not Started', value: 45, color: '#FF8042' }
          ]
        };
      case 'assessment':
        return {
          summary: [
            { label: 'Total Assessments', value: '234', change: '+18%' },
            { label: 'Average Score', value: '82.5%', change: '+5%' },
            { label: 'Pass Rate', value: '91.2%', change: '+2%' },
            { label: 'Completion Rate', value: '87.8%', change: '+4%' }
          ],
          tableData: [
            { assessment: 'JavaScript Fundamentals', attempts: 45, avgScore: '88.2%', passRate: '94%' },
            { assessment: 'React Components', attempts: 38, avgScore: '85.1%', passRate: '89%' },
            { assessment: 'CSS Styling', attempts: 52, avgScore: '79.8%', passRate: '87%' },
            { assessment: 'HTML Structure', attempts: 41, avgScore: '91.3%', passRate: '97%' }
          ]
        };
      default:
        return {
          summary: [
            { label: 'Total Records', value: '1,247', change: '+12%' },
            { label: 'Active Items', value: '834', change: '+8%' },
            { label: 'Completion Rate', value: '87.5%', change: '+15%' },
            { label: 'Average Time', value: '24m 15s', change: '+5%' }
          ]
        };
    }
  };

  const mockData = generateMockData(report.type);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[90vh] p-0 gap-0 flex flex-col">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getReportIcon(report.type)}
              <div>
                <DialogTitle className="text-xl font-semibold">{report.title}</DialogTitle>
                <div className="flex items-center gap-4 mt-2">
                  <Badge className={getReportTypeColor(report.type)}>
                    {report.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-4 w-4" />
                    Generated on {report.generatedDate}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <User className="h-4 w-4" />
                    By {report.createdBy}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockData.summary.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{item.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                      </div>
                      <div className={`text-sm font-medium ${
                        item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.change}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Associated Course/Module Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Associated Course Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Course</p>
                    <p className="text-base font-semibold">Web Development Fundamentals</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Module</p>
                    <p className="text-base font-semibold">JavaScript Essentials</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Instructor</p>
                    <p className="text-base font-semibold">Sarah Johnson</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Charts Section */}
            {mockData.chartData && (
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Analytics Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockData.chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="users" fill="#0088FE" name="Users" />
                        <Bar dataKey="sessions" fill="#00C49F" name="Sessions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pie Chart for Progress Reports */}
            {mockData.pieData && (
              <Card>
                <CardHeader>
                  <CardTitle>Progress Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={mockData.pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {mockData.pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Table Data for Assessment Reports */}
            {mockData.tableData && (
              <Card>
                <CardHeader>
                  <CardTitle>Assessment Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assessment Name</TableHead>
                        <TableHead>Total Attempts</TableHead>
                        <TableHead>Average Score</TableHead>
                        <TableHead>Pass Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockData.tableData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{row.assessment}</TableCell>
                          <TableCell>{row.attempts}</TableCell>
                          <TableCell>{row.avgScore}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{row.passRate}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {/* Additional Report Details */}
            <Card>
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Report Parameters</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date Range:</span>
                        <span>Last 30 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Target Group:</span>
                        <span>All Users</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Filter Applied:</span>
                        <span>Active Learners</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Export Options</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full">
                        Export as PDF
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Export as Excel
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Export as CSV
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
