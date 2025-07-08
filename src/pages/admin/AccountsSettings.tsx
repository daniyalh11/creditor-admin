import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus } from 'lucide-react';

const AccountsSettings = () => {
  const { tab = 'overview' } = useParams<{tab?: string}>();
  const navigate = useNavigate();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Account settings updated successfully."
    });
  };

  // Overview tab content
  const renderOverviewContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Configure general account settings for your instance. This includes roles, permissions, signup processes, and custom fields.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            <Button onClick={() => navigate('/admin/accounts/roles')} variant="outline" className="justify-start text-left h-auto py-4">
              <div>
                <div className="font-medium">Roles</div>
                <div className="text-sm text-muted-foreground">Configure user roles and permissions</div>
              </div>
            </Button>
            <Button onClick={() => navigate('/admin/accounts/signup')} variant="outline" className="justify-start text-left h-auto py-4">
              <div>
                <div className="font-medium">Sign Up</div>
                <div className="text-sm text-muted-foreground">Configure user registration settings</div>
              </div>
            </Button>
            <Button onClick={() => navigate('/admin/accounts/fields')} variant="outline" className="justify-start text-left h-auto py-4">
              <div>
                <div className="font-medium">Fields</div>
                <div className="text-sm text-muted-foreground">Manage custom user profile fields</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Account Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b">
              <span>New accounts created (last 7 days)</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span>Account updates (last 7 days)</span>
              <span className="font-semibold">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Pending account approvals</span>
              <span className="font-semibold">3</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Sign up tab content
  const renderSignupContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="enable-signup">Allow public sign up</Label>
            <Switch id="enable-signup" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-verification">Require email verification</Label>
            <Switch id="email-verification" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="admin-approval">Require admin approval</Label>
            <Switch id="admin-approval" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="captcha">Enable CAPTCHA on sign up form</Label>
            <Switch id="captcha" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registration Page</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="welcome-message">Welcome Message</Label>
            <Input
              id="welcome-message"
              defaultValue="Welcome to Creditor Academy. Create an account to get started."
              className="w-full"
            />
          </div>
          
          <div className="space-y-4 mt-4">
            <Label>Default User Role</Label>
            <RadioGroup defaultValue="student">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="teacher" id="teacher" />
                <Label htmlFor="teacher">Teacher</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="admin" id="admin" />
                <Label htmlFor="admin">Administrator</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Fields tab content
  const renderFieldsContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Custom Profile Fields</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Field
          </Button>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Field Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Required</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Student ID</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Department</TableCell>
                <TableCell>Dropdown</TableCell>
                <TableCell>Yes</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Graduation Year</TableCell>
                <TableCell>Number</TableCell>
                <TableCell>No</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Field Display Options</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="public-profiles">Show fields on public profiles</Label>
            <Switch id="public-profiles" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="export-fields">Include custom fields in user exports</Label>
            <Switch id="export-fields" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Rules tab content
  const renderRulesContent = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Account Rules</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Rule
          </Button>
        </CardHeader>
        <CardContent>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Rule Name</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Auto Assign Department</TableCell>
                <TableCell>Email domain contains @finance</TableCell>
                <TableCell>Assign to Finance Department</TableCell>
                <TableCell>Active</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>New Student Welcome</TableCell>
                <TableCell>Role is Student</TableCell>
                <TableCell>Send welcome email</TableCell>
                <TableCell>Active</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Admin Approval</TableCell>
                <TableCell>Account created</TableCell>
                <TableCell>Notify administrators</TableCell>
                <TableCell>Inactive</TableCell>
                <TableCell className="flex gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="sm">Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch(tab) {
      case 'overview':
        return renderOverviewContent();
      case 'signup':
        return renderSignupContent();
      case 'fields':
        return renderFieldsContent();
      case 'rules':
        return renderRulesContent();
      default:
        return <div className="text-center py-8">Tab content for {tab} will be coming soon.</div>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Account Settings" 
        description="Configure account settings and user management"
      />
      
      {renderContent()}

      {tab !== 'overview' && (
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      )}
    </div>
  );
};

// Helper components
const PlusIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14m-7-7v14" />
  </svg>
);

export default AccountsSettings;
