import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, PlusCircle, Share2, MoreHorizontal, Send, Edit, Trash2, Megaphone, Pin, Link } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LinkDialog } from './calendar/LinkDialog';

const NewsItem = ({ 
  post, 
  onEdit, 
  onDelete, 
  onLike, 
  onComment, 
  onAddComment 
}) => {
  const [commentText, setCommentText] = useState('');
  
  const handleCommentClick = () => {
    onComment(post.id);
  };
  
  const handleAddComment = () => {
    if (commentText.trim()) {
      onAddComment(post.id, commentText);
      setCommentText('');
    } else {
      toast.error("Please write something before posting.");
    }
  };

  const isAnnouncement = post.type === 'announcement';
  
  return (
    <Card className={`overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in ${
      isAnnouncement 
        ? 'border-l-4 border-l-blue-500 bg-blue-50/30' 
        : 'hover:scale-[1.01]'
    }`}>
      <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-3 pt-4 px-6 border-b ${
        isAnnouncement ? 'bg-blue-50/50' : 'bg-muted/30'
      }`}>
        <div className="flex items-center gap-3 flex-1">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post.avatarSrc || "/placeholder.svg"} alt={post.author} />
            <AvatarFallback className="text-sm font-medium">
              {post.author.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-base font-semibold text-gray-900">{post.author}</CardTitle>
              {isAnnouncement && (
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1">
                    <Megaphone className="h-3 w-3 mr-1" />
                    Announcement
                  </Badge>
                  <Pin className="h-4 w-4 text-blue-600" />
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{post.timeAgo}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(post.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => onDelete(post.id)} 
              className="text-red-600 focus:text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
          {post.content}
        </div>
        {post.link && (
          <a 
            href={post.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-block text-sm text-blue-600 hover:text-blue-800 hover:underline break-all bg-blue-50 px-3 py-2 rounded-md transition-colors"
          >
            {post.link}
          </a>
        )}
        
        {!isAnnouncement && (
          <>
            <div className="flex items-center justify-between pt-3 border-t">
              <div className="flex items-center gap-6 text-muted-foreground">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-2 hover:bg-rose-50 ${post.isLiked ? 'text-rose-500' : 'hover:text-rose-500'} px-3 py-2`}
                  onClick={() => onLike(post.id)}
                >
                  <Heart className={`h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} /> 
                  <span className="text-sm font-medium">{post.likes > 0 ? `${post.likes} Like${post.likes > 1 ? 's' : ''}` : 'Like'}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 hover:text-blue-600 hover:bg-blue-50 px-3 py-2" 
                  onClick={handleCommentClick}
                >
                  <MessageCircle className="h-4 w-4" /> 
                  <span className="text-sm font-medium">
                    {post.comments.length > 0 ? `${post.comments.length} Comment${post.comments.length > 1 ? 's' : ''}` : 'Comment'}
                  </span>
                </Button>
              </div>
            </div>
            
            {post.showComments && (
              <div className="mt-6 space-y-4 bg-gray-50/50 p-4 rounded-lg">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {comment.author.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-3 items-start mt-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs bg-blue-100 text-blue-700">
                      CU
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Textarea 
                      placeholder="Write a comment..." 
                      className="text-sm flex-1 resize-none border-gray-200 focus:border-blue-300" 
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      rows={2}
                    />
                    <Button 
                      size="icon" 
                      className="h-10 w-10 shrink-0 bg-blue-600 hover:bg-blue-700" 
                      onClick={handleAddComment}
                      disabled={!commentText.trim()}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const GroupNewsPage = () => {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createType, setCreateType] = useState('post');
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [textareaRef, setTextareaRef] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: '1',
      author: "Jevah Cantiller",
      timeAgo: "12 hours ago",
      avatarSrc: "/lovable-uploads/b22d4431-7c74-430d-aa30-15d8739a7fbf.png",
      content: (
        <>
          <p>Join Us LIVE on YouTube!</p>
          <p>Every Tuesday & Thursday</p>
          <p>6 PM EST</p>
          <p>Get real-time credit tips, funding strategies, and insider insights from the experts at Creditor Academy</p>
          <ul className="list-disc list-inside space-y-1 my-2">
            <li><span className="font-semibold text-green-600">✔</span> Ask questions</li>
            <li><span className="font-semibold text-green-600">✔</span> Get answers</li>
            <li><span className="font-semibold text-green-600">✔</span> Level up your financial game — LIVE!</li>
          </ul>
          <p>Subscribe & turn on notifications so you never miss a session.</p>
        </>
      ),
      link: "https://www.creditoracademy.com/page/show/152536?portal_id=14800",
      likes: 12,
      isLiked: false,
      comments: [
        {
          id: 'c1',
          author: 'John Doe',
          content: 'This sounds great! Will definitely join.',
          timeAgo: '2 hours ago'
        }
      ],
      showComments: false,
      type: 'post'
    }
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleComment = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, showComments: !post.showComments }
        : post
    ));
  };

  const handleAddComment = (postId, commentText) => {
    const newComment = {
      id: Date.now().toString(),
      author: 'Current User',
      content: commentText,
      timeAgo: 'just now'
    };

    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ));
    
    toast.success("Comment posted successfully!");
  };

  const handleEditPost = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setEditingPost(post);
      setEditContent(typeof post.content === 'string' ? post.content : 'Edit this post...');
      setShowEditDialog(true);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    toast.success("Post deleted successfully!");
  };

  const handleSaveEdit = () => {
    if (editingPost && editContent.trim()) {
      setPosts(posts.map(post => 
        post.id === editingPost.id 
          ? { ...post, content: editContent }
          : post
      ));
      setShowEditDialog(false);
      setEditingPost(null);
      setEditContent('');
      toast.success("Post updated successfully!");
    }
  };

  const handleCreate = () => {
    if (postContent.trim()) {
      const newPost = {
        id: Date.now().toString(),
        author: 'Admin User',
        timeAgo: 'just now',
        content: postContent,
        likes: 0,
        isLiked: false,
        comments: [],
        showComments: false,
        type: createType
      };
      setPosts([newPost, ...posts]);
      toast.success(`${createType === 'post' ? 'Post' : 'Announcement'} created successfully!`);
      setShowCreateDialog(false);
      setPostContent('');
      setPostTitle('');
    } else {
      toast.error("Please write something before posting.");
    }
  };

  const handleCancel = () => {
    setShowCreateDialog(false);
    setPostContent('');
    setPostTitle('');
  };

  const handleInsertLink = () => {
    if (textareaRef) {
      const start = textareaRef.selectionStart;
      const end = textareaRef.selectionEnd;
      const selected = textareaRef.value.substring(start, end);
      setSelectedText(selected);
    }
    setShowLinkDialog(true);
  };

  const handleLinkSave = (linkData) => {
    if (textareaRef) {
      const start = textareaRef.selectionStart;
      const end = textareaRef.selectionEnd;
      const linkText = linkData.text || linkData.url;
      const linkElement = `<a href="${linkData.url}" ${linkData.target === 'new' ? 'target="_blank" rel="noopener noreferrer"' : ''} ${linkData.title ? `title="${linkData.title}"` : ''}>${linkText}</a>`;
      
      const newContent = postContent.substring(0, start) + linkElement + postContent.substring(end);
      setPostContent(newContent);
      
      // Move cursor to end of inserted link
      setTimeout(() => {
        if (textareaRef) {
          const newPosition = start + linkElement.length;
          textareaRef.setSelectionRange(newPosition, newPosition);
          textareaRef.focus();
        }
      }, 0);
    }
    setShowLinkDialog(false);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">News Feed</h1>
          <p className="text-gray-600">Stay updated with the latest posts and announcements</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5">
                <PlusCircle className="mr-2 h-4 w-4" /> Create
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Content</DialogTitle>
              </DialogHeader>
              <Tabs value={createType} onValueChange={(value) => setCreateType(value)} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="post" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Post
                  </TabsTrigger>
                  <TabsTrigger value="announcement" className="flex items-center gap-2">
                    <Megaphone className="h-4 w-4" />
                    Announcement
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="post" className="space-y-4 mt-6">
                  <div>
                    <label htmlFor="post-title" className="block text-sm font-semibold mb-2 text-gray-700">Title (Optional)</label>
                    <Input 
                      id="post-title"
                      placeholder="Add a title to your post"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="border-gray-200 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="post-content" className="block text-sm font-semibold text-gray-700">Content</label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleInsertLink}
                        className="text-xs"
                      >
                        <Link className="h-3 w-3 mr-1" />
                        Insert Link
                      </Button>
                    </div>
                    <Textarea 
                      id="post-content"
                      ref={setTextareaRef}
                      placeholder="What's on your mind?"
                      rows={6}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="resize-none border-gray-200 focus:border-blue-400"
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="announcement" className="space-y-4 mt-6">
                  <div>
                    <label htmlFor="announcement-title" className="block text-sm font-semibold mb-2 text-gray-700">Announcement Title</label>
                    <Input 
                      id="announcement-title"
                      placeholder="Add a title to your announcement"
                      value={postTitle}
                      onChange={(e) => setPostTitle(e.target.value)}
                      className="border-gray-200 focus:border-blue-400"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label htmlFor="announcement-content" className="block text-sm font-semibold text-gray-700">Content</label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleInsertLink}
                        className="text-xs"
                      >
                        <Link className="h-3 w-3 mr-1" />
                        Insert Link
                      </Button>
                    </div>
                    <Textarea 
                      id="announcement-content"
                      ref={setTextareaRef}
                      placeholder="Write your announcement here..."
                      rows={6}
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      className="resize-none border-gray-200 focus:border-blue-400"
                    />
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-sm text-blue-700 flex items-center gap-2">
                      <Megaphone className="h-4 w-4" />
                      Announcements are read-only and will be pinned at the top of the feed.
                    </p>
                  </div>
                </TabsContent>
                
                <div className="flex justify-end gap-3 pt-4 border-t mt-6">
                  <Button variant="outline" onClick={handleCancel} className="px-6">Cancel</Button>
                  <Button onClick={handleCreate} disabled={!postContent.trim()} className="bg-blue-600 hover:bg-blue-700 px-6">
                    Publish {createType === 'post' ? 'Post' : 'Announcement'}
                  </Button>
                </div>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <NewsItem 
            key={post.id}
            post={post}
            onEdit={handleEditPost}
            onDelete={handleDeletePost}
            onLike={handleLike}
            onComment={handleComment}
            onAddComment={handleAddComment}
          />
        ))}
      </div>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit {editingPost?.type === 'announcement' ? 'Announcement' : 'Post'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder={`Edit your ${editingPost?.type === 'announcement' ? 'announcement' : 'post'}...`}
              rows={6}
              className="resize-none"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} disabled={!editContent.trim()}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <LinkDialog
        isOpen={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
        onSave={handleLinkSave}
        initialData={{
          url: '',
          text: selectedText,
          title: '',
          target: 'current'
        }}
      />
    </div>
  );
};

export default GroupNewsPage;