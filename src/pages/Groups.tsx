import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Search, Plus, MoreVertical, Trash2, Archive } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  ContextMenu, 
  ContextMenuContent, 
  ContextMenuItem, 
  ContextMenuTrigger 
} from '@/components/ui/context-menu';
import { PageHeader } from '@/components/shared/PageHeader';
import { AddGroupDialog } from '@/components/groups/AddGroupDialog';

const Groups = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all-types');
  const navigate = useNavigate();
  
  // Enhanced groups data with images and more details for admin view
  const groups = [
    { 
      id: 1, 
      name: 'Customer Service Excellence', 
      type: 'Study group',
      members: 313, 
      active: true,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop',
      description: 'Advanced customer service training and best practices',
      enrollmentStatus: 'Enrolled'
    },
    { 
      id: 2, 
      name: 'IT Management & Strategy', 
      type: 'Interest group',
      members: 156, 
      active: true,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=200&fit=crop',
      description: 'Strategic IT management and digital transformation',
      enrollmentStatus: 'Enrolled'
    },
    { 
      id: 3, 
      name: 'Financial Markets Analysis', 
      type: 'Study group',
      members: 89, 
      active: true,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop',
      description: 'In-depth financial markets research and analysis',
      enrollmentStatus: 'Available'
    },
    { 
      id: 4, 
      name: 'Banking Operations Excellence', 
      type: 'Professional group',
      members: 234, 
      active: true,
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=200&fit=crop',
      description: 'Banking operations optimization and compliance',
      enrollmentStatus: 'Available'
    },
    { 
      id: 5, 
      name: 'Digital Marketing Strategies', 
      type: 'Interest group',
      members: 178, 
      active: false,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=200&fit=crop',
      description: 'Modern digital marketing techniques and tools',
      enrollmentStatus: 'Enrolled'
    },
    { 
      id: 6, 
      name: 'Leadership Development', 
      type: 'Study group',
      members: 145, 
      active: true,
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop',
      description: 'Executive leadership skills and management training',
      enrollmentStatus: 'Available'
    }
  ];

  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all-types' || group.type.toLowerCase().includes(selectedType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const handleOpenGroup = (groupId: number) => {
    navigate(`/groups/view/${groupId}`);
  };

  const handleDeleteGroup = (groupId: number) => {
    console.log('Delete group:', groupId);
    // Handle delete logic here
  };

  const handleArchiveGroup = (groupId: number) => {
    console.log('Archive group:', groupId);
    // Handle archive logic here
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">My Groups</h1>
          <p className="text-gray-600 mt-1">Manage and participate in your enrolled groups</p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Create Group
        </Button>
      </div>

      {/* Search and Filters - Removed "More filters" button */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9" 
            placeholder="Search my groups..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-32 border-gray-300">
            <SelectValue placeholder="All types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-types">All types</SelectItem>
            <SelectItem value="study">Study group</SelectItem>
            <SelectItem value="interest">Interest group</SelectItem>
            <SelectItem value="professional">Professional group</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Groups Grid - Wider cards with fewer columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <ContextMenu key={group.id}>
            <ContextMenuTrigger>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group relative cursor-pointer">
                {/* Enrollment Status Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    group.enrollmentStatus === 'Enrolled' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {group.enrollmentStatus}
                  </span>
                </div>

                {/* Three-dot menu */}
                <div className="absolute top-2 right-2 z-10">
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-6 w-6 bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-3 w-3" />
                      </Button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem onClick={() => handleArchiveGroup(group.id)}>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive Group
                      </ContextMenuItem>
                      <ContextMenuItem 
                        onClick={() => handleDeleteGroup(group.id)}
                        className="text-red-600 focus:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Group
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </div>

                {/* Group Image - Keep same aspect ratio */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img 
                    src={group.image} 
                    alt={group.name}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Group Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <h3 className="font-medium text-base text-gray-900 truncate">{group.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{group.type}</p>
                    </div>

                    {/* Members Count */}
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Members</span>
                      <span className="font-medium text-gray-900">{group.members}</span>
                    </div>

                    {/* Open Group Button */}
                    <Button 
                      onClick={() => handleOpenGroup(group.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2"
                    >
                      Open Group
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => handleOpenGroup(group.id)}>
                Open Group
              </ContextMenuItem>
              <ContextMenuItem onClick={() => handleArchiveGroup(group.id)}>
                <Archive className="h-4 w-4 mr-2" />
                Archive Group
              </ContextMenuItem>
              <ContextMenuItem 
                onClick={() => handleDeleteGroup(group.id)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Group
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>

      {/* Empty State */}
      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No groups found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery ? 'Try adjusting your search terms' : 'Create your first group to get started'}
          </p>
          {!searchQuery && (
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Group
            </Button>
          )}
        </div>
      )}

      <AddGroupDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Groups;
