import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MoreHorizontal, Mail, User, Shield, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AddInstructorDialog } from './AddInstructorDialog'; // Assumed to be converted to JSX
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { BulkMessageModal } from '@/components/courses/learners/BulkMessageModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * @typedef {'primary' | 'assistant' | 'guest'} InstructorRole
 */

/**
 * @typedef {'active' | 'inactive'} InstructorStatus
 */

/**
 * @typedef {object} Instructor
 * @property {string} id - The unique identifier for the instructor.
 * @property {string} name - The full name of the instructor.
 * @property {string} email - The email address of the instructor.
 * @property {string} assignedDate - The date the instructor was assigned (YYYY-MM-DD).
 * @property {InstructorRole} role - The role of the instructor in the course.
 * @property {InstructorStatus} status - The current status of the instructor.
 * @property {string} [department] - The department the instructor belongs to (optional).
 */

export const InstructorsSection = () => {
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [instructors, setInstructors] = useState([
    {
      id: '1',
      name: 'Dr. Amanda Foster',
      email: 'amanda.foster@university.edu',
      assignedDate: '2024-01-10',
      role: 'primary',
      status: 'active',
      department: 'Law Department'
    },
    {
      id: '2',
      name: 'Prof. James Mitchell',
      email: 'james.mitchell@university.edu',
      assignedDate: '2024-01-15',
      role: 'assistant',
      status: 'active',
      department: 'Legal Studies'
    }
  ]);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileUser, setProfileUser] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageUser, setMessageUser] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleUser, setRoleUser] = useState(null);

  /**
   * Adds a new instructor to the list.
   * @param {{ userId: string; name: string; email: string; role: InstructorRole }} instructorData
   */
  const handleAddInstructor = (instructorData) => {
    const newInstructor = {
      id: Date.now().toString(),
      name: instructorData.name,
      email: instructorData.email,
      assignedDate: new Date().toISOString().split('T')[0],
      role: instructorData.role,
      status: 'active'
    };
    setInstructors([...instructors, newInstructor]);
  };

  /**
   * Handles removing an instructor from the list.
   * @param {string} instructorId
   */
  const handleRemoveInstructor = (instructorId) => {
    setInstructors(instructors.filter(instructor => instructor.id !== instructorId));
  };

  /**
   * Handles changing the role of an instructor.
   * @param {string} instructorId
   * @param {InstructorRole} newRole
   */
  const handleChangeRole = (instructorId, newRole) => {
    setInstructors(instructors.map(instructor =>
      instructor.id === instructorId ? { ...instructor, role: newRole } : instructor
    ));
  };

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    instructor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * Gets the color class for a given role.
   * @param {InstructorRole} role
   * @returns {string} Tailwind CSS classes.
   */
  const getRoleColor = (role) => {
    switch (role) {
      case 'primary': return 'bg-blue-100 text-blue-800';
      case 'assistant': return 'bg-green-100 text-green-800';
      case 'guest': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Gets the color class for a given status.
   * @param {InstructorStatus} status
   * @returns {string} Tailwind CSS classes.
   */
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Gets the initials from a full name.
   * @param {string} name
   * @returns {string} The uppercase initials.
   */
  const getInitials = (name) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Instructors</h2>
        <Button onClick={() => setShowAddInstructor(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Instructor
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{instructors.length}</div>
            <div className="text-sm text-gray-600">Total Instructors</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{instructors.filter(i => i.role === 'primary').length}</div>
            <div className="text-sm text-gray-600">Primary</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{instructors.filter(i => i.role === 'assistant').length}</div>
            <div className="text-sm text-gray-600">Assistant</div>
          </CardContent>
        </Card>
      </div>

      {/* Instructors List */}
      <Card>
        <CardHeader>
          <CardTitle>Course Instructors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInstructors.map((instructor) => (
              <div key={instructor.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarFallback>{getInitials(instructor.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{instructor.name}</h4>
                    <p className="text-sm text-gray-600">{instructor.email}</p>
                    {instructor.department && (
                      <p className="text-xs text-gray-500">{instructor.department}</p>
                    )}
                    <p className="text-xs text-gray-500">Assigned: {instructor.assignedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col space-y-1">
                    <Badge className={getRoleColor(instructor.role)}>
                      {instructor.role}
                    </Badge>
                    <Badge className={getStatusColor(instructor.status)}>
                      {instructor.status}
                    </Badge>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => { setProfileUser(instructor); setShowProfileModal(true); }}>
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setMessageUser(instructor); setShowMessageModal(true); }}>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { setRoleUser(instructor); setShowRoleModal(true); }}>
                        <Shield className="h-4 w-4 mr-2" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleRemoveInstructor(instructor.id)} className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove from Course
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddInstructorDialog
        isOpen={showAddInstructor}
        onClose={() => setShowAddInstructor(false)}
        onAdd={handleAddInstructor}
      />

      {/* View Profile Modal */}
      <Dialog open={showProfileModal} onOpenChange={setShowProfileModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Instructor Profile</DialogTitle>
          </DialogHeader>
          {profileUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-blue-100 text-blue-700 font-medium text-2xl">{getInitials(profileUser.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-lg">{profileUser.name}</div>
                  <div className="text-gray-600">{profileUser.email}</div>
                  <Badge className="bg-blue-100 text-blue-800">{profileUser.role}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-500 font-medium">Department</div>
                  <div>{profileUser.department || 'N/A'}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Status</div>
                  <Badge className={profileUser.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>{profileUser.status}</Badge>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Assigned</div>
                  <div>{profileUser.assignedDate}</div>
                </div>
                <div>
                  <div className="text-gray-500 font-medium">Role</div>
                  <div>{profileUser.role}</div>
                </div>
              </div>
              <div>
                <div className="text-gray-500 font-medium mb-1">About</div>
                <div className="text-gray-700 bg-gray-50 rounded p-3 min-h-[48px]">This instructor has not added a bio yet.</div>
              </div>
              <div>
                <div className="text-gray-500 font-medium mb-1">Recent Activity</div>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Graded "Assignment 2"</li>
                  <li>Posted announcement "Exam Schedule"</li>
                  <li>Last login: 2024-05-02</li>
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* Send Message Modal (reuse BulkMessageModal for single user) */}
      <BulkMessageModal
        open={showMessageModal}
        onOpenChange={setShowMessageModal}
        selectedLearners={messageUser ? [messageUser] : []}
      />
      {/* Change Role Modal */}
      <Dialog open={showRoleModal} onOpenChange={setShowRoleModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Change Instructor Role</DialogTitle>
          </DialogHeader>
          {roleUser && (
            <form onSubmit={e => {
              e.preventDefault();
              const newRole = e.target.role.value;
              setInstructors(instructors.map(inst => inst.id === roleUser.id ? { ...inst, role: newRole } : inst));
              setShowRoleModal(false);
              setRoleUser(null);
            }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select New Role</label>
                <Select name="role" defaultValue={roleUser.role}>
                  <SelectTrigger><SelectValue placeholder="Select role" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                    <SelectItem value="guest">Guest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => { setShowRoleModal(false); setRoleUser(null); }}>Cancel</Button>
                <Button type="submit">Save</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};