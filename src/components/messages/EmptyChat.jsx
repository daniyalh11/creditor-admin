import React from 'react';
import { MessageCircle } from 'lucide-react';

export const EmptyChat = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50 text-center p-8">
      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full p-6 mb-6">
        <MessageCircle className="h-16 w-16 text-blue-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Select a conversation to start messaging
      </h3>
      <p className="text-gray-600 max-w-md">
        Choose from your existing conversations or start a new one with your peers and instructors.
      </p>
    </div>
  );
};