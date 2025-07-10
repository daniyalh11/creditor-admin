import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, MoreHorizontal, Mail, User, Shield } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { AddInstructorDialog } from './AddInstructorDialog'; // Assumed to be converted to JSX
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="h-4 w-4 mr-2" />
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
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
    </div>
  );
};