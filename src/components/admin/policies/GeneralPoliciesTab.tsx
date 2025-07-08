
import React from 'react';
import PolicySection from './PolicySection';
import PolicyItem from './PolicyItem';
import { Checkbox } from '@/components/ui/checkbox'; // For "List available authenticators"

const GeneralPoliciesTab = () => {
  // Placeholder for state and save logic
  const handleSave = (id: string, value: string | boolean) => {
    console.log(`Saving ${id}: ${value}`);
  };

  return (
    <div className="space-y-6">
      <PolicySection title="Log in">
        <PolicyItem id="emailAsUserId" label="Use the email as userid" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="strongPasswords" label="Strong passwords" type="checkbox" initialValue={false} onSave={handleSave} isCrossedOut={true} />
        <PolicyItem id="passwordReuse" label="Number of last passwords that cannot be re-used" type="editableText" initialValue="-" onSave={handleSave} />
        <PolicyItem id="accountLockout" label="Number of attempts before account lockout" type="editableText" initialValue="50" onSave={handleSave} />
        <PolicyItem id="rememberMeExpiration" label="Remember me expiration limit" type="editableText" initialValue="" placeholder="30 Days" defaultValueLabel="Default" onSave={handleSave} />
      </PolicySection>

      <PolicySection title="Two factor authentication" description="Two factor authentication protects accounts from unauthorized access by requiring a user to periodically enter a code obtained via an authenticator during login. An authenticator is a free program that can be downloaded to the mobile device of the user. We recommend that two factor authentication is initially enabled for administrators.">
         <div className="flex items-center space-x-3 py-2">
            <Checkbox id="listAuthenticators" />
            <label htmlFor="listAuthenticators" className="text-sm font-medium leading-none">
                List available authenticators
            </label>
        </div>
      </PolicySection>
      
      <PolicySection title="Enforce for">
        <p className="text-sm text-muted-foreground">Administrators &nbsp; Instructors &nbsp; Learners &nbsp; Managers</p>
      </PolicySection>

      <PolicySection title="Authentication remote check" description="Authentication remote check protects the portal from unauthorized access by performing a remote authentication during login or sign up.">
        <PolicyItem id="configAuthRemoteCheck" label="Configure authentication remote check" type="buttonLink" buttonLinkAction={() => console.log('Configure auth remote check clicked')} />
      </PolicySection>

      <PolicySection title="News feed">
        <PolicyItem id="allowCommentsNews" label="Allow comments on home news feed announcements" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="allowDisableAnnouncements" label="Allow disabling of announcement notifications" type="checkbox" initialValue={false} onSave={handleSave} />
      </PolicySection>

      <PolicySection title="Profile">
        <PolicyItem id="uniqueEmails" label="Require email addresses to be unique" type="checkbox" initialValue={true} onSave={handleSave} />
        <PolicyItem id="uniqueMobile" label="Require mobile phone numbers to be unique" type="checkbox" initialValue={false} onSave={handleSave} />
        <PolicyItem id="pictureModeration" label="Picture moderation" type="checkbox" initialValue={false} onSave={handleSave} />
        <PolicyItem id="siteTimezone" label="Set time zone of all accounts to site time zone" type="checkbox" initialValue={false} onSave={handleSave} />
        <PolicyItem id="disableEditProfile" label="Disable edit profile" type="checkbox" initialValue={false} onSave={handleSave} />
        <PolicyItem id="allowProfileBackground" label="Allow admins and instructors to upload their own profile background" type="checkbox" initialValue={false} onSave={handleSave} />
      </PolicySection>
    </div>
  );
};

export default GeneralPoliciesTab;
