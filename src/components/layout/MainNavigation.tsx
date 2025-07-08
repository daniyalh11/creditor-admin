import React, { useState } from 'react';
import { 
  Home, BookOpen, Users,
  BarChart2, UserCheck, List, FolderOpen, MessageSquare, ChevronDown, ChevronUp, MoreHorizontal, FileText, Gamepad2
} from 'lucide-react';
import { NavItem } from './NavItem';
import { useSidebar } from '@/contexts/SidebarContext';
import { useUserFilter } from '@/contexts/UserFilterContext';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

type MainNavigationProps = {
  pathname: string;
  onItemClick?: () => void;
};

export const MainNavigation = ({ pathname, onItemClick }: MainNavigationProps) => {
  const { isMainCollapsed } = useSidebar();
  const { isFilterMenuOpen, setIsFilterMenuOpen } = useUserFilter();
  const location = useLocation();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  
  // Determine if we're in a context that needs main sidebar collapsed
  const isInAdminSection = pathname.startsWith('/admin');
  const isInGroupSection = pathname.startsWith('/groups/view');
  const isInAssessmentBuilder = pathname.includes('/assessment-builder');
  
  // Check if we're on assessment dashboard pages that should keep main sidebar expanded
  const isOnAssessmentDashboard = pathname.includes('/quiz/') ||
                                 pathname.includes('/assignment/') ||
                                 pathname.includes('/debate/') ||
                                 pathname.includes('/essay/') ||
                                 pathname.includes('/survey/');
  
  // Check if we're on the module assessments view page
  const isOnModuleAssessmentsView = /\/courses\/edit\/\d+.*assessments/.test(pathname);
  
  // Module context should exclude assessment dashboard pages and module assessments view
  const isInModuleContext = (pathname.startsWith('/courses/edit/') ||
                            pathname.startsWith('/modules/') ||
                            pathname.includes('/module-builder')) &&
                            !isOnAssessmentDashboard &&
                            !isOnModuleAssessmentsView;
  
  // Force collapse when in special contexts, otherwise use manual collapse state
  const shouldShowCollapsed = isInAdminSection || 
                             isInGroupSection || 
                             isInAssessmentBuilder ||
                             isInModuleContext ||
                             isMainCollapsed;
  
  const handleUserClick = (event: React.MouseEvent) => {
    if (location.pathname === '/users') {
      event.preventDefault();
      setIsFilterMenuOpen(!isFilterMenuOpen);
    } else {
      if (onItemClick) onItemClick();
    }
  };

  const handleGamesClick = (event: React.MouseEvent) => {
    event.preventDefault();
    window.location.href = 'https://preview--game-glow-carousel-01.lovable.app/';
    if (onItemClick) onItemClick();
  };

  const handleMoreClick = () => {
    setShowMoreOptions(true);
  };

  const handleLessClick = () => {
    setShowMoreOptions(false);
  };

  const mainItems = [
    { icon: Home, label: "Home", to: "/", active: pathname === '/' },
    { icon: BookOpen, label: "Courses", to: "/courses", active: pathname.startsWith('/courses') },
    { icon: Users, label: "Groups", to: "/groups", active: pathname.startsWith('/groups') },
    { icon: FolderOpen, label: "Catalog", to: "/catalog", active: pathname.startsWith('/catalog') },
    { 
      icon: UserCheck, 
      label: "Users", 
      to: "/users", 
      active: pathname.startsWith('/users'),
      onClick: handleUserClick,
      badge: 5
    },
    { icon: MessageSquare, label: "Messages", to: "/messages", active: pathname === '/messages' },
    { 
      icon: Gamepad2, 
      label: "Games", 
      to: "/games", 
      active: pathname === '/games',
      onClick: handleGamesClick
    }
  ];

  const moreItems = [
    { icon: List, label: "Surveys", to: "/surveys", active: pathname === '/surveys' },
    { icon: BarChart2, label: "Progress", to: "/progress", active: pathname === '/progress' },
    { icon: FileText, label: "Reports", to: "/reports", active: pathname === '/reports' },
    { icon: FolderOpen, label: "Resources", to: "/resources", active: pathname === '/resources' }
  ];
  
  return (
    <div className="flex-1 py-4 space-y-1 px-2 relative overflow-hidden">
      {/* Main Navigation Items */}
      <div className={cn(
        "transition-all duration-300 ease-in-out space-y-1",
        showMoreOptions ? "opacity-0 translate-x-[-100%] absolute inset-0 pointer-events-none" : "opacity-100 translate-x-0"
      )}>
        {mainItems.map((item) => (
          <NavItem 
            key={item.to}
            icon={item.icon} 
            label={item.label} 
            to={item.to} 
            active={item.active} 
            onClick={item.onClick || onItemClick}
            collapsed={shouldShowCollapsed}
            badge={item.badge}
            className="hover-lift"
          />
        ))}
        
        {/* More Button */}
        <div 
          className={cn(
            "flex items-center px-3 py-2.5 mx-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group cursor-pointer",
            moreItems.some(item => item.active) ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 ml-2 pl-2" : "",
            shouldShowCollapsed ? "justify-center px-2" : "gap-3"
          )}
          onClick={handleMoreClick}
        >
          <MoreHorizontal className={cn(
            "h-5 w-5 transition-colors duration-200",
            moreItems.some(item => item.active) ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
            shouldShowCollapsed ? "mx-auto" : ""
          )} />
          
          {!shouldShowCollapsed && (
            <>
              <span className={cn(
                "font-medium transition-colors duration-200 flex-1",
                moreItems.some(item => item.active) ? "text-blue-600" : "text-gray-700 group-hover:text-blue-600"
              )}>
                More
              </span>
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </div>
      </div>

      {/* More Options View */}
      <div className={cn(
        "transition-all duration-300 ease-in-out space-y-1",
        showMoreOptions ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[100%] absolute inset-0 pointer-events-none"
      )}>
        {moreItems.map((item) => (
          <NavItem
            key={item.to}
            icon={item.icon}
            label={item.label}
            to={item.to}
            active={item.active}
            onClick={onItemClick}
            collapsed={shouldShowCollapsed}
            className="hover-lift"
          />
        ))}
        
        {/* Less Button */}
        <div 
          className={cn(
            "flex items-center px-3 py-2.5 mx-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group cursor-pointer",
            shouldShowCollapsed ? "justify-center px-2" : "gap-3"
          )}
          onClick={handleLessClick}
        >
          <MoreHorizontal className={cn(
            "h-5 w-5 transition-colors duration-200 group-hover:text-blue-600",
            shouldShowCollapsed ? "mx-auto" : ""
          )} />
          
          {!shouldShowCollapsed && (
            <>
              <span className="font-medium transition-colors duration-200 flex-1 text-gray-700 group-hover:text-blue-600">
                Less
              </span>
              <ChevronUp className="h-4 w-4" />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
