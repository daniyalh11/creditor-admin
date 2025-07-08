
import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

interface ProcessContentType {
  steps: ProcessStep[];
}

interface ProcessComponentProps {
  content: ProcessContentType;
}

export const ProcessComponent: React.FC<ProcessComponentProps> = ({ content }) => {
  if (!content || !content.steps || content.steps.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
        <p>No process steps added yet. Click edit to add steps.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {content.steps.map((step, index) => (
        <div key={step.id} className="relative">
          <div className="flex items-start gap-4">
            {/* Step Number Circle */}
            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full text-white font-semibold flex items-center justify-center relative z-10">
              {index + 1}
            </div>
            
            {/* Step Content */}
            <div className="flex-1 pb-6">
              <h4 className="font-semibold text-gray-900 text-lg mb-2">{step.title}</h4>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
          
          {/* Connecting Line */}
          {index < content.steps.length - 1 && (
            <div className="absolute left-5 top-10 w-px h-6 bg-gray-300 z-0"></div>
          )}
          
          {/* Arrow for larger screens */}
          {index < content.steps.length - 1 && (
            <div className="hidden md:flex absolute right-0 top-4 text-blue-400">
              <ArrowRight className="h-6 w-6" />
            </div>
          )}
        </div>
      ))}
      
      {/* Completion Indicator */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
        <CheckCircle className="h-6 w-6 text-green-500" />
        <span className="text-green-700 font-medium">Process Complete</span>
      </div>
    </div>
  );
};
