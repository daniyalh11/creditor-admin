
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Plus, 
  MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

type Forum = {
  id: number;
  title: string;
  description: string;
  topics: number;
  posts: number;
  lastActivityDate?: string;
};

const GroupForumsPage = () => {
  const [isCreateForumOpen, setIsCreateForumOpen] = useState(false);
  const [forumTitle, setForumTitle] = useState('');
  const [forumDescription, setForumDescription] = useState('');
  const [forums, setForums] = useState<Forum[]>([]);

  const handleCreateForum = () => {
    if (!forumTitle.trim()) {
      toast.error("Please enter a forum title");
      return;
    }

    const newForum: Forum = {
      id: Date.now(),
      title: forumTitle,
      description: forumDescription,
      topics: 0,
      posts: 0,
      lastActivityDate: new Date().toISOString()
    };

    setForums(prev => [...prev, newForum]);
    setForumTitle('');
    setForumDescription('');
    setIsCreateForumOpen(false);
    toast.success("Forum created successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Forums</h1>
        <Button onClick={() => setIsCreateForumOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create Forum
        </Button>
      </div>

      {forums.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-muted/10">
          <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-2">There are no forums.</h2>
          <p className="text-muted-foreground mb-6">
            Create a forum to start discussions with your group members.
          </p>
          <Button onClick={() => setIsCreateForumOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Forum
          </Button>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/30">
              <tr>
                <th className="p-4 text-left font-medium">Forum</th>
                <th className="p-4 text-left font-medium">Topics</th>
                <th className="p-4 text-left font-medium">Posts</th>
                <th className="p-4 text-left font-medium">Last Activity</th>
              </tr>
            </thead>
            <tbody>
              {forums.map(forum => (
                <tr key={forum.id} className="border-t hover:bg-muted/10 cursor-pointer">
                  <td className="p-4">
                    <div className="flex items-start gap-3">
                      <MessageCircle className="h-5 w-5 mt-1 text-blue-500" />
                      <div>
                        <div className="font-medium">{forum.title}</div>
                        <div className="text-sm text-muted-foreground">{forum.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{forum.topics}</td>
                  <td className="p-4">{forum.posts}</td>
                  <td className="p-4">
                    {forum.lastActivityDate ? (
                      new Date(forum.lastActivityDate).toLocaleDateString()
                    ) : (
                      "No activity"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Forum Dialog */}
      <Dialog open={isCreateForumOpen} onOpenChange={setIsCreateForumOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create a Forum</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="forum-title">Title</Label>
              <Input
                id="forum-title"
                placeholder="Enter forum title"
                value={forumTitle}
                onChange={(e) => setForumTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="forum-description">Description (optional)</Label>
              <Textarea
                id="forum-description"
                placeholder="Enter forum description"
                value={forumDescription}
                onChange={(e) => setForumDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateForumOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateForum}>
              Create Forum
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupForumsPage;
