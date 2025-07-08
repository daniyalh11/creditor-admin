
import React from 'react';
import PolicySection from './PolicySection';
import PolicyItem from './PolicyItem';

const AdministratorsPoliciesTab = () => {
  const handleSave = (id: string, value: string | boolean) => {
    console.log(`Saving ${id}: ${value}`);
  };

  return (
    <div className="space-y-6">
      <PolicySection title="Log in">
        <PolicyItem id="adminSeeUserIds" label="See all user ids" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="adminSeePasswords" label="See all passwords" type="checkbox" initialValue={true} onSave={handleSave} />
      </PolicySection>
      <PolicySection title="Miscellaneous">
        <PolicyItem id="adminSignupNotifications" label="Receive notifications of users that sign up" type="checkbox" initialValue={true} onSave={handleSave} />
      </PolicySection>
    </div>
  );
};

export default AdministratorsPoliciesTab;
