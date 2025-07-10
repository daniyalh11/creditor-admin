import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge as BadgeIcon, Award, Trash2 } from 'lucide-react'; // Renamed Badge to avoid conflict with UI component if any

export const RewardsSection = ({
  rewards,
  onRemoveReward
}) => {
  if (!rewards || rewards.length === 0) {
    return null;
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Award className="h-5 w-5 text-yellow-600" />
              Course Rewards
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {rewards.length} reward{rewards.length !== 1 ? 's' : ''} added
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <div 
              key={reward.id} 
              className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {reward.type === 'badge' ? (
                    <BadgeIcon className="h-4 w-4 text-blue-600" />
                  ) : (
                    <Award className="h-4 w-4 text-green-600" />
                  )}
                  <span className="text-xs font-medium text-gray-500 uppercase">
                    {reward.type}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => onRemoveReward(reward.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 w-7"
                  title={`Remove ${reward.name}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mb-3 flex-grow flex items-center justify-center">
                <img 
                  src={reward.imageUrl} 
                  alt={reward.name}
                  className={`w-full max-w-[150px] ${reward.type === 'badge' ? 'h-24' : 'h-32'} object-contain rounded-lg`}
                />
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{reward.name}</h3>
                {reward.description && (
                  <p className="text-xs text-gray-600">{reward.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Define prop types for runtime type checking
RewardsSection.propTypes = {
  rewards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['badge', 'certificate']).isRequired,
    imageUrl: PropTypes.string.isRequired,
    description: PropTypes.string,
  })).isRequired,
  onRemoveReward: PropTypes.func.isRequired,
};