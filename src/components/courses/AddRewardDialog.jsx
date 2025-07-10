import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge, Award, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const AddRewardDialog = ({
  open,
  onOpenChange,
  onAddReward
}) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedReward, setSelectedReward] = useState(null);
  const { toast } = useToast();

  // Mock data for badges and certificates - in a real app, this would come from an API
  const mockBadges = [
    {
      id: 'badge-1',
      name: 'Course Completion',
      type: 'badge',
      imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop',
      description: 'Awarded for completing the course'
    },
    {
      id: 'badge-2',
      name: 'Excellence Badge',
      type: 'badge',
      imageUrl: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=100&h=100&fit=crop',
      description: 'Awarded for excellent performance'
    },
    {
      id: 'badge-3',
      name: 'Achievement Star',
      type: 'badge',
      imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop',
      description: 'Special achievement recognition'
    }
  ];

  const mockCertificates = [
    {
      id: 'cert-1',
      name: 'Course Completion Certificate',
      type: 'certificate',
      imageUrl: 'https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=200&h=150&fit=crop',
      description: 'Official completion certificate'
    },
    {
      id: 'cert-2',
      name: 'Professional Certificate',
      type: 'certificate',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=200&h=150&fit=crop',
      description: 'Professional level certification'
    },
    {
      id: 'cert-3',
      name: 'Advanced Certificate',
      type: 'certificate',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=150&fit=crop',
      description: 'Advanced level certification'
    }
  ];

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedReward(null);
  };

  const handleRewardSelect = (reward) => {
    setSelectedReward(reward);
  };

  const handleAddReward = () => {
    if (selectedReward) {
      onAddReward(selectedReward);
      setSelectedType(null);
      setSelectedReward(null);
      onOpenChange(false);
      
      toast({
        title: "✅ Reward added successfully",
        description: `${selectedReward.name} has been added to your course.`,
      });
    }
  };

  const handleCancel = () => {
    setSelectedType(null);
    setSelectedReward(null);
    onOpenChange(false);
  };

  const getRewardItems = () => {
    return selectedType === 'badge' ? mockBadges : mockCertificates;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Course Reward</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {!selectedType ? (
            // Reward Type Selection
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Select Reward Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-blue-300"
                  onClick={() => handleTypeSelect('badge')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Badge className="h-8 w-8 text-blue-600" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">🎖️ Badge</h4>
                    <p className="text-gray-600">Digital badges for achievements and milestones</p>
                  </CardContent>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-green-300"
                  onClick={() => handleTypeSelect('certificate')}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-lg font-semibold mb-2">📜 Certificate</h4>
                    <p className="text-gray-600">Completion certificates and credentials</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          ) : (
            // Reward Item Selection
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">
                  Select {selectedType === 'badge' ? 'Badge' : 'Certificate'}
                </h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedType(null)}
                >
                  Back to Types
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getRewardItems().map((item) => (
                  <Card 
                    key={item.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedReward?.id === item.id 
                        ? 'border-2 border-blue-500 shadow-md' 
                        : 'border-2 border-transparent hover:shadow-md hover:border-gray-200'
                    }`}
                    onClick={() => handleRewardSelect(item)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="relative mb-3">
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className={`w-full ${selectedType === 'badge' ? 'h-20 object-cover' : 'h-24 object-cover'} rounded-lg`}
                        />
                        {selectedReward?.id === item.id && (
                          <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                            <CheckCircle className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                      {item.description && (
                        <p className="text-xs text-gray-600">{item.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            {selectedReward && (
              <Button onClick={handleAddReward} className="bg-blue-600 hover:bg-blue-700">
                Add Reward
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};