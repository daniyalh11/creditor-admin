
import React from 'react';
import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { toast } from '@/hooks/use-toast';

const MasterySettings = () => {
  const handleEdit = () => {
    toast({
      title: "Edit mode",
      description: "Mastery settings can now be edited.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Mastery Settings" 
        description="Configure mastery calculation and display options"
      />

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-2">Default mastery configuration</h2>
          <p className="text-muted-foreground mb-6 text-sm">
            The default mastery configuration is used for the calculation of mastery values shown in the dashboard Mastery widget and in a learner's profile Mastery area. 
            This is important because those mastery values can include competencies that are measured in more than one course and thus you cannot apply the mastery calculation rules 
            associated with just one specific course since this can vary.
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Mastery display</td>
                  <td className="py-3 px-4">Numeric</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Mastery calculation</td>
                  <td className="py-3 px-4">Average</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Mastery threshold for a single measurement</td>
                  <td className="py-3 px-4">Disabled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-xl font-semibold mb-4">Mappings</h2>
          
          <div className="overflow-x-auto mb-4">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Minimum%</th>
                  <th className="text-left py-3 px-4 font-medium">Color</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">Good</td>
                  <td className="py-3 px-4">80</td>
                  <td className="py-3 px-4">
                    <div className="w-24 h-6 bg-[#F2FCE2] rounded"></div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Fair</td>
                  <td className="py-3 px-4">60</td>
                  <td className="py-3 px-4">
                    <div className="w-24 h-6 bg-[#FEF7CD] rounded"></div>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">Poor</td>
                  <td className="py-3 px-4">0</td>
                  <td className="py-3 px-4">
                    <div className="w-24 h-6 bg-[#ea384c] rounded"></div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div>
            <Button onClick={handleEdit} variant="outline" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MasterySettings;
