import React, { useState } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ChatSidebar } from '@/components/messages/ChatSidebar';
import { ChatArea } from '@/components/messages/ChatArea';
import { EmptyChat } from '@/components/messages/EmptyChat';
import { NewChatModal } from '@/components/messages/NewChatModal';

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [allMessages, setAllMessages] = useState({});
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);

  const contacts = [
    {
      id: '1',
      name: 'Sarah Wilson',
      lastMessage: 'Hey there!',
      timestamp: '12:30 PM',
      isOnline: true,
      status: 'online'
    },
    {
      id: '2',
      name: 'Michael Chen',
      lastMessage: "Let's catch up later",
      timestamp: '12:30 PM',
      isOnline: false,
      status: 'away'
    },
    {
      id: '3',
      name: 'Emily Brown',
      lastMessage: 'Did you see the new course?',
      timestamp: '12:30 PM',
      isOnline: true,
      status: 'online'
    },
    {
      id: '4',
      name: 'David Kim',
      lastMessage: 'Thanks for your help!',
      timestamp: '12:30 PM',
      isOnline: false,
      status: 'offline'
    },
    {
      id: '5',
      name: 'Jessica Taylor',
      lastMessage: 'Are you free tomorrow?',
      timestamp: '12:30 PM',
      isOnline: true,
      status: 'online'
    },
    {
      id: '6',
      name: 'Robert Johnson',
      lastMessage: "I'll get back to you",
      timestamp: '12:30 PM',
      isOnline: false,
      status: 'offline'
    }
  ];

  const getMessagesForContact = (contactId) => {
    if (!allMessages[contactId]) {
      const defaultMessages = [
        {
          id: '1',
          senderId: contactId,
          content: 'Hey there!',
          timestamp: '10:30 AM',
          isRead: true
        },
        {
          id: '2',
          senderId: 'current-user',
          content: 'Hi! How are you?',
          timestamp: '10:31 AM',
          isRead: true
        },
        {
          id: '3',
          senderId: contactId,
          content: "I'm doing great! Just finished the React module.",
          timestamp: '10:33 AM',
          isRead: true
        },
        {
          id: '4',
          senderId: 'current-user',
          content: "That's awesome! I'm still working on it.",
          timestamp: '10:34 AM',
          isRead: true
        },
        {
          id: '5',
          senderId: contactId,
          content: 'Let me know if you need any help with it.',
          timestamp: '10:36 AM',
          isRead: false
        }
      ];

      setAllMessages((prev) => ({
        ...prev,
        [contactId]: defaultMessages
      }));

      return defaultMessages;
    }

    return allMessages[contactId];
  };

  const messages = selectedContact ? getMessagesForContact(selectedContact.id) : [];

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setIsMobileSidebarOpen(false);
  };

  const handleBackToContacts = () => {
    setIsMobileSidebarOpen(true);
    setSelectedContact(null);
  };

  const handleSendMessage = (content, attachments) => {
    if (!selectedContact) return;

    let messageContent = content;

    if (attachments && attachments.length > 0) {
      const attachmentInfo = attachments
        .map((att) => {
          if (att.type === 'image') {
            return `📷 ${att.file.name}`;
          } else {
            return `📄 ${att.file.name}`;
          }
        })
        .join(', ');

      messageContent = messageContent ? `${messageContent}\n${attachmentInfo}` : attachmentInfo;
    }

    const newMessage = {
      id: Date.now().toString(),
      senderId: 'current-user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };

    setAllMessages((prev) => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }));

    console.log('Message sent:', newMessage);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Messages" description="Connect with your peers and instructors" />

      <div
        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
        style={{ height: 'calc(100vh - 200px)' }}
      >
        <div className="flex h-full">
          <div
            className={`
              w-full md:w-80 border-r border-gray-200 flex-shrink-0 transition-all duration-300
              ${!isMobileSidebarOpen && selectedContact ? 'hidden md:block' : 'block'}
            `}
          >
            <ChatSidebar
              contacts={contacts}
              selectedContact={selectedContact}
              onContactSelect={handleContactSelect}
              onNewChat={() => setIsNewChatModalOpen(true)}
            />
          </div>

          <div
            className={`
              flex-1 transition-all duration-300
              ${isMobileSidebarOpen && !selectedContact ? 'hidden md:block' : 'block'}
            `}
          >
            {selectedContact ? (
              <ChatArea
                contact={selectedContact}
                messages={messages}
                onBack={handleBackToContacts}
                onSendMessage={handleSendMessage}
              />
            ) : (
              <EmptyChat />
            )}
          </div>
        </div>
      </div>

      <NewChatModal
        contacts={contacts}
        open={isNewChatModalOpen}
        onOpenChange={setIsNewChatModalOpen}
        onContactSelect={(contact) => {
          handleContactSelect(contact);
          setIsNewChatModalOpen(false);
        }}
      />
    </div>
  );
};

export default Messages;
