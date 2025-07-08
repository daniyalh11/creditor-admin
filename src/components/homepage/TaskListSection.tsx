
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ListTodo, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

// Sample tasks data
const initialTasks: Task[] = [
  { id: '1', title: 'Complete Constitutional Law quiz', completed: false, priority: 'high' },
  { id: '2', title: 'Review legal cases', completed: true, priority: 'medium' },
  { id: '3', title: 'Prepare debate arguments', completed: false, priority: 'high' },
  { id: '4', title: 'Read chapter on Civil Procedure', completed: false, priority: 'medium' },
  { id: '5', title: 'Submit legal brief draft', completed: false, priority: 'high' },
];

export function TaskListSection() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<Task['priority']>('medium');
  
  const handleToggleComplete = (taskId: string) => {
    setTasks(
      tasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };
  
  const handleAddTask = () => {
    if (newTaskTitle.trim() === '') {
      toast({
        title: "Task title cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      priority: newTaskPriority,
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskDialogOpen(false);
    setNewTaskTitle('');
    setNewTaskPriority('medium');
    
    toast({
      title: "Task added",
      description: `"${newTaskTitle}" has been added to your tasks.`
    });
  };
  
  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-amber-100 text-amber-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-ca-primary" />
              Your Tasks
            </CardTitle>
            <Button variant="ghost" className="text-ca-primary flex items-center">
              View all <span className="ml-1">→</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {tasks.map(task => (
              <div 
                key={task.id}
                className={`p-3 border rounded-md flex items-center gap-3 ${
                  task.completed ? 'bg-gray-50' : ''
                }`}
              >
                <Checkbox 
                  checked={task.completed} 
                  onCheckedChange={() => handleToggleComplete(task.id)} 
                  id={`task-${task.id}`}
                />
                <label 
                  htmlFor={`task-${task.id}`}
                  className={`flex-1 cursor-pointer ${task.completed ? 'text-gray-500 line-through' : ''}`}
                >
                  {task.title}
                </label>
                <span className={`text-xs px-2 py-1 rounded ${getPriorityStyle(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            ))}
            
            <Button 
              variant="outline" 
              className="w-full mt-4 flex items-center justify-center gap-2"
              onClick={() => setNewTaskDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Add task
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={newTaskDialogOpen} onOpenChange={setNewTaskDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="task-title">Task Title</Label>
              <Input 
                id="task-title" 
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter task title"
              />
            </div>
            <div className="space-y-2">
              <Label>Priority</Label>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="priority-high" 
                    name="priority"
                    checked={newTaskPriority === 'high'}
                    onChange={() => setNewTaskPriority('high')}
                    className="text-red-500"
                  />
                  <Label htmlFor="priority-high" className="cursor-pointer text-red-800">High</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="priority-medium" 
                    name="priority"
                    checked={newTaskPriority === 'medium'}
                    onChange={() => setNewTaskPriority('medium')}
                    className="text-amber-500"
                  />
                  <Label htmlFor="priority-medium" className="cursor-pointer text-amber-800">Medium</Label>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="radio" 
                    id="priority-low" 
                    name="priority"
                    checked={newTaskPriority === 'low'}
                    onChange={() => setNewTaskPriority('low')}
                    className="text-green-500"
                  />
                  <Label htmlFor="priority-low" className="cursor-pointer text-green-800">Low</Label>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewTaskDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
