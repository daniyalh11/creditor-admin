import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Pencil, Trash2, Plus, Workflow } from 'lucide-react';
import { ActionSection } from '@/components/admin/automation/ActionSection';
import { AddActionModal } from '@/components/admin/automation/AddActionModal';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

const AutomationSettings = () => {
  const { tab = 'courses' } = useParams();
  const navigate = useNavigate();
  
  // State for different action types
  const [courseCompletionActions, setCourseCompletionActions] = useState([]);
  const [moduleAddedActions, setModuleAddedActions] = useState([]);
  const [moduleCompletionActions, setModuleCompletionActions] = useState([]);
  const [moduleDeletedActions, setModuleDeletedActions] = useState([]);
  const [sectionAddedActions, setSectionAddedActions] = useState([]);
  const [sectionCompletionActions, setSectionCompletionActions] = useState([]);
  const [sectionDeletedActions, setSectionDeletedActions] = useState([]);
  const [assessmentActions, setAssessmentActions] = useState([]);
  const [resourceSharedActions, setResourceSharedActions] = useState([]);
  const [resourceUnsharedActions, setResourceUnsharedActions] = useState([]);
  const [groupActions, setGroupActions] = useState([]);

  // Modal states
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [showResourceSharedModal, setShowResourceSharedModal] = useState(false);
  const [showResourceUnsharedModal, setShowResourceUnsharedModal] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [editingAction, setEditingAction] = useState(null);
  const [editModalType, setEditModalType] = useState('');

  const handleTabChange = (value) => {
    navigate(`/admin/automation/${value}`);
  };

  const handleEditAction = (action, type) => {
    setEditingAction(action);
    setEditModalType(type);
    
    // Open the appropriate modal based on type
    if (type === 'assessment') {
      setShowAssessmentModal(true);
    } else if (type === 'resource-shared') {
      setShowResourceSharedModal(true);
    } else if (type === 'resource-unshared') {
      setShowResourceUnsharedModal(true);
    } else if (type === 'group') {
      setShowGroupModal(true);
    }
  };

  const handleSaveAction = (actionData, type) => {
    if (editingAction) {
      // Update existing action
      const updatedAction = {
        ...editingAction,
        ...actionData,
      };
      
      // Update the appropriate state based on type
      if (type === 'assessment') {
        setAssessmentActions(prev => prev.map(a => a.id === editingAction.id ? updatedAction : a));
      } else if (type === 'resource-shared') {
        setResourceSharedActions(prev => prev.map(a => a.id === editingAction.id ? updatedAction : a));
      } else if (type === 'resource-unshared') {
        setResourceUnsharedActions(prev => prev.map(a => a.id === editingAction.id ? updatedAction : a));
      } else if (type === 'group') {
        setGroupActions(prev => prev.map(a => a.id === editingAction.id ? updatedAction : a));
      }
      
      toast({
        title: "Action Updated",
        description: `${actionData.title} has been updated successfully.`,
      });
    } else {
      // Create new action
      const newAction = {
        id: Date.now().toString(),
        type: actionData.type,
        title: actionData.title,
        description: actionData.description,
        dateAdded: new Date().toLocaleDateString(),
        assessmentType: actionData.assessmentType,
        condition: actionData.condition,
      };
      
      // Add to the appropriate state based on type
      if (type === 'assessment') {
        setAssessmentActions(prev => [...prev, newAction]);
      } else if (type === 'resource-shared') {
        setResourceSharedActions(prev => [...prev, newAction]);
      } else if (type === 'resource-unshared') {
        setResourceUnsharedActions(prev => [...prev, newAction]);
      } else if (type === 'group') {
        setGroupActions(prev => [...prev, newAction]);
      }
      
      toast({
        title: "Action Added",
        description: `${actionData.title} has been added successfully.`,
      });
    }
    
    // Reset modal states
    setEditingAction(null);
    setEditModalType('');
  };

  const handleDeleteAction = (actionId, type) => {
    if (type === 'assessment') {
      setAssessmentActions(prev => prev.filter(a => a.id !== actionId));
    } else if (type === 'resource-shared') {
      setResourceSharedActions(prev => prev.filter(a => a.id !== actionId));
    } else if (type === 'resource-unshared') {
      setResourceUnsharedActions(prev => prev.filter(a => a.id !== actionId));
    } else if (type === 'group') {
      setGroupActions(prev => prev.filter(a => a.id !== actionId));
    }
    
    toast({
      title: "Action Removed",
      description: "The action has been removed successfully.",
    });
  };

  const handleCloseModal = () => {
    setShowAssessmentModal(false);
    setShowResourceSharedModal(false);
    setShowResourceUnsharedModal(false);
    setShowGroupModal(false);
    setEditingAction(null);
    setEditModalType('');
  };
  
  // Courses tab content
  const renderCoursesContent = () => (
    <div className="space-y-8">
      <ActionSection
        title="Completion Actions"
        description="Add actions here that should be performed when the course is completed, such as awarding a certificate."
        actions={courseCompletionActions}
        onAddAction={(action) => setCourseCompletionActions([...courseCompletionActions, action])}
        onEditAction={(action) => console.log('Edit action:', action)}
        onDeleteAction={(actionId) => setCourseCompletionActions(courseCompletionActions.filter(a => a.id !== actionId))}
      />
      
      {/* Existing enrollment actions table */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">Existing Enrollment Actions</h2>
        <Table className="bg-white border rounded-lg">
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="w-[100px]">Edit</TableHead>
              <TableHead className="w-[100px]">Remove</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Enroll in course Lesson 1 Understanding Legal Guarantees of Equal Protection</TableCell>
              <TableCell>Apr 11, 2025</TableCell>
              <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
              <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Enroll in course Lesson 2: Equal protection laws apply in finance</TableCell>
              <TableCell>Apr 14, 2025</TableCell>
              <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
              <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Enroll in course Lesson 3 How to Figure It All Out – Navigating Sovereignty-Related Legal Complexities</TableCell>
              <TableCell>Apr 14, 2025</TableCell>
              <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
              <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Enroll in course Lesson 4: How to Figure It All Out – Sovereignty Explained</TableCell>
              <TableCell>Apr 14, 2025</TableCell>
              <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
              <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Enroll in course Lesson 5: How Government and God Compete to Provide "Protection"</TableCell>
              <TableCell>Apr 14, 2025</TableCell>
              <TableCell><Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button></TableCell>
              <TableCell><Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );

  // Modules tab content
  const renderModulesContent = () => (
    <div className="space-y-8">
      <ActionSection
        title="Added Actions"
        description="Add actions here that should be performed when a module is added."
        actions={moduleAddedActions}
        onAddAction={(action) => setModuleAddedActions([...moduleAddedActions, action])}
        onEditAction={(action) => console.log('Edit action:', action)}
        onDeleteAction={(actionId) => setModuleAddedActions(moduleAddedActions.filter(a => a.id !== actionId))}
      />
      
      <ActionSection
        title="Completion Actions"
        description="Add actions here that should be performed when the module is completed."
        actions={moduleCompletionActions}
        onAddAction={(action) => setModuleCompletionActions([...moduleCompletionActions, action])}
        onEditAction={(action) => console.log('Edit action:', action)}
        onDeleteAction={(actionId) => setModuleCompletionActions(moduleCompletionActions.filter(a => a.id !== actionId))}
      />
      
      <ActionSection
        title="Deleted Actions"
        description="Add actions here that should be performed when a module is deleted."
        actions={moduleDeletedActions}
        onAddAction={(action) => setModuleDeletedActions([...moduleDeletedActions, action])}
        onEditAction={(action) => console.log('Edit action:', action)}
        onDeleteAction={(actionId) => setModuleDeletedActions(moduleDeletedActions.filter(a => a.id !== actionId))}
      />
    </div>
  );

  // Sections tab content
  const renderSectionsContent = () => (
    <div className="space-y-8">
      <ActionSection
        title="Added Actions"
        description="Add actions here that should be performed when a section is added."
        actions={sectionAddedActions}
        onAddAction={(action) => setSectionAddedActions([...sectionAddedActions, action])}
        onEditAction={(action) => console.log('Edit action:', action)}
        onDeleteAction={(actionId) => setSectionAddedActions(sectionAddedActions.filter(a => a.id !== actionId))}
      />
      
      <ActionSection
        title="Completion Actions"
        description="Add actions here that should be performed when the section is completed."
        actions={sectionCompletionActions}
        onAddAction={(action) => setSectionCompletionActions([...sectionCompletionActions, action])}
        onEditAction={(action) => console.log('Edit action:', action)}
        onDeleteAction={(actionId) => setSectionCompletionActions(sectionCompletionActions.filter(a => a.id !== actionId))}
      />
      
      <ActionSection
        title="Deleted Actions"
        description="Add actions here that should be performed when a section is deleted."
        actions={sectionDeletedActions}
        onAddAction={(action) => setSectionDeletedActions([...sectionDeletedActions, action])}
        onEditAction={(action) => console.log('Edit action:', action)}
        onDeleteAction={(actionId) => setSectionDeletedActions(sectionDeletedActions.filter(a => a.id !== actionId))}
      />
    </div>
  );

  // Assessments tab content
  const renderAssessmentsContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-2">Assessment Automation</h2>
        <p className="mb-4 text-muted-foreground">Configure automated actions for assessments based on various conditions.</p>
      </div>
      
      <Button 
        className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white"
        onClick={() => setShowAssessmentModal(true)}
      >
        <Plus className="h-4 w-4" /> Add New Rule
      </Button>

      {assessmentActions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Current Assessment Rules</h3>
          <div className="space-y-3">
            {assessmentActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div>
                  <h4 className="font-medium">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  {action.assessmentType && (
                    <p className="text-xs text-gray-500">Assessment Type: {action.assessmentType}</p>
                  )}
                  {action.condition && (
                    <p className="text-xs text-gray-500">Condition: {action.condition}</p>
                  )}
                  <p className="text-xs text-gray-500">Added on {action.dateAdded}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditAction(action, 'assessment')}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteAction(action.id, 'assessment')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Groups tab content
  const renderGroupsContent = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-2">Group Management</h2>
        <p className="mb-4 text-muted-foreground">Configure automated group management features.</p>
      </div>
      
      <Button 
        className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white"
        onClick={() => {
          console.log('Opening group modal');
          setEditingAction(null);
          setEditModalType('group');
          setShowGroupModal(true);
        }}
      >
        <Plus className="h-4 w-4" /> Add New Group Rule
      </Button>

      {groupActions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Current Group Rules</h3>
          <div className="space-y-3">
            {groupActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                <div>
                  <h4 className="font-medium">{action.title}</h4>
                  <p className="text-sm text-gray-600">{action.description}</p>
                  <p className="text-xs text-gray-500">Added on {action.dateAdded}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditAction(action, 'group')}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleDeleteAction(action.id, 'group')}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Resources tab content
  const renderResourcesContent = () => (
    <div className="space-y-8">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-medium mb-2">Shared actions</h2>
          <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a resource is shared.</p>
          
          <Button 
            className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white"
            onClick={() => setShowResourceSharedModal(true)}
          >
            <Plus className="h-4 w-4" /> Add
          </Button>

          {resourceSharedActions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Current Shared Actions</h3>
              <div className="space-y-3">
                {resourceSharedActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                      <p className="text-xs text-gray-500">Added on {action.dateAdded}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditAction(action, 'resource-shared')}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteAction(action.id, 'resource-shared')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div>
          <h2 className="text-xl font-medium mb-2">Unshared actions</h2>
          <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a resource is unshared.</p>
          
          <Button 
            className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white"
            onClick={() => setShowResourceUnsharedModal(true)}
          >
            <Plus className="h-4 w-4" /> Add
          </Button>

          {resourceUnsharedActions.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Current Unshared Actions</h3>
              <div className="space-y-3">
                {resourceUnsharedActions.map((action) => (
                  <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg bg-white">
                    <div>
                      <h4 className="font-medium">{action.title}</h4>
                      <p className="text-sm text-gray-600">{action.description}</p>
                      <p className="text-xs text-gray-500">Added on {action.dateAdded}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleEditAction(action, 'resource-unshared')}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteAction(action.id, 'resource-unshared')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Forums tab content
  const renderForumsContent = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium mb-4">Post actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a user who is not a moderator posts to the forum.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
      
      <h2 className="text-xl font-medium mt-8 mb-4">Reply actions</h2>
      <p className="mb-4 text-muted-foreground">Add actions here that should be performed when a user who is not a moderator replies to the forum.</p>
      
      <Button className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white">
        <Plus className="h-4 w-4" /> Add
      </Button>
    </div>
  );

  const renderContent = () => {
    switch(tab) {
      case 'courses':
        return renderCoursesContent();
      case 'modules':
        return renderModulesContent();
      case 'sections':
        return renderSectionsContent();
      case 'assessments':
        return renderAssessmentsContent();
      case 'groups':
        return renderGroupsContent();
      case 'resources':
        return renderResourcesContent();
      case 'forums':
        return renderForumsContent();
      default:
        return <div>Coming soon...</div>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Automation Settings" 
        description="Configure automated tasks and workflows"
        icon={<Workflow className="h-6 w-6 text-primary" />}
      />
      
      <div className="p-4">
        <Tabs value={tab} className="w-full" onValueChange={handleTabChange}>
          <TabsList className="h-12 p-0 bg-transparent w-full justify-start gap-1 overflow-x-auto">
            {[
              { value: 'courses', label: 'Courses' },
              { value: 'modules', label: 'Modules' },
              { value: 'sections', label: 'Sections' },
              { value: 'assessments', label: 'Assessments' },
              { value: 'groups', label: 'Groups' },
              { value: 'resources', label: 'Resources' },
              { value: 'forums', label: 'Forums' }
            ].map((tabItem) => (
              <TabsTrigger 
                key={tabItem.value} 
                value={tabItem.value}
                className={cn(
                  "px-6 py-3 h-full rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-primary/10 data-[state=active]:text-primary font-medium",
                )}
              >
                {tabItem.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        
        <div className="mt-6">
          {renderContent()}
        </div>
      </div>

      {/* Assessment Modal */}
      <AddActionModal
        isOpen={showAssessmentModal}
        onClose={handleCloseModal}
        onSave={(actionData) => handleSaveAction(actionData, 'assessment')}
        title={editingAction ? "Edit Assessment Rule" : "Add Assessment Rule"}
        actionType="assessment"
        editingAction={editingAction}
      />

      {/* Resource Shared Modal */}
      <AddActionModal
        isOpen={showResourceSharedModal}
        onClose={handleCloseModal}
        onSave={(actionData) => handleSaveAction(actionData, 'resource-shared')}
        title={editingAction ? "Edit Shared Resource Action" : "Add Shared Resource Action"}
        actionType="resource"
        editingAction={editingAction}
      />

      {/* Resource Unshared Modal */}
      <AddActionModal
        isOpen={showResourceUnsharedModal}
        onClose={handleCloseModal}
        onSave={(actionData) => handleSaveAction(actionData, 'resource-unshared')}
        title={editingAction ? "Edit Unshared Resource Action" : "Add Unshared Resource Action"}
        actionType="resource"
        editingAction={editingAction}
      />

      {/* Group Modal */}
      <AddActionModal
        isOpen={showGroupModal}
        onClose={handleCloseModal}
        onSave={(actionData) => handleSaveAction(actionData, 'group')}
        title={editingAction ? "Edit Group Rule" : "Add Group Rule"}
        actionType="general"
        editingAction={editingAction}
      />
    </div>
  );
};

export default AutomationSettings;