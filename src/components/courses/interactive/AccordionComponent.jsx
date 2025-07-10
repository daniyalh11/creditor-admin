import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

/**
 * @typedef {object} MediaContent
 * @property {string} [image] - URL for an image.
 * @property {string} [video] - URL for a video.
 */

/**
 * @typedef {object} AccordionSection
 * @property {string} id - Unique identifier for the section.
 * @property {string} title - The title displayed on the accordion trigger.
 * @property {string} content - The text content inside the accordion.
 * @property {MediaContent} [media] - Optional media content like images or videos.
 */

/**
 * @typedef {object} AccordionContentType
 * @property {AccordionSection[]} sections - An array of section objects.
 */

/**
 * A component that renders a list of expandable accordion sections.
 *
 * @param {object} props
 * @param {AccordionContentType} props.content - The data for the accordion sections.
 */
export const AccordionComponent = ({ content }) => {
  if (!content || !content.sections || content.sections.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed">
        <p>No accordion sections added yet. Click edit to add sections.</p>
      </div>
    );
  }

  return (
    <Accordion type="single" collapsible className="w-full">
      {content.sections.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger className="text-left">{section.title}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="text-gray-700 whitespace-pre-wrap">{section.content}</div>
              
              {/* Display uploaded media */}
              {section.media && (
                <div className="space-y-3">
                  {section.media.image && (
                    <div>
                      <img 
                        src={section.media.image} 
                        alt="Section content" 
                        className="w-full max-w-md rounded-lg border"
                      />
                    </div>
                  )}
                  
                  {section.media.video && (
                    <div>
                      <video 
                        src={section.media.video} 
                        controls 
                        className="w-full max-w-md rounded-lg border"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
