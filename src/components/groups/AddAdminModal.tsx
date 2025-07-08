
import React from "react";
import { useForm } from "react-hook-form";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type AddAdminFormData = {
  name: string;
  email: string;
  role: string[];
};

type AddAdminModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAdmin: (admin: { name: string; email: string; role: string[] }) => void;
};

export function AddAdminModal({ open, onOpenChange, onAddAdmin }: AddAdminModalProps) {
  const form = useForm<AddAdminFormData>({
    defaultValues: {
      name: "",
      email: "",
      role: ["Admin"],
    }
  });

  const onSubmit = (data: AddAdminFormData) => {
    // Basic validation
    if (!data.name.trim() || !data.email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    onAddAdmin({
      name: data.name.trim(),
      email: data.email.trim(),
      role: data.role,
    });

    toast.success(`${data.name} has been added as an admin`);
    form.reset();
    onOpenChange(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      form.reset();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Admin</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Role</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange([value])}
                    defaultValue={field.value[0]}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select admin role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Moderator">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Admin</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
