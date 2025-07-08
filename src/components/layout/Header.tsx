
import React, { useState, useEffect } from 'react';
import { Bell, Search, UserRound, LogOut, X, Calendar, Inbox, Recycle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSidebar } from '@/contexts/SidebarContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RecycleBinModal } from '@/components/modals/RecycleBinModal';
import { EmailInboxModal } from '@/components/modals/EmailInboxModal';

export const Header = () => {
  const { toast } = useToast();
  const location = useLocation();
  const { 
    isMainCollapsed, 
    isAdminSectionActive,
    isAdminSidebarOpen
  } = useSidebar();
  
  // State for header avatar - listen for updates
  const [headerAvatar, setHeaderAvatar] = useState('/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png');

  // Listen for avatar updates from profile settings
  useEffect(() => {
    const handleAvatarUpdate = (event: CustomEvent) => {
      setHeaderAvatar(event.detail.avatarUrl);
    };

    window.addEventListener('avatarUpdated', handleAvatarUpdate as EventListener);
    
    return () => {
      window.removeEventListener('avatarUpdated', handleAvatarUpdate as EventListener);
    };
  }, []);
  
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: "New Course Available", 
      message: "Introduction to American Constitutional Law is now available. Start learning today!", 
      time: "10 minutes ago", 
      unread: true,
      type: "course",
      color: "bg-blue-100 border-l-4 border-blue-500"
    },
    { 
      id: 2, 
      title: "Assignment Due", 
      message: "Your Case Brief for Civil Litigation is due tomorrow. Don't forget to submit!", 
      time: "1 hour ago", 
      unread: true,
      type: "assignment",
      color: "bg-amber-100 border-l-4 border-amber-500"
    },
    { 
      id: 3, 
      title: "Quiz Completed", 
      message: "You scored 92% on Criminal Law Procedure Quiz. Great job!", 
      time: "3 hours ago", 
      unread: false,
      type: "quiz",
      color: "bg-green-100 border-l-4 border-green-500"
    }
  ]);

  const [activeTab, setActiveTab] = useState("all");
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    courseUpdates: true,
    assignmentReminders: true,
    systemAnnouncements: true,
    groupActivities: false
  });

  // Calendar modal state
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [isRecycleBinOpen, setIsRecycleBinOpen] = useState(false);
  const [isEmailInboxOpen, setIsEmailInboxOpen] = useState(false);

  const handleNotificationClick = (id: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, unread: false } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, unread: false }))
    );
    toast({
      title: "All notifications marked as read",
      duration: 2000,
    });
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast({
      title: `${value ? 'Enabled' : 'Disabled'} ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
      duration: 2000,
    });
  };

  const handleDismissNotification = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(notif => notif.id !== id));
    toast({
      title: "Notification dismissed",
      duration: 2000,
    });
  };

  const unreadCount = notifications.filter(n => n.unread).length;
  const filteredNotifications = activeTab === "unread" 
    ? notifications.filter(n => n.unread) 
    : notifications;

  const getHeaderLeftPosition = () => {
    // Check if we're on assessment dashboard pages - always use fixed main sidebar width
    const isOnAssessmentDashboard = location.pathname.includes('/quiz/') ||
                                   location.pathname.includes('/assignment/') ||
                                   location.pathname.includes('/debate/') ||
                                   location.pathname.includes('/essay/') ||
                                   location.pathname.includes('/survey/');
    
    if (isOnAssessmentDashboard) {
      return '16rem'; // Fixed 64 (w-64) for main sidebar only
    }
    
    // Check if we're on the module assessments view page - use expanded main sidebar width
    const isOnModuleAssessmentsView = /\/courses\/edit\/\d+\/.*assessments/.test(location.pathname);
    
    if (isOnModuleAssessmentsView) {
      return '16rem'; // Fixed position for expanded main sidebar only
    }
    
    // Check if we're on a course edit page - if so, use fixed positioning
    if (location.pathname.includes('/courses/edit/')) {
      return '20rem'; // Fixed position for course pages
    }
    
    if (isAdminSectionActive && isAdminSidebarOpen) {
      return isMainCollapsed ? '20rem' : '32rem';
    }
    return isMainCollapsed ? '4rem' : '16rem';
  };

  return (
    <header 
      className="fixed top-0 right-0 z-30 h-16 bg-white border-b border-gray-200 transition-all duration-300"
      style={{
        left: getHeaderLeftPosition()
      }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Logo/Brand Title - consistent positioning */}
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-900">Athena LMS</h1>
        </div>
        
        {/* Center-right section with search and icons */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search…"
              className="pl-10 pr-4 py-2 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white"
            />
          </div>

          {/* Icons section */}
          <div className="flex items-center gap-4">
            {/* Calendar Icon with Modal */}
            <Dialog open={isCalendarModalOpen} onOpenChange={setIsCalendarModalOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-700">
                  <Calendar className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-white">
                <div className="p-4">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-700" />
                      <h2 className="text-lg font-bold text-gray-900">Calendar & Events</h2>
                    </div>
                  </div>

                  {/* Today's Events Section */}
                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-blue-700 mb-2">Today's Events</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Team Meeting</span>
                        <span className="text-sm font-medium text-blue-600">10:00 AM</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Course Review</span>
                        <span className="text-sm font-medium text-blue-600">2:00 PM</span>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming This Week Section */}
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h3 className="text-sm font-semibold text-green-700 mb-2">Upcoming This Week</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Project Deadline</span>
                        <span className="text-sm font-medium text-green-600">Friday</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-700">Monthly Report</span>
                        <span className="text-sm font-medium text-green-600">Next Monday</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Email Inbox Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative h-9 w-9 text-gray-500 hover:text-gray-700"
              onClick={() => setIsEmailInboxOpen(true)}
            >
              <Inbox className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
            </Button>

            {/* Recycle Bin Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 text-gray-500 hover:text-gray-700"
              onClick={() => setIsRecycleBinOpen(true)}
            >
              <Recycle className="h-5 w-5" />
            </Button>
            
            {/* Bell/Notifications Icon with notification dot */}
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative h-9 w-9 text-gray-500 hover:text-gray-700"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></span>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-80 p-0 shadow-lg">
                <div className="flex flex-col max-h-[70vh]">
                  <div className="flex items-center justify-between p-3 border-b">
                    <h3 className="font-medium">Notifications</h3>
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                      <TabsList className="grid grid-cols-3 h-8">
                        <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                        <TabsTrigger value="unread" className="text-xs">Unread</TabsTrigger>
                        <TabsTrigger value="settings" className="text-xs">Settings</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  {activeTab !== 'settings' ? (
                    <>
                      <div className="flex justify-between items-center px-3 py-2 bg-muted/30">
                        <span className="text-sm font-medium">
                          {activeTab === "unread" 
                            ? "Unread notifications" 
                            : "Recent notifications"}
                        </span>
                        {filteredNotifications.length > 0 && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={handleMarkAllAsRead} 
                            className="text-xs h-7 px-2"
                          >
                            Mark all as read
                          </Button>
                        )}
                      </div>
                      
                      <div className="overflow-y-auto max-h-[400px]">
                        {filteredNotifications.length === 0 ? (
                          <div className="p-4 text-center text-sm text-muted-foreground">
                            No {activeTab === "unread" ? "unread" : ""} notifications
                          </div>
                        ) : (
                          filteredNotifications.map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() => handleNotificationClick(notification.id)}
                              className={cn(
                                "p-3 cursor-pointer transition-colors border-b last:border-b-0 group",
                                notification.unread ? "bg-muted/30" : "",
                                notification.color
                              )}
                            >
                              <div className="flex justify-between">
                                <h4 className="text-sm font-medium flex items-center gap-1">
                                  {notification.title}
                                  {notification.unread && (
                                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                                  )}
                                </h4>
                                <button 
                                  onClick={(e) => handleDismissNotification(notification.id, e)}
                                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-foreground"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                              <span className="text-xs text-muted-foreground mt-2 block">{notification.time}</span>
                            </div>
                          ))
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="p-4">
                      <h4 className="font-medium mb-3">Notification Settings</h4>
                      
                      <h5 className="text-sm font-medium mb-2">Notification Methods</h5>
                      <div className="space-y-3 mb-5">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">Email Notifications</p>
                            <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                          </div>
                          <Switch 
                            checked={notificationSettings.email} 
                            onCheckedChange={(checked) => handleSettingChange('email', checked)} 
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">Push Notifications</p>
                            <p className="text-xs text-muted-foreground">Receive push notifications in-app</p>
                          </div>
                          <Switch 
                            checked={notificationSettings.push} 
                            onCheckedChange={(checked) => handleSettingChange('push', checked)} 
                          />
                        </div>
                      </div>
                      
                      <h5 className="text-sm font-medium mb-2">Notification Types</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">Course Updates</p>
                            <p className="text-xs text-muted-foreground">New content, assignments, and feedback</p>
                          </div>
                          <Switch 
                            checked={notificationSettings.courseUpdates} 
                            onCheckedChange={(checked) => handleSettingChange('courseUpdates', checked)} 
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">Assignment Reminders</p>
                            <p className="text-xs text-muted-foreground">Deadlines and due date notifications</p>
                          </div>
                          <Switch 
                            checked={notificationSettings.assignmentReminders} 
                            onCheckedChange={(checked) => handleSettingChange('assignmentReminders', checked)} 
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">System Announcements</p>
                            <p className="text-xs text-muted-foreground">Platform updates and maintenance notices</p>
                          </div>
                          <Switch 
                            checked={notificationSettings.systemAnnouncements} 
                            onCheckedChange={(checked) => handleSettingChange('systemAnnouncements', checked)} 
                          />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm">Group Activities</p>
                            <p className="text-xs text-muted-foreground">Updates from groups and study circles</p>
                          </div>
                          <Switch 
                            checked={notificationSettings.groupActivities} 
                            onCheckedChange={(checked) => handleSettingChange('groupActivities', checked)} 
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>

            {/* User Profile Avatar - now updates dynamically */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-full p-0"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={headerAvatar} alt="AJ" />
                    <AvatarFallback className="bg-blue-600 text-white text-sm">AJ</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={headerAvatar} alt="AJ" />
                    <AvatarFallback className="bg-blue-600 text-white">AJ</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">Alex Johnson</p>
                    <p className="text-xs text-gray-500">alex@example.com</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer hover:bg-gray-50 transition-colors flex items-center">
                    <UserRound className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50 transition-colors flex items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Modals */}
      <RecycleBinModal 
        isOpen={isRecycleBinOpen} 
        onClose={() => setIsRecycleBinOpen(false)} 
      />
      <EmailInboxModal 
        isOpen={isEmailInboxOpen} 
        onClose={() => setIsEmailInboxOpen(false)} 
      />
    </header>
  );
};
