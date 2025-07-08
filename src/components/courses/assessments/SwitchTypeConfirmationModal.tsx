
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertTriangle } from 'lucide-react';

interface SwitchTypeConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  onPublishAndSwitch: () => void;
  currentType: string;
  targetType: string;
}

export const SwitchTypeConfirmationModal: React.FC<SwitchTypeConfirmationModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  onPublishAndSwitch,
  currentType,
  targetType
}) => {
  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'quiz':
        return 'Quiz';
      case 'assignment':
        return 'Assignment';
      case 'survey':
        return 'Survey';
      case 'essay':
        return 'Essay';
      case 'debate':
        return 'Debate';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };

  const handleCancel = () => {
    onCancel();
    onClose();
  };

  const handlePublishAndSwitch = () => {
    onPublishAndSwitch();
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <AlertDialogTitle className="text-lg font-semibold">
                🚨 Unsaved Changes Warning
              </AlertDialogTitle>
            </div>
          </div>
        </AlertDialogHeader>
        
        <AlertDialogDescription className="text-gray-600 space-y-2">
          <p>
            You're currently building a <strong>{getTypeDisplayName(currentType)}</strong>.
          </p>
          <p>
            If you switch to <strong>{getTypeDisplayName(targetType)}</strong> now, your current progress will be lost.
          </p>
          <p className="text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
            Please publish your current {getTypeDisplayName(currentType).toLowerCase()} before moving to a new assessment type.
          </p>
        </AlertDialogDescription>

        <AlertDialogFooter className="flex gap-2 sm:gap-2">
          <AlertDialogCancel 
            onClick={handleCancel}
            className="flex-1"
          >
            🔘 Cancel
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handlePublishAndSwitch}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            ✅ Publish & Switch
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
