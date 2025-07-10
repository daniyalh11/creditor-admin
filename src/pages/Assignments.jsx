import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Search, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared/PageHeader';
import { AddAssignmentDialog } from '@/components/assignments/AddAssignmentDialog';

const Assignments = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  const assignments = [
    { id: 1, title: 'Credit Risk Analysis', due: '2025-05-01', submissions: 45, total: 50 },
    { id: 2, title: 'Market Assessment', due: '2025-05-05', submissions: 38, total: 45 },
    { id: 3, title: 'Financial Statements', due: '2025-05-10', submissions: 28, total: 30 },
    { id: 4, title: 'Banking Regulations Quiz', due: '2025-05-15', submissions: 15, total: 40 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Assignments" 
        description="Track and manage student assignments"
      />

      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search assignments..." />
        </div>
        <Button onClick={() => setDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          New Assignment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                {assignment.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Due Date</span>
                  <span className="font-medium">{assignment.due}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Submissions</span>
                  <span className="font-medium">{assignment.submissions}/{assignment.total}</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                    onClick={() => navigate(`/assignments/edit/${assignment.id}`)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => navigate(`/assignments/view/${assignment.id}`)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddAssignmentDialog 
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Assignments;
