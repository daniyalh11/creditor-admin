
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Workflow, BookOpen, Download,
  HelpCircle, Upload, Star, Lock, Globe, Tag,
  ClipboardList, Shield, Video, 
  Info, Layers, FileText, Sparkles
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

type AdminMenuItemProps = {
  label: string;
  to: string;
  active: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
  collapsed?: boolean;
};

const AdminMenuItem = ({ 
  label, 
  to, 
  active, 
  icon, 
  onClick,
  collapsed = false 
}: AdminMenuItemProps) => {
  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={to}
            onClick={onClick}
            className={cn(
              "flex items-center gap-3 py-2 rounded-md transition-colors mx-2",
              active 
                ? "bg-blue-100 text-blue-700 font-medium" 
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              "justify-center px-2"
            )}
          >
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="z-50">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors mx-2 mb-1",
        active 
          ? "bg-blue-100 text-blue-700 font-medium" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        "justify-start"
      )}
    >
      <span className="flex-shrink-0">
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
};

type AdminNavigationProps = {
  pathname: string;
  onItemClick?: () => void;
  collapsed?: boolean;
};

export const AdminNavigation = ({ 
  pathname, 
  onItemClick,
  collapsed = false 
}: AdminNavigationProps) => {
  const adminItems = [
    { icon: <Info size={18} />, label: "About", path: "/admin/about" },
    { icon: <Workflow size={18} />, label: "Automation", path: "/admin/automation" },
    { icon: <BookOpen size={18} />, label: "Catalog", path: "/admin/catalog" },
    { icon: <Download size={18} />, label: "Export", path: "/admin/export" },
    { icon: <HelpCircle size={18} />, label: "Help desk", path: "/admin/help" },
    { icon: <ClipboardList size={18} />, label: "Plans", path: "/admin/plans" },
    { icon: <Shield size={18} />, label: "Policies", path: "/admin/policies" },
    { icon: <Video size={18} />, label: "ZoomUS API", path: "/admin/zoomus" },
  ];
  
  // Check if we're on a subpage of a section
  const isSubpageActive = (path: string) => {
    const mainPath = path.split('/').slice(0, 3).join('/');
    return pathname.startsWith(mainPath);
  };
  
  return (
    <div className={cn(
      "py-3 overflow-y-auto",
      "bg-gray-50"
    )}>
      <div className="space-y-1">
        {adminItems.map((item) => (
          <AdminMenuItem
            key={item.path}
            label={item.label}
            to={item.path}
            icon={item.icon}
            active={pathname === item.path || isSubpageActive(item.path)}
            onClick={onItemClick}
            collapsed={collapsed}
          />
        ))}
      </div>
    </div>
  );
};
