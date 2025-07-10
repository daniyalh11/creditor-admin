import React, { useState } from 'react';
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
    timezone: 'America/Los_Angeles',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    courseUpdates: true,
    newLessons: true,
    learningReminders: false,
    marketingCommunications: false
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTimezoneChange = (value) => {
    setFormData(prev => ({ ...prev, timezone: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({ title: "Profile updated", description: "Your profile has been updated successfully." });
    setIsEditing(false);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    toast({ title: "Password updated", description: "Your password has been updated successfully." });
  };

  const handleNotificationSettingChange = (key, checked) => {
    setNotificationSettings(prev => ({ ...prev, [key]: checked }));
    toast({ title: `${checked ? 'Enabled' : 'Disabled'} ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`, duration: 2000 });
  };

  const handleAvatarSave = (avatarSource) => {
    setFormData(prev => ({ ...prev, avatar: avatarSource }));
    setAvatarUpdated(true);
    setTimeout(() => setAvatarUpdated(false), 2000);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Avatar & Header */}
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

      {/* Avatar Picker Modal */}
      <AvatarPickerDialog
        isOpen={avatarPickerOpen}
        onClose={() => setAvatarPickerOpen(false)}
        onSave={handleAvatarSave}
        currentAvatar={formData.avatar}
      />

      {/* Tabs Component */}
      {/* PERSONAL / NOTIFICATIONS / SECURITY */}
      {/* ...Tabs content same as before... */}

    </div>
  );
};

export default Profile;