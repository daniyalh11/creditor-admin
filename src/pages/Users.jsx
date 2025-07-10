import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Plus, Filter, Mail, Lock, RotateCcw, Pencil, Trash, ArrowUpDown, Check, Award, Gift
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PageHeader } from '@/components/shared/PageHeader';
import { Pagination } from '@/components/shared/Pagination';
import { UserFilterMenu } from '@/components/users/UserFilterMenu';
import { AddUserDialog } from '@/components/users/AddUserDialog';
import { UserDetailsModal } from '@/components/users/UserDetailsModal';
import { BulkMessageModal } from '@/components/users/BulkMessageModal';
import { EditUserModal } from '@/components/users/EditUserModal';
import { UserScoresModal } from '@/components/users/UserScoresModal';
import { PasswordResetModal } from '@/components/users/PasswordResetModal';
import { ResendLoginModal } from '@/components/users/ResendLoginModal';
import { AwardUserModal } from '@/components/users/AwardUserModal';
import { RewardUserModal } from '@/components/users/RewardUserModal';
import { useUserFilter } from '@/contexts/UserFilterContext';
import { toast } from '@/hooks/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const roleDisplayNames = {
  all: 'All',
  administrator: 'Administrators',
  learner: 'Learners',
  friends: 'Friends',
  archived: 'Archived',
  manager: 'Managers',
  instructor: 'Instructors',
};

// Renamed from Users to UsersPage to avoid conflict
const UsersPage = () => {
  const { 
    filteredUsers, 
    selectedRole, 
    setSelectedRole, 
    isFilterMenuOpen, 
    setIsFilterMenuOpen,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
  } = useUserFilter();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [userDetailsModal, setUserDetailsModal] = useState({
    open: false,
    user: null
  });
  const [bulkMessageModal, setBulkMessageModal] = useState(false);
  const [editUserModal, setEditUserModal] = useState({
    open: false,
    user: null
  });
  const [userScoresModal, setUserScoresModal] = useState(false);
  const [passwordResetModal, setPasswordResetModal] = useState(false);
  const [resendLoginModal, setResendLoginModal] = useState(false);
  const [awardUserModal, setAwardUserModal] = useState(false);
  const [rewardUserModal, setRewardUserModal] = useState({
    open: false,
    user: null
  });
  const [users, setUsers] = useState(filteredUsers);

  // Get current users for pagination
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleSelectAll = () => {
    if (selectedUsers.length === currentUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(currentUsers.map(user => user.id));
    }
  };

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleAction = (action) => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No users selected",
        description: "Please select at least one user to perform this action.",
        variant: "destructive"
      });
      return;
    }
    
    switch (action) {
      case 'Message':
        setBulkMessageModal(true);
        break;
      case 'Scores':
        setUserScoresModal(true);
        break;
      case 'Passwords':
        setPasswordResetModal(true);
        break;
      case 'Resend login':
        setResendLoginModal(true);
        break;
      case 'Award':
        setAwardUserModal(true);
        break;
      case 'Edit':
        if (selectedUsers.length === 1) {
          const user = users.find(u => u.id === selectedUsers[0]);
          setEditUserModal({ open: true, user });
        } else {
          toast({
            title: "Select single user",
            description: "Please select only one user to edit.",
            variant: "destructive"
          });
        }
        break;
      case 'Remove':
        handleDeleteUsers(selectedUsers);
        break;
      case 'Archive':
        toast({
          title: `${action} successful`,
          description: `Action performed on ${selectedUsers.length} users.`
        });
        setSelectedUsers([]);
        break;
      default:
        toast({
          title: `${action} successful`,
          description: `Action performed on ${selectedUsers.length} users.`
        });
        setSelectedUsers([]);
    }
  };

  const handleUserNameClick = (user) => {
    console.log('Opening user details for:', user);
    setUserDetailsModal({
      open: true,
      user: user
    });
  };

  const handleEditUser = (user) => {
    setEditUserModal({ open: true, user });
  };

  const handleDeleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    setSelectedUsers(prev => prev.filter(id => id !== userId));
    toast({
      title: "User deleted",
      description: "User has been removed successfully."
    });
  };

  const handleDeleteUsers = (userIds) => {
    setUsers(prevUsers => prevUsers.filter(user => !userIds.includes(user.id)));
    setSelectedUsers([]);
    toast({
      title: "Users deleted",
      description: `${userIds.length} user(s) have been removed successfully.`
    });
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers(prevUsers => prevUsers.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
  };

  const handleAwardGiven = (award) => {
    // This would typically update the user's awards in the backend
    console.log('Award given:', award);
  };

  const handleRewardUser = (user) => {
    setRewardUserModal({ open: true, user });
  };

  const handleRewardSent = (reward) => {
    console.log('Reward sent:', reward);
    // This would typically update the user's rewards in the backend
  };

  // Get selected users data for modals
  const selectedUsersData = users.filter(user => selectedUsers.includes(user.id));

  const getColumns = () => {
    const baseColumns = [
      { key: 'name', label: 'Name' },
      { key: 'lastVisited', label: 'Last visited' }
    ];
    
    switch (selectedRole) {
      case 'learner':
        return [
          ...baseColumns.slice(0, 1),
          { key: 'courses', label: 'Courses' },
          { key: 'completed', label: 'Completed' },
          { key: 'deactivated', label: 'Deactivated' },
          { key: 'groups', label: 'Groups' },
          { key: 'awards', label: 'Awards' },
          baseColumns[1]
        ];
      case 'instructor':
        return [
          ...baseColumns.slice(0, 1),
          { key: 'courses', label: 'Courses' },
          { key: 'archived', label: 'Archived' },
          { key: 'groups', label: 'Groups' },
          baseColumns[1]
        ];
      case 'administrator':
        return [
          ...baseColumns.slice(0, 1),
          { key: 'superAdmin', label: 'Super admin' },
          { key: 'contactMessages', label: 'Contact messages' },
          { key: 'groups', label: 'Groups' },
          baseColumns[1]
        ];
      default:
        return [
          ...baseColumns.slice(0, 1),
          { key: 'learner', label: 'Learner' },
          { key: 'instructor', label: 'Instructor' },
          { key: 'administrator', label: 'Administrator' },
          baseColumns[1]
        ];
    }
  };

  const columns = getColumns();

  const getActionButtons = () => {
    const baseActions = [
      { label: 'Message', icon: <Mail className="h-4 w-4 mr-2" /> },
      { label: 'Edit', icon: <Pencil className="h-4 w-4 mr-2" /> },
      { label: 'Remove', icon: <Trash className="h-4 w-4 mr-2" /> }
    ];
    
    switch (selectedRole) {
      case 'learner':
        return [
          { label: 'Message', icon: <Mail className="h-4 w-4 mr-2" /> },
          { label: 'Scores', icon: <ArrowUpDown className="h-4 w-4 mr-2" /> },
          { label: 'Passwords', icon: <Lock className="h-4 w-4 mr-2" /> },
          { label: 'Resend login', icon: <RotateCcw className="h-4 w-4 mr-2" /> },
          { label: 'Award', icon: <Award className="h-4 w-4 mr-2" /> },
          { label: 'Edit', icon: <Pencil className="h-4 w-4 mr-2" /> },
          { label: 'Remove', icon: <Trash className="h-4 w-4 mr-2" /> },
          { label: 'Archive', icon: <Filter className="h-4 w-4 mr-2" /> }
        ];
      case 'instructor':
      case 'administrator':
        return [
          { label: 'Message', icon: <Mail className="h-4 w-4 mr-2" /> },
          { label: 'Passwords', icon: <Lock className="h-4 w-4 mr-2" /> },
          { label: 'Resend login', icon: <RotateCcw className="h-4 w-4 mr-2" /> },
          { label: 'Edit', icon: <Pencil className="h-4 w-4 mr-2" /> },
          { label: 'Remove', icon: <Trash className="h-4 w-4 mr-2" /> },
          { label: 'Archive', icon: <Filter className="h-4 w-4 mr-2" /> }
        ];
      default:
        return baseActions;
    }
  };

  const actionButtons = getActionButtons();

  const handleRoleTabChange = (value) => {
    setSelectedRole(value);
    setCurrentPage(1);
    setSelectedUsers([]);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Users" 
        action={{
          label: "Add User",
          onClick: () => setDialogOpen(true)
        }}
      />

      <div className="bg-white rounded-lg shadow">
        <div className="flex overflow-x-auto pb-3 pt-4 px-4">
          <Tabs
            value={selectedRole}
            onValueChange={handleRoleTabChange}
            className="w-full"
          >
            <TabsList className="bg-transparent p-0 w-full justify-start gap-2">
              <TabsTrigger 
                value="all"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full px-4 py-2 border"
              >
                All <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                  {users.length}
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="learner"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full px-4 py-2 border"
              >
                Learners <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                  {users.filter(user => user.role.includes('learner')).length}
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="instructor"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full px-4 py-2 border"
              >
                Instructors <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                  {users.filter(user => user.role.includes('instructor')).length}
                </span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="administrator"
                className="data-[state=active]:bg-blue-500 data-[state=active]:text-white rounded-full px-4 py-2 border"
              >
                Administrators <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                  {users.filter(user => user.role.includes('administrator')).length}
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-b">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search users..." />
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {actionButtons.map((action, index) => (
              <Button 
                key={index} 
                variant="outline" 
                size="sm" 
                className="text-sm"
                onClick={() => handleAction(action.label)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
        
        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="p-4 w-10">
                  <Checkbox
                    checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="p-4 w-10">#</th>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="p-4 cursor-pointer"
                    onClick={() => handleSort(column.key)}
                  >
                    <div className="flex items-center">
                      {column.label}
                      {sortField === column.key && (
                        <span className="ml-1">
                          {sortOrder === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {currentUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-b hover:bg-muted/50"
                  >
                    <td className="p-4">
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => handleSelectUser(user.id)}
                        aria-label={`Select ${user.name}`}
                      />
                    </td>
                    <td className="p-4">{indexOfFirstUser + index + 1}</td>
                    {selectedRole === 'all' && (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button 
                              onClick={() => handleUserNameClick(user)}
                              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors cursor-pointer"
                            >
                              {user.name}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">{user.role.includes('learner') && <Check className="h-4 w-4 text-green-500" />}</td>
                        <td className="p-4">{user.role.includes('instructor') && <Check className="h-4 w-4 text-green-500" />}</td>
                        <td className="p-4">{user.role.includes('administrator') && <Check className="h-4 w-4 text-green-500" />}</td>
                        <td className="p-4">{user.lastVisited}</td>
                      </>
                    )}
                    
                    {selectedRole === 'learner' && (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button 
                              onClick={() => handleUserNameClick(user)}
                              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors cursor-pointer"
                            >
                              {user.name}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">{user.courses || 0}</td>
                        <td className="p-4">-</td>
                        <td className="p-4">-</td>
                        <td className="p-4">{user.groups || 0}</td>
                        <td className="p-4">-</td>
                        <td className="p-4">{user.lastVisited}</td>
                      </>
                    )}
                    
                    {selectedRole === 'instructor' && (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button 
                              onClick={() => handleUserNameClick(user)}
                              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors cursor-pointer"
                            >
                              {user.name}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">{user.courses || '-'}</td>
                        <td className="p-4">-</td>
                        <td className="p-4">{user.groups || 0}</td>
                        <td className="p-4">{user.lastVisited}</td>
                      </>
                    )}
                    
                    {selectedRole === 'administrator' && (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button 
                              onClick={() => handleUserNameClick(user)}
                              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors cursor-pointer"
                            >
                              {user.name}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">{user.superAdmin && <Check className="h-4 w-4 text-blue-500" />}</td>
                        <td className="p-4">{user.contactMessages || 4}</td>
                        <td className="p-4">{user.groups || 0}</td>
                        <td className="p-4">{user.lastVisited}</td>
                      </>
                    )}
                    
                    {selectedRole === 'friends' && (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button 
                              onClick={() => handleUserNameClick(user)}
                              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors cursor-pointer"
                            >
                              {user.name}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">{user.lastVisited}</td>
                      </>
                    )}
                    
                    {selectedRole === 'archived' && (
                      <>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button 
                              onClick={() => handleUserNameClick(user)}
                              className="text-blue-500 hover:text-blue-600 hover:underline transition-colors cursor-pointer"
                            >
                              {user.name}
                            </button>
                          </div>
                        </td>
                        <td className="p-4">{user.lastVisited}</td>
                      </>
                    )}
                    
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRewardUser(user)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Gift className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        <div className="p-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      
      <AddUserDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <UserFilterMenu />
      
      {/* User Details Modal */}
      <UserDetailsModal
        user={userDetailsModal.user}
        open={userDetailsModal.open}
        onOpenChange={(open) => setUserDetailsModal({ open, user: open ? userDetailsModal.user : null })}
      />
      
      {/* Bulk Message Modal */}
      <BulkMessageModal
        users={selectedUsersData}
        open={bulkMessageModal}
        onOpenChange={setBulkMessageModal}
      />

      {/* Edit User Modal */}
      <EditUserModal
        user={editUserModal.user}
        open={editUserModal.open}
        onOpenChange={(open) => setEditUserModal({ open, user: open ? editUserModal.user : null })}
        onUserUpdate={handleUserUpdate}
      />

      {/* User Scores Modal */}
      <UserScoresModal
        users={selectedUsersData}
        open={userScoresModal}
        onOpenChange={setUserScoresModal}
      />

      {/* Password Reset Modal */}
      <PasswordResetModal
        users={selectedUsersData}
        open={passwordResetModal}
        onOpenChange={setPasswordResetModal}
      />

      {/* Resend Login Modal */}
      <ResendLoginModal
        users={selectedUsersData}
        open={resendLoginModal}
        onOpenChange={setResendLoginModal}
      />

      {/* Award User Modal */}
      <AwardUserModal
        users={selectedUsersData}
        open={awardUserModal}
        onOpenChange={setAwardUserModal}
        onAwardGiven={handleAwardGiven}
      />

      {/* Reward User Modal */}
      <RewardUserModal
        user={rewardUserModal.user}
        open={rewardUserModal.open}
        onOpenChange={(open) => setRewardUserModal({ open, user: open ? rewardUserModal.user : null })}
        onRewardSent={handleRewardSent}
      />
    </div>
  );
};

export default UsersPage;