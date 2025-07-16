import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Mail, Phone, MapPin, Calendar, BookOpen, Users, Award, MessageSquare, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

const MessageModal = ({ isOpen, onClose, userName, onSendMessage }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both subject and message",
        variant: "destructive"
      });
      return;
    }

    onSendMessage(subject, message);
    setSubject('');
    setMessage('');
    onClose();
  };

  const handleCancel = () => {
    setSubject('');
    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Send Message to {userName}</h2>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Enter message subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
            Send Message
          </Button>
        </div>
      </div>
    </div>
  );
};

export const UserDetailsModal = ({
  user,
  open,
  onOpenChange,
}) => {
  const [showMessageModal, setShowMessageModal] = useState(false);

  if (!user) return null;

  // Mock data for demonstration - ensuring arrays are always arrays
  const mockCourses = [
    { id: 1, title: 'Advanced JavaScript', progress: 85, grade: 'A' },
    { id: 2, title: 'React Development', progress: 72, grade: 'B+' },
    { id: 3, title: 'Database Management', progress: 90, grade: 'A+' }
  ];

  const mockGroups = [
    { id: 1, name: 'IT Management', status: 'Active Member' },
    { id: 2, name: 'Frontend Developers', status: 'Active Member' },
    { id: 3, name: 'Project Team Alpha', status: 'Team Lead' }
  ];

  const mockAchievements = [
    { id: '1', title: 'Course Completion', description: 'Completed Introduction to Legal Studies', icon: '🎓', date: '2024-12-20', type: 'completion' },
    { id: '2', title: 'Perfect Attendance', description: 'Attended all sessions for the month', icon: '🎯', date: '2024-12-15', type: 'participation' },
    { id: '3', title: 'Top Performer', description: 'Scored highest in Constitutional Law assessment', icon: '🥇', date: '2024-12-10', type: 'performance' }
  ];

  // Ensure we always have arrays to work with
  const courses = Array.isArray(user.courses) ? user.courses : mockCourses;
  const groups = Array.isArray(user.groups) ? user.groups : mockGroups;
  const achievements = [...mockAchievements, ...(Array.isArray(user.awards) ? user.awards : [])];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRoleBadgeColor = (role) => {
    switch (role.toLowerCase()) {
      case 'administrator':
        return 'bg-red-100 text-red-800';
      case 'instructor':
        return 'bg-purple-100 text-purple-800';
      case 'manager':
        return 'bg-orange-100 text-orange-800';
      case 'learner':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleSendMessage = (subject, message) => {
    toast({
      title: "Message Sent",
      description: `Message sent to ${user.name} successfully!`
    });
    console.log('Sending message:', { to: user.name, subject, message });
  };

  return (
    <>
      <Dialog open={open && !showMessageModal} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto" hideCloseButton={false}>
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View detailed information about this user including their courses, groups, and achievements.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* User Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-lg font-medium">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
                  <p className="text-gray-600 mb-2">{user.email}</p>
                  <div className="flex flex-wrap gap-2">
                    {user.role.map((role, index) => (
                      <Badge key={index} className={getRoleBadgeColor(role)}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{user.overallGrade || 'A+'}</div>
                  <div className="text-sm text-gray-500">Overall Grade</div>
                </div>
                <Button 
                  onClick={() => setShowMessageModal(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mail className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>{user.phone || '+1 (555) 123-4567'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>{user.location || '123 Main St, New York, NY 10001'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>Joined {user.joinedDate || '2024-01-15'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="courses" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Course Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {courses.map((course) => (
                      <div key={course.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">{course.title}</h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">{course.progress}% Complete</span>
                            {course.grade && (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                {course.grade}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="groups" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Group Memberships
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {groups.map((group) => (
                      <div key={group.id} className="flex justify-between items-center p-3 border rounded-lg">
                        <span className="font-medium">{group.name}</span>
                        <Badge className="bg-green-100 text-green-700">
                          {group.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="h-5 w-5" />
                      Achievements & Awards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {achievements.length > 0 ? (
                      <div className="grid gap-3">
                        {achievements.map((achievement) => (
                          <div key={achievement.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className="font-medium">{achievement.title}</h4>
                              <p className="text-sm text-gray-600 mb-1">{achievement.description}</p>
                              <p className="text-xs text-gray-500">Earned on {achievement.date}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {achievement.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Award className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>No achievements yet</p>
                        <p className="text-sm">Awards will appear here when earned</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>

      {showMessageModal && (
        <MessageModal
          isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          userName={user.name}
          onSendMessage={handleSendMessage}
        />
      )}
    </>
  );
};