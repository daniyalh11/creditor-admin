
import React from 'react';
import PolicySection from './PolicySection';
import PolicyItem from './PolicyItem';

const ManagersPoliciesTab = () => {
  const handleSave = (id: string, value: string | boolean) => {
    console.log(`Saving ${id}: ${value}`);
  };

  return (
    <div className="space-y-6">
      <PolicySection title="Permissions"> {/* Changed title as "Feature" is not descriptive enough */}
        <PolicyItem id="managerEnrollLearners" label="Enroll learners into courses and paths" type="checkbox" initialValue={true} onSave={handleSave} />
      </PolicySection>
    </div>
  );
};

export default ManagersPoliciesTab;
