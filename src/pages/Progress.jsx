import React, { useState } from 'react';
import { ChartBar, Users, BookOpen, FileText, TrendingUp, Calendar, Monitor, Smartphone, Tablet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatCard } from '@/components/shared/StatCard';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Progress = () => {
  const [dateRange, setDateRange] = useState('this-month');

  const mockStats = {
    'this-week': [
      { title: 'Average Course Progress', value: '76%', icon: <BookOpen className="h-5 w-5 text-blue-600" />, trend: { value: 5, positive: true } },
      { title: 'Assignment Completion', value: '82%', icon: <FileText className="h-5 w-5 text-green-600" />, trend: { value: 3, positive: true } },
      { title: 'Active Students', value: '843', icon: <Users className="h-5 w-5 text-purple-600" />, trend: { value: 12, positive: true } },
      { title: 'Course Engagement', value: '91%', icon: <TrendingUp className="h-5 w-5 text-orange-600" />, trend: { value: 7, positive: true } },
    ],
    'this-month': [
      { title: 'Average Course Progress', value: '79%', icon: <BookOpen className="h-5 w-5 text-blue-600" />, trend: { value: 8, positive: true } },
      { title: 'Assignment Completion', value: '85%', icon: <FileText className="h-5 w-5 text-green-600" />, trend: { value: 6, positive: true } },
      { title: 'Active Students', value: '910', icon: <Users className="h-5 w-5 text-purple-600" />, trend: { value: 18, positive: true } },
      { title: 'Course Engagement', value: '93%', icon: <TrendingUp className="h-5 w-5 text-orange-600" />, trend: { value: 10, positive: true } },
    ],
    'this-quarter': [
      { title: 'Average Course Progress', value: '74%', icon: <BookOpen className="h-5 w-5 text-blue-600" />, trend: { value: 2, positive: true } },
      { title: 'Assignment Completion', value: '80%', icon: <FileText className="h-5 w-5 text-green-600" />, trend: { value: 1, positive: true } },
      { title: 'Active Students', value: '800', icon: <Users className="h-5 w-5 text-purple-600" />, trend: { value: 5, positive: true } },
      { title: 'Course Engagement', value: '89%', icon: <TrendingUp className="h-5 w-5 text-orange-600" />, trend: { value: 3, positive: true } },
    ],
    'this-year': [
      { title: 'Average Course Progress', value: '70%', icon: <BookOpen className="h-5 w-5 text-blue-600" />, trend: { value: -2, positive: false } },
      { title: 'Assignment Completion', value: '75%', icon: <FileText className="h-5 w-5 text-green-600" />, trend: { value: -3, positive: false } },
      { title: 'Active Students', value: '720', icon: <Users className="h-5 w-5 text-purple-600" />, trend: { value: -8, positive: false } },
      { title: 'Course Engagement', value: '85%', icon: <TrendingUp className="h-5 w-5 text-orange-600" />, trend: { value: -5, positive: false } },
    ],
  };

  const mockUserEngagementData = {
    'this-week': [
      { name: 'Mon', users: 120 },
      { name: 'Tue', users: 150 },
      { name: 'Wed', users: 180 },
      { name: 'Thu', users: 200 },
      { name: 'Fri', users: 220 },
      { name: 'Sat', users: 210 },
      { name: 'Sun', users: 190 },
    ],
    'this-month': [
      { name: 'Week 1', users: 400 },
      { name: 'Week 2', users: 500 },
      { name: 'Week 3', users: 600 },
      { name: 'Week 4', users: 700 },
    ],
    'this-quarter': [
      { name: 'Jan', users: 300 },
      { name: 'Feb', users: 350 },
      { name: 'Mar', users: 400 },
    ],
    'this-year': [
      { name: 'Q1', users: 1000 },
      { name: 'Q2', users: 1200 },
      { name: 'Q3', users: 1400 },
      { name: 'Q4', users: 1600 },
    ],
  };

  const mockCourseCompletionData = {
    'this-week': [
      { name: 'Credit Analysis', complete: 15, incomplete: 5 },
      { name: 'Risk Assessment', complete: 18, incomplete: 2 },
      { name: 'Financial Reports', complete: 12, incomplete: 8 },
      { name: 'Banking Regs', complete: 20, incomplete: 0 },
    ],
    'this-month': [
      { name: 'Credit Analysis', complete: 65, incomplete: 35 },
      { name: 'Risk Assessment', complete: 72, incomplete: 28 },
      { name: 'Financial Reports', complete: 58, incomplete: 42 },
      { name: 'Banking Regs', complete: 80, incomplete: 20 },
    ],
    'this-quarter': [
      { name: 'Credit Analysis', complete: 180, incomplete: 70 },
      { name: 'Risk Assessment', complete: 200, incomplete: 50 },
      { name: 'Financial Reports', complete: 150, incomplete: 90 },
      { name: 'Banking Regs', complete: 220, incomplete: 30 },
    ],
    'this-year': [
      { name: 'Credit Analysis', complete: 700, incomplete: 300 },
      { name: 'Risk Assessment', complete: 800, incomplete: 200 },
      { name: 'Financial Reports', complete: 600, incomplete: 400 },
      { name: 'Banking Regs', complete: 900, incomplete: 100 },
    ],
  };

  const mockCourseProgress = {
    'this-week': [
      { course: 'Credit Analysis Fundamentals', progress: 85, color: 'bg-blue-500' },
      { course: 'Risk Assessment Basics', progress: 92, color: 'bg-green-500' },
      { course: 'Financial Reporting', progress: 78, color: 'bg-yellow-500' },
      { course: 'Banking Regulations', progress: 88, color: 'bg-purple-500' },
    ],
    'this-month': [
      { course: 'Credit Analysis Fundamentals', progress: 80, color: 'bg-blue-500' },
      { course: 'Risk Assessment Basics', progress: 90, color: 'bg-green-500' },
      { course: 'Financial Reporting', progress: 75, color: 'bg-yellow-500' },
      { course: 'Banking Regulations', progress: 85, color: 'bg-purple-500' },
    ],
    'this-quarter': [
      { course: 'Credit Analysis Fundamentals', progress: 78, color: 'bg-blue-500' },
      { course: 'Risk Assessment Basics', progress: 85, color: 'bg-green-500' },
      { course: 'Financial Reporting', progress: 70, color: 'bg-yellow-500' },
      { course: 'Banking Regulations', progress: 80, color: 'bg-purple-500' },
    ],
    'this-year': [
      { course: 'Credit Analysis Fundamentals', progress: 70, color: 'bg-blue-500' },
      { course: 'Risk Assessment Basics', progress: 75, color: 'bg-green-500' },
      { course: 'Financial Reporting', progress: 65, color: 'bg-yellow-500' },
      { course: 'Banking Regulations', progress: 72, color: 'bg-purple-500' },
    ],
  };

  const deviceUsageData = [
    { name: 'Desktop', value: 45, icon: Monitor },
    { name: 'Mobile', value: 35, icon: Smartphone },
    { name: 'Tablet', value: 20, icon: Tablet },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];

  const stats = mockStats[dateRange];
  const courseProgress = mockCourseProgress[dateRange];
  const userEngagementData = mockUserEngagementData[dateRange];
  const courseCompletionData = mockCourseCompletionData[dateRange];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Progress</h1>
          <p className="text-gray-600 mt-1">Track student performance and engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className="hover:shadow-lg transition-all duration-200"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              User Growth
            </CardTitle>
            <p className="text-sm text-gray-600">Monthly active student growth</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userEngagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <ChartBar className="h-5 w-5 text-green-600" />
              Course Completion Rates
            </CardTitle>
            <p className="text-sm text-gray-600">Completion vs incomplete by course</p>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={courseCompletionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Legend />
                  <Bar dataKey="complete" stackId="a" fill="#10b981" name="Complete" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="incomplete" stackId="a" fill="#e5e7eb" name="Incomplete" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Monitor className="h-5 w-5 text-purple-600" />
              Device Usage
            </CardTitle>
            <p className="text-sm text-gray-600">How students access the platform</p>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={deviceUsageData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                    {deviceUsageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {deviceUsageData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                      <IconComponent className="h-4 w-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{item.value}%</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-sm border-0 bg-white">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Course Progress Overview
            </CardTitle>
            <p className="text-sm text-gray-600">Individual course completion rates</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {courseProgress.map((course, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${course.color}`} />
                      <span className="font-medium text-gray-900">{course.course}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{course.progress}%</span>
                      <div className="flex items-center gap-1 text-green-600">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">+{Math.floor(Math.random() * 5) + 1}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full ${course.color} transition-all duration-1000 ease-out rounded-full`} style={{ width: `${course.progress}%` }} />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-white drop-shadow-sm">
                        {course.progress}% Complete
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Progress;