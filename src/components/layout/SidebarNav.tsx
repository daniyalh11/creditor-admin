import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MainNavigation } from './MainNavigation';
import { 
  Shield, HelpCircle, FileText, MessageCircle, Book, Ticket
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/contexts/SidebarContext';
import { NavItem } from './NavItem';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type SidebarNavProps = {
  onCloseMobile?: () => void;
};

export const SidebarNav = ({ onCloseMobile }: SidebarNavProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { 
    isMainOpen,
    toggleMain,
    isAdminSectionActive,
    setAdminSectionActive,
    openAdminPanel,
    isMainCollapsed,
    setMainCollapsed
  } = useSidebar();
  
  const [isHelpDropdownOpen, setIsHelpDropdownOpen] = useState(false);
  
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
  
  const handleClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const handleAdminClick = () => {
    navigate('/admin');
    setAdminSectionActive(true);
    openAdminPanel();
    handleClick();
  };

  const handleHelpItemClick = (path: string) => {
    navigate(path);
    setIsHelpDropdownOpen(false);
    handleClick();
  };

  const handleLogoClick = () => {
    navigate('/');
    if (isMainCollapsed) {
      setMainCollapsed(false);
    }
  };

  const renderTooltip = (content: string, children: React.ReactNode) => {
    if (shouldShowCollapsed) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent side="right" className="animate-in fade-in-80 zoom-in-95 duration-200">
            {content}
          </TooltipContent>
        </Tooltip>
      );
    }
    return children;
  };

  const helpOptions = [
    {
      icon: FileText,
      label: "FAQs",
      path: "/help/faqs"
    },
    {
      icon: MessageCircle,
      label: "Contact Support",
      path: "/help/contact"
    },
    {
      icon: Book,
      label: "User Guides",
      path: "/help/guides"
    },
    {
      icon: Ticket,
      label: "Support Ticket",
      path: "/help/ticket"
    }
  ];

  return (
    <nav 
      className={cn(
        "h-full flex flex-col transition-all duration-300 ease-in-out",
        "bg-white border-r border-gray-100 fixed left-0 top-0 z-10",
        shouldShowCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn(
        "flex h-16 items-center transition-all duration-300 border-b border-gray-100 bg-blue-600",
        shouldShowCollapsed ? "px-2 justify-center" : "px-4"
      )}>
        <div 
          className={cn(
            "cursor-pointer transition-colors duration-300 flex items-center gap-3",
            "text-white",
            shouldShowCollapsed ? "justify-center" : ""
          )}
          onClick={handleLogoClick}
        >
          {shouldShowCollapsed ? (
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">CA</span>
            </div>
          ) : (
            <>
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">CA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold">Creditor</span>
                <span className="text-lg font-bold -mt-1">Academy</span>
              </div>
            </>
          )}
        </div>
      </div>
      
      <MainNavigation pathname={pathname} onItemClick={handleClick} />
      
      <div className={cn(
        "mt-auto border-t border-gray-100 p-2"
      )}>
        {renderTooltip("Admin", 
          <NavItem 
            icon={Shield} 
            label="Admin" 
            to="/admin" 
            active={pathname.startsWith('/admin')} 
            onClick={handleAdminClick}
            collapsed={shouldShowCollapsed}
            className="mb-1"
          />
        )}
        
        {/* Help & Support with Dropdown */}
        <Popover open={isHelpDropdownOpen} onOpenChange={setIsHelpDropdownOpen}>
          <PopoverTrigger asChild>
            <div className={cn(
              "flex items-center px-3 py-2.5 mx-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group cursor-pointer",
              pathname.startsWith('/help') ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600 ml-2 pl-2" : "",
              shouldShowCollapsed ? "justify-center px-2" : "gap-3"
            )}>
              <HelpCircle className={cn(
                "h-5 w-5 transition-colors duration-200",
                pathname.startsWith('/help') ? "text-blue-600" : "text-gray-500 group-hover:text-blue-600",
                shouldShowCollapsed ? "mx-auto" : ""
              )} />
              
              {!shouldShowCollapsed && (
                <span className={cn(
                  "font-medium transition-colors duration-200",
                  pathname.startsWith('/help') ? "text-blue-600" : "text-gray-700 group-hover:text-blue-600"
                )}>
                  Help & Support
                </span>
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent 
            side={shouldShowCollapsed ? "right" : "top"} 
            align="start" 
            className="w-56 p-2 bg-white shadow-lg border border-gray-200"
          >
            <div className="space-y-1">
              {helpOptions.map((option) => (
                <button
                  key={option.path}
                  onClick={() => handleHelpItemClick(option.path)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-md transition-colors"
                >
                  <option.icon className="h-4 w-4 text-gray-500" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </nav>
  );
};
