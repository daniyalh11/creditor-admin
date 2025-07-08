
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, Phone, Clock, MessageCircle, Send, MapPin
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { useToast } from '@/hooks/use-toast';

const ContactSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Contact Support" 
        description="Get in touch with our support team"
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Email Support Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-blue-600" />
              Email Support
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Brief description of your issue"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Please describe your issue in detail..."
                  rows={5}
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-green-600" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-gray-600">support@creditoracademy.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Office Hours</p>
                  <p className="text-sm text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p className="text-sm text-gray-600">Saturday: 10:00 AM - 2:00 PM EST</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-sm text-gray-600">123 Education Lane</p>
                  <p className="text-sm text-gray-600">Learning City, LC 12345</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Live Chat */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-purple-600" />
                Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Chat with our support team in real-time for immediate assistance.
              </p>
              <Button className="w-full" variant="outline">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Live Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContactSupport;
