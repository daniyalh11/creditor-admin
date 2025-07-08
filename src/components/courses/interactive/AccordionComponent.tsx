
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface AccordionSection {
  id: string;
  title: string;
  content: string;
  media?: {
    image?: string;
    video?: string;
  };
}

interface AccordionContentType {
  sections: AccordionSection[];
}

interface AccordionComponentProps {
  content: AccordionContentType;
}

export const AccordionComponent: React.FC<AccordionComponentProps> = ({ content }) => {
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
                        alt="Section image" 
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
