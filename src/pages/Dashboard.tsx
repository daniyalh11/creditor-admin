
import React from 'react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StudentDashboard } from '@/components/homepage/StudentDashboard';

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Dashboard" 
        description="Welcome to Creditor Academy"
      />
      
      <StudentDashboard />
    </div>
  );
};

export default Dashboard;
