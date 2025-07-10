import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Plus, Heart, MessageCircle, Send, MoreHorizontal, Edit, Trash2, Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const NewsSection = () => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Wiley Edwards',
      authorInitials: 'Wi',
      content: 'on the module link, my tests are showing 100% and complete when I have not studied the material. Could you wipe it clean as to start over. Thank you.',
      timestamp: 'about 2 hours ago',
      likes: 0,
      isLiked: false,
      comments: [],
      showComments: false
    },
    {
      id: '2',
      author: 'Wiley Edwards',
      authorInitials: 'Wi',
      content: 'My calendar is not populated with various webinars. Thank you.',
      timestamp: 'about 2 hours ago',
      likes: 0,
      isLiked: false,
      comments: [],
      showComments: false
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [showPostForm, setShowPostForm] = useState(false);
  const [commentTexts, setCommentTexts] = useState({});

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post = {
        id: Date.now().toString(),
        author: 'Admin User',
        authorInitials: 'Au',
        content: newPost,
        timestamp: 'just now',
        likes: 0,
        isLiked: false,
        comments: [],
        showComments: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowPostForm(false);
    }
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const toggleComments = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, showComments: !post.showComments }
        : post
    ));
  };

  const handleAddComment = (postId) => {
    const commentText = commentTexts[postId];
    if (commentText && commentText.trim()) {
      const newComment = {
        id: Date.now().toString(),
        author: 'Current User',
        authorInitials: 'CU',
        content: commentText,
        timestamp: 'just now'
      };

      setPosts(posts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      ));

      setCommentTexts({ ...commentTexts, [postId]: '' });
    }
  };

  const handleCommentChange = (postId, value) => {
    setCommentTexts({ ...commentTexts, [postId]: value });
  };

  return (
    <div className="bg-white min-h-full">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">News</h1>
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => setShowPostForm(!showPostForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post
            </Button>
            <Button 
              variant="outline" 
              size="default"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Send className="h-4 w-4 mr-2" />
              Announcement
            </Button>
            <Button 
              variant="outline" 
              size="default"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <Bell className="h-4 w-4 mr-2" />
              Subscribe
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {showPostForm && (
          <Card className="border border-gray-200">
            <CardContent className="p-4">
              <Textarea
                placeholder="Write a post..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="mb-3 border-gray-300"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowPostForm(false)}
                  className="border-gray-300"
                >
                  Cancel
                </Button>
                <Button 
                  size="sm" 
                  onClick={handleAddPost}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-white border-0">
              <div className="flex items-start gap-3 pb-4">
                <Avatar className="h-10 w-10 flex-shrink-0">
                  <AvatarFallback className="bg-gray-100 text-gray-600 text-sm font-medium">
                    {post.authorInitials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{post.author}</h4>
                      <span className="text-xs text-gray-500">{post.timestamp}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeletePost(post.id)} 
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">{post.content}</p>
                  
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`text-gray-500 hover:text-blue-600 p-0 h-auto font-normal ${
                        post.isLiked ? 'text-blue-600' : ''
                      }`}
                    >
                      <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                      Like
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleComments(post.id)}
                      className="text-gray-500 hover:text-blue-600 p-0 h-auto font-normal"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Comment
                    </Button>
                  </div>

                  {post.showComments && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                              {comment.authorInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="bg-gray-50 rounded-lg px-3 py-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-medium text-gray-900">{comment.author}</span>
                                <span className="text-xs text-gray-500">{comment.timestamp}</span>
                              </div>
                              <p className="text-xs text-gray-700">{comment.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="flex items-start gap-2 mt-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                            CU
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 flex gap-2">
                          <Input
                            placeholder="Write a comment..."
                            value={commentTexts[post.id] || ''}
                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                            className="text-sm border-gray-300"
                            onKeyPress={(e) => {
                              if (e.key === 'Enter') {
                                handleAddComment(post.id);
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                            className="bg-blue-600 hover:bg-blue-700 px-3"
                          >
                            <Send className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;