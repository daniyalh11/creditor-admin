
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { MessageSquare } from 'lucide-react';

interface MessageType {
  id: string;
  title: string;
  description: string;
}

const MessagesSettings = () => {
  const messageTypes: MessageType[] = [
    {
      id: "account-invitation",
      title: "Account invitation",
      description: "Sent to someone when they are invited to create an account."
    },
    {
      id: "achieve-level",
      title: "Achieve level",
      description: "Sent to a learner when they achieve a game level."
    },
    {
      id: "archive-user",
      title: "Archive user",
      description: "Sent to a user when they are archived via automation"
    },
    {
      id: "assessment-given",
      title: "Assessment given",
      description: "Sent to a learner when an assessment is given."
    },
    {
      id: "assessment-graded",
      title: "Assessment graded",
      description: "Sent to a learner when an assessment is graded."
    },
    {
      id: "assessment-reminder",
      title: "Assessment reminder",
      description: "Sent to a learner when an assessment is due."
    },
    {
      id: "assessment-submitted",
      title: "Assessment submitted",
      description: "Sent to a learner when an assessment is submitted."
    },
    {
      id: "auto-deactivation",
      title: "Auto deactivation",
      description: "Sent to a learner when they are automatically deactivated from a course after the time limit has been reached."
    },
    {
      id: "auto-deactivation-warning",
      title: "Auto deactivation warning",
      description: "Sent to a learner when they are being warned of automatic deactivation."
    },
    {
      id: "award-badge",
      title: "Award badge",
      description: "Sent to a learner when they are awarded a badge"
    }
  ];
  
  const handleMessageClick = (id: string) => {
    // In a real application, this would open an editor for the specific message
    console.log(`Edit message template: ${id}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Messages" 
        description="Configure messaging templates and notification settings"
      />
      
      <Card className="border-0 shadow-none">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-muted-foreground">Click on an action to show/edit its message.</p>
          </div>
          
          <div className="space-y-6">
            {messageTypes.map((message) => (
              <div 
                key={message.id}
                className="cursor-pointer hover:bg-accent/50 -mx-2 px-2 py-1 rounded-md transition-colors"
                onClick={() => handleMessageClick(message.id)}
              >
                <h3 className="text-primary font-medium">{message.title}</h3>
                <p className="text-muted-foreground text-sm">{message.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesSettings;
