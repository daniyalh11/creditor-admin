
import React, { useEffect } from 'react';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import LTIAssessmentsTab from '@/components/admin/lti/LTIAssessmentsTab';
import LTIProviderTab from '@/components/admin/lti/LTIProviderTab';

const LTISettings: React.FC = () => {
  const { tab = 'assessments' } = useParams<{ tab?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // If the base /admin/lti path is hit, redirect to the default tab
    if (location.pathname === '/admin/lti' || location.pathname === '/admin/lti/') {
      navigate('/admin/lti/assessments', { replace: true });
    }
  }, [location.pathname, navigate]);
  
  const handleTabChange = (value: string) => {
    navigate(`/admin/lti/${value}`);
  };

  // Determine active tab for conditional rendering, matching useParams logic
  const currentActiveTab = location.pathname.split('/admin/lti/')[1]?.split('/')[0] || 'assessments';


  return (
    <div className="space-y-6">
      <PageHeader 
        title="LTI" 
        description="Configure Learning Tools Interoperability (LTI) settings."
      />
      <Tabs value={currentActiveTab} onValueChange={handleTabChange} className="w-full">
        <div className="flex justify-between items-center border-b">
          <TabsList className="bg-transparent p-0">
            <TabsTrigger 
              value="assessments" 
              className="rounded-t-md rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-3"
            >
              Assessments
            </TabsTrigger>
            <TabsTrigger 
              value="provider"
              className="rounded-t-md rounded-b-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none px-4 py-3"
            >
              Provider
            </TabsTrigger>
          </TabsList>
          {currentActiveTab === 'assessments' && (
            <Button variant="default" size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          )}
        </div>
        
        {/* This Outlet will render child routes if defined, or we can render components directly based on tab */}
        {/* For simplicity with current structure, rendering components directly based on tab */}
        {currentActiveTab === 'assessments' && <LTIAssessmentsTab />}
        {currentActiveTab === 'provider' && <LTIProviderTab />}

      </Tabs>
    </div>
  );
};

export default LTISettings;
