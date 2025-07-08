
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, UserPlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from "@/components/ui/switch";
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const GroupManage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock group data - in a real app, you would fetch this based on the ID
  const [formData, setFormData] = useState({
    name: "Credit Analysis A",
    description: "Group focused on credit analysis fundamentals and practical applications.",
    capacity: "30",
    isActive: true
  });

  const [students, setStudents] = useState([
    { id: 1, name: "John Smith", email: "john@example.com" },
    { id: 2, name: "Mary Johnson", email: "mary@example.com" },
    { id: 3, name: "Robert Davis", email: "robert@example.com" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com" },
    { id: 5, name: "Michael Brown", email: "michael@example.com" }
  ]);

  const [newStudent, setNewStudent] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send this data to your backend
    console.log("Updated group data:", formData);
    console.log("Updated students:", students);
    toast({
      title: "Group updated",
      description: "The group has been updated successfully."
    });
    navigate(`/groups/view/${id}`);
  };

  const handleRemoveStudent = (studentId: number) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const handleAddStudent = () => {
    if (newStudent.trim()) {
      const [name, email] = newStudent.split(',').map(s => s.trim());
      if (name && email) {
        setStudents(prev => [...prev, { id: Date.now(), name, email }]);
        setNewStudent("");
        toast({
          title: "Student added",
          description: `${name} has been added to the group.`
        });
      } else {
        toast({
          title: "Invalid format",
          description: "Please use the format: Name, email@example.com",
          variant: "destructive"
        });
      }
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate(`/groups/view/${id}`)}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">Manage Group</h1>
        </div>
        <Button onClick={handleSubmit}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Group Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Group Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="isActive" 
                  checked={formData.isActive}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, isActive: checked }))
                  }
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Group Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-grow">
                <Input 
                  placeholder="Add member (format: Name, email@example.com)" 
                  value={newStudent}
                  onChange={(e) => setNewStudent(e.target.value)}
                />
              </div>
              <Button onClick={handleAddStudent}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Name</th>
                      <th className="text-left p-4">Email</th>
                      <th className="p-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">{student.name}</td>
                        <td className="p-4">{student.email}</td>
                        <td className="p-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleRemoveStudent(student.id)}
                          >
                            <X className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GroupManage;
