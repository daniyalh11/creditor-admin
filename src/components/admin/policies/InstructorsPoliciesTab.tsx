
import React from 'react';
import PolicySection from './PolicySection';
import PolicyItem from './PolicyItem';

const InstructorsPoliciesTab = () => {
  const handleSave = (id: string, value: string | boolean) => {
    console.log(`Saving ${id}: ${value}`);
  };

  return (
    <div className="space-y-6">
      <PolicySection title="Log in">
        <PolicyItem id="instructorSeeLearnerIds" label="See their learner's user ids" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="instructorSeeLearnerPasswords" label="See their learner's passwords" type="checkbox" initialValue={true} onSave={handleSave} />
      </PolicySection>
      <PolicySection title="Miscellaneous">
        <PolicyItem id="instructorSeeAllScores" label="See scores for all learners, not just their own" type="checkbox" initialValue={true} onSave={handleSave} />
      </PolicySection>
    </div>
  );
};

export default InstructorsPoliciesTab;
