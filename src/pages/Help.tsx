
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  HelpCircle, FileText, Phone, Mail, MessageSquare, BookOpen, Video
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';

const Help = () => {
  const helpResources = [
    { 
      title: "Documentation", 
      description: "Access our comprehensive guides and documentation",
      icon: <FileText className="h-6 w-6 text-blue-600" />
    },
    { 
      title: "Video Tutorials", 
      description: "Watch step-by-step video tutorials",
      icon: <Video className="h-6 w-6 text-red-600" />
    },
    { 
      title: "Knowledge Base", 
      description: "Browse frequently asked questions and answers",
      icon: <BookOpen className="h-6 w-6 text-green-600" />
    },
    { 
      title: "Live Chat", 
      description: "Chat with our support team in real-time",
      icon: <MessageSquare className="h-6 w-6 text-purple-600" />
    },
    { 
      title: "Phone Support", 
      description: "Call our dedicated support line",
      icon: <Phone className="h-6 w-6 text-orange-600" />
    },
    { 
      title: "Email Support", 
      description: "Send us an email with your question",
      icon: <Mail className="h-6 w-6 text-indigo-600" />
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Help Center" 
        description="Find answers to your questions and get support"
      />
      
      <Card className="mb-6">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex gap-2 items-center">
            <HelpCircle className="text-primary h-5 w-5" />
            <span>How can we help you?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search for help topics..."
              className="w-full border rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2">
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Support Options</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {helpResources.map((resource, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-full bg-gray-100">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{resource.title}</h3>
                  <p className="text-muted-foreground text-sm">{resource.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {[
              { q: "How do I create a new course?", a: "Navigate to the Courses section and click on the 'New Course' button to start the course creation process." },
              { q: "How do I manage user permissions?", a: "Go to the Admin section, then click on 'Permissions' to manage user roles and access rights." },
              { q: "How do I export course data?", a: "In the Admin section, locate the 'Export' option to download course data in various formats." },
              { q: "Can I customize the dashboard?", a: "Yes, you can personalize your dashboard by going to Settings and selecting Dashboard preferences." }
            ].map((faq, i) => (
              <div key={i} className="p-4 hover:bg-muted/50">
                <h4 className="font-medium mb-2">{faq.q}</h4>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Help;
