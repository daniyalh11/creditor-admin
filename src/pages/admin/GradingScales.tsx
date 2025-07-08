
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Pencil, Trash2, Plus, Check, SquarePen } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";

type GradeItem = {
  score: string;
  minimum: number;
  letter: number;
};

type SpecialRemark = {
  name: string;
  percentage: number;
};

type GradingScale = {
  id: number;
  name: string;
  isDefault: boolean;
  courseCount: number;
  grades: GradeItem[];
};

const GradingScales = () => {
  const [activeTab, setActiveTab] = useState<"scales" | "options">("scales");
  const [isAddScaleDialogOpen, setIsAddScaleDialogOpen] = useState(false);

  const [gradingScales, setGradingScales] = useState<GradingScale[]>([
    {
      id: 1,
      name: "Standard regular grading scale",
      isDefault: true,
      courseCount: 39,
      grades: [
        { score: "A+", minimum: 95, letter: 97.5 },
        { score: "A", minimum: 90, letter: 92.5 },
        { score: "A-", minimum: 85, letter: 87.5 },
        { score: "B+", minimum: 80, letter: 82.5 },
        { score: "B", minimum: 75, letter: 77.5 },
        { score: "B-", minimum: 70, letter: 72.5 },
        { score: "C+", minimum: 65, letter: 67.5 },
        { score: "C", minimum: 60, letter: 62.5 },
        { score: "C-", minimum: 55, letter: 57.5 },
        { score: "D+", minimum: 50, letter: 52.5 },
      ],
    },
    {
      id: 2,
      name: "Standard pass/fail grading scale",
      isDefault: false,
      courseCount: 0,
      grades: [
        { score: "P", minimum: 70, letter: 85 },
        { score: "F", minimum: 0, letter: 35 },
      ],
    }
  ]);

  const [specialRemarks, setSpecialRemarks] = useState<SpecialRemark[]>([
    { name: "Missing", percentage: 0 },
    { name: "Incomplete", percentage: 0 },
    { name: "Absent", percentage: 0 },
  ]);

  const form = useForm({
    defaultValues: {
      name: "",
    }
  });

  const handleAddScale = () => {
    setIsAddScaleDialogOpen(true);
  };

  const handleAddScaleSubmit = (data: { name: string }) => {
    const newId = Math.max(0, ...gradingScales.map(s => s.id)) + 1;
    
    setGradingScales([...gradingScales, {
      id: newId,
      name: data.name,
      isDefault: false,
      courseCount: 0,
      grades: []
    }]);
    
    setIsAddScaleDialogOpen(false);
    form.reset();
    
    toast({
      title: "Grading scale added",
      description: "New grading scale has been created successfully"
    });
  };

  const handleEditScale = (id: number) => {
    toast({
      title: "Edit scale",
      description: "Editing scale " + id
    });
  };

  const handleDeleteScale = (id: number) => {
    setGradingScales(gradingScales.filter(scale => scale.id !== id));
    toast({
      title: "Scale deleted",
      description: "The grading scale has been deleted successfully"
    });
  };

  const handleMakeDefault = (id: number) => {
    setGradingScales(gradingScales.map(scale => ({
      ...scale,
      isDefault: scale.id === id
    })));
    
    toast({
      title: "Default scale set",
      description: "The grading scale is now the default"
    });
  };

  const handleMakeAllCoursesUse = (id: number) => {
    toast({
      title: "Applied to all courses",
      description: "This scale will be applied to all courses"
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Grading Scales" 
        description="Manage and configure grading scales for courses"
        action={{
          label: "Add standard grading scale",
          onClick: handleAddScale
        }}
      />

      <Tabs defaultValue="scales" value={activeTab} onValueChange={(value) => setActiveTab(value as "scales" | "options")}>
        <TabsList className="grid w-[400px] grid-cols-2 mb-6">
          <TabsTrigger value="scales">Grading scales</TabsTrigger>
          <TabsTrigger value="options">Options</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scales" className="space-y-6">
          <p className="text-lg">Here are your standard grading scales:</p>

          {gradingScales.map((scale) => (
            <div key={scale.id} className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">{scale.name} {scale.isDefault && "(Default)"}</h2>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => handleEditScale(scale.id)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" onClick={() => handleMakeAllCoursesUse(scale.id)}>
                    <SquarePen className="h-4 w-4 mr-2" />
                    Make all courses use this grading scale
                  </Button>
                </div>
              </div>
              
              <p>
                {scale.courseCount > 0 
                  ? `Number of courses, class templates, and assessments using this letters grading scale: ${scale.courseCount}`
                  : "No courses, class templates, or assessments are using this letters grading scale."}
              </p>
              
              <Card>
                <CardContent className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Score</TableHead>
                        <TableHead>Minimum%</TableHead>
                        <TableHead>Letter%</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scale.grades.map((grade, index) => (
                        <TableRow key={index}>
                          <TableCell>{grade.score}</TableCell>
                          <TableCell>{grade.minimum}</TableCell>
                          <TableCell>{grade.letter}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              {scale.id === 2 && (
                <>
                  <Card className="mt-4">
                    <CardContent className="p-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Special remark</TableHead>
                            <TableHead>%</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {specialRemarks.map((remark, index) => (
                            <TableRow key={index}>
                              <TableCell>{remark.name}</TableCell>
                              <TableCell>{remark.percentage}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>

                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleEditScale(scale.id)}>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" onClick={() => handleMakeAllCoursesUse(scale.id)}>
                      <SquarePen className="h-4 w-4 mr-2" />
                      Make all courses use this grading scale
                    </Button>
                    <Button variant="outline" className="text-destructive hover:bg-destructive/10" onClick={() => handleDeleteScale(scale.id)}>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                    {!scale.isDefault && (
                      <Button variant="outline" onClick={() => handleMakeDefault(scale.id)}>
                        <Check className="h-4 w-4 mr-2" />
                        Make this the default
                      </Button>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="options">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Grading Scale Options</h2>
              <p className="text-muted-foreground mb-4">Configure global options for all grading scales.</p>
              <div className="space-y-4">
                <div>
                  <Label>Default Scale</Label>
                  <p className="text-sm text-muted-foreground">
                    The default scale is: {gradingScales.find(s => s.isDefault)?.name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isAddScaleDialogOpen} onOpenChange={setIsAddScaleDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Grading Scale</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddScaleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scale Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter grading scale name" />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button variant="outline" type="button" onClick={() => setIsAddScaleDialogOpen(false)}>Cancel</Button>
                <Button type="submit">Create Scale</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <div className="flex justify-between text-sm text-muted-foreground mb-6">
        <div>Contact</div>
        <div>Powered by CYPHER Learning</div>
      </div>
    </div>
  );
};

export default GradingScales;
