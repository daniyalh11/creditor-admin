import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/PageHeader';
import { ClipboardList, Check, Star, Zap, Pencil, X, Save, Users, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const PlansSettings = () => {
  const [plans, setPlans] = useState([
    {
      id: 'basic',
      name: 'Basic',
      price: '$29/month',
      icon: ClipboardList,
      features: [
        'Up to 100 users',
        '10 courses',
        'Basic reporting',
        'Email support',
        '5GB storage'
      ],
      current: false
    },
    {
      id: 'pro',
      name: 'Professional',
      price: '$79/month',
      icon: Star,
      features: [
        'Up to 500 users',
        'Unlimited courses',
        'Advanced reporting',
        'Priority support',
        '50GB storage',
        'Custom branding'
      ],
      popular: true,
      current: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$199/month',
      icon: Zap,
      features: [
        'Unlimited users',
        'Unlimited courses',
        'Custom integrations',
        'Dedicated support',
        '200GB storage',
        'Advanced analytics',
        'API access'
      ],
      current: false
    }
  ]);

  const [editingPlan, setEditingPlan] = useState(null);
  const [editedPlan, setEditedPlan] = useState(null);
  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'invoices'

  // Sample user data with their plans
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'Professional',
      status: 'active',
      joinDate: '2023-01-15',
      renewalDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      plan: 'Basic',
      status: 'active',
      joinDate: '2023-03-10',
      renewalDate: '2024-03-10'
    },
    {
      id: 3,
      name: 'Acme Corp',
      email: 'contact@acme.com',
      plan: 'Enterprise',
      status: 'active',
      joinDate: '2023-05-20',
      renewalDate: '2024-05-20'
    },
    {
      id: 4,
      name: 'Bob Johnson',
      email: 'bob@example.com',
      plan: 'Professional',
      status: 'cancelled',
      joinDate: '2022-11-05',
      endDate: '2023-11-05'
    }
  ]);

  // Sample invoice data
  const [invoices, setInvoices] = useState([
    {
      id: 'INV-2023-001',
      userId: 1,
      userName: 'John Doe',
      amount: '$79.00',
      plan: 'Professional',
      date: '2023-01-15',
      status: 'paid'
    },
    {
      id: 'INV-2023-002',
      userId: 2,
      userName: 'Jane Smith',
      amount: '$29.00',
      plan: 'Basic',
      date: '2023-03-10',
      status: 'paid'
    },
    {
      id: 'INV-2023-003',
      userId: 3,
      userName: 'Acme Corp',
      amount: '$199.00',
      plan: 'Enterprise',
      date: '2023-05-20',
      status: 'paid'
    },
    {
      id: 'INV-2023-004',
      userId: 1,
      userName: 'John Doe',
      amount: '$79.00',
      plan: 'Professional',
      date: '2023-07-15',
      status: 'paid'
    }
  ]);

  const [detailsUser, setDetailsUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleEditPlan = (planId) => {
    const planToEdit = plans.find(plan => plan.id === planId);
    setEditedPlan({
      ...planToEdit,
      features: [...planToEdit.features]
    });
    setEditingPlan(planId);
  };

  const handleSavePlan = () => {
    setPlans(plans.map(plan => 
      plan.id === editingPlan ? editedPlan : plan
    ));
    setEditingPlan(null);
    setEditedPlan(null);
    toast({
      title: "Plan Updated",
      description: `${editedPlan.name} plan has been updated.`
    });
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
    setEditedPlan(null);
    toast({
      title: "Edit Cancelled",
      description: "Changes were not saved."
    });
  };

  const handlePlanFieldChange = (field, value) => {
    setEditedPlan(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...editedPlan.features];
    newFeatures[index] = value;
    setEditedPlan(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const addNewFeature = () => {
    setEditedPlan(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const removeFeature = (index) => {
    const newFeatures = [...editedPlan.features];
    newFeatures.splice(index, 1);
    setEditedPlan(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const usageStats = {
    users: { current: 245, limit: 500 },
    courses: { current: 23, limit: 'Unlimited' },
    storage: { current: '18.5GB', limit: '50GB' }
  };

  // View Details handler
  const handleViewDetails = (user) => {
    setDetailsUser(user);
    setShowUserModal(true);
  };
  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setDetailsUser(null);
  };

  // Download Invoice handler
  const handleDownloadInvoice = (invoice) => {
    // Generate a simple text invoice
    const content = `Invoice ID: ${invoice.id}\nUser: ${invoice.userName}\nPlan: ${invoice.plan}\nAmount: ${invoice.amount}\nDate: ${invoice.date}\nStatus: ${invoice.status}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Plans Management" 
        description="Manage and configure subscription plans"
        icon={<ClipboardList className="h-6 w-6 text-primary" />}
      />

      <Card>
        <CardHeader>
          <CardTitle>System Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <h3 className="font-medium">Active Users</h3>
              <p className="text-2xl font-bold text-primary">{usageStats.users.current}</p>
              <p className="text-sm text-muted-foreground">of {usageStats.users.limit} limit</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium">Published Courses</h3>
              <p className="text-2xl font-bold text-primary">{usageStats.courses.current}</p>
              <p className="text-sm text-muted-foreground">{usageStats.courses.limit}</p>
            </div>
            <div className="text-center">
              <h3 className="font-medium">Storage Used</h3>
              <p className="text-2xl font-bold text-primary">{usageStats.storage.current}</p>
              <p className="text-sm text-muted-foreground">of {usageStats.storage.limit} total</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.current ? 'ring-2 ring-primary' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="text-center">
              <plan.icon className="h-8 w-8 mx-auto text-primary mb-2" />
              {editingPlan === plan.id ? (
                <>
                  <Input
                    value={editedPlan.name}
                    onChange={(e) => handlePlanFieldChange('name', e.target.value)}
                    className="text-center text-xl font-bold"
                  />
                  <Input
                    value={editedPlan.price}
                    onChange={(e) => handlePlanFieldChange('price', e.target.value)}
                    className="text-center text-2xl font-bold text-primary"
                  />
                </>
              ) : (
                <>
                  <CardTitle>{plan.name}</CardTitle>
                  <p className="text-2xl font-bold text-primary">{plan.price}</p>
                </>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {editingPlan === plan.id ? (
                <div className="space-y-3">
                  <h4 className="font-medium">Features:</h4>
                  <div className="space-y-2">
                    {editedPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <Input
                          value={feature}
                          onChange={(e) => handleFeatureChange(index, e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFeature(index)}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={addNewFeature}
                  >
                    + Add Feature
                  </Button>
                </div>
              ) : (
                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
              
              {editingPlan === plan.id ? (
                <div className="flex gap-2">
                  <Button 
                    variant="default"
                    className="w-full gap-2"
                    onClick={handleSavePlan}
                  >
                    <Save className="h-4 w-4" /> Save
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-4 w-4" /> Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  variant={plan.current ? "secondary" : "outline"}
                  className="w-full gap-2"
                  onClick={() => handleEditPlan(plan.id)}
                >
                  <Pencil className="h-4 w-4" />
                  Edit Plan
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 mb-4">
            <Button 
              variant={activeTab === 'users' ? 'default' : 'outline'}
              onClick={() => setActiveTab('users')}
              className="gap-2"
            >
              <Users className="h-4 w-4" /> Subscribed Users
            </Button>
            <Button 
              variant={activeTab === 'invoices' ? 'default' : 'outline'}
              onClick={() => setActiveTab('invoices')}
              className="gap-2"
            >
              <FileText className="h-4 w-4" /> Invoices
            </Button>
          </div>

          {activeTab === 'users' ? (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Renewal Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.plan}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate}</TableCell>
                      <TableCell>{user.renewalDate || user.endDate || '-'}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewDetails(user)}>
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice ID</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.userName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{invoice.plan}</Badge>
                      </TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>
                        <Badge variant="default">{invoice.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleDownloadInvoice(invoice)}>
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {showUserModal && detailsUser && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 min-w-[350px] max-w-[90vw] relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={handleCloseUserModal}
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-xl font-medium mb-4">User Details</h2>
            <div className="space-y-2">
              <div><span className="font-semibold">Name:</span> {detailsUser.name}</div>
              <div><span className="font-semibold">Email:</span> {detailsUser.email}</div>
              <div><span className="font-semibold">Plan:</span> {detailsUser.plan}</div>
              <div><span className="font-semibold">Status:</span> {detailsUser.status}</div>
              <div><span className="font-semibold">Join Date:</span> {detailsUser.joinDate || '-'}</div>
              <div><span className="font-semibold">Renewal Date:</span> {detailsUser.renewalDate || '-'}</div>
              {detailsUser.endDate && (
                <div><span className="font-semibold">End Date:</span> {detailsUser.endDate}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansSettings;