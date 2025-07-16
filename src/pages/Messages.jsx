import React, { useState, useEffect } from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ChatSidebar } from '@/components/messages/ChatSidebar';
import { ChatArea } from '@/components/messages/ChatArea';
import { EmptyChat } from '@/components/messages/EmptyChat';
import { NewChatModal } from '@/components/messages/NewChatModal';

const Messages = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(true);
  const [allMessages, setAllMessages] = useState({
    '1': [
      { id: '1', senderId: '1', content: 'Hey there!', timestamp: '10:30 AM', isRead: true },
      { id: '2', senderId: 'current-user', content: 'Hi! How are you?', timestamp: '10:31 AM', isRead: true },
      { id: '3', senderId: '1', content: 'Did you check the new assignment?', timestamp: '10:32 AM', isRead: false },
      { id: '4', senderId: '1', content: 'Let me know if you need help.', timestamp: '10:33 AM', isRead: false },
    ],
    '2': [
      { id: '1', senderId: '2', content: 'Let\'s catch up later', timestamp: '11:00 AM', isRead: true },
      { id: '2', senderId: 'current-user', content: 'Sure, ping me!', timestamp: '11:01 AM', isRead: true },
    ],
    '3': [
      { id: '1', senderId: '3', content: 'Did you see the new course?', timestamp: '09:00 AM', isRead: false },
    ],
    '4': [
      { id: '1', senderId: '4', content: 'Thanks for your help!', timestamp: '08:00 AM', isRead: true },
    ],
    // '5' and '6' have no messages yet
  });
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isStartingNewChat, setIsStartingNewChat] = useState(false);

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

  // Get contacts with existing conversations (for sidebar)
  const contactsWithChats = contacts
    .filter((c) => allMessages[c.id] && allMessages[c.id].length > 0)
    .map((c) => {
      const messagesArr = allMessages[c.id];
      const lastMessageObj = messagesArr[messagesArr.length - 1];
      const lastMessage = lastMessageObj ? lastMessageObj.content : '';
      const timestamp = lastMessageObj ? lastMessageObj.timestamp : '';
      const unreadCount = messagesArr.filter((m) => !m.isRead && m.senderId !== 'current-user').length || 0;
      return {
        ...c,
        lastMessage,
        timestamp,
        unreadCount,
      };
    });

  // Get contacts without conversations (for new chat modal)
  const contactsWithoutChats = contacts.filter((c) => !allMessages[c.id] || allMessages[c.id].length === 0);

  // Only initialize dummy messages for existing conversations
  const getMessagesForContact = (contactId) => {
    if (!allMessages[contactId]) {
      if (!isStartingNewChat) {
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
      } else {
        // New chat: return empty array
        return [];
      }
    }
    return allMessages[contactId];
  };

  // If starting a new chat, show blank chat
  const messages = selectedContact
    ? getMessagesForContact(selectedContact.id)
    : [];

  // Mark all messages as read when opening a chat with unread messages
  useEffect(() => {
    if (selectedContact && allMessages[selectedContact.id]) {
      const hasUnread = allMessages[selectedContact.id].some((m) => !m.isRead && m.senderId !== 'current-user');
      if (hasUnread) {
        setAllMessages((prev) => ({
          ...prev,
          [selectedContact.id]: prev[selectedContact.id].map((m) =>
            m.senderId !== 'current-user' ? { ...m, isRead: true } : m
          )
        }));
      }
    }
  }, [selectedContact]);

  const handleContactSelect = (contact) => {
    const isNew = !allMessages[contact.id] || allMessages[contact.id].length === 0;
    setSelectedContact(contact);
    setIsMobileSidebarOpen(false);
    setIsStartingNewChat(isNew);
  };

  const handleBackToContacts = () => {
    setIsMobileSidebarOpen(true);
    setSelectedContact(null);
    setIsStartingNewChat(false);
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

    if (isStartingNewChat) {
      setIsStartingNewChat(false);
    }

    console.log('Message sent:', newMessage);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader title="Messages" description="Connect with your peers and instructors" />

      <div
        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm"
        style={{ height: 'calc(100vh - 200px)' }}
      >
        <div className="flex h-full flex-col md:flex-row">
          <div
            className={`
              w-full md:w-80 border-r border-gray-200 flex-shrink-0 transition-all duration-300
              ${!isMobileSidebarOpen && selectedContact ? 'hidden md:block' : 'block'}
            `}
          >
            <ChatSidebar
              contacts={contactsWithChats}
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
        contacts={contactsWithoutChats}
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
