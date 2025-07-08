
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Target, TrendingUp, Award, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { AddMasteryModal } from './AddMasteryModal';

interface MasteryItem {
  id: string;
  title: string;
  description: string;
  type: 'skill' | 'competency' | 'objective';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Active' | 'Draft' | 'Completed';
  progress: number;
  requiredScore: number;
  createdAt: string;
}

export const MasterySection: React.FC = () => {
  const [masteryItems, setMasteryItems] = useState<MasteryItem[]>([
    {
      id: '1',
      title: 'Legal Research Skills',
      description: 'Master the fundamentals of legal research and case analysis',
      type: 'skill',
      level: 'Intermediate',
      status: 'Active',
      progress: 75,
      requiredScore: 85,
      createdAt: '2 days ago'
    },
    {
      id: '2',
      title: 'Constitutional Law Competency',
      description: 'Demonstrate understanding of constitutional principles and applications',
      type: 'competency',
      level: 'Advanced',
      status: 'Active',
      progress: 60,
      requiredScore: 90,
      createdAt: '1 week ago'
    },
    {
      id: '3',
      title: 'Case Brief Writing',
      description: 'Objective to write comprehensive and accurate case briefs',
      type: 'objective',
      level: 'Beginner',
      status: 'Draft',
      progress: 0,
      requiredScore: 80,
      createdAt: '3 days ago'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const getTypeIcon = (type: MasteryItem['type']) => {
    switch (type) {
      case 'skill': return <Target className="h-4 w-4" />;
      case 'competency': return <Award className="h-4 w-4" />;
      case 'objective': return <TrendingUp className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: MasteryItem['status']) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Draft': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: MasteryItem['level']) => {
    switch (level) {
      case 'Beginner': return 'bg-blue-100 text-blue-800';
      case 'Intermediate': return 'bg-orange-100 text-orange-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddMastery = (masteryData: any) => {
    const newMastery: MasteryItem = {
      id: Date.now().toString(),
      title: masteryData.title,
      description: masteryData.description,
      type: masteryData.type,
      level: masteryData.level,
      status: 'Draft',
      progress: 0,
      requiredScore: masteryData.requiredScore || 80,
      createdAt: 'Just now'
    };
    setMasteryItems([...masteryItems, newMastery]);
  };

  const handleDeleteMastery = (masteryId: string) => {
    setMasteryItems(masteryItems.filter(item => item.id !== masteryId));
  };

  return (
    <div className="bg-white min-h-full">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Mastery</h1>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="default"
              onClick={() => setShowInstructions(!showInstructions)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Instructions
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Mastery
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Instructions Panel */}
        {showInstructions && (
          <Card className="border border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="text-lg text-blue-900">Mastery Instructions</CardTitle>
            </CardHeader>
            <CardContent className="text-blue-800">
              <div className="space-y-3">
                <p><strong>Skills:</strong> Define specific abilities students need to develop and practice.</p>
                <p><strong>Competencies:</strong> Set broader professional capabilities students must demonstrate.</p>
                <p><strong>Objectives:</strong> Create specific learning goals with measurable outcomes.</p>
                <p><strong>Progress Tracking:</strong> Monitor student advancement toward mastery goals.</p>
                <p><strong>Required Scores:</strong> Set minimum achievement levels for each mastery item.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mastery Items List */}
        <div className="space-y-4">
          {masteryItems.length === 0 ? (
            <div className="text-center py-12">
              <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No mastery items yet</h3>
              <p className="text-gray-600 mb-4">
                Create mastery goals to track student progress and competency development.
              </p>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => setShowAddModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Mastery Item
              </Button>
            </div>
          ) : (
            masteryItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        {getTypeIcon(item.type)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Mastery
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteMastery(item.id)} 
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4">
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                        <Badge className={getLevelColor(item.level)}>
                          {item.level}
                        </Badge>
                        <span className="text-sm text-gray-500 capitalize">
                          {item.type}
                        </span>
                        <div className="text-sm text-gray-500">
                          Required Score: {item.requiredScore}%
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-sm text-gray-600">
                            Progress: {item.progress}%
                          </div>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-500">
                            Created {item.createdAt}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            View Progress
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      <AddMasteryModal 
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onAdd={handleAddMastery}
      />
    </div>
  );
};
