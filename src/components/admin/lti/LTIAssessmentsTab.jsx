import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const LTIAssessmentsTab = () => {
  return (
    <div className="mt-6">
      <p className="text-muted-foreground">There are no LTI assessments.</p>
      {/* The "Add" button is shown on the main LTISettings page header for this tab */}
    </div>
  );
};

export default LTIAssessmentsTab;