import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/shared/PageHeader';
import { HelpCircle, MessageSquare, FileText, Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const HelpDeskSettings = () => {
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    description: '',
    priority: 'medium'
  });

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "How do I reset a user's password?",
      answer: "Go to Users > Select User > Reset Password"
    },
    {
      id: 2,
      question: "How do I add a new course?",
      answer: "Navigate to Courses > Add New Course > Fill in details"
    },
    {
      id: 3,
      question: "How do I configure email settings?",
      answer: "Go to Admin > Email Settings > Configure SMTP"
    },
    {
      id: 4,
      question: "How do I export user data?",
      answer: "Visit Admin > Export > Select User Data > Download CSV"
    }
  ]);

  const [showFaqModal, setShowFaqModal] = useState(false);
  const [currentFaq, setCurrentFaq] = useState({
    id: null,
    question: '',
    answer: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  const recentTickets = [
    { id: '#001', subject: 'User login issues', status: 'Open', priority: 'High' },
    { id: '#002', subject: 'Course enrollment problem', status: 'In Progress', priority: 'Medium' },
    { id: '#003', subject: 'Email notifications not working', status: 'Resolved', priority: 'Low' }
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    toast({
      title: "Ticket Submitted",
      description: "Your support ticket has been submitted successfully."
    });
    setTicketForm({ subject: '', description: '', priority: 'medium' });
  };

  const handleAddFaq = () => {
    setIsEditing(false);
    setCurrentFaq({ id: null, question: '', answer: '' });
    setShowFaqModal(true);
  };

  const handleEditFaq = (faq) => {
    setIsEditing(true);
    setCurrentFaq({ ...faq });
    setShowFaqModal(true);
  };

  const handleDeleteFaq = (id) => {
    setFaqs(faqs.filter(faq => faq.id !== id));
    toast({
      title: "FAQ Deleted",
      description: "The FAQ has been removed successfully."
    });
  };

  const handleSaveFaq = (e) => {
    e.preventDefault();
    if (currentFaq.question.trim() && currentFaq.answer.trim()) {
      if (isEditing) {
        setFaqs(faqs.map(faq => 
          faq.id === currentFaq.id ? currentFaq : faq
        ));
        toast({
          title: "FAQ Updated",
          description: "The FAQ has been updated successfully."
        });
      } else {
        const newId = Math.max(...faqs.map(faq => faq.id), 0) + 1;
        setFaqs([...faqs, { ...currentFaq, id: newId }]);
        toast({
          title: "FAQ Added",
          description: "The new FAQ has been added successfully."
        });
      }
      setShowFaqModal(false);
    }
  };

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
            {faqs.map((faq) => (
              <div key={faq.id} className="border-l-2 border-primary pl-4 group">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-sm">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{faq.answer}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditFaq(faq)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" onClick={handleAddFaq}>
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

      {/* FAQ Modal */}
      <Dialog open={showFaqModal} onOpenChange={setShowFaqModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
            <DialogDescription>
              {isEditing ? 'Update the question and answer' : 'Fill in the question and answer for the new FAQ'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveFaq} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Question</label>
              <Input
                value={currentFaq.question}
                onChange={(e) => setCurrentFaq({ ...currentFaq, question: e.target.value })}
                placeholder="Enter the question"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Answer</label>
              <Textarea
                value={currentFaq.answer}
                onChange={(e) => setCurrentFaq({ ...currentFaq, answer: e.target.value })}
                placeholder="Enter the answer"
                rows={4}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowFaqModal(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? 'Update FAQ' : 'Add FAQ'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpDeskSettings;