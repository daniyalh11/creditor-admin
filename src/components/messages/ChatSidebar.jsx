import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ChatSidebar = ({
  contacts,
  selectedContact,
  onContactSelect,
  onNewChat
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* New Message Button */}
        <Button 
          onClick={onNewChat}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact)}
            className={cn(
              "flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0",
              selectedContact?.id === contact.id && "bg-blue-50 border-blue-200"
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                  {getInitials(contact.name)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-medium text-gray-900 truncate">
                  {contact.name}
                </h3>
                <span className="text-xs text-gray-500 flex-shrink-0">
                  {contact.timestamp}
                </span>
              </div>
              <p className="text-sm text-gray-600 truncate">
                {contact.lastMessage}
              </p>
            </div>

            {contact.unreadCount && (
              <div className="bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {contact.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};