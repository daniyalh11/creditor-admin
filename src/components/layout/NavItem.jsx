import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const NavItem = ({ 
  icon: Icon, 
  label, 
  to, 
  active, 
  onClick, 
  collapsed = false,
  badge,
  className 
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center px-3 py-2.5 mx-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group relative",
        active ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 ml-2 pl-2" : "",
        collapsed ? "justify-center px-2" : "gap-3",
        className
      )}
    >
      <Icon className={cn(
        "h-5 w-5 transition-colors duration-200",
        active ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
        collapsed ? "mx-auto" : ""
      )} />
      
      {!collapsed && (
        <span className={cn(
          "font-medium transition-colors duration-200",
          active ? "text-blue-600" : "text-gray-700 group-hover:text-blue-600"
        )}>
          {label}
        </span>
      )}

      {badge && !collapsed && (
        <span className={cn(
          "ml-auto min-w-5 h-5 rounded-full bg-blue-500 text-xs flex items-center justify-center text-white px-2",
          active ? "bg-blue-600" : ""
        )}>
          {badge}
        </span>
      )}

      {badge && collapsed && (
        <span className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full bg-blue-500 text-xs flex items-center justify-center text-white">
          {badge}
        </span>
      )}
    </Link>
  );
};