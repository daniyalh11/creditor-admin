
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/shared/PageHeader';
import { HelpCircle, MessageSquare, FileText, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HelpDeskSettings = () => {
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Ticket Submitted",
      description: "Your support ticket has been submitted successfully."
    });
    setTicketForm({ subject: '', description: '', priority: 'medium' });
  };

  const faqs = [
    {
      question: "How do I reset a user's password?",
      answer: "Go to Users > Select User > Reset Password"
    },
    {
      question: "How do I add a new course?",
      answer: "Navigate to Courses > Add New Course > Fill in details"
    },
    {
      question: "How do I configure email settings?",
      answer: "Go to Admin > Email Settings > Configure SMTP"
    },
    {
      question: "How do I export user data?",
      answer: "Visit Admin > Export > Select User Data > Download CSV"
    }
  ];

  const recentTickets = [
    { id: '#001', subject: 'User login issues', status: 'Open', priority: 'High' },
    { id: '#002', subject: 'Course enrollment problem', status: 'In Progress', priority: 'Medium' },
    { id: '#003', subject: 'Email notifications not working', status: 'Resolved', priority: 'Low' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Help Desk Settings" 
        description="Configure help desk and support options"
        icon={<HelpCircle className="h-6 w-6 text-primary" />}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Submit Support Ticket
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={ticketForm.subject}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, subject: e.target.value }))}
                  placeholder="Brief description of the issue"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={ticketForm.priority}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, priority: e.target.value }))}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={ticketForm.description}
                  onChange={(e) => setTicketForm(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed description of the issue"
                  rows={4}
                />
              </div>
              <Button type="submit" className="w-full">Submit Ticket</Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-l-2 border-primary pl-4">
                <h4 className="font-medium text-sm">{faq.question}</h4>
                <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Support Tickets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <span className="font-medium">{ticket.id}</span>
                  <span className="ml-2">{ticket.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded text-xs ${
                    ticket.status === 'Open' ? 'bg-red-100 text-red-800' :
                    ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                    ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpDeskSettings;
