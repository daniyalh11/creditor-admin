
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, UserPlus } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  department?: string;
}

interface AddInstructorDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (instructorData: { userId: string; name: string; email: string; role: 'primary' | 'assistant' | 'guest' }) => void;
}

export const AddInstructorDialog: React.FC<AddInstructorDialogProps> = ({
  isOpen,
  onClose,
  onAdd
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<'primary' | 'assistant' | 'guest'>('assistant');

  // Mock users data (potential instructors)
  const availableUsers: User[] = [
    { id: '1', name: 'Dr. Sarah Williams', email: 'sarah.williams@university.edu', department: 'Law Department' },
    { id: '2', name: 'Prof. David Johnson', email: 'david.johnson@university.edu', department: 'Legal Studies' },
    { id: '3', name: 'Dr. Emily Davis', email: 'emily.davis@university.edu', department: 'Criminal Justice' },
    { id: '4', name: 'Prof. Michael Brown', email: 'michael.brown@university.edu', department: 'Constitutional Law' }
  ];

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (user.department && user.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUser) {
      onAdd({
        userId: selectedUser.id,
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedRole
      });
      setSelectedUser(null);
      setSelectedRole('assistant');
      setSearchQuery('');
      onClose();
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Instructor to Course</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* User Search */}
          <div>
            <Label>Search Faculty</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for faculty members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {/* User Selection */}
          {searchQuery && (
            <div className="max-h-40 overflow-y-auto border rounded-md">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 ${
                    selectedUser?.id === user.id ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => setSelectedUser(user)}
                >
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="text-xs">{getInitials(user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{user.name}</div>
                    <div className="text-xs text-gray-600">{user.email}</div>
                    {user.department && (
                      <div className="text-xs text-gray-500">{user.department}</div>
                    )}
                  </div>
                  {selectedUser?.id === user.id && (
                    <UserPlus className="h-4 w-4 text-blue-600" />
                  )}
                </div>
              ))}
              {filteredUsers.length === 0 && (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No faculty members found
                </div>
              )}
            </div>
          )}

          {/* Selected User */}
          {selectedUser && (
            <div className="p-3 border rounded-md bg-blue-50">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarFallback className="text-xs">{getInitials(selectedUser.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-sm">{selectedUser.name}</div>
                  <div className="text-xs text-gray-600">{selectedUser.email}</div>
                  {selectedUser.department && (
                    <div className="text-xs text-gray-500">{selectedUser.department}</div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Role Selection */}
          <div>
            <Label>Instructor Role *</Label>
            <Select value={selectedRole} onValueChange={(value: 'primary' | 'assistant' | 'guest') => setSelectedRole(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary">Primary Instructor</SelectItem>
                <SelectItem value="assistant">Assistant Instructor</SelectItem>
                <SelectItem value="guest">Guest Instructor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedUser}>
              Add Instructor
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
