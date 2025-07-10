import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PageHeader } from '@/components/shared/PageHeader';
import { Shield, FileText, Edit, Save, History } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import PolicyHistoryModal from '@/components/admin/policies/PolicyHistoryModal';

const PoliciesSettings = () => {
  const [editingPolicy, setEditingPolicy] = useState(null);
  const [historyModal, setHistoryModal] = useState({
    isOpen: false,
    policyKey: '',
    policyTitle: ''
  });
  
  const [policies, setPolicies] = useState({
    privacyPolicy: {
      content: "This privacy policy outlines how we collect, use, and protect your personal information...",
      enabled: true,
      lastUpdated: "2024-01-15",
      version: "1.2"
    },
    termsOfUse: {
      content: "By using this service, you agree to the following terms and conditions...",
      enabled: true,
      lastUpdated: "2024-01-10",
      version: "1.1"
    },
    cookiePolicy: {
      content: "This website uses cookies to enhance your browsing experience...",
      enabled: false,
      lastUpdated: "2024-01-05",
      version: "1.0"
    }
  });

  const handleSavePolicy = (policyKey) => {
    toast({
      title: "Policy Updated",
      description: `${policyKey} has been saved successfully.`
    });
    setEditingPolicy(null);
  };

  const handleTogglePolicy = (policyKey) => {
    setPolicies(prev => ({
      ...prev,
      [policyKey]: {
        ...prev[policyKey],
        enabled: !prev[policyKey].enabled
      }
    }));
    toast({
      title: "Policy Status Updated",
      description: `${policyKey} has been ${policies[policyKey].enabled ? 'disabled' : 'enabled'}.`
    });
  };

  const handleViewHistory = (policyKey, policyTitle) => {
    setHistoryModal({
      isOpen: true,
      policyKey,
      policyTitle
    });
  };

  const handleRestoreVersion = (version) => {
    // Update the policy version and last updated date
    const currentPolicy = historyModal.policyKey;
    setPolicies(prev => ({
      ...prev,
      [currentPolicy]: {
        ...prev[currentPolicy],
        version: version,
        lastUpdated: new Date().toISOString().split('T')[0]
      }
    }));
  };

  const policyList = [
    { key: 'privacyPolicy', title: 'Privacy Policy', description: 'Data collection and usage policies' },
    { key: 'termsOfUse', title: 'Terms of Use', description: 'Service usage terms and conditions' },
    { key: 'cookiePolicy', title: 'Cookie Policy', description: 'Cookie usage and preferences' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Policies Settings" 
        description="Display editable policy documents"
        icon={<Shield className="h-6 w-6 text-primary" />}
      />

      <div className="space-y-6">
        {policyList.map((policy) => (
          <Card key={policy.key}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <div>
                    <CardTitle className="text-lg">{policy.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{policy.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`toggle-${policy.key}`}>Active</Label>
                    <Switch
                      id={`toggle-${policy.key}`}
                      checked={policies[policy.key].enabled}
                      onCheckedChange={() => handleTogglePolicy(policy.key)}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Version: {policies[policy.key].version}</span>
                <span>Last Updated: {policies[policy.key].lastUpdated}</span>
              </div>
              
              {editingPolicy === policy.key ? (
                <div className="space-y-4">
                  <Textarea
                    value={policies[policy.key].content}
                    onChange={(e) => setPolicies(prev => ({
                      ...prev,
                      [policy.key]: {
                        ...prev[policy.key],
                        content: e.target.value
                      }
                    }))}
                    rows={8}
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Button onClick={() => handleSavePolicy(policy.key)} className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setEditingPolicy(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm">{policies[policy.key].content}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setEditingPolicy(policy.key)} className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit Policy
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleViewHistory(policy.key, policy.title)}
                      className="flex items-center gap-2"
                    >
                      <History className="h-4 w-4" />
                      View History
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Policy Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Require acceptance on signup</Label>
              <p className="text-sm text-muted-foreground">Users must accept policies during registration</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Show policy links in footer</Label>
              <p className="text-sm text-muted-foreground">Display policy links in the website footer</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label>Email notifications for updates</Label>
              <p className="text-sm text-muted-foreground">Notify users when policies are updated</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Policy History Modal */}
      <PolicyHistoryModal
        isOpen={historyModal.isOpen}
        onClose={() => setHistoryModal(prev => ({ ...prev, isOpen: false }))}
        policyTitle={historyModal.policyTitle}
        policyKey={historyModal.policyKey}
        onRestore={handleRestoreVersion}
      />
    </div>
  );
};

export default PoliciesSettings;