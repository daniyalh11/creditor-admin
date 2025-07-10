import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { BulkMessageModal } from '@/components/users/BulkMessageModal';
import { AddAdminModal } from '@/components/groups/AddAdminModal';

const GroupAdminsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);

  const [admins, setAdmins] = useState([
    { id: 1, name: 'Admin, Graham', email: 'graham.admin@example.com', avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png', role: ['Admin'] },
    { id: 2, name: 'Arya, Mayank', email: 'mayank.arya@example.com', role: ['Admin'] },
    { id: 3, name: 'Cantiller, Jevah', email: 'jevah.cantiller@example.com', avatar: '/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png', role: ['Admin'] },
    { id: 4, name: 'Creditor, counselor', email: 'counselor@example.com', role: ['Admin'] },
    { id: 5, name: 'Garrido, Ryan', email: 'ryan.garrido@example.com', role: ['Admin'] },
    { id: 6, name: 'Gharfalkar, Jay', email: 'jay.gharfalkar@example.com', role: ['Admin'] },
    { id: 7, name: 'Jagadeesh, Tharani', email: 'tharani.jagadeesh@example.com', role: ['Admin'] },
    { id: 8, name: 'Javed, Farah', email: 'farah.javed@example.com', role: ['Admin'] },
    { id: 9, name: 'Kumar, Nikhil', email: 'nikhil.kumar@example.com', role: ['Admin'] },
    { id: 10, name: 'Kumar, Samir', email: 'samir.kumar@example.com', role: ['Admin'] }
  ]);

  const filteredAdmins = admins.filter(admin =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectAll = (checked) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedAdmins(filteredAdmins.map(a => a.id));
    } else {
      setSelectedAdmins([]);
    }
  };

  const handleSelectAdmin = (id, checked) => {
    if (checked) {
      setSelectedAdmins(prev => [...prev, id]);
    } else {
      setSelectedAdmins(prev => prev.filter(adminId => adminId !== id));
      setSelectAll(false);
    }
  };

  const handleMessageSelected = () => {
    if (selectedAdmins.length === 0) {
      toast.error("Please select admins to message");
      return;
    }
    setIsMessageModalOpen(true);
  };

  const handleRemoveAdmin = (adminId) => {
    const adminToRemove = admins.find(a => a.id === adminId);
    if (adminToRemove) {
      setAdmins(prev => prev.filter(a => a.id !== adminId));
      setSelectedAdmins(prev => prev.filter(id => id !== adminId));
      toast.success(`${adminToRemove.name} removed from admin role`);
    }
  };

  const handleAddAdmin = () => {
    setIsAddAdminModalOpen(true);
  };

  const handleAddNewAdmin = (adminData) => {
    const emailExists = admins.some(admin => admin.email.toLowerCase() === adminData.email.toLowerCase());
    if (emailExists) {
      toast.error("An admin with this email already exists");
      return;
    }

    const newAdmin = {
      id: Math.max(...admins.map(a => a.id)) + 1,
      name: adminData.name,
      email: adminData.email,
      role: adminData.role,
    };

    setAdmins(prev => [...prev, newAdmin]);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const isAllSelected = filteredAdmins.length > 0 && selectedAdmins.length === filteredAdmins.length;
  const selectedAdminUsers = admins.filter(admin => selectedAdmins.includes(admin.id));

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admins</h1>
          <p className="text-gray-600 mt-1">{admins.length} total admins</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handleMessageSelected}
            disabled={selectedAdmins.length === 0}
            className="flex items-center gap-2"
          >
            💬 Message Selected ({selectedAdmins.length})
          </Button>
          <Button onClick={handleAddAdmin} className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Admin
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by name, email, or role..." 
            className="pl-10" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox 
            checked={isAllSelected}
            onCheckedChange={(checked) => handleSelectAll(!!checked)}
          />
          <span className="text-sm text-gray-600">Select All ({filteredAdmins.length})</span>
        </div>
      </div>

      <div className="space-y-3">
        {filteredAdmins.map((admin) => (
          <div key={admin.id} className="flex items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
            <Checkbox 
              checked={selectedAdmins.includes(admin.id)}
              onCheckedChange={(checked) => handleSelectAdmin(admin.id, !!checked)}
            />

            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarImage src={admin.avatar} alt={admin.name} />
                <AvatarFallback className="text-sm font-medium">
                  {getInitials(admin.name)}
                </AvatarFallback>
              </Avatar>
              {admin.name === 'Admin, Graham' && (
                <div className="absolute -top-1 -right-1 text-yellow-500">
                  💫
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-gray-900">{admin.name}</h3>
              </div>
              <p className="text-sm text-gray-600 truncate">{admin.email}</p>
            </div>

            <button 
              className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
              onClick={() => handleRemoveAdmin(admin.id)}
              title="Remove admin"
            >
              ⊖
            </button>
          </div>
        ))}
      </div>

      <BulkMessageModal
        users={selectedAdminUsers}
        open={isMessageModalOpen}
        onOpenChange={setIsMessageModalOpen}
      />

      <AddAdminModal
        open={isAddAdminModalOpen}
        onOpenChange={setIsAddAdminModalOpen}
        onAddAdmin={handleAddNewAdmin}
      />
    </div>
  );
};

export default GroupAdminsPage;
