import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useUserFilter } from "@/contexts/UserFilterContext";
import { Plus, Trash2, Upload } from "lucide-react";

export function AddUserDialog({ open, onOpenChange }) {
  const { addUser, selectedRole } = useUserFilter();
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  
  const singleForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: selectedRole === 'all' ? 'learner' : selectedRole,
    }
  });

  const bulkForm = useForm({
    defaultValues: {
      users: [
        { name: '', email: '', role: 'learner', phone: '' }
      ]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control: bulkForm.control,
    name: "users"
  });

  const onSingleSubmit = (data) => {
    const newUser = {
      name: data.name,
      email: data.email,
      role: [data.role],
      avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
      lastVisited: "Just added",
      groups: 0,
      courses: 0,
    };
    
    addUser(newUser);
    
    toast({
      title: "User created",
      description: `${data.name} has been added as a ${data.role}.`,
    });
    singleForm.reset();
    onOpenChange(false);
  };

  const onBulkSubmit = (data) => {
    const validUsers = data.users.filter(user => user.name && user.email);
    
    if (validUsers.length === 0) {
      toast({
        title: "No valid users",
        description: "Please add at least one user with name and email.",
        variant: "destructive"
      });
      return;
    }

    // Check for duplicate emails
    const emails = validUsers.map(user => user.email.toLowerCase());
    const duplicates = emails.filter((email, index) => emails.indexOf(email) !== index);
    
    if (duplicates.length > 0) {
      toast({
        title: "Duplicate emails found",
        description: `Please remove duplicate emails: ${duplicates.join(', ')}`,
        variant: "destructive"
      });
      return;
    }

    validUsers.forEach(userData => {
      const newUser = {
        name: userData.name,
        email: userData.email,
        role: [userData.role],
        avatar: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
        lastVisited: "Just added",
        groups: 0,
        courses: 0,
      };
      addUser(newUser);
    });
    
    toast({
      title: "Users created successfully",
      description: `${validUsers.length} users have been created.`,
    });
    
    bulkForm.reset();
    onOpenChange(false);
  };

  const handleCsvUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        const lines = text.split('\n').filter(line => line.trim());
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        
        const users = [];
        
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(',').map(v => v.trim());
          const user = {};
          
          headers.forEach((header, index) => {
            if (header.includes('name')) user.name = values[index] || '';
            if (header.includes('email')) user.email = values[index] || '';
            if (header.includes('role')) user.role = values[index] || 'learner';
            if (header.includes('phone')) user.phone = values[index] || '';
          });
          
          if (user.name && user.email) {
            users.push({
              name: user.name,
              email: user.email,
              role: user.role,
              phone: user.phone
            });
          }
        }
        
        bulkForm.setValue('users', users);
        toast({
          title: "CSV imported",
          description: `${users.length} users loaded from CSV.`,
        });
      };
      
      reader.readAsText(file);
    } else {
      toast({
        title: "Invalid file",
        description: "Please upload a valid CSV file.",
        variant: "destructive"
      });
    }
  };

  const addNewUser = () => {
    append({ name: '', email: '', role: 'learner', phone: '' });
  };

  const resetModal = () => {
    setIsBulkMode(false);
    setCsvFile(null);
    singleForm.reset();
    bulkForm.reset();
  };

  const handleOpenChange = (open) => {
    if (!open) {
      resetModal();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <div className="flex items-center space-x-2 pt-2">
            <Label htmlFor="bulk-mode">Single User</Label>
            <Switch
              id="bulk-mode"
              checked={isBulkMode}
              onCheckedChange={setIsBulkMode}
            />
            <Label htmlFor="bulk-mode">Multiple Users</Label>
          </div>
        </DialogHeader>

        {!isBulkMode ? (
          // Single User Form
          <Form {...singleForm}>
            <form onSubmit={singleForm.handleSubmit(onSingleSubmit)} className="space-y-4">
              <FormField
                control={singleForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={singleForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={singleForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="learner">Learner</SelectItem>
                        <SelectItem value="instructor">Instructor</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="administrator">Administrator</SelectItem>
                        <SelectItem value="friends">Friend</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This will determine the user's permissions and access.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={singleForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add User</Button>
              </DialogFooter>
            </form>
          </Form>
        ) : (
          // Bulk Users Form
          <div className="space-y-4">
            <Tabs defaultValue="manual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">Manual Entry</TabsTrigger>
                <TabsTrigger value="csv">CSV Upload</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual">
                <Form {...bulkForm}>
                  <form onSubmit={bulkForm.handleSubmit(onBulkSubmit)} className="space-y-4">
                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {fields.map((field, index) => (
                        <Card key={field.id} className="p-3">
                          <CardContent className="p-0">
                            <div className="flex items-center justify-between mb-2">
                              <Label className="text-sm font-medium">User {index + 1}</Label>
                              {fields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => remove(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <FormField
                                control={bulkForm.control}
                                name={`users.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input placeholder="Name" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={bulkForm.control}
                                name={`users.${index}.email`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input type="email" placeholder="Email" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={bulkForm.control}
                                name={`users.${index}.role`}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Role" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="learner">Learner</SelectItem>
                                        <SelectItem value="instructor">Instructor</SelectItem>
                                        <SelectItem value="manager">Manager</SelectItem>
                                        <SelectItem value="administrator">Administrator</SelectItem>
                                        <SelectItem value="friends">Friend</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={bulkForm.control}
                                name={`users.${index}.phone`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input placeholder="Phone" {...field} />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addNewUser}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another User
                    </Button>
                    
                    <DialogFooter>
                      <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                        Cancel
                      </Button>
                      <Button type="submit">Create All Users</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </TabsContent>
              
              <TabsContent value="csv">
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <Label htmlFor="csv-upload" className="cursor-pointer">
                      <span className="text-sm text-gray-600">
                        Click to upload CSV file or drag and drop
                      </span>
                      <Input
                        id="csv-upload"
                        type="file"
                        accept=".csv"
                        className="hidden"
                        onChange={handleCsvUpload}
                      />
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">
                      CSV should include columns: Name, Email, Role, Phone
                    </p>
                  </div>
                  
                  {csvFile && (
                    <p className="text-sm text-green-600">
                      ✓ {csvFile.name} uploaded successfully
                    </p>
                  )}
                  
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                      Cancel
                    </Button>
                    <Button onClick={bulkForm.handleSubmit(onBulkSubmit)}>
                      Create Users from CSV
                    </Button>
                  </DialogFooter>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}