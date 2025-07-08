
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search } from 'lucide-react';
import { Contact } from '@/pages/Messages';

interface NewChatModalProps {
  contacts: Contact[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactSelect: (contact: Contact) => void;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  contacts,
  open,
  onOpenChange,
  onContactSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Chat</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Contacts List */}
          <div className="max-h-96 overflow-y-auto space-y-1">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => onContactSelect(contact)}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors rounded-lg"
              >
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                    {getInitials(contact.name)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {contact.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
