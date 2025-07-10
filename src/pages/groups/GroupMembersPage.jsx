import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageSquare, MinusCircle, Send, X, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const GroupMembersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageBody, setMessageBody] = useState('');
  
  // Add Member form states
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('learner');
  
  const [members, setMembers] = useState([
    { id: 1, name: 'Aberin, David', email: 'david.aberin@example.com', role: 'learner' },
    { id: 2, name: 'Adams, Anthony', email: 'anthony.adams@example.com', role: 'learner' },
    { id: 3, name: 'Adlaon, Ann', email: 'ann.adlaon@example.com', role: 'learner' },
    { id: 4, name: 'Admin, Graham', email: 'graham.admin@example.com', avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png', role: 'admin' },
    { id: 5, name: 'admin, Test', email: 'test.admin@example.com', role: 'admin' },
    { id: 6, name: 'Aliomar, Alfonzo', email: 'alfonzo.aliomar@example.com', avatar: '/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png', role: 'instructor' },
    { id: 7, name: 'Allen, Jade', email: 'jade.allen@example.com', avatar: '/lovable-uploads/99489061-8ed9-41d2-84f2-9f76fec2a9a0.png', role: 'learner' },
    { id: 8, name: 'Alonso, Juan', email: 'juan.alonso@example.com', role: 'learner' },
    { id: 9, name: 'alsawy, Sarah', email: 'sarah.alsawy@example.com', role: 'instructor' },
    { id: 10, name: 'Aman, Carlos', email: 'carlos.aman@example.com', role: 'learner' }
  ]);
  
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedMembers(filteredMembers.map(m => m.id));
    } else {
      setSelectedMembers([]);
    }
  };

  const handleSelectMember = (id, checked) => {
    if (checked) {
      setSelectedMembers(prev => [...prev, id]);
    } else {
      setSelectedMembers(prev => prev.filter(memberId => memberId !== id));
      setSelectAll(false);
    }
  };

  const handleMessageSelected = () => {
    if (selectedMembers.length === 0) {
      toast.error("Please select members to message");
      return;
    }
    setShowMessageModal(true);
  };

  const handleSendMessage = () => {
    if (!messageSubject.trim() || !messageBody.trim()) {
      toast.error("Please fill in both subject and message");
      return;
    }
    
    const selectedNames = members
      .filter(m => selectedMembers.includes(m.id))
      .map(m => m.name)
      .join(', ');
    
    toast.success(`Message sent to: ${selectedNames}`);
    setShowMessageModal(false);
    setMessageSubject('');
    setMessageBody('');
    setSelectedMembers([]);
    setSelectAll(false);
  };

  const handleRemoveMember = (memberId, memberName) => {
    setMembers(prevMembers => prevMembers.filter(m => m.id !== memberId));
    toast.success(`${memberName} removed from group`);
  };

  const handleAddMember = () => {
    // Validation
    if (!newMemberName.trim()) {
      toast.error("Please enter member name");
      return;
    }
    if (!newMemberEmail.trim()) {
      toast.error("Please enter member email");
      return;
    }
    if (!newMemberEmail.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Check if email already exists
    if (members.some(m => m.email.toLowerCase() === newMemberEmail.toLowerCase())) {
      toast.error("A member with this email already exists");
      return;
    }

    // Create new member
    const newMember = {
      id: Math.max(...members.map(m => m.id)) + 1,
      name: newMemberName.trim(),
      email: newMemberEmail.trim(),
      role: newMemberRole
    };

    setMembers(prevMembers => [...prevMembers, newMember]);
    toast.success(`${newMember.name} added to the group successfully!`);
    
    // Reset form and close modal
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberRole('learner');
    setShowAddMemberModal(false);
  };

  const handleCancelAddMember = () => {
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberRole('learner');
    setShowAddMemberModal(false);
  };

  const getRoleBadgeProps = (role) => {
    switch (role) {
      case 'instructor':
        return { className: 'bg-blue-100 text-blue-800', icon: '🧑‍🏫', label: 'Instructor' };
      case 'admin':
        return { className: 'bg-purple-100 text-purple-800', icon: '🛠️', label: 'Admin' };
      case 'learner':
        return { className: 'bg-green-100 text-green-800', icon: '🧑‍🎓', label: 'Learner' };
      default:
        return { className: 'bg-gray-100 text-gray-800', icon: '👤', label: 'Member' };
    }
  };

  const selectedMembersList = members.filter(m => selectedMembers.includes(m.id));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Group Members</h1>
          <p className="text-gray-600 mt-1">{members.length} total members</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Button 
            variant="outline" 
            onClick={handleMessageSelected} 
            disabled={selectedMembers.length === 0}
            className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Selected ({selectedMembers.length})
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => setShowAddMemberModal(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Search and Bulk Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by name, email, or role..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="select-all"
              checked={selectAll} 
              onCheckedChange={(checked) => handleSelectAll(!!checked)}
            />
            <label htmlFor="select-all" className="text-sm font-medium text-gray-700">
              Select All ({filteredMembers.length})
            </label>
          </div>
        </div>
      </div>
      
      {/* Members Grid */}
      <div className="grid gap-4">
        {filteredMembers.map((member) => {
          const roleBadge = getRoleBadgeProps(member.role);
          
          return (
            <Card key={member.id} className="hover:shadow-md transition-all duration-200 border-gray-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Checkbox */}
                    <Checkbox 
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={(checked) => handleSelectMember(member.id, !!checked)}
                    />
                    
                    {/* Avatar */}
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-sm font-medium bg-gray-100">
                          {member.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {member.name === 'Admin, Graham' && (
                        <div className="absolute -top-1 -right-1 text-yellow-500 text-lg">
                          👑
                        </div>
                      )}
                    </div>
                    
                    {/* Member Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">{member.name}</h3>
                        <Badge className={`text-xs px-2 py-1 ${roleBadge.className}`}>
                          <span className="mr-1">{roleBadge.icon}</span>
                          {roleBadge.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 truncate">{member.email}</p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      onClick={() => handleRemoveMember(member.id, member.name)}
                    >
                      <MinusCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredMembers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No members found</div>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Message Modal */}
      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Send Message to Selected Members
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                To: ({selectedMembersList.length} members)
              </label>
              <div className="bg-gray-50 p-3 rounded-lg max-h-24 overflow-y-auto">
                <div className="flex flex-wrap gap-1">
                  {selectedMembersList.map((member) => (
                    <Badge key={member.id} variant="secondary" className="text-xs">
                      {member.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
                Subject
              </label>
              <Input
                id="subject"
                placeholder="Enter message subject..."
                value={messageSubject}
                onChange={(e) => setMessageSubject(e.target.value)}
              />
            </div>
            
            <div>
              <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                rows={6}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                className="resize-none"
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={() => setShowMessageModal(false)}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button 
                onClick={handleSendMessage}
                disabled={!messageSubject.trim() || !messageBody.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Member Modal */}
      <Dialog open={showAddMemberModal} onOpenChange={setShowAddMemberModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Add New Member
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="member-name">Name *</Label>
              <Input
                id="member-name"
                placeholder="Enter member's full name"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="member-email">Email *</Label>
              <Input
                id="member-email"
                type="email"
                placeholder="Enter member's email address"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="member-role">Role</Label>
              <Select value={newMemberRole} onValueChange={(value) => setNewMemberRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select member role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="learner">🧑‍🎓 Learner</SelectItem>
                  <SelectItem value="instructor">🧑‍🏫 Instructor</SelectItem>
                  <SelectItem value="admin">🛠️ Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                variant="outline" 
                onClick={handleCancelAddMember}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddMember}
                disabled={!newMemberName.trim() || !newMemberEmail.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupMembersPage;