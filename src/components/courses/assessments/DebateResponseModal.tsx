
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DebateResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  participant: any;
}

export const DebateResponseModal: React.FC<DebateResponseModalProps> = ({
  isOpen,
  onClose,
  participant,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Response Details - {participant.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">
                {participant.name.split(' ').map((n: string) => n[0]).join('')}
              </span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">{participant.name}</h3>
              <div className="flex items-center gap-2">
                <Badge variant={participant.position === 'For' ? 'default' : 'secondary'}>
                  {participant.position} the Topic
                </Badge>
                {participant.score && (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Score: {participant.score}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Participant Response</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 leading-relaxed">
                  {participant.response || 'No response submitted yet.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-900 mb-1">Arguments Made</h5>
                <p className="text-2xl font-bold text-blue-600">{participant.arguments}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-green-900 mb-1">Responses Given</h5>
                <p className="text-2xl font-bold text-green-600">{participant.responses}</p>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h5 className="font-medium text-purple-900 mb-1">Last Activity</h5>
              <p className="text-purple-700">{participant.lastActive}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
