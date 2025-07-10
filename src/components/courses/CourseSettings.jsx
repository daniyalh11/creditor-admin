import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const CourseSettings = ({
  courseId,
  currentProgression = 'open',
  onProgressionChange
}) => {
  const [selectedProgression, setSelectedProgression] = useState(currentProgression);
  const { toast } = useToast();

  const progressionTypes = [
    {
      type: 'open',
      label: 'Open Access',
      description: 'Students can access any module in any order',
      icon: <Unlock className="h-5 w-5" />
    },
    {
      type: 'sequential',
      label: 'Sequential',
      description: 'Students must complete each module\'s assessments before proceeding to the next',
      icon: <Lock className="h-5 w-5" />
    }
  ];

  const handleProgressionChange = (type) => {
    setSelectedProgression(type);
    if (onProgressionChange) {
      onProgressionChange(type);
    }
    
    toast({
      title: "Course progression updated",
      description: `Course is now set to ${type === 'open' ? 'open access' : 'sequential'} mode.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Course Progression Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm font-medium mb-3 block">Progression Type</Label>
          <div className="grid grid-cols-1 gap-3">
            {progressionTypes.map((progression) => (
              <button
                key={progression.type}
                onClick={() => handleProgressionChange(progression.type)}
                className={`p-4 border rounded-lg text-left transition-colors hover:bg-gray-50 ${
                  selectedProgression === progression.type 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-blue-600 mt-0.5 flex-shrink-0">
                    {progression.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{progression.label}</h4>
                      {selectedProgression === progression.type && (
                        <Badge variant="default" className="text-xs">Active</Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{progression.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedProgression === 'sequential' && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Lock className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 mb-1">Sequential Mode Active</p>
                <p className="text-amber-700">
                  Students must complete all assessments in a module before accessing the next module. 
                  Make sure each module has the required assessments configured.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// PropTypes for type-checking in a JavaScript environment
// You may need to install prop-types: npm install prop-types
CourseSettings.propTypes = {
  courseId: PropTypes.string.isRequired,
  currentProgression: PropTypes.oneOf(['open', 'sequential']),
  onProgressionChange: PropTypes.func,
};