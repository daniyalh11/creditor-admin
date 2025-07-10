import React from 'react';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { PageHeader } from '@/components/shared/PageHeader';

const AdminDashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8 animate-fade-in">
          <PageHeader 
            title="Dashboard" 
            description="Configure dashboard settings and preferences"
          />
          
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
