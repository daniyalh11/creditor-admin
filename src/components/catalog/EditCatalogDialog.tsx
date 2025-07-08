
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface EditCatalogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  catalog: {
    id: number;
    name: string;
    description: string;
  } | null;
}

export const EditCatalogDialog = ({ open, onOpenChange, catalog }: EditCatalogDialogProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (catalog) {
      setName(catalog.name);
      setDescription(catalog.description);
    }
  }, [catalog]);

  const handleUpdate = () => {
    console.log('Updating catalog:', { id: catalog?.id, name, description });
    // Handle update logic here
    onOpenChange(false);
  };

  const handleCancel = () => {
    if (catalog) {
      setName(catalog.name);
      setDescription(catalog.description);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Catalog</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="catalog-name">Catalog Name</Label>
            <Input
              id="catalog-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter catalog name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="catalog-description">Description</Label>
            <Textarea
              id="catalog-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter catalog description"
              className="min-h-[100px]"
            />
          </div>
        </div>
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} className="bg-blue-600 hover:bg-blue-700">
            Update Catalog
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
