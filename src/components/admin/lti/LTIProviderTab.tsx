
import React from 'react';
import PolicySection from '@/components/admin/policies/PolicySection';
import PolicyItem from '@/components/admin/policies/PolicyItem'; // This is a read-only file

const LTIProviderTab: React.FC = () => {
  const handleSave = (id: string, value: string | boolean) => {
    // In a real application, this would save the setting
    console.log(`Saving LTI setting ${id}: ${value}`);
  };

  return (
    <div className="space-y-6 mt-6">
      <PolicySection title="Settings">
        <PolicyItem 
          id="ltiEnableAccess" 
          label="Enable access to courses via LTI." 
          type="checkbox" 
          initialValue={false} 
          onSave={handleSave} 
        />
        <PolicyItem 
          id="ltiAutoEnroll" 
          label="Automatically enroll users into courses at LTI launch." 
          type="checkbox" 
          initialValue={false} 
          onSave={handleSave} 
        />
        <PolicyItem 
          id="ltiAutoCreateAccounts" 
          label="Automatically create accounts at LTI launch." 
          type="checkbox" 
          initialValue={false} 
          onSave={handleSave} 
        />
      </PolicySection>
    </div>
  );
};

export default LTIProviderTab;
