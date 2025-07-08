
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Package } from 'lucide-react';
import { AddScormDialog } from '@/components/courses/AddScormDialog';
import { PublishedUnitCard } from '@/components/courses/PublishedUnitCard';
import { UnitViewerModal } from '@/components/courses/UnitViewerModal';
import { useToast } from '@/hooks/use-toast';

interface PublishedUnit {
  id: string;
  title: string;
  blocks: any[];
  publishedAt: string;
  status: 'published' | 'draft';
  moduleId?: string;
}

const UnitsBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showScormDialog, setShowScormDialog] = useState(false);
  const [publishedUnits, setPublishedUnits] = useState<PublishedUnit[]>([]);
  const [viewingUnit, setViewingUnit] = useState<PublishedUnit | null>(null);
  const [showUnitViewer, setShowUnitViewer] = useState(false);
  const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);

  // Get module ID from location state if available
  useEffect(() => {
    if (location.state?.moduleId) {
      setCurrentModuleId(location.state.moduleId);
      console.log('Set current module ID:', location.state.moduleId);
    }
  }, [location.state]);

  // Load published units from localStorage on component mount
  useEffect(() => {
    const savedUnits = localStorage.getItem(`course-${id}-units`);
    if (savedUnits) {
      const allUnits = JSON.parse(savedUnits);
      // Filter units for current module if moduleId is set
      const filteredUnits = currentModuleId 
        ? allUnits.filter((unit: PublishedUnit) => unit.moduleId === currentModuleId)
        : allUnits;
      setPublishedUnits(filteredUnits);
      console.log('Loaded units for course:', id, 'module:', currentModuleId, 'units:', filteredUnits);
    }
  }, [id, currentModuleId]);

  // Check if a new unit was published (from navigation state)
  useEffect(() => {
    if (location.state?.publishedUnit) {
      const newUnit = {
        ...location.state.publishedUnit,
        moduleId: currentModuleId // Ensure module association
      };
      
      // Update units in localStorage
      const existingUnits = JSON.parse(localStorage.getItem(`course-${id}-units`) || '[]');
      const updatedUnits = [...existingUnits, newUnit];
      localStorage.setItem(`course-${id}-units`, JSON.stringify(updatedUnits));
      
      // Update local state
      setPublishedUnits(prev => {
        const updated = [...prev, newUnit];
        return updated;
      });
      
      console.log('Added new unit with module association:', newUnit);
      
      // Clear the state to prevent re-adding on refresh
      navigate(location.pathname, { replace: true, state: { moduleId: currentModuleId } });
    }
  }, [location.state, id, navigate, location.pathname, currentModuleId]);

  const handleCreateUnit = () => {
    navigate(`/courses/builder/${id}/units/lesson/new`, { 
      state: { moduleId: currentModuleId } 
    });
  };

  const handleAddScormPackage = () => {
    setShowScormDialog(true);
  };

  const handleViewUnit = (unitId: string) => {
    const unit = publishedUnits.find(u => u.id === unitId);
    if (unit) {
      setViewingUnit(unit);
      setShowUnitViewer(true);
    }
  };

  const handleBackToCourse = () => {
    navigate(`/courses/builder/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleBackToCourse}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Lesson Builder</h1>
              <p className="text-gray-600">
                {currentModuleId ? `Module ${currentModuleId} - ` : ''}Create and manage learning lessons
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={handleCreateUnit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create lesson
            </Button>
            <Button 
              variant="outline" 
              onClick={handleAddScormPackage}
              className="border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <Package className="h-4 w-4 mr-2" />
              Add SCORM Package
            </Button>
          </div>
        </div>

        {/* Published Units */}
        {publishedUnits.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Published Lessons {currentModuleId && `(Module ${currentModuleId})`}
            </h2>
            <div className="grid gap-4">
              {publishedUnits.map((unit) => (
                <PublishedUnitCard
                  key={unit.id}
                  unit={unit}
                  courseId={id || ''}
                  onView={handleViewUnit}
                />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {publishedUnits.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No lessons created yet</h3>
            <p className="text-gray-600 text-center mb-6 max-w-md">
              {currentModuleId 
                ? `Start building this module by creating your first learning lesson`
                : `Start building your module by creating your first learning lesson`
              }
            </p>
            <Button 
              onClick={handleCreateUnit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create First Lesson
            </Button>
          </div>
        )}
      </div>

      {/* Add SCORM Dialog */}
      <AddScormDialog
        open={showScormDialog}
        onOpenChange={setShowScormDialog}
      />

      {/* Unit Viewer Modal */}
      <UnitViewerModal
        open={showUnitViewer}
        onOpenChange={setShowUnitViewer}
        unit={viewingUnit}
      />
    </div>
  );
};

export default UnitsBuilder;
