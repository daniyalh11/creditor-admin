import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Search, MoreHorizontal, Mail, User, X, Trash2, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AddLearnerDialog } from './AddLearnerDialog';
import { EnrollLearnersModal } from './EnrollLearnersModal';
import { BulkMessageModal } from './BulkMessageModal';
import { RewardUserModal } from '@/components/users/RewardUserModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Learner {
  id: string;
  name: string;
  email: string;
  enrollmentDate: string;
  progress: number;
  status: 'active' | 'inactive' | 'pending';
  role: 'learner' | 'instructor' | 'admin';
}

export const LearnersSection: React.FC = () => {
  const [showAddLearner, setShowAddLearner] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showBulkMessage, setShowBulkMessage] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [selectedUserForReward, setSelectedUserForReward] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLearners, setSelectedLearners] = useState<string[]>([]);
  const [learners, setLearners] = useState<Learner[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      enrollmentDate: '2024-01-15',
      progress: 75,
      status: 'active',
      role: 'learner'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      enrollmentDate: '2024-01-16',
      progress: 60,
      status: 'active',
      role: 'instructor'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      enrollmentDate: '2024-01-17',
      progress: 85,
      status: 'active',
      role: 'learner'
    },
    {
      id: '4',
      name: 'Emma Davis',
      email: 'emma.davis@example.com',
      enrollmentDate: '2024-01-18',
      progress: 40,
      status: 'pending',
      role: 'admin'
    }
  ]);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleAddLearner = (learnerData: { userId: string; name: string; email: string; role?: string }) => {
    const newLearner: Learner = {
      id: Date.now().toString(),
      name: learnerData.name,
      email: learnerData.email,
      enrollmentDate: new Date().toISOString().split('T')[0],
      progress: 0,
      status: 'pending',
      role: (learnerData.role as 'learner' | 'instructor' | 'admin') || 'learner'
    };
    setLearners([...learners, newLearner]);
    setShowInstructions(false);
  };

  const handleRemoveLearner = (learnerId: string) => {
    setLearners(learners.filter(learner => learner.id !== learnerId));
    setSelectedLearners(selectedLearners.filter(id => id !== learnerId));
  };

  const handleSelectLearner = (learnerId: string) => {
    if (selectedLearners.includes(learnerId)) {
      setSelectedLearners(selectedLearners.filter(id => id !== learnerId));
    } else {
      setSelectedLearners([...selectedLearners, learnerId]);
    }
  };

  const handleSelectAll = () => {
    if (selectedLearners.length === filteredLearners.length) {
      setSelectedLearners([]);
    } else {
      setSelectedLearners(filteredLearners.map(learner => learner.id));
    }
  };

  const handleRewardUser = (learner: Learner) => {
    setSelectedUserForReward({
      id: parseInt(learner.id),
      name: learner.name,
      email: learner.email
    });
    setShowRewardModal(true);
  };

  const handleRewardSent = (reward: any) => {
    console.log('Reward sent:', reward);
    // Here you could update the learner's data or show a success message
  };

  const filteredLearners = learners.filter(learner =>
    learner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    learner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    learner.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedLearnersData = learners.filter(learner => selectedLearners.includes(learner.id));

  const getStatusColor = (status: Learner['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: Learner['role']) => {
    switch (role) {
      case 'learner': return 'bg-blue-100 text-blue-800';
      case 'instructor': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: Learner['role']) => {
    switch (role) {
      case 'learner': return '🧑‍🎓';
      case 'instructor': return '🧑‍🏫';
      case 'admin': return '🛠️';
      default: return '👤';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const currentCourse = {
    id: 1,
    name: 'Introduction to Legal Studies'
  };

  if (showInstructions && learners.length === 0) {
    return (
      <div className="p-6 bg-white">
        {/* Header with Add button */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Learners</h1>
          <Button 
            onClick={() => setShowEnrollModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>
        </div>

        {/* Instructions */}
        <div className="max-w-2xl">
          <div className="mb-6">
            <p className="text-lg text-blue-600 mb-6">Your course is ready for learners!</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  1
                </div>
                <p className="text-gray-700 mt-1">
                  To enable an access code that learners can use to enroll themselves, click <span className="text-blue-600 underline cursor-pointer">Admin/Configure</span>, then visit the Basics section and enable an access code.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  2
                </div>
                <p className="text-gray-700 mt-1">
                  To send learners an email invitation or add them from your roster, click <span className="font-semibold">Add</span>.
                </p>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                  3
                </div>
                <p className="text-gray-700 mt-1">
                  Administrators can also bulk import enrollments from a CSV file.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Enroll Learners Modal */}
        <EnrollLearnersModal
          open={showEnrollModal}
          onOpenChange={setShowEnrollModal}
        />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Learners</h1>
          <p className="text-gray-600 mt-1">Manage course participants and their roles</p>
        </div>
        <Button 
          onClick={() => setShowAddLearner(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Learner
        </Button>
      </div>

      {/* Search and Bulk Actions */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        {selectedLearners.length > 0 && (
          <Button
            onClick={() => setShowBulkMessage(true)}
            className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          >
            <Mail className="h-4 w-4" />
            📩 Message Selected ({selectedLearners.length})
          </Button>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{learners.length}</div>
            <div className="text-sm text-gray-600">Total Participants</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{learners.filter(l => l.status === 'active').length}</div>
            <div className="text-sm text-gray-600">Active</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{learners.filter(l => l.status === 'pending').length}</div>
            <div className="text-sm text-gray-600">Pending</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{Math.round(learners.reduce((sum, l) => sum + l.progress, 0) / learners.length) || 0}%</div>
            <div className="text-sm text-gray-600">Avg Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Participants List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Course Participants</CardTitle>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectedLearners.length === filteredLearners.length && filteredLearners.length > 0}
                onCheckedChange={handleSelectAll}
                id="select-all"
              />
              <label htmlFor="select-all" className="text-sm text-gray-600 cursor-pointer">
                Select All
              </label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredLearners.map((learner) => (
              <div key={learner.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center space-x-4">
                  <Checkbox
                    checked={selectedLearners.includes(learner.id)}
                    onCheckedChange={() => handleSelectLearner(learner.id)}
                  />
                  
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-100 text-blue-700 font-medium">
                      {getInitials(learner.name)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900 truncate">{learner.name}</h4>
                      <Badge className={getRoleColor(learner.role)}>
                        <span className="mr-1">{getRoleIcon(learner.role)}</span>
                        {learner.role.charAt(0).toUpperCase() + learner.role.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{learner.email}</p>
                    <p className="text-xs text-gray-500">Enrolled: {learner.enrollmentDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  {/* Progress */}
                  <div className="text-center min-w-[80px]">
                    <div className="text-sm font-medium text-gray-900">{learner.progress}%</div>
                    <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${learner.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Progress</div>
                  </div>
                  
                  {/* Status */}
                  <Badge className={getStatusColor(learner.status)}>
                    {learner.status.charAt(0).toUpperCase() + learner.status.slice(1)}
                  </Badge>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRewardUser(learner)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      title="Send Reward"
                    >
                      <Award className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveLearner(learner.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <User className="h-4 w-4 mr-2" />
                          View Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredLearners.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <User className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No participants found</p>
                {searchQuery && (
                  <p className="text-sm">Try adjusting your search criteria</p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddLearnerDialog
        isOpen={showAddLearner}
        onClose={() => setShowAddLearner(false)}
        onAdd={handleAddLearner}
      />

      <EnrollLearnersModal
        open={showEnrollModal}
        onOpenChange={setShowEnrollModal}
      />

      <BulkMessageModal
        open={showBulkMessage}
        onOpenChange={setShowBulkMessage}
        selectedLearners={selectedLearnersData}
      />

      <RewardUserModal
        user={selectedUserForReward}
        open={showRewardModal}
        onOpenChange={setShowRewardModal}
        onRewardSent={handleRewardSent}
        course={currentCourse}
      />
    </div>
  );
};
