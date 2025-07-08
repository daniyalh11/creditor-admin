
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Clock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PublishedUnit {
  id: string;
  title: string;
  blocks: any[];
  publishedAt: string;
  status: 'published' | 'draft';
}

interface PublishedUnitCardProps {
  unit: PublishedUnit;
  courseId: string;
  onView: (unitId: string) => void;
}

export const PublishedUnitCard: React.FC<PublishedUnitCardProps> = ({ 
  unit, 
  courseId, 
  onView 
}) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/courses/builder/${courseId}/units/lesson/new`, {
      state: { editingUnit: unit }
    });
  };

  const handleView = () => {
    onView(unit.id);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{unit.title}</h3>
                <div className="flex items-center gap-3 mt-1">
                  <Badge 
                    variant="outline" 
                    className="text-xs bg-green-100 text-green-800 border-green-200"
                  >
                    Published
                  </Badge>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {formatDate(unit.publishedAt)}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {unit.blocks.length} Blocks
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleView}
              className="hover:bg-blue-50 border-blue-200 text-blue-600"
            >
              <Eye className="h-4 w-4 mr-2" />
              View
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleEdit}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
