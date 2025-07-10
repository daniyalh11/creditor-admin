import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Search, UserPlus, X, Upload, FileText, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * @typedef {object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} [role]
 */

/**
 * @typedef {object} LearnerData
 * @property {string} userId
 * @property {string} name
 * @property {string} email
 * @property {string} [role]
 */

/**
 * A dialog for adding learners to a course via single, multiple, or CSV import.
 *
 * @param {object} props
 * @param {boolean} props.isOpen - Controls if the dialog is open.
 * @param {() => void} props.onClose - Function to call when the dialog should close.
 * @param {(learnerData: LearnerData) => void} props.onAdd - Callback to add a new learner.
 */
export const AddLearnerDialog = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [activeTab, setActiveTab] = useState('single');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [csvData, setCsvData] = useState('');
  const { toast } = useToast();

  // Mock users data
  const availableUsers = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: '3', name: 'Bob Wilson', email: 'bob.wilson@example.com' },
    { id: '4', name: 'Alice Brown', email: 'alice.brown@example.com' },
    { id: '5', name: 'Charlie Davis', email: 'charlie.davis@example.com' },
    { id: '6', name: 'Diana Miller', email: 'diana.miller@example.com' },
    { id: '7', name: 'Frank Taylor', email: 'frank.taylor@example.com' },
    { id: '8', name: 'Grace Anderson', email: 'grace.anderson@example.com' }
  ];

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSingleSubmit = (e) => {
    e.preventDefault();
    if (selectedUser) {
      onAdd({
        userId: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedRole || undefined
      });
      resetForm();
      onClose();
    }
  };

  const handleMultipleSubmit = () => {
    if (selectedUsers.length > 0) {
      selectedUsers.forEach(user => {
        onAdd({
          userId: user.id,
          name: user.name,
          email: user.email,
          role: selectedRole || undefined
        });
      });
      toast({
        title: "Users Added",
        description: `Successfully added ${selectedUsers.length} users to the course.`,
      });
      resetForm();
      onClose();
    }
  };

  const handleCsvSubmit = () => {
    if (csvData.trim()) {
      const lines = csvData.trim().split('\n');
      const users = lines.slice(1).map((line, index) => {
        const [name, email, role] = line.split(',').map(s => s.trim());
        return {
          userId: `csv-${Date.now()}-${index}`,
          name,
          email,
          role: role || selectedRole || undefined
        };
      });

      users.forEach(user => {
        if (user.name && user.email) {
          onAdd(user);
        }
      });

      toast({
        title: "CSV Import Complete",
        description: `Successfully imported ${users.length} users from CSV.`,
      });
      resetForm();
      onClose();
    }
  };

  const handleSelectUser = (user) => {
    if (activeTab === 'single') {
      setSelectedUser(user);
    } else {
      if (selectedUsers.find(u => u.id === user.id)) {
        setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
      } else {
        setSelectedUsers([...selectedUsers, user]);
      }
    }
  };

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers([...filteredUsers]);
    }
  };

  const resetForm = () => {
    setSelectedUser(null);
    setSelectedUsers([]);
    setSelectedRole('');
    setSearchQuery('');
    setCsvData('');
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const sampleCsvData = `Name,Email,Role
John Smith,john.smith@example.com,learner
Jane Doe,jane.doe@example.com,instructor
Bob Wilson,bob.wilson@example.com,learner`;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-semibold">Add Learners</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full">
            <div className="px-6 pt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="single" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Single User
                </TabsTrigger>
                <TabsTrigger value="multiple" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Multiple Users
                </TabsTrigger>
                <TabsTrigger value="csv" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  CSV Import
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="single" className="p-6 space-y-6 mt-0">
              <form onSubmit={handleSingleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Search Users</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Search for users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
                  </div>
                </div>

                {searchQuery && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Select User</Label>
                    <div className="max-h-48 overflow-y-auto border rounded-lg">
                      {filteredUsers.map((user) => (
                        <div key={user.id} className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 transition-colors ${selectedUser?.id === user.id ? 'bg-blue-50 border-blue-200' : ''}`} onClick={() => handleSelectUser(user)}>
                          <Avatar className="h-8 w-8 mr-3"><AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback></Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{user.name}</div>
                            <div className="text-xs text-gray-600 truncate">{user.email}</div>
                          </div>
                          {selectedUser?.id === user.id && (<UserPlus className="h-4 w-4 text-blue-600 flex-shrink-0" />)}
                        </div>
                      ))}
                      {filteredUsers.length === 0 && (<div className="p-4 text-center text-gray-500 text-sm">No users found</div>)}
                    </div>
                  </div>
                )}

                {selectedUser && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Selected User</Label>
                    <div className="p-3 border rounded-lg bg-blue-50">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-3"><AvatarFallback className="text-xs">{getInitials(selectedUser.name)}</AvatarFallback></Avatar>
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-sm truncate">{selectedUser.name}</div>
                          <div className="text-xs text-gray-600 truncate">{selectedUser.email}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Role</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learner">🧑‍🎓 Learner</SelectItem>
                      <SelectItem value="instructor">🧑‍🏫 Instructor</SelectItem>
                      <SelectItem value="admin">🛠️ Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="multiple" className="p-6 space-y-6 mt-0">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Select Multiple Users</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} onCheckedChange={handleSelectAllUsers} id="select-all-users" />
                    <label htmlFor="select-all-users" className="text-sm text-gray-600 cursor-pointer">Select All ({filteredUsers.length})</label>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="Search for users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-9" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="max-h-64 overflow-y-auto border rounded-lg">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center p-3 hover:bg-gray-50 transition-colors">
                      <Checkbox checked={selectedUsers.some(u => u.id === user.id)} onCheckedChange={() => handleSelectUser(user)} className="mr-3" />
                      <Avatar className="h-8 w-8 mr-3"><AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback></Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{user.name}</div>
                        <div className="text-xs text-gray-600 truncate">{user.email}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedUsers.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Selected Users ({selectedUsers.length})</Label>
                  <div className="p-3 border rounded-lg bg-green-50">
                    <div className="flex flex-wrap gap-2">
                      {selectedUsers.slice(0, 5).map((user) => (<Badge key={user.id} variant="secondary" className="bg-white">{user.name}</Badge>))}
                      {selectedUsers.length > 5 && (<Badge variant="secondary" className="bg-white">+{selectedUsers.length - 5} more</Badge>)}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label className="text-sm font-medium">Default Role for All Selected Users</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="learner">🧑‍🎓 Learner</SelectItem>
                    <SelectItem value="instructor">🧑‍🏫 Instructor</SelectItem>
                    <SelectItem value="admin">🛠️ Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="csv" className="p-6 space-y-6 mt-0">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">CSV Format</Label>
                  <p className="text-sm text-gray-600 mt-1">Upload a CSV file with the following format:</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg"><pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">{sampleCsvData}</pre></div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Paste CSV Data</Label>
                  <textarea placeholder="Paste your CSV data here..." value={csvData} onChange={(e) => setCsvData(e.target.value)} className="w-full h-32 p-3 border rounded-lg resize-none font-mono text-sm" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Default Role (if not specified in CSV)</Label>
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="learner">🧑‍🎓 Learner</SelectItem>
                      <SelectItem value="instructor">🧑‍🏫 Instructor</SelectItem>
                      <SelectItem value="admin">🛠️ Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end gap-3 p-6 border-t bg-white flex-shrink-0">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          {activeTab === 'single' && (<Button onClick={handleSingleSubmit} disabled={!selectedUser} className="bg-blue-600 hover:bg-blue-700 text-white">Add Learner</Button>)}
          {activeTab === 'multiple' && (<Button onClick={handleMultipleSubmit} disabled={selectedUsers.length === 0} className="bg-blue-600 hover:bg-blue-700 text-white">Add {selectedUsers.length} Learners</Button>)}
          {activeTab === 'csv' && (<Button onClick={handleCsvSubmit} disabled={!csvData.trim()} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"><Upload className="h-4 w-4" />Import CSV</Button>)}
        </div>
      </DialogContent>
    </Dialog>
  );
};
