import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Recycle, RotateCcw, Trash2, FileText, BookOpen, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

export const RecycleBinModal = ({
  isOpen,
  onClose
}) => {
  const { toast } = useToast();
  
  const [deletedItems, setDeletedItems] = useState([
    {
      id: '1',
      name: 'Introduction to Contract Law',
      type: 'course',
      deletedDate: '2024-01-15',
      deletedBy: 'John Doe'
    },
    {
      id: '2',
      name: 'Case Brief Assignment',
      type: 'assignment',
      deletedDate: '2024-01-14',
      deletedBy: 'Jane Smith'
    },
    {
      id: '3',
      name: 'Study Group Alpha',
      type: 'group',
      deletedDate: '2024-01-13',
      deletedBy: 'Admin'
    },
    {
      id: '4',
      name: 'Legal Research Notes.pdf',
      type: 'file',
      deletedDate: '2024-01-12',
      deletedBy: 'Mike Johnson'
    },
    {
      id: '5',
      name: 'Sarah Williams',
      type: 'user',
      deletedDate: '2024-01-10',
      deletedBy: 'Admin'
    }
  ]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course':
        return <BookOpen className="h-4 w-4" />;
      case 'assignment':
        return <FileText className="h-4 w-4" />;
      case 'group':
        return <Users className="h-4 w-4" />;
      case 'file':
        return <FileText className="h-4 w-4" />;
      case 'user':
        return <Users className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'course':
        return 'bg-blue-100 text-blue-800';
      case 'assignment':
        return 'bg-green-100 text-green-800';
      case 'group':
        return 'bg-purple-100 text-purple-800';
      case 'file':
        return 'bg-gray-100 text-gray-800';
      case 'user':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleRestore = (id) => {
    const item = deletedItems.find(item => item.id === id);
    if (item) {
      setDeletedItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Item restored",
        description: `${item.name} has been restored successfully.`,
        duration: 3000,
      });
    }
  };

  const handlePermanentDelete = (id) => {
    const item = deletedItems.find(item => item.id === id);
    if (item) {
      setDeletedItems(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Item permanently deleted",
        description: `${item.name} has been permanently deleted.`,
        duration: 3000,
      });
    }
  };

  const handleRestoreAll = () => {
    setDeletedItems([]);
    toast({
      title: "All items restored",
      description: "All deleted items have been restored successfully.",
      duration: 3000,
    });
  };

  const handleEmptyRecycleBin = () => {
    setDeletedItems([]);
    toast({
      title: "Recycle bin emptied",
      description: "All items have been permanently deleted.",
      duration: 3000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Recycle className="h-5 w-5 text-gray-600" />
            Recycle Bin
          </DialogTitle>
          <DialogDescription>
            Recently deleted items. You can restore or permanently delete them.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center py-2 border-b">
          <span className="text-sm text-gray-600">
            {deletedItems.length} items in recycle bin
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRestoreAll}
              disabled={deletedItems.length === 0}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restore All
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleEmptyRecycleBin}
              disabled={deletedItems.length === 0}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Empty Bin
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {deletedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Recycle className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Recycle bin is empty</h3>
              <p className="text-gray-500">No deleted items to show.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {deletedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="text-gray-500">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{item.name}</span>
                        <Badge variant="secondary" className={cn("text-xs", getTypeColor(item.type))}>
                          {item.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        Deleted on {item.deletedDate} by {item.deletedBy}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRestore(item.id)}
                      className="text-green-600 hover:text-green-700 hover:bg-green-50"
                    >
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Restore
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePermanentDelete(item.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};