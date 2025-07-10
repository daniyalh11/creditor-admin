import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Users, Calendar, BookOpen, MessageSquare, Settings, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const GroupOverviewPage = () => {
  const { groupId } = useParams();
  const [showMembersModal, setShowMembersModal] = useState(false);

  // Mock data - in real app this would come from API
  const group = {
    id: groupId || "1",
    name: `Group ${groupId || "1"} Overview`,
    description: "This is an active learning group focused on web development and programming fundamentals.",
    members: 20,
    active: true,
    createdDate: "March 15, 2024",
    lastActivity: "2 hours ago",
    discussions: 8,
    events: 3,
    category: "Web Development"
  };

  const members = [
    { id: 1, name: 'John Smith', role: 'instructor', avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png' },
    { id: 2, name: 'Sarah Johnson', role: 'admin', avatar: '/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png' },
    { id: 3, name: 'Mike Chen', role: 'learner', avatar: '/lovable-uploads/99489061-8ed9-41d2-84f2-9f76fec2a9a0.png' },
    { id: 4, name: 'Emily Davis', role: 'learner' },
    { id: 5, name: 'David Wilson', role: 'learner' },
    { id: 6, name: 'Lisa Brown', role: 'learner' },
    { id: 7, name: 'Tom Anderson', role: 'learner' },
    { id: 8, name: 'Anna Martinez', role: 'learner' },
    { id: 9, name: 'Chris Taylor', role: 'learner' },
    { id: 10, name: 'Jessica Lee', role: 'learner' },
    { id: 11, name: 'Alex Thompson', role: 'learner' },
    { id: 12, name: 'Rachel White', role: 'learner' },
    { id: 13, name: 'Kevin Garcia', role: 'learner' },
    { id: 14, name: 'Sophie Clark', role: 'learner' },
    { id: 15, name: 'Ryan Lewis', role: 'learner' },
    { id: 16, name: 'Maria Rodriguez', role: 'learner' },
    { id: 17, name: 'James Hall', role: 'learner' },
    { id: 18, name: 'Ashley Young', role: 'learner' },
    { id: 19, name: 'Daniel King', role: 'learner' },
    { id: 20, name: 'Nicole Wright', role: 'learner' }
  ];

  const handleDiscussionsClick = () => {
    toast.success("Opening group discussions...");
  };

  const handleEventsClick = () => {
    toast.success("Opening group events...");
  };

  const handleSettingsClick = () => {
    toast.success("Opening group settings...");
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case 'instructor':
        return 'bg-blue-100 text-blue-800';
      case 'admin':
        return 'bg-purple-100 text-purple-800';
      case 'learner':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold mb-2">{group.name}</h1>
          <p className="text-muted-foreground">{group.description}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${group.active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {group.active ? 'Active' : 'Inactive'}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setShowMembersModal(true)}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Members</p>
                <p className="text-2xl font-bold">{group.members}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleDiscussionsClick}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Discussions</p>
                <p className="text-2xl font-bold">{group.discussions}</p>
              </div>
              <MessageSquare className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleEventsClick}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Events</p>
                <p className="text-2xl font-bold">{group.events}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleSettingsClick}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Settings</p>
                <p className="text-2xl font-bold">Manage</p>
              </div>
              <Settings className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Group Details */}
      <Card>
        <CardHeader>
          <CardTitle>Group Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Category</label>
                <p className="text-sm font-semibold">{group.category}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Created Date</label>
                <p className="text-sm">{group.createdDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Activity</label>
                <p className="text-sm">{group.lastActivity}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Status</label>
                <p className="text-sm">{group.active ? 'Active and accepting new members' : 'Inactive'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Total Members</label>
                <Button variant="link" className="p-0 h-auto font-semibold text-blue-600" onClick={() => setShowMembersModal(true)}>
                  {group.members} members
                </Button>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Group Type</label>
                <p className="text-sm">Learning Group</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">New discussion started: "React Best Practices"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">3 new members joined the group</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Group event scheduled for next week</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Modal */}
      <Dialog open={showMembersModal} onOpenChange={setShowMembersModal}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>Group Members ({group.members})</DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[60vh] pr-2">
            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="text-sm">
                        {member.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                    </div>
                  </div>
                  <Badge className={`text-xs ${getRoleBadgeColor(member.role)}`}>
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupOverviewPage;