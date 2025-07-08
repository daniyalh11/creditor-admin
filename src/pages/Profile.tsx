
import React, { useState, useEffect } from 'react';
import { UserRound, Mail, Phone, MapPin, Bell, Shield, ImagePlus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AvatarPickerDialog } from '@/components/profile/AvatarPickerDialog';

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personal");
  const [isEditing, setIsEditing] = useState(false);
  const [avatarPickerOpen, setAvatarPickerOpen] = useState(false);
  const [avatarUpdated, setAvatarUpdated] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    bio: 'Learning enthusiast and software developer',
    title: 'Software Developer',
    avatar: '/lovable-uploads/dc27ec74-b2e9-4467-8adc-6a66a52eb520.png',
    timezone: 'America/Los_Angeles', // Default timezone
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    courseUpdates: true,
    newLessons: true,
    learningReminders: false,
    marketingCommunications: false
  });

  // Common timezones list
  const timezones = [
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Anchorage', label: 'Alaska Time (AT)' },
    { value: 'Pacific/Honolulu', label: 'Hawaii Time (HT)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Europe/Berlin', label: 'Central European Time (CET)' },
    { value: 'Europe/Rome', label: 'Central European Time (CET)' },
    { value: 'Europe/Madrid', label: 'Central European Time (CET)' },
    { value: 'Europe/Moscow', label: 'Moscow Time (MSK)' },
    { value: 'Asia/Dubai', label: 'Gulf Standard Time (GST)' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Seoul', label: 'Korea Standard Time (KST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' },
    { value: 'Australia/Melbourne', label: 'Australian Eastern Time (AET)' },
    { value: 'Australia/Perth', label: 'Australian Western Time (AWT)' },
    { value: 'Pacific/Auckland', label: 'New Zealand Time (NZT)' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimezoneChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      timezone: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
    setIsEditing(false);
  };

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully."
    });
  };

  const handleNotificationSettingChange = (key: string, checked: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: checked
    }));
    
    toast({
      title: `${checked ? 'Enabled' : 'Disabled'} ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`,
      duration: 2000,
    });
  };

  const handleAvatarSave = (avatarSource: string) => {
    setFormData(prev => ({
      ...prev,
      avatar: avatarSource
    }));
    
    // Trigger animation effect
    setAvatarUpdated(true);
    setTimeout(() => setAvatarUpdated(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative group">
          <Avatar 
            className={`h-24 w-24 bg-primary/20 cursor-pointer group-hover:opacity-90 transition-all duration-300 border-2 ${avatarUpdated ? 'border-green-500 scale-110' : 'border-transparent'} hover:border-primary`}
            onClick={() => setAvatarPickerOpen(true)}
          >
            {formData.avatar ? (
              <AvatarImage src={formData.avatar} alt={formData.name} className="object-cover" />
            ) : (
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {formData.name.split(' ').map(name => name[0]).join('')}
              </AvatarFallback>
            )}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <ImagePlus className="h-8 w-8 text-white" />
            </div>
          </Avatar>
          {avatarUpdated && (
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-green-500 font-medium animate-fade-in whitespace-nowrap">
              Profile picture updated!
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>
      </div>

      <AvatarPickerDialog 
        isOpen={avatarPickerOpen} 
        onClose={() => setAvatarPickerOpen(false)}
        onSave={handleAvatarSave}
        currentAvatar={formData.avatar}
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="border-b">
          <TabsList className="w-full flex justify-start pl-0 h-12 bg-transparent">
            <TabsTrigger 
              value="personal" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:text-primary transition-all hover:text-primary/80"
            >
              <UserRound className="h-4 w-4" />
              <span className="relative overflow-hidden inline-block">
                <span className="group-data-[state=active]:translate-y-0 transition-transform duration-200">Personal</span>
              </span>
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:text-primary transition-all hover:text-primary/80"
            >
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger 
              value="security" 
              className="flex items-center gap-2 data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:text-primary transition-all hover:text-primary/80"
            >
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="personal" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="timezone" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Zone
                  </Label>
                  <Select
                    value={formData.timezone}
                    onValueChange={handleTimezoneChange}
                    disabled={!isEditing}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={!isEditing}
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                {isEditing ? (
                  <>
                    <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Notification Settings</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Email Notifications</h3>
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="text-sm">Receive email notifications about your course progress</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.email} 
                    onCheckedChange={(checked) => handleNotificationSettingChange('email', checked)} 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Push Notifications</h3>
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="text-sm">Receive push notifications on your device</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.push} 
                    onCheckedChange={(checked) => handleNotificationSettingChange('push', checked)} 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Course Updates</h3>
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="text-sm">Get notified when courses are updated</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.courseUpdates} 
                    onCheckedChange={(checked) => handleNotificationSettingChange('courseUpdates', checked)} 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">New Lessons</h3>
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="text-sm">Get notified when new lessons are available</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.newLessons} 
                    onCheckedChange={(checked) => handleNotificationSettingChange('newLessons', checked)} 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Learning Reminders</h3>
                <div className="flex justify-between items-center border-b pb-4">
                  <div>
                    <p className="text-sm">Receive reminders to continue your learning</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.learningReminders} 
                    onCheckedChange={(checked) => handleNotificationSettingChange('learningReminders', checked)} 
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Marketing Communications</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm">Receive updates about new courses and features</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.marketingCommunications} 
                    onCheckedChange={(checked) => handleNotificationSettingChange('marketingCommunications', checked)} 
                  />
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Security Settings</h2>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  name="currentPassword"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  name="newPassword"
                  type="password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                />
              </div>
              <div className="flex justify-start mt-4">
                <Button type="submit">Update Password</Button>
              </div>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
