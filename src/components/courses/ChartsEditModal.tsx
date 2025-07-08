
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2, BarChart3, PieChart, LineChart } from 'lucide-react';

interface ChartDataPoint {
  label: string;
  value: number;
}

interface ChartsBlock {
  id: string;
  type: 'charts';
  style: 'bar' | 'pie' | 'line';
  content: {
    title?: string;
    data: ChartDataPoint[];
  };
}

interface ChartsEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  block: ChartsBlock | null;
  onSave: (block: ChartsBlock) => void;
}

export const ChartsEditModal: React.FC<ChartsEditModalProps> = ({
  open,
  onOpenChange,
  block,
  onSave
}) => {
  const [editedBlock, setEditedBlock] = useState<ChartsBlock | null>(null);

  useEffect(() => {
    if (block) {
      // Ensure data array is always initialized
      const initializedBlock = {
        ...block,
        content: {
          ...block.content,
          data: block.content.data || [{ label: '', value: 0 }]
        }
      };
      setEditedBlock(initializedBlock);
    }
  }, [block]);

  const handleSave = () => {
    if (editedBlock) {
      onSave(editedBlock);
      onOpenChange(false);
    }
  };

  const addDataPoint = () => {
    if (editedBlock) {
      setEditedBlock({
        ...editedBlock,
        content: {
          ...editedBlock.content,
          data: [...editedBlock.content.data, { label: '', value: 0 }]
        }
      });
    }
  };

  const removeDataPoint = (index: number) => {
    if (editedBlock) {
      setEditedBlock({
        ...editedBlock,
        content: {
          ...editedBlock.content,
          data: editedBlock.content.data.filter((_, i) => i !== index)
        }
      });
    }
  };

  const updateDataPoint = (index: number, field: 'label' | 'value', value: string | number) => {
    if (editedBlock && editedBlock.content.data) {
      const newData = [...editedBlock.content.data];
      newData[index] = { ...newData[index], [field]: value };
      setEditedBlock({
        ...editedBlock,
        content: {
          ...editedBlock.content,
          data: newData
        }
      });
    }
  };

  const getChartIcon = (type: string) => {
    switch (type) {
      case 'bar': return <BarChart3 className="h-4 w-4" />;
      case 'pie': return <PieChart className="h-4 w-4" />;
      case 'line': return <LineChart className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getChartTypeName = (type: string) => {
    switch (type) {
      case 'bar': return 'Bar Chart';
      case 'pie': return 'Pie Chart';
      case 'line': return 'Line Chart';
      default: return 'Chart';
    }
  };

  if (!block || !editedBlock) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getChartIcon(editedBlock.style)}
            Edit {getChartTypeName(editedBlock.style)}
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Chart Title (Optional)</Label>
            <Input
              id="title"
              placeholder="Enter chart title"
              value={editedBlock.content.title || ''}
              onChange={(e) => {
                setEditedBlock({
                  ...editedBlock,
                  content: {
                    ...editedBlock.content,
                    title: e.target.value
                  }
                });
              }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Chart Data</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addDataPoint}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Data Point
              </Button>
            </div>

            <div className="space-y-3">
              {(editedBlock.content.data || []).map((dataPoint, index) => (
                <div key={index} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Label htmlFor={`label-${index}`}>Label</Label>
                    <Input
                      id={`label-${index}`}
                      placeholder="e.g., January"
                      value={dataPoint.label}
                      onChange={(e) => updateDataPoint(index, 'label', e.target.value)}
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`value-${index}`}>Value</Label>
                    <Input
                      id={`value-${index}`}
                      type="number"
                      placeholder="e.g., 50"
                      value={dataPoint.value}
                      onChange={(e) => updateDataPoint(index, 'value', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeDataPoint(index)}
                    disabled={(editedBlock.content.data || []).length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
