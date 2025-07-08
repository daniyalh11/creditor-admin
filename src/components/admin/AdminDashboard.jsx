import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, BookOpen, Activity, Settings, 
  TrendingUp, AlertCircle, CheckCircle,
  BarChart3, FileText, Shield
} from 'lucide-react';

export const AdminDashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: Users,
    },
    {
      title: "Active Courses",
      value: "156",
      change: "+8%",
      changeType: "positive",
      icon: BookOpen,
    },
    {
      title: "System Health",
      value: "98.5%",
      change: "+0.3%",
      changeType: "positive",
      icon: Activity,
    },
    {
      title: "Storage Usage",
      value: "724 GB",
      change: "+15%",
      changeType: "neutral",
      icon: BarChart3,
    },
  ];

  const recentActivities = [
    {
      action: "New user registration",
      user: "Sarah Johnson",
      time: "2 minutes ago",
      type: "user",
    },
    {
      action: "Course published",
      user: "Dr. Smith",
      time: "15 minutes ago",
      type: "course",
    },
    {
      action: "System backup completed",
      user: "System",
      time: "1 hour ago",
      type: "system",
    },
    {
      action: "Assignment graded",
      user: "Prof. Williams",
      time: "2 hours ago",
      type: "assignment",
    },
  ];

  const systemAlerts = [
    {
      message: "Database backup scheduled for tonight",
      type: "info",
      time: "Today",
    },
    {
      message: "3 users pending approval",
      type: "warning",
      time: "2 hours ago",
    },
    {
      message: "Server maintenance completed",
      type: "success",
      time: "Yesterday",
    },
  ];

  const quickActions = [
    { label: "Manage Users", icon: Users, href: "/admin/accounts" },
    { label: "Course Analytics", icon: BarChart3, href: "/admin/analytics" },
    { label: "System Settings", icon: Settings, href: "/admin/settings" },
    { label: "Security", icon: Shield, href: "/admin/security" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                <TrendingUp className={`h-4 w-4 mr-1 ${
                  stat.changeType === 'positive' ? 'text-green-500' : 'text-slate-500'
                }`} />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-slate-600'
                }`}>
                  {stat.change}
                </span>
                <span className="text-sm text-slate-500 ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-900">Recent Activity</CardTitle>
            <CardDescription className="text-slate-600">Latest system activities and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0 border-slate-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'user' ? 'bg-blue-500' :
                      activity.type === 'course' ? 'bg-green-500' :
                      activity.type === 'system' ? 'bg-orange-500' : 'bg-purple-500'
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{activity.action}</p>
                      <p className="text-xs text-slate-500">by {activity.user}</p>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400">{activity.time}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-blue-600 border-blue-200 hover:bg-blue-50">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* System Alerts */}
        <Card className="bg-white border border-slate-200 shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-slate-900">System Alerts</CardTitle>
            <CardDescription className="text-slate-600">Important notifications and system status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {systemAlerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50">
                  {alert.type === 'info' && <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5" />}
                  {alert.type === 'warning' && <AlertCircle className="h-4 w-4 text-orange-500 mt-0.5" />}
                  {alert.type === 'success' && <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />}
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-blue-600 border-blue-200 hover:bg-blue-50">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border border-slate-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-slate-900">Quick Actions</CardTitle>
          <CardDescription className="text-slate-600">Frequently used administrative tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-20 flex flex-col items-center justify-center gap-2 border-slate-200 hover:bg-blue-50 hover:border-blue-200 transition-colors"
              >
                <action.icon className="h-6 w-6 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};