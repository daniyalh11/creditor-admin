
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, BookOpen, ArrowLeft, Clock, Eye, FileText, Video, Headphones } from 'lucide-react';
import { UnitEditDialog } from './UnitEditDialog';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: string;
  title: string;
  sections: ContentSection[];
}

interface ContentSection {
  id: string;
  type: 'text' | 'video' | 'image' | 'file';
  title: string;
  content: string;
}

interface Unit {
  id: string;
  title: string;
  lessons: Lesson[];
  estimatedTime?: number;
  type?: 'text' | 'video' | 'audio';
}

interface UnitsListProps {
  moduleId: string;
  units: Unit[];
  onBack: () => void;
}

export const UnitsList: React.FC<UnitsListProps> = ({ 
  moduleId, 
  units: initialUnits, 
  onBack 
}) => {
  const [units, setUnits] = useState<Unit[]>(initialUnits);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [showUnitDialog, setShowUnitDialog] = useState(false);
  const { toast } = useToast();

  const addNewUnit = () => {
    setEditingUnit(null);
    setShowUnitDialog(true);
  };

  const editUnit = (unit: Unit) => {
    setEditingUnit(unit);
    setShowUnitDialog(true);
  };

  const handleSaveUnit = (unitData: any) => {
    if (editingUnit) {
      setUnits(units.map(unit => 
        unit.id === editingUnit.id 
          ? { ...unit, ...unitData }
          : unit
      ));
      toast({
        title: "Unit updated",
        description: "Unit has been successfully updated.",
      });
    } else {
      const newUnit: Unit = {
        ...unitData,
        lessons: [],
        estimatedTime: 15,
        type: 'text'
      };
      setUnits([...units, newUnit]);
      toast({
        title: "Unit created",
        description: "New unit has been successfully created.",
      });
    }
    setShowUnitDialog(false);
    setEditingUnit(null);
  };

  const deleteUnit = (unitId: string) => {
    setUnits(units.filter(unit => unit.id !== unitId));
    toast({
      title: "Unit deleted",
      description: "Unit has been successfully deleted.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'audio':
        return <Headphones className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'video':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'audio':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const handleViewContent = (unitId: string) => {
    toast({
      title: "Loading content",
      description: "Opening unit content viewer...",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onBack}
            className="bg-white/80 backdrop-blur-sm border-white/50 text-gray-700 hover:bg-white/90 transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Modules
          </Button>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Module Units</h2>
            <p className="text-gray-600">Manage units within this module</p>
          </div>
        </div>
        <Button 
          onClick={addNewUnit} 
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Unit
        </Button>
      </div>

      {units.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
          <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold mb-2 text-gray-700">No units yet</h3>
          <p className="text-gray-600 mb-6">Create your first unit to organize module content</p>
          <Button onClick={addNewUnit} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Create First Unit
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {units.map((unit) => (
            <Card key={unit.id} className="border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 bg-white rounded-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 rounded-lg bg-gray-100">
                        {getTypeIcon(unit.type || 'text')}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{unit.title}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge variant="outline" className={`text-xs ${getTypeBadgeColor(unit.type || 'text')}`}>
                            {(unit.type || 'text').charAt(0).toUpperCase() + (unit.type || 'text').slice(1)}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {unit.estimatedTime || 15} min
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {unit.lessons?.length || 0} Lessons
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      onClick={() => handleViewContent(unit.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Content
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => editUnit(unit)}
                      className="hover:bg-gray-50 transition-colors duration-200"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => deleteUnit(unit.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <UnitEditDialog
        open={showUnitDialog}
        onOpenChange={setShowUnitDialog}
        unit={editingUnit}
        onSave={handleSaveUnit}
      />
    </div>
  );
};
