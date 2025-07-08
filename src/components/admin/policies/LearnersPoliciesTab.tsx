
import React from 'react';
import PolicySection from './PolicySection';
import PolicyItem from './PolicyItem';

const LearnersPoliciesTab = () => {
  const handleSave = (id: string, value: string | boolean) => {
    console.log(`Saving ${id}: ${value}`);
  };

  return (
    <div className="space-y-6">
      <PolicySection title="Log in">
        <PolicyItem id="learnerPreventSimultaneousLogin" label="Prevent simultaneous logins" type="checkbox" initialValue={false} onSave={handleSave} />
      </PolicySection>
      <PolicySection title="Communication">
        <PolicyItem id="learnerMessaging" label="Messaging between learners" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="learnerChat" label="Chat" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="learnerSmsIntegration" label="SMS integration" type="checkbox" initialValue={false} onSave={handleSave} />
      </PolicySection>
      <PolicySection title="Navigation">
        <PolicyItem id="learnerUsersTab" label="Users tab" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="learnerGroupsTab" label="Groups tab" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="learnerResourcesTab" label="Resources tab" type="checkbox" initialValue={false} onSave={handleSave} />
        <PolicyItem id="learnerFullCatalog" label="Full users catalog" type="checkbox" initialValue={false} onSave={handleSave} />
        <PolicyItem id="learnerDefaultHomeTab" label="Select default home tab" type="checkbox" initialValue={false} onSave={handleSave} />
      </PolicySection>
      <PolicySection title="Profile">
        <PolicyItem id="learnerSocialMedia" label="Add social media links to profile page" type="checkbox" initialValue={true} onSave={handleSave} />
      </PolicySection>
      <PolicySection title="News feed">
        <PolicyItem id="learnerHomeNewsFeed" label="Home news feed" type="checkbox" initialValue={false} onSave={handleSave} />
        <PolicyItem id="learnerPostToHomePage" label="Post to home page feed" type="checkbox" initialValue={false} onSave={handleSave} />
      </PolicySection>
      <PolicySection title="Groups">
        <PolicyItem id="learnerGroupMembersTab" label="Group members tab" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="learnerGroupAssistantsTab" label="Group assistants tab" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="learnerGroupAdminsTab" label="Group admins tab" type="checkbox" initialValue={true} onSave={handleSave} />
      </PolicySection>
      <PolicySection title="Online">
        <PolicyItem id="learnerOnlineDisplayLeft" label="Online display in left box" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="learnerShowFellowLearnersOnline" label="Show fellow learners in online display" type="checkbox" initialValue={true} onSave={handleSave} />
      </PolicySection>
      <PolicySection title="Miscellaneous">
        <PolicyItem id="learnerEnrollViaCourses" label="Enroll via Courses/enrolled" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="learnerSeeNicknames" label="See nicknames instead of full names" type="checkbox" initialValue={false} onSave={handleSave} />
      </PolicySection>
    </div>
  );
};

export default LearnersPoliciesTab;
