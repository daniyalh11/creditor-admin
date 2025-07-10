import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit, Clock, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PublishedUnitCard = ({ 
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start sm:items-center justify-between flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-blue-100 flex-shrink-0">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{unit.title}</h3>
                <div className="flex items-center gap-3 mt-1 flex-wrap">
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
                    {unit.blocks.length} Block{unit.blocks.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 self-end sm:self-center">
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

// Define prop types for runtime type checking
PublishedUnitCard.propTypes = {
  unit: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    blocks: PropTypes.array.isRequired,
    publishedAt: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['published', 'draft']).isRequired,
  }).isRequired,
  courseId: PropTypes.string.isRequired,
  onView: PropTypes.func.isRequired,
};