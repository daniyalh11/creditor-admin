
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Workflow, BookOpen, Download,
  HelpCircle, ClipboardList, Shield, Video, 
  Info
} from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();

  const adminItems = [
    { 
      icon: <Info size={24} />, 
      title: "About", 
      description: "Manage site information and details",
      path: "/admin/about" 
    },
    { 
      icon: <Workflow size={24} />, 
      title: "Automation", 
      description: "Configure automated tasks and workflows",
      path: "/admin/automation" 
    },
    { 
      icon: <BookOpen size={24} />, 
      title: "Catalog", 
      description: "Manage course catalog settings",
      path: "/admin/catalog" 
    },
    { 
      icon: <Download size={24} />, 
      title: "Export", 
      description: "Export data and settings",
      path: "/admin/export" 
    },
    { 
      icon: <HelpCircle size={24} />, 
      title: "Help desk", 
      description: "Configure help desk and support settings",
      path: "/admin/help" 
    },
    { 
      icon: <ClipboardList size={24} />, 
      title: "Plans", 
      description: "Manage subscription plans and billing",
      path: "/admin/plans" 
    },
    { 
      icon: <Shield size={24} />, 
      title: "Policies", 
      description: "Manage system-wide policies and permissions",
      path: "/admin/policies" 
    },
    { 
      icon: <Video size={24} />, 
      title: "ZoomUS API", 
      description: "Configure Zoom meeting integration",
      path: "/admin/zoomus" 
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Admin" 
        description="Manage system settings and configurations"
      />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {adminItems.map((item) => (
          <Card 
            key={item.path} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
            onClick={() => navigate(item.path)}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {item.icon}
                </div>
                <CardTitle className="text-sm font-medium">
                  {item.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-xs">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Admin;
