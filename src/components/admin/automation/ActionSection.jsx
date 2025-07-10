import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ActionCard } from './ActionCard';
import { AddActionModal } from './AddActionModal';
import { toast } from '@/hooks/use-toast';

export const ActionSection = ({
  title,
  description,
  actions,
  onAddAction,
  onEditAction,
  onDeleteAction
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingAction, setEditingAction] = useState(null);

  const handleAddAction = (actionData) => {
    const newAction = {
      id: Date.now().toString(),
      type: actionData.type,
      title: actionData.title,
      description: actionData.description,
      dateAdded: new Date().toLocaleDateString()
    };
    onAddAction(newAction);
    toast({
      title: "Action Added",
      description: `${actionData.title} has been added successfully.`,
    });
  };

  const handleEditAction = (action) => {
    setEditingAction(action);
    setShowEditModal(true);
  };

  const handleUpdateAction = (actionData) => {
    if (editingAction) {
      const updatedAction = {
        ...editingAction,
        type: actionData.type,
        title: actionData.title,
        description: actionData.description,
      };
      onEditAction(updatedAction);
      toast({
        title: "Action Updated",
        description: `${actionData.title} has been updated successfully.`,
      });
    }
    setEditingAction(null);
  };

  const handleDeleteAction = (actionId) => {
    onDeleteAction(actionId);
    toast({
      title: "Action Removed",
      description: "The action has been removed successfully.",
    });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingAction(null);
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-medium mb-2">{title}</h2>
        <p className="mb-4 text-muted-foreground">{description}</p>
      </div>
      
      <Button 
        className="flex items-center gap-2 bg-ca-primary hover:bg-ca-secondary text-white"
        onClick={() => setShowAddModal(true)}
      >
        <Plus className="h-4 w-4" /> Add Action
      </Button>
      
      {actions.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Current Actions</h3>
          <div className="space-y-3">
            {actions.map((action) => (
              <ActionCard
                key={action.id}
                action={action}
                onEdit={handleEditAction}
                onDelete={handleDeleteAction}
              />
            ))}
          </div>
        </div>
      )}

      {/* Add Action Modal */}
      <AddActionModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddAction}
        title={`Add ${title}`}
      />

      {/* Edit Action Modal */}
      <AddActionModal
        isOpen={showEditModal}
        onClose={handleCloseEditModal}
        onSave={handleUpdateAction}
        title={`Edit ${title}`}
        editingAction={editingAction}
      />
    </div>
  );
};