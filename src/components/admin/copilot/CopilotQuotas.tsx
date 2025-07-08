
import React from 'react';
import { Button } from '@/components/ui/button';
import { Edit, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CopilotQuotas = () => {
  const { toast } = useToast();
  
  const handleEdit = () => {
    toast({
      title: "Edit mode",
      description: "You can now edit the default quotas.",
      duration: 3000,
    });
  };
  
  const handleAdd = () => {
    toast({
      title: "Add custom quota",
      description: "You can now add a custom quota for a user.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-medium">Default quotas</h2>
      
      <div className="bg-gray-50 rounded-md shadow-sm">
        <div className="grid grid-cols-2 border-b">
          <div className="font-medium p-4">Account type</div>
          <div className="font-medium p-4">Max credits</div>
        </div>
        
        <div className="grid grid-cols-2 border-b">
          <div className="p-4">Administrator</div>
          <div className="p-4">50000</div>
        </div>
        
        <div className="grid grid-cols-2">
          <div className="p-4">Instructor</div>
          <div className="p-4">50000</div>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        onClick={handleEdit}
        className="flex items-center gap-2"
      >
        <Edit className="h-4 w-4" />
        Edit
      </Button>
      
      <h2 className="text-xl font-medium pt-4">Custom quotas</h2>
      <p className="text-gray-700">There are currently no users with customized credit quotas.</p>
      
      <Button 
        variant="default" 
        onClick={handleAdd}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add
      </Button>
    </div>
  );
};
