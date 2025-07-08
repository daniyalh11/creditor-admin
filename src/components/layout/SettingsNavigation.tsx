
import React, { useState } from 'react';
import { 
  Settings,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { NavItem } from './NavItem';
import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type SettingsNavigationProps = {
  pathname: string;
  onItemClick?: () => void;
};

export const SettingsNavigation = ({ pathname, onItemClick }: SettingsNavigationProps) => {
  const [expanded, setExpanded] = useState(pathname.includes('/admin-settings'));
  
  const settingsOptions = [
    { path: '/admin-settings/api', label: 'API' },
    { path: '/admin-settings/about', label: 'About' },
    { path: '/admin-settings/accounts', label: 'Accounts' },
    { path: '/admin-settings/activity', label: 'Activity display' },
    { path: '/admin-settings/automation', label: 'Automation' },
    { path: '/admin-settings/calendar', label: 'Calendar' },
    { path: '/admin-settings/catalog', label: 'Catalog' },
    { path: '/admin-settings/courses', label: 'Courses' },
    { path: '/admin-settings/export', label: 'Export' },
    { path: '/admin-settings/help', label: 'Help desk' },
    { path: '/admin-settings/import', label: 'Import' },
    { path: '/admin-settings/mastery', label: 'Mastery' },
    { path: '/admin-settings/messages', label: 'Messages' },
    { path: '/admin-settings/permissions', label: 'Permissions' },
    { path: '/admin-settings/portal', label: 'Portal' },
    { path: '/admin-settings/tagging', label: 'Tagging' }
  ];

  const isSettingsActive = pathname.includes('/admin-settings');
  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <div className="px-3 py-4 border-t border-sidebar-border mt-auto">
      <div className="mb-2 px-3 text-xs uppercase text-sidebar-foreground font-medium">
        Settings
      </div>

      <div>
        <button 
          onClick={toggleExpanded}
          className={cn(
            "flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors",
            isSettingsActive 
              ? "bg-sidebar-accent text-sidebar-accent-foreground" 
              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
          )}
        >
          <div className="flex items-center gap-3">
            <Settings size={20} />
            <span>Settings</span>
          </div>
          {expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>

        {expanded && (
          <div className="mt-1 ml-8 space-y-1">
            {settingsOptions.map((option) => (
              <Link
                key={option.path}
                to={option.path}
                onClick={onItemClick}
                className={cn(
                  "block px-3 py-1.5 text-sm rounded-md transition-colors",
                  pathname === option.path 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                {option.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
