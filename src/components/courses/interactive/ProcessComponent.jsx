import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, CheckCircle } from 'lucide-react';

/**
 * @typedef {object} ProcessStep
 * @property {string} id - Unique identifier for the step.
 * @property {string} title - The title of the step.
 * @property {string} description - The descriptive text for the step.
 */

/**
 * @typedef {object} ProcessContentType
 * @property {ProcessStep[]} steps - An array of process step objects.
 */

/**
 * A component to display a linear process with numbered steps.
 *
 * @param {object} props
 * @param {ProcessContentType} props.content - The data for the process steps.
 */
export const ProcessComponent = ({ content }) => {
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
            <div className="absolute left-5 top-10 w-px h-full bg-gray-300 z-0" style={{ height: 'calc(100% - 2.5rem)' }}></div>
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
