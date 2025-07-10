import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, FileText, PlayCircle, BookOpen, Users, Settings, 
  CreditCard, Headphones, Clock, ArrowRight, Video, Edit, 
  Copy, Trash2, Eye, User, Calendar
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { useToast } from '@/hooks/use-toast';
import { ViewGuideModal } from '@/components/guides/ViewGuideModal';
import { EditGuideModal } from '@/components/guides/EditGuideModal';
import { DeleteGuideModal } from '@/components/guides/DeleteGuideModal';
import { ContactSupportModal } from '@/components/guides/ContactSupportModal';

const UserGuide = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { toast } = useToast();

  // Modal states
  const [viewModal, setViewModal] = useState({ isOpen: false, guide: null });
  const [editModal, setEditModal] = useState({ isOpen: false, guide: null });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, guide: null });
  const [contactModal, setContactModal] = useState(false);

  // State for guides
  const [guides, setGuides] = useState([
    {
      id: 1,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'Account Setup and Profile Customization',
      description: 'Learn how to set up your account and customize your profile settings.',
      category: 'Getting Started',
      readTime: '5 min read',
      categoryColor: 'text-green-600',
      author: 'Admin Team',
      date: '2024-01-15',
      views: 1250,
      tags: ['setup', 'profile', 'onboarding']
    },
    {
      id: 2,
      type: 'VIDEO', 
      icon: <Video className="h-4 w-4 text-red-600" />,
      title: 'Navigating the Learning Dashboard',
      description: 'A complete tour of all dashboard features and how to use them effectively.',
      category: 'Getting Started',
      readTime: '8 min read',
      categoryColor: 'text-green-600',
      author: 'Support Team',
      date: '2024-01-20',
      views: 980,
      tags: ['dashboard', 'navigation', 'tour']
    },
    {
      id: 3,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'First Steps Guide for New Users',
      description: 'Essential steps every new user should follow to get started.',
      category: 'Getting Started',
      readTime: '6 min read',
      categoryColor: 'text-green-600',
      author: 'Onboarding Team',
      date: '2024-01-10',
      views: 2100,
      tags: ['first-steps', 'new-user', 'basics']
    },
    {
      id: 4,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'Course Enrollment and Progress Tracking',
      description: 'Step-by-step guide to enrolling in courses and tracking your learning progress.',
      category: 'Courses & Learning',
      readTime: '6 min read',
      categoryColor: 'text-blue-600',
      author: 'Learning Team',
      date: '2024-01-25',
      views: 1580,
      tags: ['enrollment', 'progress', 'tracking']
    },
    {
      id: 5,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'Creating and Managing Courses',
      description: 'Complete guide for instructors on how to create, structure, and manage courses.',
      category: 'Courses & Learning',
      readTime: '12 min read',
      categoryColor: 'text-blue-600',
      author: 'Instructor Team',
      date: '2024-01-30',
      views: 750,
      tags: ['course-creation', 'management', 'instructor']
    },
    {
      id: 6,
      type: 'VIDEO',
      icon: <Video className="h-4 w-4 text-red-600" />,
      title: 'Setting Up Group Discussions',
      description: 'Learn how to create study groups and facilitate meaningful discussions.',
      category: 'Courses & Learning',
      readTime: '10 min read',
      categoryColor: 'text-blue-600',
      author: 'Community Team',
      date: '2024-02-01',
      views: 420,
      tags: ['groups', 'discussions', 'collaboration']
    },
    {
      id: 7,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'Password Management and Security',
      description: 'Best practices for managing your password and account security.',
      category: 'Account Settings',
      readTime: '7 min read',
      categoryColor: 'text-indigo-600',
      author: 'Security Team',
      date: '2024-02-05',
      views: 890,
      tags: ['password', 'security', 'account']
    },
    {
      id: 8,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'Notification Preferences Setup',
      description: 'Configure your notification settings to stay informed.',
      category: 'Account Settings',
      readTime: '4 min read',
      categoryColor: 'text-indigo-600',
      author: 'Product Team',
      date: '2024-02-08',
      views: 650,
      tags: ['notifications', 'preferences', 'settings']
    },
    {
      id: 9,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'Managing Your Billing Information',
      description: 'Learn how to update payment methods and manage billing preferences.',
      category: 'Billing & Payments',
      readTime: '7 min read',
      categoryColor: 'text-orange-600',
      author: 'Billing Team',
      date: '2024-02-10',
      views: 1200,
      tags: ['billing', 'payments', 'subscription']
    },
    {
      id: 10,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'Understanding Your Invoice',
      description: 'Detailed explanation of invoice components and billing cycles.',
      category: 'Billing & Payments',
      readTime: '5 min read',
      categoryColor: 'text-orange-600',
      author: 'Finance Team',
      date: '2024-02-12',
      views: 780,
      tags: ['invoice', 'billing-cycle', 'charges']
    },
    {
      id: 11,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'Accessibility Features for All Users',
      description: 'Discover the accessibility features available throughout the platform.',
      category: 'Technical Support',
      readTime: '10 min read',
      categoryColor: 'text-purple-600',
      author: 'Accessibility Team',
      date: '2024-02-15',
      views: 560,
      tags: ['accessibility', 'features', 'support']
    },
    {
      id: 12,
      type: 'ARTICLE',
      icon: <FileText className="h-4 w-4 text-blue-600" />,
      title: 'Troubleshooting Common Issues',
      description: 'Solutions to the most frequently encountered technical problems.',
      category: 'Technical Support',
      readTime: '8 min read',
      categoryColor: 'text-purple-600',
      author: 'Tech Support',
      date: '2024-02-18',
      views: 1340,
      tags: ['troubleshooting', 'issues', 'solutions']
    }
  ]);

  const tabCategories = [
    { id: 'all', label: 'All Guides', count: guides.length },
    { id: 'getting-started', label: 'Getting Started', count: guides.filter(g => g.category === 'Getting Started').length },
    { id: 'courses', label: 'Courses & Learning', count: guides.filter(g => g.category === 'Courses & Learning').length },
    { id: 'account', label: 'Account Settings', count: guides.filter(g => g.category === 'Account Settings').length },
    { id: 'billing', label: 'Billing & Payments', count: guides.filter(g => g.category === 'Billing & Payments').length },
    { id: 'support', label: 'Technical Support', count: guides.filter(g => g.category === 'Technical Support').length }
  ];

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Getting Started': return 'text-green-600';
      case 'Courses & Learning': return 'text-blue-600';
      case 'Account Settings': return 'text-indigo-600';
      case 'Billing & Payments': return 'text-orange-600';
      case 'Technical Support': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getFilteredGuides = (tabId) => {
    if (tabId === 'all') return guides;
    
    const categoryMap = {
      'getting-started': 'Getting Started',
      'courses': 'Courses & Learning',
      'account': 'Account Settings',
      'billing': 'Billing & Payments',
      'support': 'Technical Support'
    };
    
    return guides.filter(guide => guide.category === categoryMap[tabId]);
  };

  const handleView = (guide) => {
    setViewModal({ isOpen: true, guide });
  };

  const handleEdit = (guide) => {
    setEditModal({ isOpen: true, guide });
  };

  const handleDuplicate = (guide) => {
    const duplicatedGuide = {
      ...guide,
      id: Date.now(),
      title: `Copy of ${guide.title}`,
      date: new Date().toISOString().split('T')[0],
      views: 0
    };
    setGuides(prev => [duplicatedGuide, ...prev]);
    toast({
      title: "Guide Duplicated",
      description: `Created copy: ${duplicatedGuide.title}`,
    });
  };

  const handleDelete = (guide) => {
    setDeleteModal({ isOpen: true, guide });
  };

  const handleEditSave = (updatedGuide) => {
    setGuides(prev => prev.map(guide => 
      guide.id === updatedGuide.id ? updatedGuide : guide
    ));
    toast({
      title: "Guide Updated",
      description: `Updated: ${updatedGuide.title}`,
    });
  };

  const handleDeleteConfirm = (guideId) => {
    setGuides(prev => prev.filter(guide => guide.id !== guideId));
    toast({
      title: "Guide Deleted",
      description: "The guide has been successfully deleted.",
      variant: "destructive",
    });
  };

  const handleContactSupport = (data) => {
    toast({
      title: "Message Sent",
      description: "We'll get back to you within 24 hours.",
    });
  };

  const filteredGuides = getFilteredGuides(activeTab).filter(guide =>
    guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderGuideCards = (guides) => {
    if (guides.length === 0) {
      return (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No guides available</h3>
          <p className="text-gray-600">No guides found in this section.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {guides.map((guide) => (
          <Card key={guide.id} className="hover:shadow-lg transition-all duration-200 group h-full flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                <div className="flex items-start justify-between">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {guide.type}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye className="h-3 w-3" />
                    <span>{guide.views}</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1 flex-shrink-0">
                    {guide.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {guide.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium ${getCategoryColor(guide.category)}`}>
                          {guide.category}
                        </span>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{guide.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <User className="h-3 w-3" />
                        <span>{guide.author}</span>
                        <span>•</span>
                        <Calendar className="h-3 w-3" />
                        <span>{guide.date}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {guide.tags.slice(0, 2).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Fixed layout */}
              <div className="grid grid-cols-2 gap-2 pt-4 border-t mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleView(guide)}
                  className="h-8 text-xs hover:bg-blue-50 hover:text-blue-600 justify-start"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(guide)}
                  className="h-8 text-xs hover:bg-gray-50 justify-start"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDuplicate(guide)}
                  className="h-8 text-xs hover:bg-gray-50 justify-start"
                >
                  <Copy className="h-3 w-3 mr-1" />
                  Duplicate
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(guide)}
                  className="h-8 text-xs hover:bg-red-50 hover:text-red-600 justify-start"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">User Guides</h1>
        <p className="text-gray-600">Explore our comprehensive guides to help you make the most of our platform.</p>
      </div>
      
      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search guides and tutorials..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-6">
          {tabCategories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id} 
              className="text-xs lg:text-sm data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600 data-[state=active]:border-blue-200"
            >
              {category.label} ({category.count})
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {renderGuideCards(filteredGuides)}
        </TabsContent>

        <TabsContent value="getting-started" className="space-y-6">
          {renderGuideCards(filteredGuides)}
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          {renderGuideCards(filteredGuides)}
        </TabsContent>

        <TabsContent value="account" className="space-y-6">
          {renderGuideCards(filteredGuides)}
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          {renderGuideCards(filteredGuides)}
        </TabsContent>

        <TabsContent value="support" className="space-y-6">
          {renderGuideCards(filteredGuides)}
        </TabsContent>
      </Tabs>

      {/* Help Section */}
      <Card className="bg-gray-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Can't find what you're looking for?</h3>
              <p className="text-sm text-gray-600">Our support team is always ready to help with any questions you might have.</p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setContactModal(true)}
            >
              Contact Support
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <ViewGuideModal
        isOpen={viewModal.isOpen}
        onClose={() => setViewModal({ isOpen: false, guide: null })}
        guide={viewModal.guide}
      />

      <EditGuideModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, guide: null })}
        guide={editModal.guide}
        onSave={handleEditSave}
      />

      <DeleteGuideModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, guide: null })}
        guide={deleteModal.guide}
        onConfirm={handleDeleteConfirm}
      />

      <ContactSupportModal
        isOpen={contactModal}
        onClose={() => setContactModal(false)}
        onSubmit={handleContactSupport}
      />
    </div>
  );
};

export default UserGuide;