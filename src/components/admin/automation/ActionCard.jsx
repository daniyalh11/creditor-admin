import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Award, Mail, Bell, BookOpen, BadgeIcon } from 'lucide-react';

const getActionIcon = (type) => {
  switch (type) {
    case 'award_certificate':
      return <Award className="h-5 w-5 text-yellow-600" />;
    case 'send_email':
      return <Mail className="h-5 w-5 text-blue-600" />;
    case 'notify_instructor':
      return <Bell className="h-5 w-5 text-green-600" />;
    case 'enroll_course':
      return <BookOpen className="h-5 w-5 text-purple-600" />;
    case 'award_badge':
      return <BadgeIcon className="h-5 w-5 text-orange-600" />;
    default:
      return <Award className="h-5 w-5 text-gray-600" />;
  }
};

const getActionTypeLabel = (type) => {
  switch (type) {
    case 'award_certificate':
      return 'Award Certificate';
    case 'send_email':
      return 'Send Email';
    case 'notify_instructor':
      return 'Notify Instructor';
    case 'enroll_course':
      return 'Enroll in Course';
    case 'award_badge':
      return 'Award Badge';
    default:
      return 'Custom Action';
  }
};

export const ActionCard = ({ action, onEdit, onDelete }) => {
  return (
    <Card className="mb-3 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getActionIcon(action.type)}
            <div>
              <CardTitle className="text-base">{action.title}</CardTitle>
              <Badge variant="outline" className="text-xs mt-1">
                {getActionTypeLabel(action.type)}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(action)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => onDelete(action.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-2">{action.description}</p>
        <p className="text-xs text-gray-500">Added on {action.dateAdded}</p>
      </CardContent>
    </Card>
  );
};