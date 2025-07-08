
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BarChart3, PieChart, LineChart } from 'lucide-react';

interface ChartsBlockModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (chartType: 'bar' | 'pie' | 'line') => void;
}

export const ChartsBlockModal: React.FC<ChartsBlockModalProps> = ({
  open,
  onOpenChange,
  onSelect
}) => {
  const handleSelect = (type: 'bar' | 'pie' | 'line') => {
    onSelect(type);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Select Chart Type</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-6 py-6">
          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col gap-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            onClick={() => handleSelect('bar')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg mb-1">Bar Chart</div>
              <div className="text-sm text-gray-600 mb-4">Compare values across categories</div>
            </div>
            
            {/* Sample Bar Chart Preview */}
            <div className="w-full">
              <div className="text-xs text-gray-500 mb-2 text-center">Sample Bar Chart</div>
              <div className="flex items-end justify-center gap-2 h-16">
                <div className="w-6 h-8 bg-blue-400 rounded-t"></div>
                <div className="w-6 h-12 bg-blue-500 rounded-t"></div>
                <div className="w-6 h-6 bg-blue-400 rounded-t"></div>
              </div>
              <div className="flex justify-center gap-2 mt-1">
                <span className="text-xs text-gray-400">Q1</span>
                <span className="text-xs text-gray-400">Q2</span>
                <span className="text-xs text-gray-400">Q3</span>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col gap-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            onClick={() => handleSelect('pie')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <PieChart className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg mb-1">Pie Chart</div>
              <div className="text-sm text-gray-600 mb-4">Show proportions of a whole</div>
            </div>
            
            {/* Sample Pie Chart Preview */}
            <div className="w-full">
              <div className="text-xs text-gray-500 mb-2 text-center">Sample Pie Chart</div>
              <div className="flex justify-center">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full" style={{
                    background: `conic-gradient(#3B82F6 0deg 252deg, #60A5FA 252deg 360deg)`
                  }}></div>
                </div>
              </div>
              <div className="text-center mt-2">
                <span className="text-xs text-gray-400">70% / 30%</span>
              </div>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto p-6 flex flex-col gap-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            onClick={() => handleSelect('line')}
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <LineChart className="h-5 w-5 text-blue-600" />
            </div>
            <div className="text-center">
              <div className="font-semibold text-lg mb-1">Line Chart</div>
              <div className="text-sm text-gray-600 mb-4">Show trends over time</div>
            </div>
            
            {/* Sample Line Chart Preview */}
            <div className="w-full">
              <div className="text-xs text-gray-500 mb-2 text-center">Sample Line Chart</div>
              <div className="relative h-16 flex items-end justify-center">
                <svg width="80" height="40" className="overflow-visible">
                  <polyline
                    points="10,30 40,15 70,25"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="2"
                  />
                  <circle cx="10" cy="30" r="2" fill="#3B82F6" />
                  <circle cx="40" cy="15" r="2" fill="#3B82F6" />
                  <circle cx="70" cy="25" r="2" fill="#3B82F6" />
                </svg>
              </div>
              <div className="flex justify-center gap-3 mt-1">
                <span className="text-xs text-gray-400">Jan</span>
                <span className="text-xs text-gray-400">Feb</span>
                <span className="text-xs text-gray-400">Mar</span>
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
